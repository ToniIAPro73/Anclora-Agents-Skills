---
name: docx-premium-styler
description: Enhances Word documents with professional styling: auto-numbered headings (H1-H6), premium table designs, and optimized page layout (preventing split paragraphs).
---

# DOCX Premium Styler

## When to Use
- You want to turn a basic .docx into a premium-looking report.
- You need structured, numbered headings for professional readability.
- You have basic tables that need a "corporate" or "luxury" look.
- You want to ensure paragraphs don't split awkwardly across pages.

## Features
1. **Multilevel Heading Numbering**: Automatically adds numbering (1., 1.1., 1.1.1.) to Heading 1 through Heading 6.
2. **Premium Table Transformation**: Replaces markdown-style tables with a clean, shaded design with consistent borders.
3. **Artifact Cleanup**: Removes common markdown leftovers like `---`.
4. **Layout Optimization**: Ensures paragraphs use "Keep Lines Together" to avoid splitting across pages.
5. **Header Spacing**: Adds vertical breathing room between the document header and content.

## Usage
Run the script in `resources/premium_styler.py`:
```bash
python resources/premium_styler.py <input.docx> <output.docx>
```
