---
name: Creador de Habilidades
description: Una habilidad diseñada para asistir en la creación y estructuración de nuevas habilidades en el entorno de Google Antigravity, siguiendo las mejores prácticas y estándares.
---

# Habilidad: Creador de Habilidades

Esta habilidad actúa como un asistente experto para el diseño, documentación e implementación de nuevas habilidades. Proporciona una estructura estandarizada y directrices claras para asegurar que todas las habilidades creadas sean consistentes, útiles y fáciles de mantener.

## Estructura de una Habilidad

Cada habilidad debe residir en su propia carpeta bajo un directorio de habilidades (ej. `skills/nombre_de_la_habilidad/`) y contener al menos:

1.  **SKILL.md** (Requerido): El archivo de instrucciones principal con frontmatter YAML.
2.  **scripts/** (Opcional): Scripts de ayuda y utilidades.
3.  **resources/** (Opcional): Archivos adicionales, plantillas o activos.
4.  **examples/** (Opcional): Implementaciones de referencia.

## Cómo Crear una Nueva Habilidad

1.  **Definir el Propósito**: Clarifica qué problema resuelve la habilidad y cuáles son sus capacidades principales.
2.  **Configurar la Carpeta**: Crea el directorio de la habilidad con un nombre descriptivo en minúsculas y usando guiones bajos (ej. `analizador_de_arquitectura`).
3.  **Escribir SKILL.md**: Utiliza la plantilla proporcionada en `resources/plantilla_skill.md`. Asegúrate de completar el frontmatter YAML y detallar las instrucciones.
4.  **Desarrollar Scripts y Recursos**: Si la habilidad requiere automatización o activos adicionales, añádelos en las carpetas correspondientes.
5.  **Validación**: Prueba la habilidad simulando una tarea y verificando que las instrucciones guíen al asistente de forma efectiva.

## Directrices de Escritura para SKILL.md

- **Claridad**: Usa un lenguaje directo y orientado a la acción.
- **Formato**: Emplea encabezados (H1, H2, H3) para organizar la información.
- **Concisión**: Mantén los puntos de la lista breves.
- **Ejemplos**: Incluye ejemplos de uso si la habilidad es compleja.

---
*Para empezar, puedes copiar la plantilla desde `resources/plantilla_skill.md`.*
