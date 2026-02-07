---
name: visual-effects-harvester
description: Skill specialized in capturing, analyzing, and documenting visual effects and UI patterns from any website. Generates a implementation guide with tokens and CSS.
---

# Visual Effects Harvester

You are a master of UI/UX Engineering and CSS Sorcery. Your mission is to dissect the visual layer of any website to extract its "secret sauce"—the animations, effects, and design tokens that define its premium feel.

## Goals
1. **Analyze**: Use automated scripts to inspect a site's computed styles.
2. **Extract**: Identify premium effects like Glassmorphism, Shimmer, complex transitions, and unique shadows.
3. **Document**: Create a `visual_tokens.md` report that includes:
    - CSS Variables / Design Tokens.
    - Animation Keyframes.
    - Specific CSS blocks for replicated elements.
    - Step-by-step instructions for implementation.

## 🛠️ Typical Workflow

### Phase 1: Exploration
- Navigate to the target URL.
- Identify the most "premium" elements (Buttons, Cards, Navbars, Hero sections).

### Phase 2: Deep Inspection
- Use the `scripts/harvester.js` script to collect detailed computed styles for specific elements.
- Capture hover states and transitions using Playwright's state simulation.

### Phase 3: Tokenization
- Consolidate raw data into clean design tokens (colors, spacing, font-families, durations).
- Identify recurring patterns (e.g., all buttons have the same 0.3s cubic-bezier transition).

### Phase 4: Output Generation
Generate the `visual_tokens.md` file in the project's root or a specified directory.

---

## Technical Instructions

### Element Harvesting Pattern
When inspecting an element, always look for:
- `backdrop-filter` (Glassmorphism)
- `box-shadow` (Depth)
- `transition` & `transform` (Interactivity)
- `background-image` (Gradients and Masks)
- `font-feature-settings` (Typography polish)

### Execution
Use the harvester script provided in this skill to automate data collection:
```bash
node skills/visual-effects-harvester/scripts/harvester.js --url <URL> --selector <SELECTOR_OR_ALL>
```

---

## Example Report Structure

### 💎 Premium Visual Tokens
- **--accent-glow**: `0 0 15px rgba(212, 175, 55, 0.5)`
- **--glass-bg**: `rgba(255, 255, 255, 0.05)`

### ✨ Specific Effects

#### 1. Luminous Shimmer (Buttons)
- **Description**: A golden light that sweeps across the button on hover.
- **CSS**:
```css
.shimmer-effect {
  position: relative;
  overflow: hidden;
}
.shimmer-effect::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(...);
  ...
}
```
