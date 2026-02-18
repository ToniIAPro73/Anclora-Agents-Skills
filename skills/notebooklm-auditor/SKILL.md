---
name: notebooklm-auditor
description: Audit and optimize NotebookLM notebooks based on specific requirements. Use this skill when you need to verify if a notebook (sources, instructions, organization) matches a desired purpose, improve its retrieval quality, or prune redundant/noisy information.
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["auditing", "optimization", "notebooklm", "iterative-refinement"]
---

# NotebookLM Auditor Skill

This skill enables the agent to audit, optimize, and iterate on NotebookLM notebooks to ensure they meet specific domain requirements and quality standards.

## Operational Flow

Follow this five-phase cycle for each iteration:

### Phase 1: Reconnaissance
1. **List Sources**: Use `notebooklm.notebook_get` or `source_list` to identify all current sources.
2. **Identify Purpose**: Read the notebook's personal instructions (via `notebook_get`) and discuss with the user to refine the intended goal.
3. **Load Profile**: Map the notebook to one of the profiles in `references/domain-profiles/`.

### Phase 2: Diagnosis
1. **Structural Analysis**: Verify source completeness, formats, and sizes.
2. **Redundancy Detection**: Identify sources with overlapping content (similarity > 0.85).
3. **Noise Identification**: Flag sources irrelevant to the declared purpose.
4. **Terminology Check**: Look for inconsistent naming or contradictions.
5. **Freshness Verify**: Ensure dated content is current.

### Phase 3: Planning
1. Generate a prioritized plan:
   - Remove redundant/noisy sources.
   - Consolidate fragmented information.
   - Add missing sources to cover gaps.
   - Reorganize based on the domain's retrieval pattern.
   - Update custom instructions (`configure_chat`).

### Phase 4: Execution with Checkpoint
1. **Create Checkpoint**: Record the current source list and a baseline query response.
2. **Execute Changes**: Apply the plan using tools like `source_delete`, `source_add`, and `configure_chat`.
3. **Validate Result**: If quality degrades, rollback by restoring the checkpoint state.

### Phase 5: Validation & Convergence
1. **Stress Test**: Run domain-specific queries to evaluate retrieval quality.
2. **Measure Metrics**: Calculate scores for Context Relevance, Coverage, and Faithfulness.
3. **Check Convergence**: Stop if metrics meet thresholds, max iterations (default 5) are reached, or plateau is detected.

## Domain Heuristics
- **Technical**: Focused on symptoms, troubleshooting, and procedural accuracy.
- **Business**: Focused on market insights, JTBD, and competitive differentiation.

## Principles & Limits
- **Pruning**: Less is often more. Prefer a clean, high-signal notebook over an exhaustive but noisy one.
- **Safety**: Never delete a source permanently without a checkpoint or user confirmation.
- **Tool Limits**: Be mindful of daily query limits in NotebookLM tiers.
