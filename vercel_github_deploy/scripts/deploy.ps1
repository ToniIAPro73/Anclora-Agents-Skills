# Script de despliegue para Vercel (Producción)
# Uso: .\deploy.ps1 [-ProjectName "mi-proyecto"]

param (
    [string]$ProjectName
)

Write-Host "--- Iniciando proceso de despliegue en Vercel ---" -ForegroundColor Cyan

# 1. Comprobar Vercel CLI
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Error "Vercel CLI no está instalado. Ejecute 'npm install -g vercel' e intente de nuevo."
    exit 1
}

# 2. Comprobar Autenticación
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "No has iniciado sesión en Vercel. Ejecute 'vercel login' primero."
    exit 1
}
Write-Host "Sesión activa como: $whoami"

# 3. Comprobar Rama
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -notmatch "main|master") {
    Write-Warning "AVISO: No estás en la rama 'main' o 'master'. Estás en: $branch"
} else {
    Write-Host "Rama de producción detectada: $branch" -ForegroundColor Green
}

# 4. Desplegar
Write-Host "Ejecutando despliegue de producción..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "¡Despliegue finalizado con éxito!" -ForegroundColor Green
} else {
    Write-Host "Error durante el despliegue." -ForegroundColor Red
    exit 1
}
