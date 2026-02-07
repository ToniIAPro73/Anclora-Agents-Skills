<# 
Sync-AntigravitySkills.ps1

Objetivo:
- Mantener sincronizados:
  - Repo padre (origin/main)
  - Submódulo antigravity-awesome-skills (upstream/main como verdad; origin = tu fork espejo)
  - Carpeta raíz /scripts y /skills (si hay cambios locales, auto-commit; si hay cambios remotos, pull)

Política de seguridad:
- Si el repo padre tiene cambios locales FUERA de /scripts o /skills o del submódulo, aborta.
- Si el submódulo tiene working tree sucio, aborta (es “solo lectura”).

Flujo:
1) Auto-commit cambios locales permitidos en /scripts y /skills (repo padre)
2) Pull --ff-only repo padre
3) Sync submódulo:
   - Fetch origin/upstream
   - Si behind origin/main => FF a origin/main
   - Si behind upstream/main => FF a upstream/main; si no FF => merge (y si conflicto, aborta)
   - Push submódulo a origin (fallback force-with-lease en non-fast-forward)
4) Commit+push del puntero del submódulo en repo padre si cambió
5) Push repo padre si hay commits nuevos locales
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
  if ($line.Length -lt 4) { return $null }
  $rest = $line.Substring(3).Trim()
  if ($rest -match "\s->\s") { return ($rest -split "\s->\s")[-1].Trim() }
  return $rest
}

function GetAheadBehind([string]$cwd, [string]$leftRef, [string]$rightRef) {
  $counts = RunGit "rev-list --left-right --count $leftRef...$rightRef" $cwd
  $parts = $counts -split "\s+"
  return @{ Left = [int]$parts[0]; Right = [int]$parts[1] }
}

function GetUnmerged([string]$cwd) {
  try { return (RunGit "diff --name-only --diff-filter=U" $cwd) } catch { return "" }
}

function HasCommitsToPush([string]$cwd) {
  # Si no hay upstream tracking, devuelve $false (pero en tu caso hay origin/main)
  try {
    $s = RunGit "status -sb" $cwd
    return ($s -match "ahead\s+\d+")
  } catch {
    return $false
  }
}

function GetChangedPaths([string]$cwd) {
  # Incluye staged y unstaged
  $a = RunGit "diff --name-only" $cwd
  $b = RunGit "diff --cached --name-only" $cwd
  $paths = @()
  if ($a) { $paths += ($a -split "`n") }
  if ($b) { $paths += ($b -split "`n") }
  return ($paths | ForEach-Object { ($_ -replace "\\","/").Trim() } | Where-Object { $_ -ne "" } | Select-Object -Unique)
}

