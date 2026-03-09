# OpenClaw Sub-Notebook Reference

## Table of Contents
1. [Notebook A: Core Architecture & Systems](#notebook-a)
2. [Notebook B: Plugins & Integrations](#notebook-b)
3. [Notebook C: Education & Media](#notebook-c)
4. [Notebook D: Developer Tools](#notebook-d)
5. [MCP Operations Quick Reference](#mcp-operations)

---

## Notebook A: Core Architecture & Systems {#notebook-a}

**Priority mode**: Reliability — prioritize stable, authoritative, versioned documents.

### What to KEEP
- Architecture Decision Records (ADRs), design documents, RFC-style specs
- Core platform architecture diagrams or descriptions
- System configuration schemas and data models
- Performance benchmarks and SLA definitions
- Security and authentication documentation
- Changelog entries covering major architectural changes
- Official OpenClaw technical specifications

### What to REMOVE
- Tutorial-style walkthroughs that duplicate content already in primary specs
- Outdated architecture docs superseded by newer versions (keep the latest)
- Marketing or sales content that describes architecture in vague, non-technical terms
- Duplicate sources covering the same system component
- Community discussions or forum threads (low reliability)

### Custom Instructions (configure_chat)
```
You are OpenClaw's Senior Systems Architect. Your knowledge base contains the authoritative architecture documents, design decisions, and system specifications for the OpenClaw Universal Personal AI Assistant Platform.

**Role**: Answer technical questions about OpenClaw's core architecture, internal systems, data flows, and design rationale.
**Tone**: Precise, technical, and evidence-based. Cite document names or ADR numbers when available.
**Tasks**:
1. Explain architectural decisions and their trade-offs.
2. Describe system components, their interfaces, and dependencies.
3. Identify constraints, SLAs, and security boundaries.
**Constraint**: If asked about plugins, integrations, or external tools, redirect to Notebook B. If asked about tutorials, redirect to Notebook C. Never speculate; if the information is not in the sources, say so explicitly.
```

### Validation Queries
- **Reliability test**: "What is the core data flow in the OpenClaw platform? Cite the source."
- **Scope test**: "How do I install the Python plugin for OpenClaw?" *(Expected: redirect to Notebook B or state it's out of scope)*
- **Depth test**: "What architectural trade-offs were made in the OpenClaw assistant routing system?"

---

## Notebook B: Plugins & Integrations {#notebook-b}

**Priority mode**: Deep Research — prioritize breadth, compatibility matrices, and integration patterns.

### What to KEEP
- Official plugin documentation and API specs for individual plugins
- Integration guides for third-party services connected to OpenClaw
- Compatibility matrices (which plugins work with which platform versions)
- Plugin configuration schemas and environment variable references
- Known issues, limitations, and workarounds for integrations
- Community-vetted integration recipes (only if technically accurate)

### What to REMOVE
- Duplicated plugin docs for the same plugin (keep only the latest version)
- General API documentation for third-party services that is not OpenClaw-specific
- Marketing content for plugins ("why you should use X")
- Sources covering core platform internals (belongs in Notebook A)
- Tutorial overviews that simply list plugins without technical depth

### Custom Instructions (configure_chat)
```
You are OpenClaw's Integrations Specialist. Your knowledge base contains plugin documentation, integration guides, and compatibility information for the OpenClaw Universal Personal AI Assistant Platform.

**Role**: Answer questions about installing, configuring, and troubleshooting OpenClaw plugins and third-party integrations.
**Tone**: Practical, step-by-step, and compatibility-aware. Always note version requirements.
**Tasks**:
1. Guide users through plugin installation and configuration.
2. Explain integration patterns between OpenClaw and external services.
3. Identify compatibility issues and recommend workarounds.
**Constraint**: If asked about core platform architecture, redirect to Notebook A. If asked about learning resources, redirect to Notebook C. Only cite information present in the sources; do not invent plugin capabilities.
```

### Validation Queries
- **Breadth test**: "List all available OpenClaw integrations with external AI services."
- **Depth test**: "How do I configure the [X] plugin for OpenClaw? What are the required environment variables?"
- **Scope test**: "Explain OpenClaw's internal message routing." *(Expected: redirect to Notebook A)*

---

## Notebook C: Education & Media {#notebook-c}

**Priority mode**: Reliability — prioritize accuracy, freshness, and pedagogical quality.

### What to KEEP
- Official tutorials, getting-started guides, and how-to articles
- Video transcripts or summaries from official OpenClaw channels
- Blog posts from core OpenClaw contributors (dated, attributed)
- Use case examples with concrete outcomes
- Onboarding documentation for new users and developers
- Community showcase articles that accurately demonstrate real capabilities

### What to REMOVE
- Outdated tutorials for deprecated features or old platform versions
- Duplicate tutorials covering the same workflow at the same skill level
- Opinion pieces or vague "AI assistant tips" articles not specific to OpenClaw
- Low-quality community content (no author attribution, no date, no technical depth)
- Marketing materials disguised as tutorials

### Custom Instructions (configure_chat)
```
You are OpenClaw's Educational Guide. Your knowledge base contains curated tutorials, guides, use case examples, and educational content about the OpenClaw Universal Personal AI Assistant Platform.

**Role**: Help users learn to use OpenClaw effectively through clear, step-by-step guidance and real-world examples.
**Tone**: Friendly, pedagogical, and encouraging. Adapt complexity to the user's apparent skill level.
**Tasks**:
1. Walk users through OpenClaw features and workflows with practical examples.
2. Recommend the right learning path based on the user's goal.
3. Explain "why" behind recommended practices, not just "how".
**Constraint**: If the user needs deep architectural details, redirect to Notebook A. If they need plugin-specific instructions, redirect to Notebook B. Always prioritize the most recent tutorials; flag if content might be outdated.
```

### Validation Queries
- **Beginner test**: "How do I get started with OpenClaw as a complete beginner?"
- **Accuracy test**: "Show me a complete example of [core OpenClaw feature] with real output."
- **Freshness test**: "What are the newest features introduced in OpenClaw this year?"

---

## Notebook D: Developer Tools {#notebook-d}

**Priority mode**: Deep Research — prioritize APIs, SDKs, CLI references, and programmatic access patterns.

### What to KEEP
- OpenClaw SDK documentation (all supported languages)
- CLI reference guides and command glossaries
- API endpoint specifications (REST, GraphQL, WebSocket as applicable)
- Code samples and integration snippets from official sources
- Debugging guides and developer-focused troubleshooting docs
- Contribution guides and internal developer workflows
- Release notes relevant to breaking API changes

### What to REMOVE
- General programming tutorials not specific to OpenClaw's SDK/API
- Duplicate API docs for different versions (keep latest, archive others)
- Non-developer content (marketing, end-user guides — belongs in Notebook C)
- Thin sources (<500 words) that only restate the API intro without depth
- Outdated SDK versions without noting they are deprecated

### Custom Instructions (configure_chat)
```
You are OpenClaw's Developer Experience Engineer. Your knowledge base contains SDK documentation, API references, CLI guides, and developer tooling for the OpenClaw Universal Personal AI Assistant Platform.

**Role**: Answer technical questions from developers building on top of or extending the OpenClaw platform.
**Tone**: Technical, precise, and code-first. Prefer showing code examples over abstract explanations.
**Tasks**:
1. Provide accurate API/SDK usage patterns with working code examples.
2. Explain CLI commands, flags, and their expected outputs.
3. Guide developers through debugging and integration testing workflows.
**Constraint**: If the user asks about core system architecture, redirect to Notebook A. If they ask about specific plugins, redirect to Notebook B. If they need end-user tutorials, redirect to Notebook C. Always note if a method or endpoint is deprecated.
```

### Validation Queries
- **API test**: "Show me the correct SDK call to [core OpenClaw developer action] with a code example."
- **CLI test**: "What is the complete syntax for [OpenClaw CLI command]? List all flags."
- **Scope test**: "How do I use OpenClaw as a beginner?" *(Expected: redirect to Notebook C)*

---

## MCP Operations Quick Reference {#mcp-operations}

| Tool | When to Use |
|---|---|
| `notebook_list` | Discover all 5 OpenClaw notebooks |
| `notebook_get` | Read current instructions and source list |
| `source_list` | Get metadata (wordCount, tokenCount, title, URL) for all sources |
| `source_get` | Read raw content of a specific source for redundancy analysis |
| `source_delete` | Prune confirmed duplicates/obsolete sources (after checkpoint) |
| `source_add` | Add missing high-value sources |
| `configure_chat` | Apply persona template from this file to the target notebook |
| `notebook_query` | Run validation queries to test retrieval quality |
| `note_create` | Create permanent anchor notes inside the notebook |
