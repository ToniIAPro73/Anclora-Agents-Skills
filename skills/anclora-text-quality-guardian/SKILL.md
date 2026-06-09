---
name: anclora-text-quality-guardian
description: Audit Anclora repositories, new apps, features, landing pages, locale files, documentation, prompts, marketing copy, metadata, schema.org, SEO, GEO and AEO readiness for text quality. Use when Codex, Claude Code, Gemini CLI or Hermes must proofread, humanize, localize, validate claims, or run the Anclora text quality gate before closing work.
---

# Anclora Text Quality Guardian

## Purpose

Use this skill to run the Anclora text quality gate across product copy, i18n, documentation and public positioning surfaces.

The canonical contracts live in the Boveda:

- `contracts/logic/ANCLORA_TEXT_QUALITY_CONTRACT.md`
- `contracts/logic/LOCALIZATION_CONTRACT.md`
- `contracts/logic/HERMES_COPY_CURATOR_CONTRACT.md`
- `contracts/core/ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT.md`

## Default Workflow

1. Identify changed files or scan the repo.
2. Classify surfaces: UI copy, locale files, docs, public landing, metadata, schema, prompts, legal/sensitive copy.
3. Run the deterministic audit script:

```bash
python skills/anclora-text-quality-guardian/scripts/anclora_text_quality_audit.py --repo .
```

4. For CI or stricter pre-release checks:

```bash
python skills/anclora-text-quality-guardian/scripts/anclora_text_quality_audit.py --repo . --strict-warnings
```

5. Review the report:
   - `PASS`: safe from this gate.
   - `PASS_WITH_WARNINGS`: acceptable only with documented human acknowledgement.
   - `FAIL`: do not close the task until corrected or explicitly approved.

## Gate Order

Always evaluate in this order:

1. Orthography and grammar.
2. Semantic consistency.
3. Humanization and removal of AI-isms.
4. i18n/localization and placeholders.
5. Claims, brand, disclaimers and sensitive domains.
6. SEO basics.
7. GEO clarity for LLM representation.
8. AEO readiness for direct answers and conversational search.

## Protected Content

Do not rewrite these automatically:

- Legal text, privacy, cookies, terms, contracts, disclaimers.
- Claims about savings, certification, compliance, real estate, energy, tax, employment or legal outcomes.
- Routes, env vars, JSON keys, placeholders, interpolation tokens and code identifiers.

Use `suggest` or ask for human review instead.

## References

Read `references/gate-checklist.md` when you need the detailed checklist or need to explain the PASS/WARN/FAIL criteria.
