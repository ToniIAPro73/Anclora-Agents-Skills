---
name: docx-toc-analyzer
description: Intelligent Table of Contents (TOC) generator for Word documents. Analyzes document structure (styles, formatting, bold text, capitalization) to identify headers and inserts a dynamic TOC immediately after the cover page.
---

# DOCX TOC Analyzer

## When to Use
- You have a Word document (DOCX) that lacks a Table of Contents.
- The document might not use standard "Heading" styles, requiring a heuristic analysis of formatting to identify sections.
- You need the TOC placed precisely after the cover page.

## How it Works
1. **Heuristic Analysis**: Iterates through paragraphs to find potential headers using:
   - Existing Heading styles.
   - Bold text with larger font sizes.
   - All-caps paragraphs.
   - Short paragraphs followed by specific spacing.
2. **Style Normalization**: Converts identified headers to standard Word Heading styles (1-3) to ensure TOC compatibility.
3. **Cover Detection**: Locates the page break or section break following the cover page.
4. **TOC Injection**: 
   - Inserts a dedicated TOC page with a clear title.
   - Adds the `TOC` field code (`{ TOC \o "1-3" \h \z \u }`).
   - Configures the document to prompt for a TOC update upon opening.

## Requirements
- Python with `python-docx` library.

## Usage
```bash
python scripts/generate_toc.py <input.docx> <output.docx>
```
