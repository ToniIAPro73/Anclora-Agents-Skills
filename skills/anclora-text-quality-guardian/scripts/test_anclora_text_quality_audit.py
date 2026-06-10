#!/usr/bin/env python3
"""Tests for anclora_text_quality_audit.py."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

import anclora_text_quality_audit as audit


VALID_HTML = """<!doctype html>
<html lang="es">
<head>
  <title>Anclora SyncXML - Integracion documental | Anclora Group</title>
  <meta name="description" content="Anclora SyncXML ayuda a revisar integraciones documentales con supervision humana.">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication"}</script>
</head>
<body>
  <h1>Integracion documental para equipos tecnicos</h1>
  <p>Que es: una aplicacion de soporte para equipos que trabajan con documentos XML.</p>
  <section class="faq"><h2>Preguntas frecuentes</h2><p>La herramienta no sustituye una revision legal.</p></section>
</body>
</html>
"""


class TextQualityAuditTest(unittest.TestCase):
    def test_pass_for_complete_public_html(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "public").mkdir()
            (root / "public" / "index.html").write_text(VALID_HTML, encoding="utf-8")
            findings = audit.audit_repo(root)
            self.assertEqual(audit.result_for(findings, strict_warnings=False), "PASS")

    def test_warn_for_ai_ism(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "docs").mkdir()
            (root / "docs" / "copy.md").write_text("Una solucion integral para potenciar tu negocio.", encoding="utf-8")
            findings = audit.audit_repo(root)
            codes = {finding.code for finding in findings}
            self.assertIn("TEXT_AI_ISM", codes)
            self.assertEqual(audit.result_for(findings, strict_warnings=False), "PASS_WITH_WARNINGS")

    def test_fail_for_missing_public_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "public").mkdir()
            (root / "public" / "index.html").write_text("<html><body><p>Sin metadatos.</p></body></html>", encoding="utf-8")
            findings = audit.audit_repo(root)
            codes = {finding.code for finding in findings}
            self.assertIn("SEO_TITLE_MISSING", codes)
            self.assertIn("SEO_META_DESCRIPTION_MISSING", codes)
            self.assertEqual(audit.result_for(findings, strict_warnings=False), "FAIL")

    def test_fail_for_sensitive_claim(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "content").mkdir()
            (root / "content" / "landing.md").write_text("Ahorro asegurado y resultado garantizado.", encoding="utf-8")
            findings = audit.audit_repo(root)
            self.assertEqual(audit.result_for(findings, strict_warnings=False), "FAIL")

    def test_allows_jsonc_config_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / ".vscode").mkdir()
            (root / ".vscode" / "settings.json").write_text('{\n  // comment\n  "editor.formatOnSave": true,\n}\n', encoding="utf-8")
            findings = audit.audit_repo(root)
            codes = {finding.code for finding in findings}
            self.assertNotIn("JSON_INVALID", codes)

    def test_ignores_non_public_app_surfaces_for_aeo(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            component = root / "src" / "components"
            component.mkdir(parents=True)
            (component / "Button.tsx").write_text("export const Button = () => <button>Enviar</button>;", encoding="utf-8")
            findings = audit.audit_repo(root)
            codes = {finding.code for finding in findings}
            self.assertNotIn("AEO_FAQ_REVIEW", codes)


if __name__ == "__main__":
    unittest.main()
