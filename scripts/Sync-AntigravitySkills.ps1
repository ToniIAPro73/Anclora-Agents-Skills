<# 
Sync-AntigravitySkills.ps1
- Sincroniza el submódulo antigravity-awesome-skills con upstream/main
- Empuja a origin/main del submódulo si hay cambios
- Actualiza el puntero del submódulo en el repo padre (commit + push) si cambió
- Informa claramente si hubo cambios o no
#>

$ErrorActionPreference = "Stop"

function Info($msg)  { Write-Host "[INFO]  $msg" }
function Ok($msg)    { Write-Host "[OK]    $msg" -ForegroundColor Green }
function Warn($msg)  { Write-Host "[WARN]  $msg" -ForegroundColor Yellow }
function Fail($msg)  { Write-Host "[ERROR] $msg" -ForegroundColor Red }

function RunGit([string]$args, [string]$cwd) {
  $pinfo = New-Object System.Diagnostics.ProcessStartInfo
  $pinfo.FileName = "git"
  $pinfo.Arguments = $args
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
    throw "git $args failed in '$cwd'`n$stderr`n$stdout"
  }
  return ($stdout.Trim())
}

try {
  # 1) Detectar raíz del repo padre
  $root = RunGit "rev-parse --show-toplevel" (Get-Location).Path
  Info "Repo raíz detectado: $root"

  $subPath = Join-Path $root "antigravity-awesome-skills"
  if (-not (Test-Path $subPath)) {
    throw "No existe el submódulo en: $subPath. ¿Está inicializado? (git submodule update --init --recursive)"
  }

  # 2) Verificar que es repo git
  [void](RunGit "rev-parse --is-inside-work-tree" $subPath)

  # 3) Verificar remotos
  $remotes = RunGit "remote" $subPath
  if ($remotes -notmatch "(?m)^origin$")  { throw "El submódulo no tiene remoto 'origin'." }
  if ($remotes -notmatch "(?m)^upstream$"){ throw "El submódulo no tiene remoto 'upstream'. Añádelo con: git remote add upstream <url>" }

  # 4) Asegurar rama main
  $branch = RunGit "branch --show-current" $subPath
  if ($branch -ne "main") {
    Info "Cambiando a rama main en el submódulo (estabas en '$branch')"
    [void](RunGit "switch main" $subPath)
  }

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
      # Preferimos FF-only por limpieza
      [void](RunGit "merge --ff-only upstream/main" $subPath)
      Ok "Fast-forward aplicado (local main avanzó al upstream)."
    } catch {
      Warn "No se pudo hacer fast-forward. Intentando merge normal (puede crear commit de merge)..."
      try {
        [void](RunGit "merge upstream/main -m `"merge upstream/main into main`"" $subPath)
        Ok "Merge aplicado."
      } catch {
        Fail "Merge falló (posibles conflictos). Revisa el submódulo manualmente."
        throw
      }
    }
  }

  # 6) Si el submódulo avanzó, push a origin/main
  $afterSubHead = RunGit "rev-parse HEAD" $subPath
  $submoduleChanged = ($afterSubHead -ne $beforeSubHead)

  if ($submoduleChanged) {
    Info "Submódulo cambió: $beforeSubHead -> $afterSubHead"
    Info "Pushing submódulo a origin/main..."
    [void](RunGit "push origin main" $subPath)
    Ok "Submódulo empujado a origin/main."
  } else {
    Ok "Submódulo no cambió. Nada que pushear en el fork."
  }

  # 7) Volver al repo padre y actualizar puntero del submódulo (si cambió)
  $beforeSuperHead = RunGit "rev-parse HEAD" $root

  # Esto fuerza a git a recalcular estado del submódulo
  $superStatus = RunGit "status --porcelain" $root
  $pointerChanged = $superStatus -match "(?m)^ M antigravity-awesome-skills$|(?m)^\?\? antigravity-awesome-skills$|(?m)^M  antigravity-awesome-skills$"

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
  Info " - Submódulo: " + ($(if ($submoduleChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" }))
  Info " - Repo padre (puntero submódulo): " + ($(if ($pointerChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" }))

} catch {
  Fail $_.Exception.Message
  exit 1
}
