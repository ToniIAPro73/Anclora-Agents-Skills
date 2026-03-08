---
name: brand-asset-retrieval
description: "Professional retrieval of corporate brand assets from URLs. Use this skill to automatically identify and extract high-resolution logos, favicons, and primary brand colors from a website to ensure consistency in generated deliverables."
version: 1.0.0
author: Antonio Ballesteros
created: 2025-02-05
tags: [web-scraping, branding, assets, browser-automation]
---

# Brand-Asset-Retrieval

## Purpose
To streamline the gathering of official brand materials for professional documentation. This skill leverages browser automation to extract the most accurate and high-quality assets directly from a client's digital presence.

## Retrieval Strategy

### 1. Logo Discovery
- **Header Analysis**: The most reliable logo is usually inside `<header>` or the first `<a>` with a home link.
- **Alt-Text Filtering**: Search for `img` tags with `alt` containing "logo", name of the company, or "brand".
- **SVG Extraction**: Always prefer SVG files over PNG/JPG if available in the DOM for infinite scalability.

### 2. High-Resolution Reconstruction
For platforms like Wix, Squarespace, or Shopify, logos are often served through a CDN with dynamic resizing parameters.
- **Pattern**: `https://static.wixstatic.com/media/[ID]~mv2.png/v1/fill/w_84,h_105...`
- **Optimization**: Remove the `/v1/fill/...` suffix to access the original high-resolution master file.

### 3. Favicon as Fallback
If the main logo has a complex background, retrieve the favicon (often stored in the root as `/favicon.ico` or defined in meta tags) for use as a secondary brand marker or icon.

### 4. Color Palette Extraction
- **CSS Variable Analysis**: Inspect `:root` for variables like `--primary`, `--brand`, or `--accent`.
- **Dominant Image Color**: Calculate the dominant color of the logo to suggest text accents (e.g., gold tints).

## Verification Guidelines
- **Format**: Ensure the retrieved asset is compatible with PILLOW (PNG/JPG) or SVG-enabled tools.
- **Legality**: Always verify the asset is being used for the intended client deliverable to respect copyright.
