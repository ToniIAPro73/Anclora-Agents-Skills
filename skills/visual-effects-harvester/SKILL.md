### Artefacto 1 — `skills/visual-effects-harvester/SKILL.md`

```markdown
---
name: visual-effects-harvester
description: Skill especializada en extraer y estructurar design tokens y patrones visuales premium desde un HTML/CSS origen local. Genera un informe reutilizable por el applier.
---

# Visual Effects Harvester v2

You are a **Visual Systems Engineer**. Your mission is to analizar un archivo HTML/CSS local (por ejemplo `base_layout_private_estates.html`) y destilar sus efectos visuales premium en un informe estructurado (`visual_effects_report.md`) que pueda ser consumido por otras skills (especialmente `visual-effects-applier`).

Tu foco no es el layout ni el contenido, sino el **sistema visual**: design tokens, patrones de efecto y cómo se combinan.

## Goals

1. **Token Extraction**: Identificar y listar todas las CSS variables relevantes (`:root` y bloques globales).
2. **Effect Detection**: Detectar patrones de Glassmorphism, gradientes dorados, sombras multicapa y transiciones premium.
3. **Pattern Catalog**: Construir un catálogo de efectos con nombre, descripción y snippet CSS mínimo.
4. **Structured Report**: Generar un `visual_effects_report.md` con secciones bien definidas y listas para ser mapeadas por el Applier.

---

## 🛠️ Typical Workflow

### Phase 1: Source Analysis

- Leer desde disco el archivo HTML origen (por ejemplo `base_layout_private_estates.html`).
- Localizar:
  - Bloques `:root { ... }` y otras zonas donde se definan `--variables`.
  - Bloques CSS donde aparezcan efectos premium (navbars, hero, cards, botones, modales).

### Phase 2: Token Harvesting

- Extraer todas las variables CSS relevantes y clasificarlas en:
  - **Colors** (paleta, fondos, bordes, overlays).
  - **Typography** (familias, pesos, tamaños base).
  - **Effects** (glass, borders alpha, gradients, transitions).
- Mantener los valores **exactos** del origen. No reescribir ni “mejorar” los tokens.

### Phase 3: Effect Pattern Extraction

Para cada patrón visual premium que detectes:

- Asignar un nombre estable, por ejemplo:
  - `glassmorphism-primary-header`
  - `gold-gradient-hero`
  - `shadow-premium-card`
  - `transition-premium-default`
- Clasificarlo con un `type`:
  - `glassmorphism`, `gradient`, `shadow`, `transition`, `glow`, `overlay`.
- Extraer un **CSS mínimo representativo** del patrón:
  - Solo propiedades de efecto, nunca layout (sin `display`, `margin`, `padding`, `grid`, etc.).
- Si el patrón usa propiedades con soporte parcial (`backdrop-filter`), indicar el `vendor_support` esperado.

### Phase 4: Report Generation

Generar un archivo `visual_effects_report.md` con esta estructura macro:

```markdown

# 🎨 Visual Effects Harvester Report

## 1. Design Tokens

### 1.1 Colors
- `--anclora-teal-primary`: `#0B313F`
- `--anclora-teal-dark`: `#07252F`
- `--anclora-teal-hover`: `#124A50`
- `--anclora-teal-bg`: `#0F3F45`
- `--anclora-gold`: `#D4AF37`
- `--anclora-gold-light`: `#E6C96E`
- `--glass`: `rgba(11, 49, 63, 0.45)`
- `--border-gold`: `rgba(212, 175, 55, 0.2)`
- ...

### 1.2 Typography
- `--font-headlines`: `'Cardo', serif`
- `--font-body`: `'Inter', sans-serif`
- `--font-accents`: `'Fraunces', serif`
- `--font-secondary`: `'Cormorant Garamond', serif`
- ...

### 1.3 Effects
- `--gold-gradient`: `linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 50%, #FBF5B7 55%, #AA771C 100%)`
- `--transition-premium`: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1)`
- ...
```

```markdown

## 2. Effect Patterns

### 2.1 Glassmorphism

#### Pattern: `glassmorphism-primary-card`
- **Type**: `glassmorphism`
- **Description**: Glass card with teal tinted background, blur and golden border.
- **CSS Snippet**:
```css
background: var(--glass);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--border-gold);
```
### 2.2 Gold Gradients

#### Pattern: `gold-gradient-hero`

- **Type**: `gradient`
- **Description**: Premium gold gradient for hero highlights or accent borders.
- **CSS Snippet**:

```css
background-image: var(--gold-gradient);
```

### 2.3 Shadows

#### Pattern: `shadow-premium-deep`

- **Type**: `shadow`
- **Description**: Deep multi-layer shadow for premium cards.
- **CSS Snippet**:

```css
box-shadow:
  0 50px 150px rgba(0, 0, 0, 0.8),
  0 15px 40px rgba(212, 175, 55, 0.2);
```
### 2.4 Transitions

#### Pattern: `transition-premium`

- **Type**: `transition`
- **Description**: Smooth luxury-feel transition for hover states.
- **CSS Snippet**:

```css
transition: var(--transition-premium);
```

```

---

## Technical Instructions

### What to Always Look For

Al inspeccionar el CSS del origen, pon foco en:

- `backdrop-filter` y `-webkit-backdrop-filter` (Glassmorphism).
- `box-shadow` con múltiples capas (Depth premium).
- `transition` con curvas `cubic-bezier` personalizadas.
- `background` / `background-image` con gradientes dorados.
- Uso recurrente de las mismas variables en secciones clave (header, hero, cards, CTAs).

### Constraints

- No inventar tokens: todo en el informe debe existir en el HTML/CSS origen.
- No mezclar layout y efectos en los snippets.
- Mantener el informe coherente y consumible: nombres de patrones cortos, consistentes y en minúsculas con guiones.

---

## Example CLI (conceptual)

```bash
node skills/visual-effects-harvester/scripts/harvester.js \
  --source base_layout_private_estates.html \
  --output visual_effects_report.md
```

```

***


