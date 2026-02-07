<# 
Sync-AntigravitySkills.ps1

Políticas:
- Repo padre:
  - BLOQUEA si hay cambios en /scripts (para evitar ejecutar sync con scripts “a medio editar”).
- Submódulo antigravity-awesome-skills (solo lectura):
  - BLOQUEA si hay cambios dentro de skills/ o scripts/ (señal de que alguien metió cosas propias en el submódulo).

Acciones:
- Sincroniza submódulo con upstream/main
- Empuja a origin/main del submódulo si hay cambios (fallback a --force-with-lease en non-fast-forward)
- Actualiza puntero del submódulo en el repo padre (commit + push) si cambió
#>

$ErrorActionPreference = "Stop"

function Info($msg) { Write-Host "[INFO]  $msg" }
function Ok($msg)   { Write-Host "[OK]    $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "[WARN]  $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

function RunGit([string]$gitArgs, [string]$cwd) {
  $pinfo = New-Object System.Diagnostics.ProcessStartInfo
  $pinfo.FileName = "git"
  $pinfo.Arguments = $gitArgs
  $pinfo.WorkingDirectory = $cwd
  $pinfo.RedirectStandardOutput = $true
  $pinfo.RedirectStandardError  = $true
  $pinfo.UseShellExecute = $false

  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $pinfo

  [void]$p.Start()
  $stdout = $p.StandardOutput.ReadToEnd()
  $stderr = $p.StandardError.ReadToEnd()
  $p.WaitForExit()

  if ($p.ExitCode -ne 0) {
    throw "git $gitArgs failed in '$cwd'`n$stderr`n$stdout"
  }

  return ($stdout.Trim())
}

function GetPorcelainLines([string]$cwd) {
  $raw = RunGit "status --porcelain" $cwd
  if ([string]::IsNullOrWhiteSpace($raw)) { return @() }
  return $raw -split "`n" | ForEach-Object { $_.TrimEnd() } | Where-Object { $_ -ne "" }
}

function ExtractPathFromPorcelainLine([string]$line) {
  # Porcelain v1: "XY <path>" o "XY <old> -> <new>"
  if ($line.Length -lt 4) { return $null }
  $rest = $line.Substring(3).Trim()
  if ($rest -match "\s->\s") {
    return ($rest -split "\s->\s")[-1].Trim()
  }
  return $rest
}

function GetUnmerged([string]$cwd) {
  try { return (RunGit "diff --name-only --diff-filter=U" $cwd) } catch { return "" }
}

function BlockIfPathMatches([string]$cwd, [string]$title, [string[]]$patterns, [string]$howToFix) {
  $porcelain = GetPorcelainLines $cwd
  $blocked = @()

  foreach ($line in $porcelain) {
    $path = ExtractPathFromPorcelainLine $line
    if (-not $path) { continue }
    $norm = $path -replace "\\","/"

    foreach ($pat in $patterns) {
      if ($norm -match $pat) {
        $blocked += $line
        break
      }
    }
  }

  if ($blocked.Count -gt 0) {
    $details = ($blocked -join "`n")
    Fail @"
$title

Cambios detectados:
$details

$howToFix
"@
    exit 1
  }
}

try {
  # 1) Detectar raíz del repo padre
  $root = RunGit "rev-parse --show-toplevel" (Get-Location).Path
  Info "Repo raíz detectado: $root"

  # 1.1) REGLA (REPO PADRE): bloquear cambios en /scripts
  BlockIfPathMatches `
    -cwd $root `
    -title "Detectados cambios en '/scripts' del repo padre. Se bloquea el sync por seguridad." `
    -patterns @("^scripts/") `
    -howToFix @"
Solución:
- Haz commit de los cambios de /scripts, o
- haz stash, o
- revierte los cambios
y vuelve a ejecutar el script.
"@

  $subPath = Join-Path $root "antigravity-awesome-skills"
  if (-not (Test-Path $subPath)) {
    throw "No existe el submódulo en: $subPath. ¿Está inicializado? (git submodule update --init --recursive)"
  }

  # 2) Verificar que es repo git
  [void](RunGit "rev-parse --is-inside-work-tree" $subPath)

  # 3) Verificar remotos
  $remotes = RunGit "remote" $subPath
  if ($remotes -notmatch "(?m)^origin$")   { throw "El submódulo no tiene remoto 'origin'." }
  if ($remotes -notmatch "(?m)^upstream$") { throw "El submódulo no tiene remoto 'upstream'." }

  # 4) Asegurar rama main
  $branch = RunGit "branch --show-current" $subPath
  if ($branch -ne "main") {
    Info "Cambiando a rama main en el submódulo (estabas en '$branch')"
    [void](RunGit "switch main" $subPath)
  }

  # 4.1) REGLA (SUBMÓDULO): bloquear cambios en skills/ o scripts/ (submódulo es “solo lectura”)
  BlockIfPathMatches `
    -cwd $subPath `
    -title "Detectados cambios en 'skills/' o 'scripts/' dentro del submódulo (solo lectura). Se bloquea el sync." `
    -patterns @("^(skills|scripts)/") `
    -howToFix @"
Solución:
- Mueve esos cambios al repo padre (/skills o /scripts).
- Limpia el submódulo:
    git -C antigravity-awesome-skills reset --hard
  o si hay un merge a medias:
    git -C antigravity-awesome-skills merge --abort
y vuelve a ejecutar.
"@

  # Guardar SHAs para comparar
  $beforeSubHead = RunGit "rev-parse HEAD" $subPath

  # 5) Fetch upstream y origin
  Info "Fetching upstream..."
  [void](RunGit "fetch upstream" $subPath)

  Info "Fetching origin..."
  [void](RunGit "fetch origin" $subPath)

  $upstreamMain = RunGit "rev-parse upstream/main" $subPath
  $localHead    = RunGit "rev-parse HEAD" $subPath

  if ($upstreamMain -eq $localHead) {
    Ok "Submódulo ya estaba al día con upstream/main. No hay cambios que integrar."
  } else {
    Info "Hay cambios en upstream/main. Intentando fast-forward..."
    try {
      [void](RunGit "merge --ff-only upstream/main" $subPath)
      Ok "Fast-forward aplicado (local main avanzó al upstream)."
    } catch {
      Warn "No se pudo hacer fast-forward. Intentando merge normal (puede crear commit de merge)..."
      try {
        [void](RunGit "merge upstream/main -m `"merge upstream/main into main`"" $subPath)
        Ok "Merge aplicado."
      } catch {
        $unmerged = GetUnmerged $subPath
        Fail "Merge falló (posibles conflictos)."
        if ($unmerged) {
          Warn @"
Conflictos detectados en:
$unmerged

Opciones:
  1) Resolver manualmente y luego:
     git -C antigravity-awesome-skills add <files>
     git -C antigravity-awesome-skills commit

  2) Abortar el merge:
     git -C antigravity-awesome-skills merge --abort
"@
        }
        throw
      }
    }
  }

  # 6) Si el submódulo avanzó, push a origin/main (fallback a force-with-lease)
  $afterSubHead = RunGit "rev-parse HEAD" $subPath
  $submoduleChanged = ($afterSubHead -ne $beforeSubHead)

  if ($submoduleChanged) {
    Info "Submódulo cambió: $beforeSubHead -> $afterSubHead"
    Info "Pushing submódulo a origin/main..."

    try {
      [void](RunGit "push origin main" $subPath)
      Ok "Submódulo empujado a origin/main."
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match "non-fast-forward|rejected") {
        Warn "Push rechazado (non-fast-forward). Alineando el fork con --force-with-lease (Plan A: upstream manda)..."
        [void](RunGit "fetch origin" $subPath)
        [void](RunGit "push --force-with-lease origin main" $subPath)
        Ok "Submódulo empujado a origin/main (force-with-lease)."
      } else {
        throw
      }
    }
  } else {
    Ok "Submódulo no cambió. Nada que pushear en el fork."
  }

  # 7) Repo padre: actualizar puntero del submódulo (si cambió)
  $superStatus = RunGit "status --porcelain" $root
  $pointerChanged = $superStatus -match "(?m)^(M|\sM|\?\?)\s+antigravity-awesome-skills$"

  if ($pointerChanged) {
    Info "El puntero del submódulo en el repo padre ha cambiado. Commit + push..."
    [void](RunGit "add antigravity-awesome-skills" $root)
    [void](RunGit "commit -m `"chore: update submodule antigravity-awesome-skills`"" $root)
    [void](RunGit "push" $root)
    Ok "Repo padre actualizado y empujado."
  } else {
    Ok "Repo padre: puntero del submódulo sin cambios. Nada que commitear."
  }

  # 8) Resumen
  Info "Resumen:"
  Info (" - Submódulo: " + ($(if ($submoduleChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" })))
  Info (" - Repo padre (puntero submódulo): " + ($(if ($pointerChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" })))

} catch {
  Fail $_.Exception.Message
  exit 1
}
