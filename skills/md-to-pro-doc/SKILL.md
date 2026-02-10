---
name: md-to-pro-doc
description: Advanced Markdown to professional DOCX converter. Automatically matches cover images, generates structured TOCs (H1-H3), applies centered page numbering starting from the TOC, and ensures high-end document formatting.
---

# Advanced MD to Professional DOCX

## Purpose
This skill is designed to produce final, client-ready documents from Markdown sources. It automates the inclusion of brand-specific covers and the generation of formatted indices.

## Features
- **Smart Cover Matching**: Matches MD files to cover images in `pro_covers` based on language (ES, EN, DE) and document type (Propuesta, ROI, Resumen, Plan, Anexo).
- **Professional TOC**:
    - "CONTENIDO" header centered and styled.
    - Includes H1, H2, and H3.
    - Custom page margins (1.5").
- **Dynamic Pagination**: Centered page numbers in the footer, starting on the TOC page.
- **Hierarchical Integrity**: Regenerates all header numbers to ensure consistency.

## Usage
```bash
python skills/md-to-pro-doc/scripts/convert_advanced.py --input <dir_or_file> --output <output_dir> --covers <covers_dir>
```

## Requirements
- `python-docx`
- `markdown`
- `beautifulsoup4`
