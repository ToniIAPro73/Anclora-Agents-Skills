---
name: Luxury RE App Creator
version: 2.0
status: production-ready
scope: multi-country | multi-regulation | investment & partners
languages: [ES, EN, DE]
description: Skill autónoma para la creación, evaluación e iteración de aplicaciones web premium de Real Estate orientadas a captación de inversión y colaboraciones estratégicas.
---

# Luxury RE App Creator

## 1. Propósito del Skill
Este skill permite a Anti-Gravity **diseñar, evaluar, versionar e iterar** aplicaciones web de Real Estate de lujo con estándares premium, enfoque en **captación de inversión** y **partners**, y preparación completa para **entornos multi-país y multi-regulación**.

El sistema está diseñado para operar como **producto**, no como generador visual.

---

## 2. Arquitectura del Skill

Este skill opera como un **sistema encadenado de sub-skills** con memoria persistente compartida.

Flujo estándar:
1. Onboarding del usuario
2. Investigación de mercado
3. Síntesis estratégica
4. Generación de aplicación
5. Evaluación de calidad (QA)
6. Feedback del usuario
7. Iteración y versionado
8. (Opcional) Checks de producción

---

## 3. Memoria Persistente

Contexto global: `LuxuryRealEstateContext`

Claves principales:
- user_parameters
- market_insights
- product_strategy
- app_blueprint
- app_versions
- qa_reports
- user_feedback_log
- iteration_policy

Regla crítica:
Cada sub-skill **solo lee lo necesario** y **escribe únicamente su output**, evitando deriva.

---

## 4. Estándares Globales de Diseño (Obligatorios)

### 4.1 Header Global + Selector de Idioma
Todas las aplicaciones DEBEN incluir:

- Toggle visible: **ES | EN | DE**
- Idioma por defecto: **ES**
- Ubicación: header superior (alineación premium)
- Estilo:
  - Minimalista
  - Sin banderas
  - Tipografía ligera
  - Estado activo claramente indicado

El idioma debe:
- Cambiar todo el contenido (copy + legal)
- Persistir por sesión

### 4.2 ADN Visual Común
- Header, Footer, tipografías y paleta compartidas
- Footer con referencia obligatoria a **Anclora Nexus Group**

### 4.3 Narrativa Visual
- Hero full-screen con villas mediterráneas de lujo
- Tipografía:
  - Títulos: Playfair Display
  - Texto: Outfit
- Paleta:
  - Navy profundo (#192350)
  - Blanco hueso (#F5F5F0)
  - Oro mediterráneo (#D4AF37)
- Efectos: glassmorphism, scroll suave, transiciones discretas

---

## 5. Estructura Funcional de la App

La app debe separar claramente dos journeys:

### 5.1 Journey Inversor
- Tesis de inversión clara
- Oportunidades
- Data Lab (ROI, plusvalía, escenarios)
- Trust assets (track record, equipo, datos)
- CTA de cualificación

### 5.2 Journey Partner
- Propuesta de colaboración
- Beneficios claros
- Onboarding simple
- Sistema de atribución
- CTA B2B específico

No se permite mezclar mensajes entre journeys.

---

## 6. Funcionalidades IA Permitidas

- Concierge Virtual para cualificación de inversores
- Personalización de contenidos por perfil
- Visualización de datos asistida

Regla:
La IA debe **aportar valor real**, nunca ser decorativa.

---

## 7. KPIs Evaluados Automáticamente (QA)

### 7.1 KPIs de Inversión
- Conversión a lead cualificado
- Profundidad de cualificación
- Densidad de señales de confianza
- Claridad de CTA
- Tiempo a acción significativa
- Drop-off por fricción

### 7.2 KPIs de Partners
- Claridad de propuesta B2B
- Simplicidad de onboarding
- Preparación para atribución
- Señales de confianza profesional
- Separación clara de journeys

Criterio QA:
- < 4/5 en KPIs clave → iteración obligatoria
- En modo producción, KPIs críticos < 3/5 bloquean release

---

## 8. Multi-País y Multi-Regulación

El skill asume despliegue internacional.

Reglas:
- País principal definido en onboarding
- Textos legales adaptables por país e idioma
- Sin hardcoding legal

Requisitos mínimos:
- Privacidad y cookies
- Disclaimers de inversión
- Identificación corporativa
- Formularios conformes

Nunca:
- Prometer rentabilidad
- Usar lenguaje de asesoramiento financiero

---

## 9. Versionado

Convención:
- v0.x → Prototipo
- v1.x → MVP
- v2.x → Premium / IA avanzada
- v3.x → Escalado

Cada versión registra:
- Objetivo
- Cambios
- Trade-offs
- Decisiones congeladas

---

## 10. Modo Producción (Condicional)

Por defecto: DESACTIVADO

Se activa solo si el usuario escribe:
> activar modo producción

Al activarse:
- Se ejecutan checks de coherencia y compliance
- Pueden bloquear release

---

## 11. Recursos Base

Usar siempre:
`creador_apps_luxury/resources/luxury_base_layout.html`

---

## 12. Prompts de Imagen Recomendados

- Ultra-luxurious modern villa in Port d'Andratx, infinity pool merging with Mediterranean sea, golden hour lighting, cinematic aerial view, high-end architectural photography --ar 16:9
- Elegant interior of a Mallorca luxury estate, minimalistic furniture, nude and gold palette, soft natural light, 8k resolution

