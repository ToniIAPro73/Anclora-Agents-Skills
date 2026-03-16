---
name: notebooklm-learning-auditor
description: Specialized skill to audit and transform NotebookLM notebooks into "Continuous Learning Platforms". It focuses on pruning outdated content, configuring a "Learning Mentor" persona, and setting up recursive learning tools like Quizzes and Flashcards.
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["learning-optimization", "persona-tailoring", "knowledge-scaffolding"]
---

# NotebookLM Learning Auditor Skill

This skill transforms traditional static notebooks into dynamic learning environments by applying structural audits, persona refinement, and knowledge retention strategies.

## Operational Flow

### Phase 1: Knowledge Mapping
1. **Source Discovery**: Identify all sources and their "Freshness" (prefer 2025-2026 content).
2. **Gap Analysis**: Identify missing core concepts needed for a "complete guide" (e.g., advanced ComfyUI nodes, latest SDXL updates).

### Phase 2: Structural Pruning
1. **Noise Reduction**: Delete sources that are too generic or redundant.
2. **Context Consolidation**: Identify "Golden Sources" (primary documentation) vs "Support Sources" (tutorials).

### Phase 3: Learning Persona Configuration
1. **Configure Chat**: Set the custom instruction to a "Learning Mentor" profile.
    - **Tone**: Socratic, encouraging, and technically precise.
    - **Method**: Break complex concepts into "Atomic Units". Always end responses with a "Knowledge Check" question.

### Phase 4: Retention Setup (NotebookLM Studio)
1. **Initialize Retention Tools**:
    - Create a **Study Guide** summarizing the entire notebook.
    - Generate a **Quiz** (Medium difficulty) to baseline the user's knowledge.
    - Creating **Flashcards** for key technical terms or workflows.

## Verification
- Run a "Learning Path" query: "What are the 3 essential milestones to master [Topic] using these sources?"
- Verify that the AI provides citations and structured learning steps.

## Principles
- **Signal over Volume**: A learning notebook is better with 15 expert sources than 100 random ones.
- **Interactivity**: Learning is active; the persona MUST challenge the user.
