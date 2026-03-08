<#
Sync-AntigravitySkills.ps1 (versión consolidada)

Objetivo
- Repo padre:
  - Si hay cambios locales en /scripts o /skills => auto-commit
  - Si hay cambios locales fuera de /scripts, /skills o el submódulo => aborta (para no pisar trabajo raro)
  - Hace pull --ff-only del repo padre
  - Si cambia el puntero del submódulo => commit
  - Push del repo padre si hay commits locales pendientes

- Submódulo antigravity-awesome-skills (solo lectura):
  - Debe estar limpio (si está sucio => aborta)
  - Si está behind origin/main => fast-forward desde origin
  - Si está behind upstream/main => fast-forward desde upstream (si no se puede => merge; si conflicto => aborta)
  - Push a origin/main; si non-fast-forward => force-with-lease (fork espejo)

Requisitos:
- origin y upstream configurados en el submódulo
#>

$ErrorActionPreference = "Stop"

# Carpetas del repo raíz permitidas para auto-commit
$AllowedRootFolders = @(
  "scripts",
  "skills",
  "assets_anclora"
)

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

function NormalizePath([string]$p) {
  if ([string]::IsNullOrWhiteSpace($p)) { return "" }
  $x = $p.Trim()

  # Quita comillas si vienen pegadas ("path" o 'path')
  if (($x.StartsWith('"') -and $x.EndsWith('"')) -or ($x.StartsWith("'") -and $x.EndsWith("'"))) {
    $x = $x.Substring(1, $x.Length - 2)
  }

  # Normaliza separadores
  $x = $x -replace "\\","/"

  # Trim otra vez por si había espacios con comillas
  return $x.Trim()
}

function GetChangedPaths([string]$cwd) {
  # Incluye staged y unstaged. Usa -z para evitar problemas con espacios, y parsea por NUL.
  $a = RunGit "diff --name-only -z" $cwd
  $b = RunGit "diff --cached --name-only -z" $cwd

  $paths = New-Object System.Collections.Generic.List[string]

  if ($a) {
    foreach ($p in ($a -split "`0")) {
      $n = NormalizePath $p
      if ($n) { $paths.Add($n) }
    }
  }

  if ($b) {
    foreach ($p in ($b -split "`0")) {
      $n = NormalizePath $p
      if ($n) { $paths.Add($n) }
    }
  }

  return ($paths | Select-Object -Unique)
}


function HasCommitsToPush([string]$cwd) {
  try {
    $s = RunGit "status -sb" $cwd
    return ($s -match "ahead\s+\d+")
  } catch {
    return $false
  }
}

function GetAheadBehind([string]$cwd, [string]$leftRef, [string]$rightRef) {
  # rev-list --left-right --count left...right => (solo left) (solo right)
  $counts = RunGit "rev-list --left-right --count $leftRef...$rightRef" $cwd
  $parts = $counts -split "\s+"
  return @{ Left = [int]$parts[0]; Right = [int]$parts[1] }
}

function GetUnmerged([string]$cwd) {
  try { return (RunGit "diff --name-only --diff-filter=U" $cwd) } catch { return "" }
}

