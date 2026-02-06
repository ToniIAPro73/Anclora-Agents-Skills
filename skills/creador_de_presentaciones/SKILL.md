---
name: Creador de Presentaciones
description: Transforma entradas de blog en presentaciones visuales e impactantes para Google Slides con sugerencias de diseño y activos generados por IA.
---

# Habilidad: Creador de Presentaciones

Esta habilidad permite convertir contenido textual de blogs en estructuras de presentación dinámicas y visualmente atractivas. Se enfoca en la síntesis de información y la estética premium.

## Capacidades

- **Análisis de Contenido**: Identificación de pilares temáticos y mensajes clave de una entrada de blog.
- **Storyboarding**: Estructuración del contenido en una secuencia de slides (máximo 15).
- **Dirección de Arte**: Definición de paletas de colores y estilos visuales basados en el tono del blog.
- **Activos Visuales**: Generación de prompts para `generate_image` destinados a fondos y elementos visuales.

## Instrucciones de Uso

1.  **Ingesta**: Recibe la URL o el texto completo de la entrada de blog.
2.  **Destilación**: Resume el contenido en puntos clave por slide. Usa la plantilla `resources/guia_storyboard.md`.
3.  **Diseño Visual**: Para cada slide, propone un fondo visual impactante.
4.  **Generación**: Ejecuta la herramienta `generate_image` para los slides más importantes (Portada, Conceptos Clave, Cierre).
5.  **Entrega**: Proporciona el esquema completo para ser copiado a Google Slides.

## Mejores Prácticas

- **Regla del 10/20/30**: Idealmente 10 slides, no más de 20 minutos de presentación, fuente de al menos 30pt.
- **Contraste Alto**: Asegura que el texto sea legible sobre los fondos generados.
- **Consistencia**: Mantén el mismo estilo artístico en todas las imágenes de la presentación.

---
*Usa `resources/guia_storyboard.md` para organizar la salida.*
