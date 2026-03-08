---
name: notebooklm-jack-triad-auditor
description: A highly specialized skill designed to audit and optimize a NotebookLM workspace (specifically "Mastering AntiGravity and Gravity Claw AI Systems" by @Itssssss_Jack) to extract practical and technical value for NotebookLM, Antigravity, and Claude Code applications.
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["notebooklm-auditing", "content-filtering", "technical-optimization", "innovation-prompting"]
---

# NotebookLM Triad Auditor (Jack's AI Channel)

This skill provides a structured workflow for auditing and refining the NotebookLM notebook named **"Mastering AntiGravity and Gravity Claw AI Systems"** (which aggregates content from the YouTube channel `@Itssssss_Jack`). 

The primary goal is to transform the notebook into a strictly practical and technical knowledge base focused exclusively on **NotebookLM**, **Antigravity**, and **Claude Code**, specifically drawing from the last 3 months of content.

## 🎯 Core Objectives

1. **Tool Focus**: Strictly retain and highlight content regarding NotebookLM, Antigravity, and Claude Code.
2. **Time Horizon**: Filter out any content older than 3 months (Keep only content from **December 6, 2025** to the present date).
3. **Application & Practicality**: Ensure the notebook acts as a technical advisor to provide practical advice, application optimization tips, and innovative features.
4. **Noise Reduction**: Eliminate duplicate content, fluff, and any discussions about unrelated tools or redundant introductory material.

## 🛠️ Step-by-Step Execution Plan

### Step 1: Source Auditing & Pruning (Timeline & Topic Filter)
1. Use NotebookLM (or equivalent source management) to list all uploaded sources, transcripts, and notes within the notebook.
2. **Metadata Filtering (Time)**: Cross-reference publication or creation dates. Delete or archive any source that is older than 3 months (prior to December 6, 2025).
3. **Relevance Filtering (Topic)**: Scan sources for keywords: `NotebookLM`, `Antigravity`, `Claude Code`. If a video transcript focuses primarily on unrelated tools or general AI news without practical application to these three, remove it.
4. **Redundancy Elimination**: Identify overlapping transcripts (e.g., Jack reviewing the same feature twice in different videos). Keep only the most comprehensive and technical version.

### Step 2: Custom Instructions Configuration (System Prompting)
To ensure NotebookLM responds correctly, update the notebook's Custom Instructions (System Prompt) to the following:

> **System Instructions:**
> You are an elite Technical AI Architect specializing in NotebookLM, Antigravity, and Claude Code. Your knowledge base is strictly derived from Jack's (@Itssssss_Jack) videos from the last 3 months. 
> 
> *   **Role**: Provide highly practical, technical, and actionable advice.
> *   **Tone**: Professional, direct, and developer-focused. No fluff.
> *   **Tasks**: 
>     1. Answer technical queries about NotebookLM, Antigravity, and Claude Code.
>     2. Offer concrete, practical tips to refactor, debug, or improve existing or planned applications.
>     3. Propose innovative, cutting-edge ideas or features to include in the user's projects based on Jack's latest workflows.
> *   **Constraint**: If asked about an unrelated tool or old news, firmly redirect to the core triad and recent best practices. Never repeat identical advice if multiple sources cover the same topic; synthesize it.

### Step 3: Content Structuring & Synthesis (The "Practical Guide")
Create a set of "Pinned Notes" or a master guide inside the notebook to anchor the AI's generation capabilities. Extract and synthesize:
- **NotebookLM Best Practices**: Practical tips for source limitations, prompt optimization, and audio-overview hacks.
- **Antigravity Workflows**: Agentic coding patterns, tool usage paradigms, task_boundary configurations, and complex prompt execution.
- **Claude Code Integration**: CLI techniques, codebase refactoring strategies, and automated PR generation.
- **Innovation Sandbox**: A dedicated section of "crazy ideas" Jack has proposed that can be combined.

### Step 4: Verification Queries (Testing the Audit)
Run the following test queries against the notebook to ensure the audit was successful. If the notebook hallucinates or provides generic answers, refine the sources and instructions.
- *Test 1 (Technical)*: "How do I chain a Claude Code operation with an Antigravity task_boundary based on Jack's recent video?"
- *Test 2 (Audit)*: "Summarize everything about OpenAI's latest model from last year." (Expected output: Refusal / Redirect to the triad and recent timeline).
- *Test 3 (Innovation)*: "I am building a web scraper. Give me an innovative idea combining NotebookLM and Antigravity to improve this app."

## ⚠️ Safeguards
- Always perform a backup or duplicate the notebook before running the pruning step.
- Ensure transcripts accurately attribute the date; if a transcript lacks a date, ask the user to verify its recency before deletion.
