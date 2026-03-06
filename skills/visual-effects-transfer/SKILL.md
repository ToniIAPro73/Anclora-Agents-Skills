---
name: visual-effects-transfer
description: Unified skill to extract and apply premium visual effects from a source HTML to a destination HTML
---

# Visual Effects Transfer - Unified Skill

## Overview
This skill combines harvesting and application of premium visual effects from a source HTML file to a destination HTML file in a single, automated workflow.

## Purpose
Transfer complete visual effects including:
- Design tokens (colors, fonts, gradients)
- Glassmorphism effects
- Shadow and depth effects
- Hover states and transitions
- Pseudo-elements (::before, ::after)
- Animation keyframes

## Usage

### Prerequisites
- Node.js installed
- Playwright installed (`npm install -D playwright`)
- Source HTML file (reference design)
- Destination HTML file (target to enhance)

### Command
```bash
node scripts/transfer.js <source-html-path> <destination-html-path> [options]
```

### Options
- `--output <path>`: Custom output path (default: adds `_enhanced` suffix)
- `--report`: Generate detailed report of applied effects
- `--dry-run`: Preview changes without modifying files

### Example
```bash
# Basic usage
node scripts/transfer.js ./base_layout.html ./target.html

# With custom output
node scripts/transfer.js ./base_layout.html ./target.html --output ./target_premium.html

# Generate report
node scripts/transfer.js ./base_layout.html ./target.html --report
```

## How It Works

### Phase 1: Extraction (Harvesting)
1. **Parse source HTML** using Playwright
2. **Extract design tokens** from `:root` CSS variables
3. **Capture complete CSS rules** including:
   - Base styles
   - Hover states (`:hover`)
   - Active states (`:active`, `:focus`)
   - Pseudo-elements (`::before`, `::after`)
   - Media queries
   - Keyframe animations
4. **Identify patterns**:
   - Glassmorphism (backdrop-filter)
   - Gradients (linear-gradient, radial-gradient)
   - Shadows (box-shadow, drop-shadow, text-shadow)
   - Transitions and animations

### Phase 2: Application
1. **Inject design tokens** into destination `:root`
2. **Create utility classes** from extracted patterns
3. **Map elements** based on semantic similarity:
   - Headers → glassmorphism
   - Logos → shadow effects
   - Buttons → gradients + transitions
   - Cards → glassmorphism + shadows
4. **Preserve existing functionality**:
   - Keep all `data-*` attributes
   - Maintain JavaScript event handlers
   - Preserve structural classes

### Phase 3: Verification
1. **Validate HTML** structure integrity
2. **Check CSS** syntax
3. **Generate report** with applied changes

## Output

### Enhanced HTML File
- Original file with injected visual effects
- Preserved functionality and structure
- Added utility classes for premium effects

### Report (if --report flag used)
```markdown
# Visual Effects Transfer Report

## Design Tokens Injected
- Colors: 12 variables
- Typography: 4 font families
- Effects: 8 variables

## Utility Classes Created
- .effect-glass-card (glassmorphism)
- .effect-gold-gradient (premium button)
- .effect-logo-glow (animated shadow)
- .effect-transition-premium (smooth transitions)

## Elements Enhanced
- header.site-header → glassmorphism
- .logo img → shadow glow effect
- .data-card (6 instances) → glassmorphism
- .btn-primary → gold gradient

## Verification
✅ HTML structure valid
✅ CSS syntax valid
✅ No broken selectors
```

## Safety Features
- **Non-destructive**: Creates new file, never overwrites source
- **Validation**: Checks HTML/CSS syntax before saving
- **Rollback**: Original file always preserved
- **Conflict resolution**: Destination styles take precedence

## Advanced Features

### Custom Mapping
Create a `mapping.json` file to customize element mapping:
```json
{
  "mappings": [
    {
      "source": ".header-logo img",
      "destination": ".brand-logo",
      "effects": ["shadow-glow", "hover-scale"]
    }
  ]
}
```

### Selective Transfer
Use `--include` and `--exclude` flags:
```bash
# Only transfer glassmorphism effects
node scripts/transfer.js source.html dest.html --include glassmorphism

# Exclude animations
node scripts/transfer.js source.html dest.html --exclude animations
```

## Troubleshooting

### Issue: Effects not applied
**Solution**: Check that source file has embedded styles (not external CSS)

### Issue: Broken layout
**Solution**: Use `--dry-run` first to preview changes

### Issue: Missing hover effects
**Solution**: Ensure Playwright can render the page (check console for errors)

## Files Structure
```
visual-effects-transfer/
├── SKILL.md (this file)
├── scripts/
│   ├── transfer.js (main script)
│   ├── extractor.js (CSS extraction logic)
│   ├── applier.js (CSS application logic)
│   └── validator.js (HTML/CSS validation)
└── examples/
    ├── source_example.html
    └── destination_example.html
```

## Next Steps
1. Run the transfer script on your files
2. Review the generated report
3. Open enhanced file in browser to verify
4. Iterate if needed with custom mappings
