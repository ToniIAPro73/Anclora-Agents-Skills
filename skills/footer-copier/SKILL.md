---
description: comprehensive skill to copy and adapt a footer from a reference HTML to a target HTML, including asset integration and verification.
---

# Footer Copier Skill

This skill extracts the footer from a reference HTML file and injects it into a target HTML file. It also handles the integration of new assets (logo and background image) to ensure the footer matches the desired branding and works correctly across different environments.

## Features

1.  **Footer Extraction**: Extracts the full HTML structure and associated styles of the `.premium-footer` element from the reference file.
2.  **Target Injection**: Inserts the extracted footer into the target HTML file, replacing any existing footer.
3.  **Asset Integration**:
    *   Replaces the footer logo with a provided image file (converted to Base64 for portability).
    *   Updates the footer background with a provided image file (converted to Base64).
4.  **Verification**: Checks that the footer and new assets are correctly present in the output file.

## Usage

Run the script using Node.js:

```bash
node scripts/copy_footer.js <reference_html> <target_html> <logo_path> <background_path> [--output <output_html>]
## 🚀 Usage

```bash
node scripts/copy_footer.js \
  "resources/reference.html" \
  "path/to/target.html" \
  "../../assets_anclora/logo-anclora-full-gold.svg" \
  "../../assets_anclora/footer_bg_dark.png" \
  "output_premium.html"
```

> [!IMPORTANT]
> The image paths provided as arguments are used to extract the **filenames**. The script then constructs the CDN URLs using these filenames. Ensure the files exist in the `assets_anclora` directory of the `Anclora-Agents-Skills` repository main branch.

## Example

```bash
node scripts/copy_footer.js resources/base_layout.html resources/target_page.html assets/logo.png assets/bg.png --output resources/target_page_updated.html
```

## 🛠️ Dependencies
*   `jsdom`: For robust HTML parsing and manipulation.
*   `fs`, `path`: Standard Node.js modules.
