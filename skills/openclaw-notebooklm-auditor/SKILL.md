---
name: openclaw-notebooklm-auditor
description: >
  Specialized skill to audit, optimize, and maintain the NotebookLM workspace for "OpenClaw: The Universal Personal AI Assistant Platform".
  Use this skill when you need to: (1) audit or clean sources in the main OpenClaw notebook or any of its 4 sub-notebooks,
  (2) remove duplicate, obsolete, or low-value sources from any OpenClaw NotebookLM notebook,
  (3) configure or update the AI persona/instructions for any OpenClaw sub-notebook,
  (4) validate the retrieval quality of OpenClaw knowledge bases,
  (5) do any deep research, pruning, or restructuring task related to the OpenClaw NotebookLM workspace.
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["notebooklm-auditing", "openclaw", "content-pruning", "persona-configuration", "deep-research"]
---

# OpenClaw NotebookLM Auditor

This skill provides a structured workflow for auditing and refining the **"OpenClaw: The Universal Personal AI Assistant Platform"** NotebookLM workspace.

OpenClaw is a Universal Personal AI Assistant Platform. Its NotebookLM workspace is organized into a **main notebook** (master index) and **4 specialized sub-notebooks** covering distinct functional areas. The goal of this skill is to ensure each notebook is a high-signal, low-noise knowledge base that functions as a specialized expert on its domain.

## Notebook Map

| Notebook | Focus | Priority Mode |
|---|---|---|
| **Main** | "OpenClaw: The Universal Personal AI Assistant Platform" — Master Index | Reference only |
| **Notebook A** | Core Architecture & Systems | Reliability (stable docs, specs, ADRs) |
| **Notebook B** | Plugins & Integrations | Deep Research (breadth, compatibility) |
| **Notebook C** | Education & Media | Reliability (accuracy, freshness) |
| **Notebook D** | Developer Tools | Deep Research (APIs, SDKs, CLI tools) |

For detailed sub-notebook personas, source criteria, and test queries, see [references/sub-notebooks.md](references/sub-notebooks.md).

---

## Operational Workflow

### Phase 1: Reconnaissance

1. Use `notebook_list` to confirm all 5 notebooks are present (Main + A, B, C, D).
2. For the **target notebook(s)**, call `source_list` to get all sources with metadata (wordCount, tokenCount, title, URL).
3. Read the current `configure_chat` instructions via `notebook_get` to understand the existing persona.
4. Ask the user which notebook(s) to audit if not specified (default: all 4 sub-notebooks).

### Phase 2: Diagnosis — Pruning Criteria

Apply these criteria to every source. Flag sources that meet one or more:

| Category | Criterion | Action |
|---|---|---|
| **Duplicate** | Same content from multiple URLs or near-identical wordCount + title | Delete all but the most complete version |
| **Obsolete** | Content dated >12 months unless it is a foundational spec/ADR | Flag for user confirmation before delete |
| **Off-topic** | Content not related to the notebook's declared scope (see Notebook Map) | Delete |
| **Low-value** | Thin content (<500 words), marketing fluff, or pure promotional pages | Delete |
| **Redundant** | A summary article that is already covered in full by a primary source | Delete the summary, keep the primary |

**Threshold**: If content overlap > 80% between two sources, keep only the most complete/authoritative one.

### Phase 3: Planning

Generate a prioritized action list before executing any changes:

1. List sources to **DELETE** with reason.
2. List sources to **ADD** to fill identified gaps.
3. List changes to **configure_chat** (persona update).
4. List **notes to create** as permanent anchors inside the notebook.

Present the plan to the user and get confirmation before Phase 4.

### Phase 4: Execution with Checkpoint

1. **Checkpoint**: Record the full source list and a baseline query response (`notebook_query`) before any changes.
2. Apply deletions via `source_delete` (confirmed sources only).
3. Apply additions via `source_add` or `notebook_add_url` / `notebook_add_text`.
4. Update persona via `configure_chat` using the target template from [references/sub-notebooks.md](references/sub-notebooks.md).
5. Create anchor notes via `note_create` if needed.
6. If quality degrades, restore from checkpoint.

### Phase 5: Validation

Run the validation queries from [references/sub-notebooks.md](references/sub-notebooks.md) for the target notebook. Evaluate:

- **Context Relevance**: Does the answer use only on-topic sources?
- **Coverage**: Does the answer reference diverse sources (not just 1-2)?
- **Faithfulness**: Are claims traceable to actual source content?
- **Anti-hallucination**: Does the notebook refuse off-topic queries correctly?

Stop when all 3 test queries return high-quality, on-topic answers.

---

## Global Principles

- **Less is more**: A notebook with 15 excellent sources outperforms one with 50 mediocre ones.
- **Scope discipline**: Each sub-notebook must refuse to answer questions outside its declared scope.
- **Never delete without checkpoint**: Always capture state before destructive operations.
- **User confirmation required** for: deleting sources older than 12 months, deleting >5 sources at once, or any source the user marked as important.
