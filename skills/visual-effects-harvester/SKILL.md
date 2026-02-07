# Artefacto 1: `visual-effects-harvester/SKILL.md`

```markdown
---
name: visual-effects-harvester
description: Skill especializada en extraer design tokens y patrones visuales PRECISOS desde HTML/CSS origen local. Genera informe detallado para aplicación perfecta.
---

# Visual Effects Harvester v2.1 (Precision Mode)

**Visual Systems Engineer especializado en réplica exacta de efectos premium.** Analiza `base_layout_private_estates.html` y extrae **tokens + patrones específicos** (logo glow, card glassmorphism, header effects) en `visual_effects_report.md` para el applier.

## 🎯 Goals Críticos

1. **Token Extraction 100%**: Todas las CSS variables `--anclora-*` del `:root`.
2. **Pattern Detection Específico**: Logo header glow, cards glassmorphism, header glass, botones premium.
3. **CSS Snippets Literal**: Copia exacta de propiedades de efecto (sin layout).
4. **Vendor Prefixes**: `-webkit-backdrop-filter` cuando corresponda.

---

## 🛠️ Workflow Preciso (4 Fases)

### **FASE 1: Análisis Estructural**
```

📁 Input: base_layout_private_estates.html (6.1M chars)
🎯 Buscar:

- :root { --anclora-teal-*, --glass, --gold-gradient }
- header.site-header (glass + backdrop-filter)
- .header-logo img (drop-shadow + hover glow)
- .premium-card (glassmorphism + multicapa shadow)
- .btn-* (gold gradient + transition cubic-bezier)

```

### **FASE 2: Token Harvesting**
**Clasificar exactamente así:**
```

Colors:
├── --anclora-teal-primary: \#0B313F
├── --anclora-gold: \#D4AF37
├── --glass: rgba(11, 49, 63, 0.45)
└── --border-gold: rgba(212, 175, 55, 0.2)

Effects:
├── --gold-gradient: linear-gradient(135deg, \#BF953F 0%, ...)
└── --transition-premium: all 0.8s cubic-bezier(0.19, 1, 0.22, 1)

```

### **FASE 3: Patrones Específicos (CRÍTICOS)**

**MANDATORIO extraer estos 5 patrones exactos:**

```

1. LOGO-HEADER-GLOW
Type: logo-glow | Selector origen: .header-logo img
CSS:
filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));
border: 1px solid transparent; border-radius: 12px; padding: 5px;
:hover: filter: brightness(1.3) drop-shadow(...), box-shadow multicapa DORADO
2. HEADER-GLASS
Type: glassmorphism-header | Selector: header.site-header
CSS: background: rgba(11,49,63,0.15); backdrop-filter: blur(12px);
3. CARD-GLASS-PREMIUM
Type: glassmorphism-card | Selector: .premium-card
CSS: background: var(--anclora-teal-bg); border: 1px solid var(--border-gold);
backdrop-filter: blur(20px);
:hover: box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 15px 40px rgba(212,175,55,0.25)
4. GOLD-GRADIENT-BTN
Type: gradient-button | Selector: .btn-valuation
CSS: background: var(--gold-gradient);
5. TRANSITION-PREMIUM
Type: transition | Todos los elementos interactivos
CSS: transition: var(--transition-premium);
```

### **FASE 4: Reporte Estructurado**
```


# 🎨 VISUAL EFFECTS HARVESTER - INFORME EJECUCIÓN v2.1

## 📋 Design Tokens (18 variables)

### 1.1 Colors Premium

--anclora-teal-primary: \#0B313F ✓

## 🔍 PATRONES ESPECÍFICOS (5 críticos)

### 2.1 LOGO-HEADER-GLOW [logo-glow]

**CSS Snippet Exacto:**

```css
filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));
/* ... resto literal del origen ... */
```


## ✅ Validación Obligatoria

- [ ] Logo pattern detectado ✓
- [ ] 5 cards glass patterns detectados ✓
- [ ] Variables anclora-* (mínimo 18) ✓

```

---

## ⚠️ CONSTRAINTS Rígidos

```

✅ SI: Copiar CSS LITERAL del origen
✅ SI: Solo propiedades de EFECTO (filter, backdrop-filter, box-shadow, transition)
❌ NO: Modificar valores numéricos (blur(20px) ≠ blur(15px))
❌ NO: Añadir layout (margin, padding, display)
❌ NO: Inventar patrones que no existen en el origen
❌ NO: Truncar box-shadow multicapa

```

## 🚀 CLI Ejemplo
```bash
node harvester.js --source base_layout_private_estates.html --output visual_effects_report.md
```


---

**Output esperad**: `visual_effects_report.md` con **5 patrones específicos** listos para mapping perfecto en applier.

```

***

