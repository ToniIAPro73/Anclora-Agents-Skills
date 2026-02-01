# Vercel GitHub Deployer

Habilidad para automatizar el despliegue de proyectos de GitHub en Vercel.

## Cómo usar esta habilidad

1. Navega al repositorio del proyecto que deseas desplegar.
2. Asegúrate de estar en la rama principal (`main` o `master`).
3. Utiliza los pasos definidos en `SKILL.md` o ejecuta el script de automatización:
   ```powershell
   # Desde la raíz de tu proyecto
   path/to/Anclora-Agents-Skills/vercel_github_deploy/scripts/deploy.ps1
   ```

## Requisitos

- **Vercel CLI**: Instalado globalmente (`npm install -g vercel`).
- **Autenticación**: Debes haber ejecutado `vercel login` previamente.
- **Git**: El proyecto debe ser un repositorio Git inicializado.