function AutoCommitRootScriptsSkills([string]$root) {
  $changed = GetChangedPaths $root
  if ($changed.Count -eq 0) { return $false }

  $blocked = @()
  $hasAllowed = $false

  foreach ($p in $changed) {

    # ¿Pertenece a alguna carpeta permitida?
    $isAllowed = $false
    foreach ($folder in $AllowedRootFolders) {
      if ($p -match "^$folder/") {
        $isAllowed = $true
        $hasAllowed = $true
        break
      }
    }

    if ($isAllowed) { continue }

    # Permitimos que aparezca el submódulo como cambio (puntero)
    if ($p -eq "antigravity-awesome-skills") { continue }

    # Todo lo demás es bloqueante
    $blocked += $p
  }

  if ($blocked.Count -gt 0) {
    Fail "Hay cambios locales fuera de las carpetas permitidas. No auto-commiteo eso."
    Write-Host "Cambios bloqueantes:" -ForegroundColor Yellow
    $blocked | ForEach-Object { Write-Host " - $_" }
    throw "Cambios locales no permitidos en repo padre. Commit/stash/revert manual y reintenta."
  }

  if (-not $hasAllowed) { return $false }

  Info "Detectados cambios locales en carpetas permitidas. Auto-commit..."

  $addArgs = "add -- " + ($AllowedRootFolders -join " ")
  [void](RunGit $addArgs $root)

  $staged = RunGit "diff --cached --name-only" $root
  if ([string]::IsNullOrWhiteSpace($staged)) { return $false }

  $foldersLabel = ($AllowedRootFolders -join "/")
  $msg = "chore: sync local $foldersLabel (" + (Get-Date -Format "yyyy-MM-dd HH:mm") + ")"

  [void](RunGit "commit -m `"$msg`"" $root)
  Ok "Auto-commit realizado: $msg"
  return $true
}

try {
  # 0) Root
  $root = RunGit "rev-parse --show-toplevel" (Get-Location).Path
  Info "Repo raíz detectado: $root"

  # 1) Auto-commit local scripts/skills si procede
  $didLocalCommit = AutoCommitRootScriptsSkills $root

  # 2) Pull repo padre (ff-only)
  Info "Pull repo padre (ff-only)..."
  [void](RunGit "pull --ff-only" $root)
  Ok "Repo padre actualizado desde origin (si había cambios)."

  # 3) Submódulo
  $subPath = Join-Path $root "antigravity-awesome-skills"
  if (-not (Test-Path $subPath)) {
    throw "No existe el submódulo en: $subPath. Inicializa con: git submodule update --init --recursive"
  }

  [void](RunGit "rev-parse --is-inside-work-tree" $subPath)

  # Remotos requeridos
  $remotes = RunGit "remote" $subPath
  if ($remotes -notmatch "(?m)^origin$")   { throw "El submódulo no tiene remoto 'origin'." }
  if ($remotes -notmatch "(?m)^upstream$") { throw "El submódulo no tiene remoto 'upstream'." }

  # Rama main
  $branch = RunGit "branch --show-current" $subPath
  if ($branch -ne "main") {
    Info "Cambiando a main en submódulo (estabas en '$branch')"
    [void](RunGit "switch main" $subPath)
  }

  # Submódulo debe estar limpio (solo lectura)
  $subDirty = RunGit "status --porcelain" $subPath
  if (-not [string]::IsNullOrWhiteSpace($subDirty)) {
    Fail "El submódulo tiene working tree sucio (solo lectura)."
    Write-Host "Estado del submódulo:" -ForegroundColor Yellow
    Write-Host $subDirty
    Write-Host "Solución sugerida:"
    Write-Host "  git -C antigravity-awesome-skills reset --hard"
    Write-Host "  git -C antigravity-awesome-skills clean -fd"
    throw "Submódulo sucio. Abortando."
  }

  # Fetch submódulo
  Info "Fetching submódulo (upstream/origin)..."
  [void](RunGit "fetch upstream" $subPath)
  [void](RunGit "fetch origin" $subPath)

  $beforeSubHead = RunGit "rev-parse HEAD" $subPath

  # 3.1) Si behind origin/main => FF desde origin (evita “pull pendiente” en VS Code)
  $abOrigin = GetAheadBehind $subPath "HEAD" "origin/main"
  if ($abOrigin.Right -gt 0 -and $abOrigin.Left -eq 0) {
    Info "Submódulo behind origin/main ($($abOrigin.Right)). Fast-forward desde origin..."
    [void](RunGit "merge --ff-only origin/main" $subPath)
    Ok "Submódulo actualizado a origin/main."
  } elseif ($abOrigin.Right -gt 0 -and $abOrigin.Left -gt 0) {
    Fail "Submódulo divergido vs origin/main (ahead $($abOrigin.Left), behind $($abOrigin.Right))."
    Write-Host "Política Plan A (fork espejo): alinear con upstream y forzar fork:" -ForegroundColor Yellow
    Write-Host "  git -C antigravity-awesome-skills fetch upstream"
    Write-Host "  git -C antigravity-awesome-skills reset --hard upstream/main"
    Write-Host "  git -C antigravity-awesome-skills push --force-with-lease origin main"
    throw "Submódulo divergido vs origin."
  }

  # 3.2) Sincronizar con upstream/main
  $abUpstream = GetAheadBehind $subPath "HEAD" "upstream/main"
if ($abUpstream.Right -eq 0) {
  Ok "Submódulo ya estaba al día con upstream/main."
} else {
  Info "Submódulo behind upstream/main ($($abUpstream.Right)). Intentando FF..."
  try {
    [void](RunGit "merge --ff-only upstream/main" $subPath)
    Ok "Fast-forward aplicado hacia upstream/main."
  } catch {
    Warn "No se pudo FF hacia upstream. Plan A: upstream manda -> reset --hard a upstream/main (sin merges)."
    [void](RunGit "reset --hard upstream/main" $subPath)
    Ok "Reset aplicado: HEAD ahora = upstream/main."
  }
}


  $afterSubHead = RunGit "rev-parse HEAD" $subPath
  $subChanged = ($afterSubHead -ne $beforeSubHead)

  # 3.3) Push submódulo a origin (fork espejo)
  if ($subChanged) {
    Info "Submódulo avanzó: $beforeSubHead -> $afterSubHead"
    Info "Pushing submódulo a origin/main..."
    try {
      [void](RunGit "push origin main" $subPath)
      Ok "Submódulo push OK."
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match "non-fast-forward|rejected") {
        Warn "Push non-fast-forward. Forzando con --force-with-lease (fork espejo)..."
        [void](RunGit "fetch origin" $subPath)
        [void](RunGit "push --force-with-lease origin main" $subPath)
        Ok "Submódulo push OK (force-with-lease)."
      } else {
        throw
      }
    }
  } else {
    Ok "Submódulo sin cambios."
  }

  # 4) Repo padre: commit del puntero del submódulo si cambió
  $subPointerDiff = RunGit "diff --submodule=short -- antigravity-awesome-skills" $root
  $pointerChanged = -not [string]::IsNullOrWhiteSpace($subPointerDiff)

  if ($pointerChanged) {
    Info "Puntero del submódulo cambió en repo padre. Commit..."
    Write-Host $subPointerDiff
    [void](RunGit "add -- antigravity-awesome-skills" $root)
    [void](RunGit "commit -m `"chore: update submodule antigravity-awesome-skills`"" $root)
    Ok "Commit del puntero realizado."
  } else {
    Ok "Puntero del submódulo sin cambios en repo padre."
  }

  # 5) Push repo padre si hay commits locales pendientes
  if (HasCommitsToPush $root) {
    Info "Pushing repo padre..."
    [void](RunGit "push" $root)
    Ok "Repo padre push OK."
  } else {
    Ok "Repo padre: nada que pushear."
  }

  Info "Resumen:"
  Info (" - Auto-commit scripts/skills local: " + ($(if ($didLocalCommit) { "SÍ" } else { "NO" })))
  Info (" - Submódulo actualizado: " + ($(if ($subChanged) { "SÍ" } else { "NO" })))
  Info (" - Puntero submódulo commiteado: " + ($(if ($pointerChanged) { "SÍ" } else { "NO" })))

} catch {
  Fail $_.Exception.Message
  exit 1
}
