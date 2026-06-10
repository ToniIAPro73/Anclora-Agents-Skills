#!/usr/bin/env python3
"""Deterministic Anclora text quality, SEO, GEO and AEO audit."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable


SKIP_DIRS = {
    ".git",
    ".next",
    ".nuxt",
    ".venv",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "__pycache__",
}

TEXT_EXTENSIONS = {
    ".md",
    ".mdx",
    ".html",
    ".htm",
    ".tsx",
    ".jsx",
    ".ts",
    ".js",
    ".json",
    ".yml",
    ".yaml",
    ".txt",
}

PUBLIC_HINTS = (
    "pages/",
    "public/",
    "content/",
    "landing",
    "blog",
    "seo",
)

AI_ISMS = (
    "revolucionario",
    "lider indiscutible",
    "solucion integral",
    "sin precedentes",
    "vanguardia",
    "transforma por completo",
    "potencia tu negocio",
    "en el panorama actual",
    "en el mundo actual",
)

SENSITIVE_CLAIMS = (
    "garantizado",
    "garantiza",
    "certificado oficial",
    "cumplimiento total",
    "100% legal",
    "ahorro asegurado",
    "resultado garantizado",
    "marca registrada",
)

COMMON_SPANISH_ACCENT_ISSUES = (
    ("Automatizacion", "Automatizacion without accent"),
    ("Cognitiva y Agentes Autonomos", "Autonomos without accent"),
    ("analisis", "analisis without accent"),
    ("proteccion", "proteccion without accent"),
    ("publicacion", "publicacion without accent"),
)

PLACEHOLDER_PATTERN = re.compile(r"(\{\{[^}]+\}\}|\{[A-Za-z0-9_.-]+\}|%s|%\([^)]+\)s|\$[A-Za-z_][A-Za-z0-9_]*)")


@dataclass
class Finding:
    severity: str
    code: str
    path: str
    message: str
    line: int | None = None


def read_text(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        try:
            return path.read_text(encoding="latin-1")
        except UnicodeDecodeError:
            return None


def iter_files(repo: Path) -> Iterable[Path]:
    for path in repo.rglob("*"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.is_file() and path.suffix.lower() in TEXT_EXTENSIONS:
            yield path


def relpath(path: Path, repo: Path) -> str:
    return path.relative_to(repo).as_posix()


def line_for(text: str, needle: str) -> int | None:
    index = text.lower().find(needle.lower())
    if index < 0:
        return None
    return text[:index].count("\n") + 1


def is_public_surface(relative: str, text: str) -> bool:
    lowered = relative.lower()
    if lowered.endswith((".html", ".htm")) and "<html" in text.lower():
        return True
    if any(hint in lowered for hint in PUBLIC_HINTS):
        return True
    if "/api/" in lowered or "/(auth)/" in lowered or "/dashboard/" in lowered or "components/" in lowered:
        return False
    return "app/" in lowered and "(marketing)" in lowered and lowered.endswith(("page.tsx", "layout.tsx"))


def audit_html(path: str, text: str) -> list[Finding]:
    findings: list[Finding] = []
    lowered = text.lower()
    if not path.lower().endswith((".html", ".htm")) or "<html" not in lowered:
        return findings
    if "<title" not in lowered:
        findings.append(Finding("high", "SEO_TITLE_MISSING", path, "Public HTML is missing <title>."))
    if "name=\"description\"" not in lowered and "name='description'" not in lowered:
        findings.append(Finding("high", "SEO_META_DESCRIPTION_MISSING", path, "Public HTML is missing meta description."))
    if "<h1" not in lowered:
        findings.append(Finding("high", "SEO_H1_MISSING", path, "Public HTML is missing an H1."))
    if "schema.org" not in lowered and "application/ld+json" not in lowered:
        findings.append(Finding("medium", "GEO_SCHEMA_MISSING", path, "Public HTML has no visible schema.org structured data."))
    if "<img" in lowered and "alt=" not in lowered:
        findings.append(Finding("medium", "SEO_ALT_REVIEW", path, "Images are present; review alt text coverage."))
    return findings


def audit_next_metadata(path: str, text: str) -> list[Finding]:
    findings: list[Finding] = []
    lowered_path = path.lower()
    lowered = text.lower()
    if not (lowered_path.endswith("layout.tsx") or lowered_path.endswith("page.tsx") or "metadata" in lowered_path):
        return findings
    if "export const metadata" in lowered or "generateMetadata" in text:
        if "title" not in lowered:
            findings.append(Finding("high", "SEO_TITLE_MISSING", path, "Metadata export appears to lack title."))
        if "description" not in lowered:
            findings.append(Finding("high", "SEO_META_DESCRIPTION_MISSING", path, "Metadata export appears to lack description."))
    return findings


def audit_copy(path: str, text: str, public: bool) -> list[Finding]:
    findings: list[Finding] = []
    lowered = text.lower()

    for phrase in AI_ISMS:
        if phrase in lowered:
            findings.append(
                Finding(
                    "medium",
                    "TEXT_AI_ISM",
                    path,
                    f"Potential AI-ish or generic phrase: '{phrase}'.",
                    line_for(text, phrase),
                )
            )

    for phrase in SENSITIVE_CLAIMS:
        if phrase in lowered:
            findings.append(
                Finding(
                    "critical",
                    "CLAIM_REVIEW_REQUIRED",
                    path,
                    f"Sensitive claim requires human review: '{phrase}'.",
                    line_for(text, phrase),
                )
            )

    for raw, message in COMMON_SPANISH_ACCENT_ISSUES:
        if raw in text:
            findings.append(Finding("medium", "TEXT_ACCENT_REVIEW", path, message, line_for(text, raw)))

    if public:
        has_faq = "faq" in lowered or "preguntas frecuentes" in lowered or "frequently asked" in lowered
        has_direct_answer = any(token in lowered for token in ("que es", "qué es", "para quien", "para quién", "what is", "who is it for"))
        if not has_faq:
            findings.append(Finding("medium", "AEO_FAQ_REVIEW", path, "Public surface has no obvious FAQ block."))
        if not has_direct_answer:
            findings.append(Finding("medium", "GEO_AEO_DIRECT_ANSWER_REVIEW", path, "Public surface has no obvious direct-answer block."))

    return findings


def audit_json(path: str, text: str) -> list[Finding]:
    findings: list[Finding] = []
    if not path.endswith(".json"):
        return findings
    if is_jsonc_config(path):
        return findings
    try:
        json.loads(strip_json_comments(text))
    except json.JSONDecodeError as exc:
        findings.append(Finding("critical", "JSON_INVALID", path, f"Invalid JSON: {exc.msg}.", exc.lineno))
    return findings


def is_jsonc_config(path: str) -> bool:
    lowered = path.lower()
    return lowered.startswith(".vscode/") or lowered in {"tsconfig.json", "tsconfig.node.json"}


def strip_json_comments(text: str) -> str:
    """Allow common JSONC config files without weakening real JSON validation."""
    without_block_comments = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    without_line_comments = re.sub(r"(^|\s)//.*$", r"\1", without_block_comments, flags=re.M)
    return re.sub(r",(\s*[}\]])", r"\1", without_line_comments)


def audit_repo(repo: Path) -> list[Finding]:
    findings: list[Finding] = []
    for file_path in iter_files(repo):
        text = read_text(file_path)
        if text is None:
            continue
        relative = relpath(file_path, repo)
        public = is_public_surface(relative, text)
        findings.extend(audit_json(relative, text))
        findings.extend(audit_html(relative, text))
        findings.extend(audit_next_metadata(relative, text))
        findings.extend(audit_copy(relative, text, public))
    return findings


def result_for(findings: list[Finding], strict_warnings: bool) -> str:
    blocking = {"high", "critical"}
    if strict_warnings:
        blocking.add("medium")
    if any(f.severity in blocking for f in findings):
        return "FAIL"
    if findings:
        return "PASS_WITH_WARNINGS"
    return "PASS"


def print_text_report(result: str, findings: list[Finding]) -> None:
    print(f"Result: {result}")
    if not findings:
        print("No findings.")
        return
    for finding in findings:
        location = finding.path if finding.line is None else f"{finding.path}:{finding.line}"
        print(f"[{finding.severity.upper()}] {finding.code} {location} - {finding.message}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Audit Anclora text quality, SEO, GEO and AEO readiness.")
    parser.add_argument("--repo", default=".", help="Repository or folder to audit.")
    parser.add_argument("--strict-warnings", action="store_true", help="Treat medium warnings as failures.")
    parser.add_argument("--json", action="store_true", help="Output JSON report.")
    args = parser.parse_args(argv)

    repo = Path(args.repo).resolve()
    if not repo.exists():
        print(f"Repository path does not exist: {repo}", file=sys.stderr)
        return 2

    findings = audit_repo(repo)
    result = result_for(findings, args.strict_warnings)

    if args.json:
        print(json.dumps({"result": result, "findings": [asdict(f) for f in findings]}, ensure_ascii=False, indent=2))
    else:
        print_text_report(result, findings)

    return 1 if result == "FAIL" else 0


if __name__ == "__main__":
    raise SystemExit(main())
