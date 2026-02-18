---
name: anclora-asset-organizer
description: "Expert digital asset organizer for the Anclora ecosystem. Analyzes files by name and content to sort them into brand-specific Assets folders."
version: 1.0.0
author: Antigravity
tags: [file-organization, branding, anclora, automation]
---

# Anclora Asset Organizer

## Purpose
This skill automates the classification and movement of digital assets (images, videos, and other documents) into the correct branded folders within the `ecosistema-digital-anclora` repository. It ensures that materials for **Anclora Matriz**, **Private Estates**, and **Cognitive Solutions** are kept distinct and organized.

## Classification Logic

### 1. 00-Anclora (Matriz)
- **Keywords**: "anclora", "nexus", "group", "matriz", "corporativo", "holding".
- **Destination**: `../ecosistema-digital-anclora/00-Anclora (Matriz)/Assets`

### 2. 01-Private Estates
- **Keywords**: "private", "estates", "luxury", "villa", "mallorca", "son vida", "andratx", "real estate", "alquiler", "rent", "propiedad".
- **Destination**: `../ecosistema-digital-anclora/01-Private Estates/assets`

### 3. 02-Cognitive Solutions
- **Keywords**: "cognitive", "solutions", "ai", "ia", "data", "lab", "tech", "digital", "software", "tecnologia", "consultoria".
- **Destination**: `../ecosistema-digital-anclora/02-Cognitive Solutions/Assets`

## Handling Uncertainty
If a file cannot be confidently classified using the keywords or content analysis, it should be moved to a review queue or renamed with the prefix:
`[DUDA_ANALISIS]_original_filename.ext`

## How to Use
1. Ensure files are placed in the source directories: `videos/`, `imagenes/`, or `otros/`.
2. run the `organizer.py` script located in the `scripts/` directory of this skill.
3. Review any files marked with `[DUDA_ANALISIS]` for manual sorting.
