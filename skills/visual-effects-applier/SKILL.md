# Artefacto 2: `visual-effects-applier/SKILL.md`

```markdown
---
name: visual-effects-applier  
description: Aplica PATRONES ESPECÍFICOS del harvester (logo-glow, card-glass) a HTML destino creando clases effect-*. Mapeo preciso sin romper layout.
---

# Visual Effects Applier v2.1 (Precision Mapping)

**UI Implementation Specialist para réplica exacta.** Toma `visual_effects_report.md` y aplica **5 patrones críticos** (logo-header-glow, card-glass-premium, etc.) a `anclora_data_lab.html` → `*_refined.html`.

## 🎯 Goals Críticos

1. **Token Merge Perfecto**: Fusionar sin sobrescribir variables destino.
2. **Clases effect-* Exactas**: Traducir cada patrón → `.effect-logo-header`, `.effect-card-glass`.
3. **Mapeo Inteligente**: Header logo → logo-glow, data-cards → card-glass.
4. **No Break Layout**: Nunca tocar `display`, `grid`, `margin`, `padding`.

---

## 🛠️ Workflow Preciso (5 Fases)

### **FASE 1: Parseo Reporte**
```

📄 Input: visual_effects_report.md
🎯 Extraer:

- 18 design tokens (--anclora-teal-primary, --glass, etc.)
- 5 PATRONES ESPECÍFICOS:
✓ LOGO-HEADER-GLOW → .effect-logo-header
✓ HEADER-GLASS → .effect-glass-header
✓ CARD-GLASS-PREMIUM → .effect-card-glass
✓ GOLD-GRADIENT-BTN → .effect-gold-gradient
✓ TRANSITION-PREMIUM → .effect-transition-premium

```

### **FASE 2: Token Injection Inteligente**
```

:root existente → MERGE con tokens del reporte:
IF var NO existe → AÑADIR
IF var existe = valor → OK
IF var existe ≠ valor → PRIORIZAR DESTINO + comentario

```

### **FASE 3: Generar Clases effect-* (ESPECÍFICAS)**

**Para cada patrón del reporte, crear EXACTAMENTE:**

```css
/* CRÍTICO: Logo Header Glow - Patrón #1 */
.effect-logo-header {
  filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));
  border: 1px solid transparent;
  border-radius: 12px; padding: 5px;
  transition: var(--transition-premium);
}
.effect-logo-header:hover {
  filter: brightness(1.3) drop-shadow(0 5px 15px rgba(212,175,55,0.4));
  border-color: var(--anclora-gold);
  box-shadow: 0 25px 50px rgba(0,0,0,0.5), 
              0 15px 35px rgba(212,175,55,0.25), 
              0 5px 15px rgba(212,175,55,0.15);
  transform: scale(1.05);
}

/* CRÍTICO: Cards Glass - Patrón #3 */
.effect-card-glass {
  background: var(--anclora-teal-bg);
  border: 1px solid var(--border-gold);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transition: var(--transition-premium);
}
.effect-card-glass:hover {
  background: rgba(44,62,80,0.6);
  border-color: var(--anclora-gold);
  box-shadow: 0 25px 50px rgba(0,0,0,0.4), 
              0 15px 40px rgba(212,175,55,0.25), 
              0 5px 20px rgba(212,175,55,0.15);
  transform: translateY(-10px);
}
```


### **FASE 4: Mapeo AUTOMÁTICO Específico**

```
🎯 ELEMENTOS DESTINO → CLASES effect-*
.header-logo img           → effect-logo-header
header.site-header         → effect-glass-header effect-transition-premium  
.data-card (6 elementos)   → effect-card-glass effect-transition-premium
.chart-container           → effect-card-glass effect-transition-premium
.btn-anclora-premium       → effect-gold-gradient effect-transition-premium
```

**Reglas de aplicación:**

```
1. AÑADIR clases al classList EXISTENTE (nunca reemplazar)
2. SI ya tiene backdrop-filter → ENRIQUECER con -webkit- prefix  
3. SI ya tiene transition → REUTILIZAR var(--transition-premium)
4. NUNCA tocar: textos, data-langes, href, IDs, estructura DOM
```


### **FASE 5: Triple Validación**

```
✅ TOKENS: Todas las vars(--anclora-*) definidas en :root
✅ CLASES: 5 effect-* generadas correctamente  
✅ MAPPING: Logo tiene effect-logo-header, 6 cards tienen effect-card-glass
✅ INTEGRIDAD: HTML parseable, sin CSS roto
✅ NO-BREAK: Layout/data-langes intactos
```


---

## 🔍 Mapeo Inteligente Automático

```
CONTEXTO: anclora_data_lab.html
┌─ header.site-header
│  └─ .header-logo img → effect-logo-header
├─ .data-grid  
│  ├─ 6x .data-card → effect-card-glass
│  └─ .chart-container → effect-card-glass  
└─ .btn-anclora-premium → effect-gold-gradient
```


---

## ⚠️ SAFETY CONSTRAINTS Rígidos

```
✅ SOLO añadir clases effect-* al classList
✅ NUNCA sobrescribir class="", id="", href=""
✅ NUNCA tocar data-langes/data-langen/data-langde  
✅ NUNCA eliminar/mover secciones DOM
✅ SI conflicto CSS → PRIORIZAR DESTINO
✅ SI patrón no encaja → NO APLICAR (mejor que romper)
```


## 🚀 CLI Ejemplo

```bash
node applier.js --report visual_effects_report.md --target anclora_data_lab.html --output anclora_data_lab_refined_v2.html
```


---

**Output esperad**: `anclora_data_lab_refined_v2.html` con **logo glow idéntico** y **6 cards glass perfectas**.

```

***