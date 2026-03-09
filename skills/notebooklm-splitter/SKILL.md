---
name: notebooklm-splitter
description: Skill to audit a large NotebookLM notebook and split its sources into multiple specialized notebooks based on identified themes.
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["auditing", "content-extraction", "notebook-creation", "specialization"]
---

# NotebookLM Splitter Skill

This skill allows an agent to decompose a heterogeneous "mega-notebook" into a set of specialized, high-signal notebooks.

## Workflow

### 1. Source Inventory & Thematic Analysis
- Use `notebook_get` or browser to list all sources.
- Group sources by topic, format, or target audience.
- Define a "Taxonomy of Knowledge" for the notebook.

### 2. Specialized Blueprinting
- Propose a set of new notebooks. Each must have:
    - A clear, specific Title.
    - A defined Goal.
    - A list of sources to be moved/copied.

### 3. Execution (The Split)
- Create each specialized notebook using `notebook_create`.
- For each source in the group:
    - Extract text content via `source_get_content`.
    - Inject into the new notebook via `notebook_add_text`.
- *Optional*: Reference the original source URL if available via `notebook_add_url`.

### 4. Persona Tailoring
- For each new notebook, configure a custom persona (`configure_chat`) that focuses strictly on the specialized scope.

### 5. Final Audit
- Verfiy that the original notebook is now a "Master Index" or can be archived.
- Verify that each new notebook provides better retrieval quality than the original.

## Best Practices
- **Fragment Control**: Don't split too thin. Aim for 10-30 high-quality sources per specialized notebook.
- **Context Injection**: When adding text sources, include a header indicating the original source name and date.
- **Goal Alignment**: The persona must be the "Subject Matter Expert" for that specific split.
