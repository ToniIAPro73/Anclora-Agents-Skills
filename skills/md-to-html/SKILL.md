---
name: md-to-html
description: Professional Markdown to HTML converter. Supports standard Markdown, tables, extensions, and applies a clean, modern CSS style for a premium look.
---

# Markdown to HTML Converter

## Purpose
This skill transforms Markdown documents into standalone, styled HTML files. It's designed to provide a clean, readable, and professional web representation of any Markdown content.

## Features
- **Accurate Parsing**: Uses the `markdown` Python library for robust conversion.
- **Premium Styling**: Automatically injects a modern, responsive CSS stylesheet (Inter font family, deep blue accents, elegant spacing).
- **Table Support**: Renders Markdown tables with professional styling.
- **Code Highlighting**: Basic styling for code blocks.
- **Standalone HTML**: Produces single-file outputs with embedded styles.

## Usage
Run the script providing the input file:

```bash
python skills/md-to-html/scripts/convert_md_to_html.py <input.md> [output.html]
```

## Requirements
- `markdown` (Python library)
