---
name: docx-content-cleaner
description: Analyzes and cleans up markdown artifacts (like **bold**, *italic*, [links](url)) inside existing .docx files, converting them into proper Word formatting (runs with styles).
---

# DOCX Content Cleaner

## When to Use
- A .docx file contains literal markdown symbols (e.g., `**text**`, `### Header`).
- You need to "sanitize" or "beautify" a document generated from markdown that didn't parse formatting correctly.
- You want to ensure that all "pseudo-formatting" in text is converted to native Word styles.

## How it Works
1. **Extraction**: Uses `python-docx` to iterate through all paragraphs and runs.
2. **Analysis**: Uses regex to find markdown patterns inside the text of each run.
3. **Transformation**:
   - Splices runs to isolate the marked-up text.
   - Applies the corresponding Word formatting (Bold, Italic, Style) to the isolated text.
   - Removes the markdown symbols.
4. **Repack**: Saves the modernized .docx.

## Requirements
- Python with `python-docx` library.

## Usage
Run the provided script in `resources/markdown_to_docx_fixer.py`:
```bash
python resources/markdown_to_docx_fixer.py <input.docx> <output.docx>
```
