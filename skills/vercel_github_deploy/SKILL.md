---
name: Vercel GitHub Deployer
description: Habilidad para automatizar el despliegue de proyectos de GitHub en Vercel, enfocándose en la rama principal (main/master).
---

# Habilidad: Vercel GitHub Deployer

Esta habilidad permite al asistente realizar despliegues rápidos y controlados de repositorios de GitHub en la plataforma Vercel. Está optimizada para trabajar con las ramas de producción y asegurar que el entorno esté correctamente configurado antes del despliegue.

## Capacidades

- Vinculación de proyectos locales con proyectos en Vercel.
- Despliegue de la rama actual en el entorno de producción (`--prod`).
- Detección automática de la rama principal (`main` o `master`).
- Verificación de la instalación y autenticación del CLI de Vercel.

## Instrucciones de Uso

1.  **Verificación del Entorno**: Comprobar si el Vercel CLI está instalado ejecutando `vercel --version`. Si no está instalado, solicitar permiso para instalarlo vía `npm install -g vercel`.
2.  **Autenticación**: Verificar el estado de la sesión con `vercel whoami`. Si no hay sesión activa, informar al usuario que debe autenticarse manualmente.
3.  **Vinculación del Proyecto**: Si el proyecto no está vinculado, ejecutar `vercel link`. Seguir los pasos para seleccionar la organización y el proyecto.
4.  **Identificación de Rama**: Comprobar el nombre de la rama principal ejecutando `git branch --show-current` o revisando las ramas remotas.
5.  **Despliegue a Producción**:
    - Asegurarse de estar en la rama `main` o `master`.
    - Ejecutar `vercel --prod` para realizar un despliegue de producción.
    - Capturar la URL de inspección y la URL final del despliegue para informar al usuario.

## Mejores Prácticas / Reglas

- **Confirmación antes de Desplegar**: Siempre pedir confirmación antes de ejecutar un despliegue en producción (`--prod`).
- **Variables de Entorno**: No intentar configurar variables de entorno críticas automáticamente a menos que se proporcionen explícitamente. Sugerir al usuario que las revise en el panel de Vercel.
- **Ruta del Proyecto**: Asegurarse de estar en el directorio raíz del proyecto antes de ejecutar comandos de Vercel.
- **Evitar Despliegues Fallidos**: Ejecutar `npm run build` o similar localmente antes del despliegue para verificar que no hay errores de compilación evitables.

## Recursos Relacionados

- Documentación oficial de Vercel CLI: [https://vercel.com/docs/cli](https://vercel.com/docs/cli)
- Repositorio de GitHub del CLI: [https://github.com/vercel/vercel](https://github.com/vercel/vercel)
