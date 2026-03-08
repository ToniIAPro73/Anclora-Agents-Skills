---
name: md-pro-browser-assembler
description: Orchestrates Markdown conversion to professional DOCX via browser automation and Google Docs. Combines HTML content, TOCs, and covers into a final polished document.
---

# MD Pro Browser Assembler

## Purpose
This skill serves as the final assembly layer. It takes the output of `md-to-html` and `md-toc-word-generator`, uses browser automation (Google Docs), and produces a professional `.docx` file with perfect layout and pagination.

## Workflow
1. **HTML Content**: Opens the generated HTML and copies the formatted content.
2. **Google Docs Integration**: Pastes the content into a new Google Doc.
3. **Asset Insertion**:
   - Inserts the corresponding cover from `pro_covers`.
   - Inserts the structured TOC from `pro_indices`.
4. **Professional Formatting**:
   - Sets centered page numbers at the footer.
   - Ensures the cover has no page number.
   - Sets the TOC as the start of pagination.
5. **Final Export**: Downloads the document as a `.docx` to the `entregables v1` folder.

## Usage
The skill is usually invoked by an orchestrator script:
```bash
python skills/md-pro-browser-assembler/scripts/assemble_docs.py --input <md_file>
```
