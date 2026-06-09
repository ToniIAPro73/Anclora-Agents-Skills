# Anclora Text Quality Gate Checklist

## Result Model

- `PASS`: no blocking findings and no warnings.
- `PASS_WITH_WARNINGS`: no blocking findings, but there are quality or completeness warnings.
- `FAIL`: one or more blocking findings exist.

## Blocking Findings

- Public HTML lacks `<title>`, `meta description` or `h1`.
- Structured data contradicts the product type.
- Legal or sensitive claims are changed without explicit approval.
- Placeholder/interpolation tokens are broken or removed.
- Copy claims certification, guaranteed results or official status without evidence.
- Locale files mix languages or leave required locales incomplete.

## Warning Findings

- AI-ish or generic copy appears in public copy.
- A public page has weak AEO structure: no FAQ, no direct answer, no "what is/for whom/what it does" block.
- SEO metadata is present but too generic.
- Images likely need alt text review.
- GEO entity clarity is weak or product boundaries are unclear.

## Recommended Skills To Combine

- `professional-proofreader`: final orthography and grammar pass.
- `avoid-ai-writing` or Hermes `humanizer`: humanization and AI-ism removal.
- `copy-editing`: marketing and conversion copy.
- `i18n-localization`: locale and translation workflow.
- `seo-aeo-content-quality-auditor`: SEO/AEO content review.
- `seo-aeo-schema-generator` and `schema-markup`: structured data review.
- `geo-fundamentals`: GEO review.

## Agent Rule

Prefer one shared CLI and one shared skill. Do not copy custom text-quality scripts into each Anclora app repo. Each app should only add a small `anclora.text-quality.yml` or `anclora.text-quality.json` when needed.
