<# 
Sync-AntigravitySkills.ps1
- Sincroniza el submódulo antigravity-awesome-skills con upstream/main
- Empuja a origin/main del submódulo si hay cambios
- Actualiza el puntero del submódulo en el repo padre (commit + push) si cambió
- Informa claramente si hubo cambios o no
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
  if ($remotes -notmatch "(?m)^origin$")   { throw "El submódulo no tiene remoto 'origin'." }
  if ($remotes -notmatch "(?m)^upstream$") { throw "El submódulo no tiene remoto 'upstream'." }

  # 4) Asegurar rama main
  $branch = RunGit "branch --show-current" $subPath
  if ($branch -ne "main") {
    Info "Cambiando a rama main en el submódulo (estabas en '$branch')"
    [void](RunGit "switch main" $subPath)
  }

# 4.1) REGRA DE SEGURIDAD: no permitir cambios locales en el submódulo
$dirty = RunGit "status --porcelain" $subPath

if ($dirty) {
  Fail @"
Se han detectado CAMBIOS LOCALES dentro del submódulo 'antigravity-awesome-skills'.

Esto suele ocurrir cuando se crean skills o archivos propios dentro del submódulo,
lo cual NO es correcto.

Archivos detectados:
$dirty

Acción recomendada:
- Mueve tus skills a una carpeta del repo padre, por ejemplo:
  /skills/<nombre-skill>

Después:
- Limpia el submódulo (reset o abort merge)
- Vuelve a ejecutar este script

El script se detiene para evitar corrupción del submódulo.
"@
  exit 1
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
      [void](RunGit "merge --ff-only upstream/main" $subPath)
      Ok "Fast-forward aplicado (local main avanzó al upstream)."
    } catch {
      Warn "No se pudo hacer fast-forward. Intentando merge normal (puede crear commit de merge)..."
      [void](RunGit "merge upstream/main -m `"merge upstream/main into main`"" $subPath)
      Ok "Merge aplicado."
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
  Info " - Submódulo: " + ($(if ($submoduleChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" }))
  Info " - Repo padre (puntero submódulo): " + ($(if ($pointerChanged) { "CAMBIÓ" } else { "SIN CAMBIOS" }))

} catch {
  Fail $_.Exception.Message
  exit 1
}
