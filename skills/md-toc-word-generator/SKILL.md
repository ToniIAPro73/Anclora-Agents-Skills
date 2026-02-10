---
name: md-toc-word-generator
description: Generates a professionally formatted Table of Contents in Word format from a Markdown source. Interprets H1-H6 headers, ensures hierarchical numbering (creating or correcting it), and applies specific premium styling including centered headers and custom margins.
---

# MD TOC Word Generator

## Purpose
This skill extracts the structure of a Markdown document and creates a dedicated Word document containing its Table of Contents with premium formatting.

## Features
- **Markdown Parsing**: Identifies H1 through H6 headers.
- **Hierarchical Numbering**: Automatically generates or corrects header numbers (e.g., 1., 1.1., 1.1.1.) to ensure a coherent structure.
- **Premium Styling**:
    - Centered "CONTENIDO" title.
    - Specific vertical spacing (3 lines from top, 2 lines before TOC).
    - Custom side margins for the TOC.
    - No page numbers in the footer.
- **Batch Processing**: Can process multiple files in a directory.

## Usage
Run the script providing the input file or directory:

```bash
python skills/md-toc-word-generator/scripts/generate_md_toc.py --input <path_to_md_or_dir> --output_dir pro_indices
```

## Implementation Details
The script uses `python-docx` for document generation and a custom Markdown parser to maintain hierarchical integrity.
