---
name: Creador de Páginas de Blog
description: Transforma borradores de blog (Markdown) en páginas web completas o secciones integrables con diseño premium, responsive y enfocado en la experiencia de usuario.
---

# Habilidad: Creador de Páginas de Blog

Esta habilidad es el paso final en la cadena de creación de contenido. Toma un script de blog estructurado y lo convierte en una pieza de software web (HTML/CSS) lista para ser visualizada o integrada en un sitio existente.

## Capacidades

- **Traducción de Contenido**: Convierte Markdown a HTML5 semántico.
- **Estilización Premium**: Aplica CSS moderno con enfoque en tipografía, espaciado y legibilidad.
- **Integración Visual**: Renderiza las imágenes generadas por IA y aplica efectos de diseño (overlays, sombras, elevación).
- **Responsive Design**: Asegura que el blog se vea impecable en móviles, tablets y desktops.

## Instrucciones de Uso

1.  **Lectura**: Identifica el archivo Markdown del blog a convertir.
2.  **Preparación**: Extrae los metadatos (título, descripción, palabras clave) y los prompts de imagen.
3.  **Generación de Estructura**: Utiliza la plantilla `resources/base_layout.html` como base.
4.  **Inyección de Contenido**: Transforma los encabezados, párrafos y listas del script en etiquetas HTML.
5.  **Personalización Estética**: Ajusta los colores y fuentes CSS para que coincidan con la identidad de marca descrita en el script (ej. Lujo Mediterráneo).
6.  **Salida**: Genera un archivo `.html` autónomo o un bloque de código para integración.

## Mejores Prácticas

- **Semántica**: Usa `<article>`, `<section>`, `<header>`, `<footer>` y `<aside>`.
- **Tipografía**: Emplea fuentes variables y escalas tipográficas fluidas.
- **Imágenes**: Usa `object-fit: cover` para visuales de ancho completo y asegura que tengan `alt text`.
- **Rendimiento**: Minimiza el uso de scripts externos y optimiza el CSS interno.

---
*Usa `resources/base_layout.html` para generar la página final.*
