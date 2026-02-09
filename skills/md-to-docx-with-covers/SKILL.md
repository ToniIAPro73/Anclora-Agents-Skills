---
name: md-to-docx-with-covers
description: Converts Markdown files to professional Word documents (.docx), automatically prepending a branded cover page from a specified library and applying premium styles (headings, tables, etc.).
---

# Markdown to DOCX with Covers

## When to Use
- You have Markdown source files that need to be delivered as professional Word documents.
- You need to automate the inclusion of branded cover pages based on document type (Proposal, ROI, Summary, Annex) and language (ES, EN, DE).
- You want consistent formatting (Headings, Tables) across all generated documents.

## How it Works
1. **Source Parsing**: Reads Markdown content and parses it for styles, tables, and structures.
2. **Cover Mapping**: Selects the appropriate cover image from the `pro_covers` library based on keywords in the filename and content.
3. **DOCX Generation**: 
   - Inserts the cover image as a full-page background.
   - Converts Markdown headings (#, ##, etc.) to native Word styles (Heading 1, Heading 2, etc.).
   - Converts Markdown tables to native Word tables with professional shading.
   - Applies premium styling (justified text, page break management).
4. **Output**: Saves the finalized document in the target directory.

## Requirements
- Python with `python-docx` and `markdown` libraries.

## Usage
Run the generator script:
```bash
python scripts/md_to_docx_generator.py <input.md> <output.docx>
```
