# Informe de Análisis de Visibilidad, SEO y GEO: Triumph Rental Mallorca

Este documento detalla los resultados de una auditoría exhaustiva realizada sobre el sitio web `https://www.triumph-rental-mallorca.com/` utilizando múltiples metodologías especializadas.

---

## 1. Web Performance Optimization
**Objetivo:** Evaluar la velocidad de carga y estabilidad visual (Core Web Vitals).

### Hallazgos Diagnósticos
- **Plataforma Wix:** El sitio utiliza el framework de Wix, lo que introduce una carga significativa de JavaScript inicial. Esto impacta negativamente en el **Time to Interactive (TTI)**.
- **LCP (Largest Contentful Paint):** Se observa una demora en la carga de las imágenes principales del banner. Aunque Wix sirve formatos modernos (WebP/AVIF), la prioridad de carga no parece estar optimizada para el "above-the-fold".
- **CLS (Cumulative Layout Shift):** Existe un ligero desplazamiento visual durante la hidratación de los componentes de reserva y el menú.

### Recomendaciones Técnicas
- **Priorización de Carga:** Configurar las imágenes del hero como `fetchpriority="high"` y `loading="eager"`.
- **Optimización de Scripts:** Minimizar el uso de aplicaciones de terceros de la Wix App Market que no sean críticas para el negocio, ya que cada una añade latencia.

---

## 2. SEO Audit
**Objetivo:** Diagnosticar la rastreabilidad, indexación y salud técnica general.

### SEO Health Index (Estimado): 72/100 (Fair)
| Categoría | Puntuación | Peso | Contribución |
|-----------|------------|------|--------------|
| Crawlability & Indexation | 85 | 30 | 25.5 |
| Technical Foundations | 65 | 25 | 16.25 |
| On-Page Optimization | 70 | 20 | 14 |
| Content Quality & E-E-A-T | 75 | 15 | 11.25 |
| Authority & Trust | 50 | 10 | 5 |
| **Total** | | | **72** |

### Problemas Detectados
- **Indexación:** El sitemap es correcto y multilingüe, pero la versión en español (`es_es-sitemap.xml`) carece de suficiente autoridad interna para posicionar frente a competidores locales establecidos.
- **Estructura de Encabezados:** Uso de H2 para números de teléfono y ubicaciones genéricas en lugar de términos clave como "Alquiler de motos Triumph en Alcúdia".
- **Arquitectura:** Muchas páginas clave dependen de la navegación principal, la cual tiene fallos críticos en móvil.

---

## 3. SEO Meta Optimizer
**Objetivo:** Maximizar el Click-Through Rate (CTR) y la relevancia en SERP.

### Análisis de Meta-Tags Actuales
- **Título Actual:** `Triumph Rental Mallorca | Motorrad mieten | Mallorca, Spain`
- **Descripción Actual:** Muy centrada en el idioma alemán, lo que limita la relevancia para usuarios que buscan en español o inglés desde la isla.

### Propuesta de Optimización (Ejemplo para mercado ES)
- **Nuevo Título:** `Alquiler de Motos Triumph en Mallorca | Triumph Rental Mallorca ✓`
- **Nueva Descripción:** `Reserva tu Triumph en Mallorca. La mejor selección de motos premium en Alcúdia. ¡Vive la aventura sobre dos ruedas hoy mismo! Alquiler fácil y rápido. ★★★★★`
- **Técnica Aplicada:** Uso de caracteres especiales (✓, ★) y llamadas a la acción directas para aumentar la visibilidad visual.

---
*(Continuará con las secciones de Content Marketer, UI/UX y GEO AI)*

---

## 4. Content Marketer (Local SEO)
**Objetivo:** Evaluar la relevancia geográfica y estrategia de cercanía.

### Estrategia de Local SEO
- **Entidades Geográficas:** La web menciona "Alcudia Location" y "Mallorca, Spain", pero falta una mayor densidad de entidades locales (p.ej. proximidad al Puerto de Alcúdia, rutas recomendadas por la Sierra de Tramuntana).
- **Consistencia NAP (Name, Address, Phone):** Los datos son consistentes en la web, lo cual es excelente para Google Maps.
- **WhatsApp Marketing:** El botón de WhatsApp es una herramienta de conversión local muy potente que está bien implementada.

### Oportunidades
- **Contenido Específico de Ubicación:** Crear una sección de "Mejores rutas desde Alcúdia" para capturar búsquedas informativas locales.
- **Reseñas de Google:** Aunque hay un enlace a reseñas, integrarlas dinámicamente o añadir testimonios escritos en el cuerpo de la página reforzaría el E-E-A-T local.

---

## 5. UI/UX Pro Max
**Objetivo:** Calidad de interfaz y usabilidad móvil.

### Evaluación de Usabilidad
- **ERROR CRÍTICO (Móvil):** El menú de navegación no se contrae en dispositivos móviles. Los enlaces se desbordan horizontalmente, tapando contenido o siendo inaccesibles. Esto es un fallo de prioridad alta que afecta directamente a la tasa de rebote.
- **Contraste de Color:** El uso de negro y blanco (colores de Triumph) es elegante, pero algunas fuentes pequeñas en gris sobre la imagen de fondo tienen problemas de legibilidad.
- **Interacción:** Las tarjetas de las motocicletas son claras, pero el proceso de reserva redirige externamente o requiere mucho scroll.

### Recomendaciones de Diseño
- **Implementar Menú Hamburguesa:** Urgente para la versión móvil.
- **Jerarquía Visual:** Aplicar un "overlay" oscuro más fuerte a las imágenes de fondo para que el texto blanco destaque más (Accesibilidad WCAG).

---

## 6. GEO Fundamentals (AI Search)
**Objetivo:** Optimización para motores de respuesta de IA (ChatGPT, SearchGPT, Perplexity).

### Estado de Citabilidad
- **Estructura de Datos:** La implementación de `LocalBusiness` es un buen comienzo para ser citado por IAs que consumen datos estructurados.
- **Contenido Extraíble:** La falta de una sección de FAQ (Preguntas Frecuentes) dificulta que las IAs extraigan respuestas directas sobre precios, requisitos de licencia o políticas de cancelación.

### Mejoras para GEO
- **Creación de FAQ:** Añadir una sección de preguntas frecuentes con FAQ Schema.
- **Autoría:** Definir mejor quiénes son los expertos detrás del servicio (Expertise) para que la IA considere la fuente como autoritaria en el nicho de alquiler de motos.

---