function AutoCommitAllowedRootChanges([string]$root) {
  $changed = GetChangedPaths $root
  if ($changed.Count -eq 0) { return $false }

  $allowed = @()
  $blocked = @()

  foreach ($p in $changed) {
    if ($p -match "^(scripts|skills)/") {
      $allowed += $p
    } elseif ($p -eq "antigravity-awesome-skills") {
      # el puntero del submódulo se trata más tarde, aquí no lo auto-commiteamos
      $allowed += $p
    } else {
      $blocked += $p
    }
  }

  if ($blocked.Count -gt 0) {
    $b = ($blocked -join "`n")
    Fail @"
Hay cambios locales fuera de /scripts y /skills (y/o submódulo). No auto-commiteo eso.

Cambios bloqueantes:
$b

Solución:
- Commit manual, stash o revert, y reintenta.
"@
    exit 1
  }

  # Auto-commit solo si hay cambios reales en scripts/ o skills/
  $hasScriptsSkills = $allowed | Where-Object { $_ -match "^(scripts|skills)/" }
  if (-not $hasScriptsSkills) { return $false }

  Info "Detectados cambios locales en /scripts o /skills. Auto-commit..."
  [void](RunGit "add -- scripts skills" $root)

  $staged = RunGit "diff --cached --name-only" $root
  if ([string]::IsNullOrWhiteSpace($staged)) { return $false }

  $msg = "chore: sync local scripts/skills (" + (Get-Date -Format "yyyy-MM-dd HH:mm") + ")"
  [void](RunGit "commit -m `"$msg`"" $root)
  Ok "Auto-commit realizado: $msg"
  return $true
}

  $lines = GetPorcelainLines $root
  if ($lines.Count -eq 0) { return $false }

  $allowed = @()
  $blocked = @()

  foreach ($line in $lines) {
    $path = ExtractPathFromPorcelainLine $line
    if (-not $path) { continue }
    $norm = $path -replace "\\","/"

    # Permitimos cambios locales SOLO en scripts/ y skills/
    if ($norm -match "^(scripts|skills)/") {
      $allowed += $line
    } else {
      # Permitimos también que aparezca el submódulo como “modified” (puntero/contenido), lo trataremos luego
      if ($norm -eq "antigravity-awesome-skills") {
        $allowed += $line
      } else {
        $blocked += $line
      }
    }
  }

  if ($blocked.Count -gt 0) {
    $b = ($blocked -join "`n")
    Fail @"
Hay cambios locales FUERA de /scripts y /skills (y/o submódulo). No auto-commiteo eso.

Cambios bloqueantes:
$b

Solución:
- Commit manual, stash o revert, y reintenta.
"@
    exit 1
  }

  # Solo auto-commit de scripts/skills (no del submódulo aquí)
  $hasAllowedReal = $allowed | Where-Object { ($_ -match "scripts/") -or ($_ -match "skills/") }
  if (-not $hasAllowedReal) { return $false }

  Info "Detectados cambios locales en /scripts o /skills. Auto-commit..."
  [void](RunGit "add -- scripts skills" $root)

  $staged = RunGit "diff --cached --name-only" $root
  if ([string]::IsNullOrWhiteSpace($staged)) { return $false }

  $msg = "chore: sync local scripts/skills (" + (Get-Date -Format "yyyy-MM-dd HH:mm") + ")"
  [void](RunGit "commit -m `"$msg`"" $root)
  Ok "Auto-commit realizado: $msg"
  return $true
}

try {
  # 0) Root
  $root = RunGit "rev-parse --show-toplevel" (Get-Location).Path
  Info "Repo raíz detectado: $root"

  # 1) Auto-commit local de scripts/skills si procede
  $didLocalCommit = AutoCommitAllowedRootChanges $root

  # 2) Pull repo padre (bajar cambios remotos; ff-only para no crear merges)
  Info "Pull repo padre (ff-only)..."
  [void](RunGit "pull --ff-only" $root)
  Ok "Repo padre actualizado desde origin (si había cambios)."

  # 3) Submódulo
  $subPath = Join-Path $root "antigravity-awesome-skills"
  if (-not (Test-Path $subPath)) {
    throw "No existe el submódulo en: $subPath. Inicializa: git submodule update --init --recursive"
  }

  [void](RunGit "rev-parse --is-inside-work-tree" $subPath)

  # Asegurar rama main
  $branch = RunGit "branch --show-current" $subPath
  if ($branch -ne "main") {
    Info "Cambiando a main en submódulo (estabas en '$branch')"
    [void](RunGit "switch main" $subPath)
  }

  # Submódulo debe estar limpio
  $subDirty = RunGit "status --porcelain" $subPath
  if (-not [string]::IsNullOrWhiteSpace($subDirty)) {
    Fail @"
El submódulo tiene working tree sucio. Se aborta (submódulo es solo lectura).

Estado:
$subDirty

Solución:
  git -C antigravity-awesome-skills reset --hard
  git -C antigravity-awesome-skills clean -fd
"@
    exit 1
  }

  # Fetch
  Info "Fetching submódulo upstream/origin..."
  [void](RunGit "fetch upstream" $subPath)
  [void](RunGit "fetch origin" $subPath)

  $beforeSubHead = RunGit "rev-parse HEAD" $subPath

  # 3.1) Si behind origin/main => FF a origin/main
  $abOrigin = GetAheadBehind $subPath "HEAD" "origin/main"
  if ($abOrigin.Right -gt 0 -and $abOrigin.Left -eq 0) {
    Info "Submódulo behind origin/main ($($abOrigin.Right)). FF desde origin..."
    [void](RunGit "merge --ff-only origin/main" $subPath)
    Ok "Submódulo actualizado a origin/main."
  } elseif ($abOrigin.Right -gt 0 -and $abOrigin.Left -gt 0) {
    Fail @"
Submódulo divergido vs origin/main (ahead $($abOrigin.Left), behind $($abOrigin.Right)).
Plan A: upstream manda, fork espejo. Resuelve con:
  git -C antigravity-awesome-skills reset --hard upstream/main
  git -C antigravity-awesome-skills push --force-with-lease origin main
"@
    exit 1
  }

  # 3.2) Sincronizar con upstream/main
  $abUpstream = GetAheadBehind $subPath "HEAD" "upstream/main"
  if ($abUpstream.Right -eq 0) {
    Ok "Submódulo ya estaba al día con upstream/main."
  } else {
    Info "Submódulo behind upstream/main ($($abUpstream.Right)). Intentando FF..."
    try {
      [void](RunGit "merge --ff-only upstream/main" $subPath)
      Ok "FF aplicado hacia upstream/main."
    } catch {
      Warn "No se pudo FF hacia upstream. Intentando merge normal..."
      try {
        [void](RunGit "merge upstream/main -m `"merge upstream/main into main`"" $subPath)
        Ok "Merge aplicado hacia upstream/main."
      } catch {
        $unmerged = GetUnmerged $subPath
        Fail "Merge falló (conflictos)."
        if ($unmerged) { Warn "Archivos en conflicto:`n$unmerged" }
        throw
      }
    }
  }

  $afterSubHead = RunGit "rev-parse HEAD" $subPath
  $subChanged = ($afterSubHead -ne $beforeSubHead)

  # 3.3) Push submódulo al fork (origin). Si non-ff => force-with-lease (fork espejo)
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

  # 4) Repo padre: si cambió el puntero del submódulo, commit + push
  $subPointerDiff = RunGit "diff --submodule=short -- antigravity-awesome-skills" $root
  $pointerChanged = -not [string]::IsNullOrWhiteSpace($subPointerDiff)

  if ($pointerChanged) {
    Info "Puntero del submódulo cambió en repo padre. Commit + push..."
    Write-Host $subPointerDiff
    [void](RunGit "add -- antigravity-awesome-skills" $root)
    [void](RunGit "commit -m `"chore: update submodule antigravity-awesome-skills`"" $root)
    Ok "Commit del puntero realizado."
  } else {
    Ok "Puntero del submódulo sin cambios en repo padre."
  }

  # 5) Push repo padre si hay commits nuevos locales
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
