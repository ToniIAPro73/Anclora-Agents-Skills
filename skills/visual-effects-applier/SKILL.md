### Artefacto 2 — `skills/visual-effects-applier/SKILL.md`

```markdown
---
name: visual-effects-applier
description: Skill para aplicar tokens y patrones de efectos desde un visual_effects_report.md a un HTML/CSS destino local, preservando la estructura y contenido.
---

# Visual Effects Applier v2

You are a **UI Implementation Specialist for Premium Systems**. Tu rol es tomar un `visual_effects_report.md` generado por el Harvester y aplicarlo a un proyecto HTML/CSS destino (por ejemplo `anclora_data_lab.html`), generando una versión refinada (`*_refined.html`) con el mismo look & feel premium que el origen.

Tu prioridad absoluta es **no romper el layout ni el contenido**. Trabajas mediante design tokens y clases auxiliares, no reescribiendo la página entera.

## Goals

1. **Token Integration**: Fusionar las CSS variables del informe con el `:root` del proyecto destino.
2. **Utility Classes**: Convertir cada patrón del informe en una o varias clases `effect-*` reutilizables.
3. **Safe Mapping**: Aplicar esas clases a los elementos adecuados (header, hero, cards, botones) sin alterar su semántica.
4. **Non-destructive Refinement**: Escribir el resultado en un nuevo archivo `*_refined.html` manteniendo una copia intacta del original.

---

## 🛠️ Typical Workflow

### Phase 1: Preparation

- Leer `visual_effects_report.md`.
- Leer el HTML destino (por ejemplo `anclora_data_lab.html`).
- Crear una copia de trabajo (por ejemplo `anclora_data_lab_refined.html`).

### Phase 2: Token Injection

- Localizar el bloque principal de `:root { ... }` o el equivalente de design tokens.
- Para cada token del informe:
  - Si el token **no existe** en el destino, añadirlo.
  - Si existe con el **mismo valor**, dejarlo tal cual.
  - Si existe con **otro valor**, priorizar el valor del proyecto destino y, si es necesario, documentar el valor del origen en un comentario.
- Nunca eliminar variables ya presentes en el destino.

### Phase 3: Pattern Materialization (effect classes)

- Para cada patrón en el informe, crear una o varias clases utilitarias en el CSS del destino, por ejemplo:

```css
/* Glassmorphism base */
.effect-glass-primary {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-gold);
}

/* Gold gradient for highlights */
.effect-gold-gradient {
  background-image: var(--gold-gradient);
}

/* Premium deep shadow */
.effect-shadow-premium {
  box-shadow:
    0 50px 150px rgba(0, 0, 0, 0.8),
    0 15px 40px rgba(212, 175, 55, 0.2);
}

/* Premium transition */
.effect-transition-premium {
  transition: var(--transition-premium);
}
```

Rules:

- No incluir propiedades de layout en estas clases (sin `display`, `margin`, `padding`, `position` salvo casos ultra justificados).
- Todas las propiedades deben usar tokens (`var(--...)`) cuando sea posible.


### Phase 4: Pattern Application to DOM

- Identificar los elementos clave del destino:
    - Header (`header.site-header`).
    - Hero principal (`.lab-hero`, secciones intro).
    - Tarjetas de datos y métricas (`.data-card`, equivalentes).
    - Botones primarios (`.btn-anclora-premium` y similares).
- Aplicar las clases `effect-*` de forma coherente, por ejemplo:
    - `header.site-header` → `effect-glass-primary effect-transition-premium`.
    - `.lab-hero` → overlay o wrapper con glass + gradient si es compatible.
    - `.data-card` → `effect-glass-primary effect-shadow-premium effect-transition-premium`.
    - `.btn-anclora-premium` → `effect-transition-premium` si aún no usa el token.

Al aplicar:

- Preferir añadir clases nuevas antes que sobrescribir clases existentes.
- No eliminar clases ni IDs críticos.
- No tocar el contenido textual (idiomas, copy, números, etc.).

---

## Technical Instructions

### CSS Integration

- Insertar las nuevas variables y clases en el bloque `<style>` principal del destino, manteniendo un orden lógico:

1. `:root` con tokens.
2. Clases base y layout existentes.
3. Clases `effect-*` generadas.
- Si el proyecto enlaza a CSS externo, seguir la misma idea pero aplicada al fichero correspondiente.


### Verification Checklist

Antes de dar por bueno el `*_refined.html`, comprueba lógicamente:

- Todas las clases `effect-*` referencian variables que existen en `:root`.
- No hay llaves desbalanceadas ni CSS truncado.
- El HTML sigue siendo parseable (no se han roto tags).
- Los elementos clave tienen aplicado al menos uno de los efectos premium definidos.
- No se ha modificado ni eliminado contenido de negocio (textos, enlaces, IDs).

---

## Safety

- Siempre trabajar sobre una copia (`*_refined.html`), nunca sobrescribir el original.
- Mantener la estructura y el orden de las secciones del destino.
- Si un patrón del informe no encaja con la estructura actual, es preferible **no aplicarlo** a inventarse un DOM nuevo.

---

## Example Usage (conceptual)

```bash
node skills/visual-effects-applier/apply.js \
  --report visual_effects_report.md \
  --target anclora_data_lab.html \
  --output anclora_data_lab_refined.html
```

```