---
name: pro-image-optimizer
description: "Master-level optimization of professional images and document covers. Use this skill to apply high-fidelity visual effects (glows, shadows, contrast) that elevate a simple text-on-image composition to a premium deliverable."
version: 1.0.0
author: Antonio Ballesteros
created: 2025-02-05
tags: [image-processing, optimization, pillow, typography, visual-effects]
---

# Pro-Image-Optimizer

## Purpose
To apply the "final 10% of polish" that separates amateur designs from high-end corporate deliverables. This skill provides programmatic patterns for enhancing readability and visual prestige through advanced image processing.

## Visual Enhancement Patterns (PILLOW)

### 1. The "Soft Shadow" Text Anchor
Never place white text directly on a variable background. Apply a Gaussian-blurred shadow layer to anchor the text.
```python
from PIL import Image, ImageFilter
# Create a blurred shadow layer offset by (x+5, y+5)
shadow = Image.new('RGBA', txt_layer.size, (0,0,0,0))
shadow_draw = ImageDraw.Draw(shadow)
shadow_draw.text((pos_x+4, pos_y+4), text, font=font, fill=(0,0,0,180))
shadow = shadow.filter(ImageFilter.GaussianBlur(radius=5))
txt_layer = Image.alpha_composite(shadow, txt_layer)
```

### 2. Typographic Glow (Halo)
For extra "prestige", add a subtle outer glow with the brand's secondary color (e.g., gold) to the main title.
```python
glow = Image.new('RGBA', txt_layer.size, (0,0,0,0))
glow_draw = ImageDraw.Draw(glow)
# Draw text slightly thicker or multiple times with blur
glow_draw.text((pos_x, pos_y), title, font=font, fill=(212, 175, 55, 100))
glow = glow.filter(ImageFilter.GaussianBlur(radius=10))
```

### 3. Localized Contrast Mask
Instead of darkening the whole image, apply a vertical gradient mask to the bottom half (where the title usually lives) for a more professional "cinematic" look.
```python
mask = Image.new('L', img.size, 0)
for y in range(img.height):
    mask_draw.line((0, y, img.width, y), fill=int(255 * (y / img.height)))
# Use this mask to blend a darkened version of the image
```

### 4. High-Pass Sharpening
Apply a sharp edge filter to the logo and title text layers only, ensuring they look crisp regardless of the background resolution.

## Quality Standards
- **Readability**: Text must pass WCAG contrast standards even on busy backgrounds.
- **Color Harmony**: Optimization effects (glows/shadows) must use colors derived from the brand palette.
- **Subtlety**: Effects should feel "felt but not seen". If a shadow looks like a "drop shadow" from 1995, it's too aggressive.
