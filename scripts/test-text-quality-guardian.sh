#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_DIR="$ROOT_DIR/skills/anclora-text-quality-guardian"

PYTHONPATH="$SKILL_DIR/scripts" python3 -m unittest "$SKILL_DIR/scripts/test_anclora_text_quality_audit.py"
python3 "$SKILL_DIR/scripts/anclora_text_quality_audit.py" --repo "$SKILL_DIR" --strict-warnings
