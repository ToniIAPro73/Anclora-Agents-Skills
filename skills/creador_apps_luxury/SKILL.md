# COMPENDIO SKILL ANCLORA - COMPLETO (v3 + v4 + Guía + Textos Legales)

**Fecha:** 24 Enero 2026

---

## Contenido de SKILL_MASTER_v4.0.md

# ANCLORA SKILL MASTER v4.0
## Sistema Completo de Desarrollo para Anclora Private Estates y Ecosistema

---

**Versión:** 4.0.0  
**Fecha:** 24 Enero 2026  
**Paradigma:** Spec-Driven Development (SDD)  
**Alcance:** Web Principal + Aplicaciones Ecosistema + Sistema Legal  
**Coherencia:** Brand Kit Universal Obligatorio + Compliance Legal  

---

# TABLA DE CONTENIDOS

## PARTE I: BRAND KIT UNIVERSAL ANCLORA
1. [Identidad Visual Corporativa](#1-identidad-visual-corporativa)
2. [Sistema de Diseño](#2-sistema-de-diseño)
3. [Componentes Base Reutilizables](#3-componentes-base-reutilizables)
   - 3.1 Button Component
   - 3.2 Card Component
   - 3.3 Header Component
   - 3.4 Footer Component
   - **3.5 Sistema Legal del Footer** ⭐ NUEVO
4. **[Textos Legales Obligatorios](#4-textos-legales-obligatorios)** ⭐ NUEVO

## PARTE II: SKILL WEB PRINCIPAL
5. [Arquitectura Web Corporativa](#5-arquitectura-web-corporativa)
6. [Estructura de Directorios Web Principal](#6-estructura-de-directorios-web-principal)
7. [Archivos Críticos Web Principal](#7-archivos-criticos-web-principal)

## PARTE III: SKILL APPS ECOSISTEMA
8. [Arquitectura Apps Ecosistema](#8-arquitectura-apps-ecosistema)
9. [Tipos de Aplicaciones](#9-tipos-de-aplicaciones)
10. [Estructura Apps Landing Pages](#10-estructura-apps-landing-pages)

## PARTE IV: SISTEMA OPERATIVO
11. [Onboarding Adaptativo](#11-onboarding-adaptativo)
12. [Constitution Template](#12-constitution-template)
13. [Sistema QA/KPIs](#13-sistema-qa-kpis)
14. [Instrucciones para Anti-Gravity](#14-instrucciones-para-anti-gravity)

---

# PARTE I: BRAND KIT UNIVERSAL ANCLORA

## 1. IDENTIDAD VISUAL CORPORATIVA

### 1.1 Paleta de Colores Anclora (INNEGOCIABLE)

```css
/* PALETA PRIMARIA - Usar en TODAS las aplicaciones del ecosistema */
:root {
  /* Oro Anclora - Color Principal */
  --anclora-gold: #D4AF37;
  --anclora-gold-light: #E6C96E;
  --anclora-gold-dark: #B9915F;
  --anclora-gold-10: rgba(212, 175, 55, 0.1);
  --anclora-gold-20: rgba(212, 175, 55, 0.2);
  
  /* Navy - Color Secundario */
  --anclora-navy: #2C3E50;
  --anclora-navy-light: #34495E;
  --anclora-navy-dark: #1A252F;
  
  /* Bronce - Acento Mediterráneo */
  --anclora-bronze: #B9915F;
  --anclora-bronze-light: #C9A578;
  --anclora-bronze-dark: #9A7A4F;
  
  /* Neutros */
  --anclora-cream: #F5F5F0;
  --anclora-stone: #EAEAE5;
  --anclora-white: #FFFFFF;
  --anclora-black: #1A1A1A;
  
  /* Gradientes Signature */
  --gold-gradient: linear-gradient(135deg, #D4AF37 0%, #E6C96E 100%);
  --navy-gradient: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
  --sunset-gradient: linear-gradient(135deg, #D4AF37 0%, #B9915F 50%, #2C3E50 100%);
}
```

**REGLAS DE USO:**

| Elemento | Color Obligatorio | Ejemplo |
|----------|-------------------|---------|
| CTAs Principales | `--anclora-gold` | Botones "Contactar", "Ver Propiedades" |
| Headers/Footers | `--anclora-navy` | Navegación principal, pie de página |
| Hover States | `--anclora-gold-light` | Al pasar sobre links, tarjetas |
| Backgrounds | `--anclora-cream` | Fondo general de secciones |
| Textos Principales | `--anclora-black` | Cuerpo de texto, títulos |
| Acentos Cálidos | `--anclora-bronze` | Badges, iconos destacados |

### 1.2 Tipografía Universal

```typescript
// CONFIGURACIÓN OBLIGATORIA EN TODAS LAS APPS
const ancloraFonts = {
  // Títulos y Headers (Serif Elegante)
  heading: {
    family: 'Playfair Display',
    weights: [400, 600, 700],
    usage: 'H1, H2, H3, títulos de propiedades, hero sections',
  },
  
  // Cuerpo y UI (Sans-Serif Moderna)
  body: {
    family: 'Montserrat',
    weights: [300, 400, 500, 600, 700],
    usage: 'Párrafos, navegación, botones, formularios',
  },
};
```

**ESCALA TIPOGRÁFICA:**

```css
/* Aplicar en tailwind.config.ts de TODAS las apps */
.text-display {
  font-family: var(--font-playfair);
  font-size: 4.5rem; /* 72px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-h1 {
  font-family: var(--font-playfair);
  font-size: 3.5rem; /* 56px */
  font-weight: 600;
  line-height: 1.2;
}

.text-h2 {
  font-family: var(--font-playfair);
  font-size: 2.5rem; /* 40px */
  font-weight: 600;
  line-height: 1.3;
}

.text-h3 {
  font-family: var(--font-playfair);
  font-size: 2rem; /* 32px */
  font-weight: 600;
  line-height: 1.4;
}

.text-body-lg {
  font-family: var(--font-montserrat);
  font-size: 1.125rem; /* 18px */
  font-weight: 400;
  line-height: 1.7;
}

.text-body {
  font-family: var(--font-montserrat);
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.6;
}

.text-small {
  font-family: var(--font-montserrat);
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-montserrat);
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### 1.3 Logos y Assets Corporativos

**VARIANTES DE LOGO OBLIGATORIAS:**

```
public/assets/brand/
├── logo-anclora-full-gold.svg          # Logo completo dorado (para fondos oscuros)
├── logo-anclora-full-navy.svg          # Logo completo navy (para fondos claros)
├── logo-anclora-icon-gold.svg          # Isotipo dorado
├── logo-anclora-icon-navy.svg          # Isotipo navy
├── logo-anclora-nexus-group.svg        # Logo grupo (para footers)
├── badges/
│   ├── badge-gdpr.svg                  # Badge GDPR compliance
│   ├── badge-iso-9001.svg              # Badge ISO 9001:2015
│   └── badge-eu-reg.svg                # Badge EU Registration
└── favicon/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    └── apple-touch-icon.png
```

**REGLAS DE USO:**
- ✅ Usar `logo-anclora-full-gold.svg` en headers con fondo navy
- ✅ Usar `logo-anclora-full-navy.svg` en headers con fondo cream/white
- ✅ Altura mínima de logo: 40px (desktop), 32px (mobile)
- ❌ NUNCA distorsionar proporciones
- ❌ NUNCA cambiar colores del logo

---

## 3. COMPONENTES BASE REUTILIZABLES

[... contenido anterior del documento ...]

### 3.5 Sistema Legal del Footer

**CRÍTICO:** Este sistema legal es OBLIGATORIO en TODAS las aplicaciones del ecosistema Anclora (web principal, landings de proyectos, landings de ubicación, etc.).

#### 3.5.1 Estructura del Footer Legal

```tsx
// components/layout/Footer.tsx

export function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-anclora-navy text-white">
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* ... Columnas de navegación, contacto, etc ... */}
      </div>

      {/* SECCIÓN LEGAL - OBLIGATORIA EN TODAS LAS APPS */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          
          {/* Badges de Certificaciones */}
          <div className="flex justify-center gap-12 mb-8">
            <CertificationBadge icon="gdpr" label="GDPR" />
            <CertificationBadge icon="iso9001" label="ISO 9001" />
            <CertificationBadge icon="eureg" label="EU REG" />
          </div>

          {/* Links Legales - LOS 4 OBLIGATORIOS */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-sans">
              <Link 
                href="/legal/privacidad" 
                className="text-white/70 hover:text-anclora-gold transition-colors uppercase tracking-wider"
              >
                {t('legal.privacidad')}
              </Link>
              <Link 
                href="/legal/cookies" 
                className="text-white/70 hover:text-anclora-gold transition-colors uppercase tracking-wider"
              >
                {t('legal.cookies')}
              </Link>
              <Link 
                href="/legal/codigo-etico" 
                className="text-white/70 hover:text-anclora-gold transition-colors uppercase tracking-wider"
              >
                {t('legal.codigo_etico')}
              </Link>
              <Link 
                href="/legal/terminos-b2b" 
                className="text-white/70 hover:text-anclora-gold transition-colors uppercase tracking-wider"
              >
                {t('legal.terminos_b2b')}
              </Link>
            </div>

            {/* Copyright y Nexus Group - OBLIGATORIO */}
            <div className="text-center space-y-2">
              <p className="text-xs text-white/40 font-sans">
                © 2024 ANCLORA NEXUS GROUP. ALL RIGHTS RESERVED.
              </p>
              <p className="text-xs text-white/30 font-sans">
                ID: ANG-PRT-2026-EU | ANCLORA NEXUS STRATEGIC HOLDINGS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

#### 3.5.2 Componente Certification Badge

```tsx
// components/ui/CertificationBadge.tsx

interface CertificationBadgeProps {
  icon: 'gdpr' | 'iso9001' | 'eureg';
  label: string;
}

export function CertificationBadge({ icon, label }: CertificationBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
        <Image 
          src={`/assets/brand/badges/badge-${icon}.svg`} 
          alt={label}
          width={32}
          height={32}
          className="text-white/60"
        />
      </div>
      <span className="text-xs text-white/40 font-sans uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
```

#### 3.5.3 Archivos i18n para Footer Legal

```typescript
// locales/es/footer.json
{
  "legal": {
    "privacidad": "PRIVACIDAD",
    "cookies": "COOKIES",
    "codigo_etico": "CÓDIGO ÉTICO",
    "terminos_b2b": "TÉRMINOS B2B"
  }
}

// locales/en/footer.json
{
  "legal": {
    "privacidad": "PRIVACY",
    "cookies": "COOKIES",
    "codigo_etico": "CODE OF ETHICS",
    "terminos_b2b": "B2B TERMS"
  }
}

// locales/de/footer.json
{
  "legal": {
    "privacidad": "DATENSCHUTZ",
    "cookies": "COOKIES",
    "codigo_etico": "ETHIKKODEX",
    "terminos_b2b": "B2B-BEDINGUNGEN"
  }
}
```

#### 3.5.4 Estructura de Páginas Legales (OBLIGATORIAS)

```
app/[locale]/legal/
├── privacidad/
│   └── page.tsx         → Política de Privacidad GDPR completa
├── cookies/
│   └── page.tsx         → Política de Cookies con tablas técnicas
├── codigo-etico/
│   └── page.tsx         → Código Ético Corporativo
└── terminos-b2b/
    └── page.tsx         → Términos del Programa de Partners B2B
```

#### 3.5.5 Template de Página Legal

```tsx
// app/[locale]/legal/privacidad/page.tsx

import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export default function PrivacidadPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('legal');

  // El contenido Markdown se carga desde /data/legal/
  const content = await import(`@/data/legal/privacidad-${params.locale}.md`);

  return (
    <LegalPageLayout 
      title={t('privacy.title')}
      lastUpdated="24 Enero 2026"
    >
      <article className="prose prose-lg prose-anclora max-w-none">
        <ReactMarkdown>{content.default}</ReactMarkdown>
      </article>
    </LegalPageLayout>
  );
}
```

#### 3.5.6 Component LegalPageLayout

```tsx
// components/legal/LegalPageLayout.tsx

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header de página legal */}
        <div className="mb-12 text-center">
          <h1 className="text-h1 text-anclora-navy mb-4">{title}</h1>
          <p className="text-small text-gray-600">
            <strong>Última actualización:</strong> {lastUpdated}
          </p>
        </div>

        {/* Contenido */}
        {children}

        {/* Botón volver */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-anclora-navy hover:text-anclora-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Inicio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

#### 3.5.7 Estilos Prose para Páginas Legales

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      typography: {
        anclora: {
          css: {
            '--tw-prose-body': '#2C3E50',
            '--tw-prose-headings': '#2C3E50',
            '--tw-prose-links': '#D4AF37',
            '--tw-prose-bold': '#2C3E50',
            '--tw-prose-counters': '#D4AF37',
            '--tw-prose-bullets': '#D4AF37',
            '--tw-prose-quotes': '#2C3E50',
            '--tw-prose-quote-borders': '#D4AF37',
            
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              fontSize: '2.5rem',
              marginBottom: '2rem',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
              fontSize: '2rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              borderBottom: '2px solid #D4AF37',
              paddingBottom: '0.5rem',
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '2rem',
            },
            p: {
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.75',
              marginBottom: '1.25rem',
            },
            a: {
              color: '#D4AF37',
              textDecoration: 'underline',
              '&:hover': {
                color: '#B9915F',
              },
            },
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: '#2C3E50',
              color: '#FFFFFF',
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            'tbody td': {
              padding: '1rem',
              borderBottom: '1px solid #E5E7EB',
            },
            'tbody tr:hover': {
              backgroundColor: '#F5F5F0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## 4. TEXTOS LEGALES OBLIGATORIOS

**CRÍTICO:** Estos textos son OBLIGATORIOS en TODAS las aplicaciones del ecosistema. Deben almacenarse en `/data/legal/` y estar disponibles en los 3 idiomas (ES/EN/DE).

### 4.1 Mapeo de Textos Legales

| Link Footer | URL | Archivo Fuente | Idiomas | Extensión |
|-------------|-----|----------------|---------|-----------|
| **PRIVACIDAD** | `/legal/privacidad` | `privacidad-{locale}.md` | ES, EN, DE | ~4.500 palabras |
| **COOKIES** | `/legal/cookies` | `cookies-{locale}.md` | ES, EN, DE | ~3.000 palabras |
| **CÓDIGO ÉTICO** | `/legal/codigo-etico` | `codigo-etico-{locale}.md` | ES, EN, DE | ~3.500 palabras |
| **TÉRMINOS B2B** | `/legal/terminos-b2b` | `terminos-b2b-{locale}.md` | ES, EN, DE | ~5.000 palabras |

### 4.2 Política de Privacidad (RGPD/GDPR)

**Contenido Obligatorio:**

1. **Responsable del Tratamiento:**
   - Identidad: Anclora Private Estates S.L.
   - NIF: B-XXXXXXXX (completar con dato real)
   - Dirección: Paseo del Borne 15, 07012 Palma de Mallorca
   - Email: privacidad@ancloraprivateestates.com
   - DPO: dpo@ancloraprivateestates.com

2. **Datos que Recopilamos:**
   - ✅ Datos de contacto (nombre, email, teléfono)
   - ✅ Datos de identificación (DNI/NIE para visitas presenciales)
   - ✅ Datos profesionales/económicos (presupuesto, interés de compra)
   - ✅ Datos de navegación (cookies, analytics)
   - ❌ NO recopilamos: Datos bancarios completos, salud, ideología, biométricos

3. **Finalidades del Tratamiento (5 categorías):**
   - Gestión de consultas y contactos (24 meses)
   - Newsletter y comunicaciones comerciales (hasta baja voluntaria)
   - Gestión de visitas a propiedades (10 años por SEPBLAC)
   - Gestión de partners B2B (duración del contrato + 6 años)
   - Analítica web (26 meses)

4. **Destinatarios de Datos:**
   | Proveedor | Finalidad | Ubicación | Garantías |
   |-----------|-----------|-----------|-----------|
   | Google Analytics | Analítica web | EE.UU. | Decisión Adecuación UE-EE.UU. |
   | Mailchimp | Email marketing | EE.UU. | Cláusulas Contractuales Tipo |
   | Meta Pixel | Publicidad | EE.UU. | Decisión Adecuación UE-EE.UU. |
   | n8n (self-hosted) | Automatización | AWS Frankfurt | Dentro UE |
   | Twenty CRM (self-hosted) | CRM | AWS Frankfurt | Dentro UE |

5. **Derechos RGPD (7 derechos):**
   - Acceso, Rectificación, Supresión, Limitación, Portabilidad, Oposición, No decisiones automatizadas
   - Ejercicio: privacidad@ancloraprivateestates.com con copia DNI/NIE
   - Plazo respuesta: 1 mes
   - Reclamación: AEPD (www.aepd.es)

6. **Seguridad:**
   - Cifrado SSL/TLS en tránsito
   - Cifrado en reposo (AES-256)
   - Control de acceso basado en roles (RBAC)
   - Backups cifrados diarios
   - Auditorías trimestrales
   - Certificaciones: ISO 27001, ISO 9001

7. **Marco Legal:**
   - RGPD (UE) 2016/679
   - LOPDGDD 3/2018 (España)
   - LSSI-CE 34/2002
   - Ley 10/2010 (Prevención Blanqueo Capitales)

**Archivo:** `/data/legal/privacidad-es.md` (y variantes en/de)

### 4.3 Política de Cookies

**Contenido Obligatorio:**

1. **Categorías de Cookies:**

   **A. ESTRICTAMENTE NECESARIAS (NO requieren consentimiento):**
   | Cookie | Duración | Finalidad |
   |--------|----------|-----------|
   | cookie-consent | 1 año | Almacenar preferencias de consentimiento |
   | NEXT_LOCALE | Sesión | Idioma seleccionado |
   | csrf-token | Sesión | Seguridad CSRF |
   | session-id | Sesión | Sesión del usuario |

   **B. ANALÍTICAS (requieren consentimiento):**
   | Cookie | Duración | Proveedor | Finalidad |
   |--------|----------|-----------|-----------|
   | _ga | 2 años | Google Analytics | Distinguir usuarios |
   | _ga_XXXXXXXXXX | 2 años | Google Analytics | Persistir estado de sesión |
   | _gid | 24 horas | Google Analytics | Distinguir usuarios |
   | _gat | 1 minuto | Google Analytics | Limitar tasa de peticiones |

   **C. MARKETING (requieren consentimiento):**
   | Cookie | Duración | Proveedor | Finalidad |
   |--------|----------|-----------|-----------|
   | _fbp | 90 días | Meta Pixel | Publicidad en Facebook |
   | fr | 90 días | Meta Pixel | Publicidad dirigida |
   | _gcl_au | 90 días | Google Ads | Conversiones |

2. **Consentimiento:**
   - Banner con 3 opciones: Aceptar todas / Rechazar no esenciales / Configurar
   - Almacenamiento: localStorage, 12 meses
   - Icono 🍪 permanente en esquina inferior derecha

3. **Gestión:**
   - Instrucciones para Chrome, Firefox, Safari, Edge
   - Links a configuración de cada navegador
   - Opción de modo incógnito

**Archivo:** `/data/legal/cookies-es.md` (y variantes en/de)

### 4.4 Código Ético Corporativo

**Contenido Obligatorio:**

1. **Valores Fundamentales (5 pilares):**
   - 🔒 **CONFIDENCIALIDAD:** Privacidad de clientes UHNWI sagrada
   - ✨ **INTEGRIDAD:** No comisiones ocultas, transparencia total
   - 🎓 **PROFESIONALIDAD:** Formación continua (40h anuales), colegiación API
   - 🤝 **RESPETO Y DIVERSIDAD:** Tolerancia cero discriminación
   - 🌱 **SOSTENIBILIDAD:** Compromiso medioambiental Mallorca

2. **Normas de Conducta Específicas:**
   - Relaciones con clientes (deber asesoramiento objetivo)
   - Relaciones con partners (comisiones transparentes)
   - Prevención blanqueo capitales (KYC, verificación origen fondos >10.000€)
   - Protección de datos (más allá RGPD mínimo)

3. **Responsabilidad Social:**
   - Compromiso Mallorca (0.5% comisiones a Fundació Patrimoni Mallorca)
   - Política medioambiental (oficina paperless, flota híbrida/eléctrica)
   - Inversión ética (no explotación laboral, no incumplidores)

4. **Cumplimiento:**
   - Comité Ética (reuniones trimestrales)
   - Canal denuncias: etica@ancloraprivateestates.com
   - Sanciones: Leve → Grave → Muy Grave (hasta rescisión + denuncia)

**Archivo:** `/data/legal/codigo-etico-es.md` (y variantes en/de)

### 4.5 Términos y Condiciones B2B

**Contenido Obligatorio:**

1. **Requisitos Admisión:**
   - Licencia API vigente
   - Seguro RC profesional (mínimo 300.000€)
   - Formación blanqueo capitales actualizada
   - Proceso: Solicitud → Revisión → Entrevista → Aprobación → Onboarding (10-15 días)

2. **Modelos de Colaboración:**

   **MODELO A: REFERRAL**
   - Comisión: 20% comisión Anclora
   - Ejemplo: Venta 2M€ → Partner 12.000€ + IVA
   - Partner NO gestiona cliente

   **MODELO B: CO-BROKERAGE**
   - Comisión: Split 50/50
   - Ejemplo: Venta 2M€ → Partner 30.000€ + IVA
   - Partner participa activamente

   **MODELO C: EXCLUSIVE PARTNERSHIP**
   - Comisiones negociables
   - Exclusividad territorial/nicho
   - Mínimo 1 transacción cada 6 meses

3. **Condiciones Económicas:**
   | Rango Precio | Comisión Anclora | Referral (20%) | Co-brokerage (50%) |
   |--------------|------------------|----------------|-------------------|
   | < 1M€ | 3% + IVA | 0.6% + IVA | 1.5% + IVA |
   | 1M€ - 3M€ | 3% + IVA | 0.6% + IVA | 1.5% + IVA |
   | > 3M€ | Negociable (min 2.5%) | 0.5% + IVA | 1.25% + IVA |

4. **Plazos de Pago:**
   - Referral: 30 días desde cierre notarial
   - Co-brokerage: 15 días (prioritario)

5. **Bonificaciones por Volumen:**
   - 3-5 transacciones/año: +5%
   - 6-10 transacciones/año: +10%
   - 11+ transacciones/año: +15%

6. **Partner Portal:**
   - Lead Management (tracking tiempo real)
   - Property Access (catálogo completo, fichas PDF)
   - Marketing Materials (brochures personalizables)
   - Reporting & Analytics (dashboard KPIs)

7. **Protección Leads:**
   - Regla "First Touch Wins"
   - Protección: Referral 12 meses, Co-brokerage 18 meses

8. **Código de Conducta:**
   - ✅ Permitido: Promocionar propiedades, usar materiales, coordinar visitas
   - ❌ Prohibido: Plagiar, modificar precios, marca blanca no autorizada, spam

9. **Resolución Disputas:**
   - 1º: Mediación Colegio API Baleares (30 días)
   - 2º: Arbitraje Palma de Mallorca
   - 3º: Juzgados Palma

**Archivo:** `/data/legal/terminos-b2b-es.md` (y variantes en/de)

### 4.6 Cookie Banner Component

```tsx
// components/legal/CookieBanner.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }));
    setShowBanner(false);
    loadAnalytics();
    loadMarketing();
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }));
    setShowBanner(false);
  };

  const handleSaveSettings = (settings: any) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...settings,
      timestamp: Date.now(),
    }));
    setShowBanner(false);
    setShowSettings(false);
    
    if (settings.analytics) loadAnalytics();
    if (settings.marketing) loadMarketing();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-anclora-gold shadow-2xl z-50">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-h3 text-anclora-navy mb-2">
                🍪 Utilizamos cookies
              </h3>
              <p className="text-body text-gray-600">
                Usamos cookies propias y de terceros para mejorar tu experiencia. 
                Consulta nuestra{' '}
                <Link href="/legal/cookies" className="text-anclora-gold underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleRejectNonEssential}>
                Rechazar No Esenciales
              </Button>
              <Button variant="secondary" onClick={() => setShowSettings(true)}>
                Configurar
              </Button>
              <Button variant="primary" onClick={handleAcceptAll}>
                Aceptar Todas
              </Button>
            </div>
          </div>
        ) : (
          <CookieSettings onSave={handleSaveSettings} onBack={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
}

function loadAnalytics() {
  // Cargar Google Analytics
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
}

function loadMarketing() {
  // Cargar Meta Pixel
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
}
```

### 4.7 Datos Críticos Pendientes de Completar

**ANTES DE PRODUCCIÓN - OBLIGATORIO:**

```typescript
// lib/config/legal-data.ts

export const LEGAL_DATA = {
  // ❌ DATOS TEMPORALES - REEMPLAZAR CON REALES
  company: {
    name: 'Anclora Private Estates S.L.',
    cif: 'B-XXXXXXXX', // ← COMPLETAR
    address: 'Paseo del Borne 15, 07012 Palma de Mallorca',
    registroMercantil: {
      tomo: 'XXXX',      // ← COMPLETAR
      folio: 'XXX',      // ← COMPLETAR
      seccion: 'X',      // ← COMPLETAR
      hoja: 'XX-XXXX',   // ← COMPLETAR
    },
    apiNumber: 'XXXX',   // ← Nº Colegio API Baleares
    insurance: {
      company: 'XXXXXXX',          // ← Aseguradora
      policyNumber: 'XXXXXXXXXXXX', // ← Nº Póliza
      coverage: '300.000€',
    },
  },
  
  emails: {
    general: 'info@ancloraprivateestates.com',
    privacy: 'privacidad@ancloraprivateestates.com',   // ← CONFIGURAR
    dpo: 'dpo@ancloraprivateestates.com',             // ← CONFIGURAR
    legal: 'legal@ancloraprivateestates.com',          // ← CONFIGURAR
    ethics: 'etica@ancloraprivateestates.com',         // ← CONFIGURAR
    partners: 'partners@ancloraprivateestates.com',    // ← CONFIGURAR
    cookies: 'cookies@ancloraprivateestates.com',      // ← CONFIGURAR
  },
  
  certifications: {
    iso9001: {
      number: 'XXXX-XXXX-XXXX', // ← COMPLETAR
      expiry: '2027-XX-XX',
    },
    iso27001: {
      number: 'XXXX-XXXX-XXXX', // ← COMPLETAR
      expiry: '2027-XX-XX',
    },
  },
};
```

---

## 6. ESTRUCTURA DE DIRECTORIOS WEB PRINCIPAL

```
anclora-private-estates/
├── app/
│   └── [locale]/
│       ├── page.tsx                    # Homepage
│       ├── propiedades/
│       │   ├── page.tsx               # Catálogo
│       │   ├── [slug]/page.tsx        # Detalle propiedad
│       │   └── ubicacion/
│       │       └── [slug]/page.tsx    # SEO Landing ubicación
│       ├── servicios/
│       ├── inversores/
│       ├── partners/
│       ├── blog/
│       ├── contacto/
│       ├── valoracion/
│       │
│       └── legal/                      # ⭐ SECCIÓN LEGAL OBLIGATORIA
│           ├── privacidad/
│           │   └── page.tsx
│           ├── cookies/
│           │   └── page.tsx
│           ├── codigo-etico/
│           │   └── page.tsx
│           └── terminos-b2b/
│               └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── CertificationBadge.tsx     # ⭐ NUEVO
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx                 # ⭐ CON SISTEMA LEGAL
│   └── legal/                          # ⭐ NUEVO
│       ├── LegalPageLayout.tsx
│       ├── CookieBanner.tsx
│       └── CookieSettings.tsx
│
├── data/
│   └── legal/                          # ⭐ TEXTOS LEGALES OBLIGATORIOS
│       ├── privacidad-es.md
│       ├── privacidad-en.md
│       ├── privacidad-de.md
│       ├── cookies-es.md
│       ├── cookies-en.md
│       ├── cookies-de.md
│       ├── codigo-etico-es.md
│       ├── codigo-etico-en.md
│       ├── codigo-etico-de.md
│       ├── terminos-b2b-es.md
│       ├── terminos-b2b-en.md
│       └── terminos-b2b-de.md
│
├── public/
│   └── assets/
│       └── brand/
│           ├── badges/                 # ⭐ NUEVO
│           │   ├── badge-gdpr.svg
│           │   ├── badge-iso-9001.svg
│           │   └── badge-eu-reg.svg
│           └── ...
│
├── lib/
│   └── config/
│       └── legal-data.ts               # ⭐ DATOS LEGALES CENTRALIZADOS
│
└── locales/
    ├── es/
    │   └── footer.json                 # ⭐ CON TEXTOS LEGALES
    ├── en/
    │   └── footer.json
    └── de/
        └── footer.json
```

---

## 14. INSTRUCCIONES PARA ANTI-GRAVITY

### 14.1 Workflow del Agente (ACTUALIZADO)

```
PASO 1: ONBOARDING
├─ Detectar tipo de proyecto
├─ Hacer preguntas según tipo
└─ Almacenar parámetros en memoria persistente

PASO 2: GENERACIÓN DE SCAFFOLD
├─ Crear estructura de directorios según tipo
├─ Generar .specify/memory/constitution.md
└─ Crear archivos críticos con contenido mandatorio

PASO 3: POBLADO DE BRAND KIT + SISTEMA LEGAL ⭐
├─ Copiar componentes del Brand Kit (Button, Card, Header, Footer)
├─ Configurar tailwind.config.ts con paleta Anclora
├─ Cargar fuentes Playfair Display + Montserrat
├─ Crear lib/config.ts con datos del proyecto
│
├─ ⭐ CREAR SISTEMA LEGAL (OBLIGATORIO EN TODAS LAS APPS):
│  ├─ Crear carpeta app/[locale]/legal/ con 4 páginas
│  ├─ Copiar 12 archivos .md a data/legal/ (4 textos × 3 idiomas)
│  ├─ Implementar Footer con 4 links legales
│  ├─ Añadir CertificationBadge component
│  ├─ Implementar CookieBanner component
│  ├─ Configurar prose-anclora en tailwind
│  └─ Crear lib/config/legal-data.ts

PASO 4: CONTENIDO ESPECÍFICO
├─ [Según tipo de aplicación...]
│
PASO 5: QA AUTOMÁTICO
├─ Validar estructura de carpetas
├─ Verificar archivos críticos existen
├─ Comprobar Brand Kit implementado
├─ ⭐ VALIDAR SISTEMA LEGAL:
│  ├─ ✓ 4 páginas legales existen
│  ├─ ✓ 12 archivos .md en data/legal/
│  ├─ ✓ Footer incluye 4 links legales
│  ├─ ✓ CookieBanner implementado
│  └─ ✓ Badges GDPR/ISO/EUREG presentes
├─ Ejecutar checks de coherencia
└─ Generar reporte de score

PASO 6: ENTREGA
├─ Si score >= 4/5 → Presentar proyecto
├─ Si score < 4/5 → Iterar
└─ Si modo producción + score < 3/5 → BLOQUEAR
```

### 14.2 Checklist QA Sistema Legal

**Anti-Gravity DEBE verificar:**

```typescript
// .specify/qa/legal-compliance-check.ts

export const legalComplianceChecks = {
  // Archivos Markdown de textos legales
  legalMarkdownFiles: [
    'data/legal/privacidad-es.md',
    'data/legal/privacidad-en.md',
    'data/legal/privacidad-de.md',
    'data/legal/cookies-es.md',
    'data/legal/cookies-en.md',
    'data/legal/cookies-de.md',
    'data/legal/codigo-etico-es.md',
    'data/legal/codigo-etico-en.md',
    'data/legal/codigo-etico-de.md',
    'data/legal/terminos-b2b-es.md',
    'data/legal/terminos-b2b-en.md',
    'data/legal/terminos-b2b-de.md',
  ],
  
  // Páginas legales
  legalPages: [
    'app/[locale]/legal/privacidad/page.tsx',
    'app/[locale]/legal/cookies/page.tsx',
    'app/[locale]/legal/codigo-etico/page.tsx',
    'app/[locale]/legal/terminos-b2b/page.tsx',
  ],
  
  // Componentes legales
  legalComponents: [
    'components/legal/LegalPageLayout.tsx',
    'components/legal/CookieBanner.tsx',
    'components/legal/CookieSettings.tsx',
    'components/ui/CertificationBadge.tsx',
  ],
  
  // Assets de badges
  badgeAssets: [
    'public/assets/brand/badges/badge-gdpr.svg',
    'public/assets/brand/badges/badge-iso-9001.svg',
    'public/assets/brand/badges/badge-eu-reg.svg',
  ],
  
  // Configuración legal
  legalConfig: [
    'lib/config/legal-data.ts',
  ],
  
  // i18n footer legal
  footerTranslations: [
    'locales/es/footer.json', // Debe incluir legal.privacidad, legal.cookies, etc.
    'locales/en/footer.json',
    'locales/de/footer.json',
  ],
  
  // Footer component debe incluir sección legal
  footerLegalSection: {
    file: 'components/layout/Footer.tsx',
    mustInclude: [
      'CertificationBadge',
      '/legal/privacidad',
      '/legal/cookies',
      '/legal/codigo-etico',
      '/legal/terminos-b2b',
      'ANCLORA NEXUS GROUP',
      'ANG-PRT-2026-EU',
    ],
  },
};
```

### 14.3 Reglas de Gobernanza Actualizadas

**EL AGENTE DEBE:**
- ✅ Leer `.specify/memory/constitution.md` ANTES de generar cualquier código
- ✅ Usar SIEMPRE componentes del Brand Kit (nunca recrearlos)
- ✅ Aplicar paleta Anclora Gold/Navy sin excepción
- ✅ Extraer TODO el texto visible a archivos de traducción
- ✅ Validar cada archivo crítico contra la spec
- ✅ Generar código de PRODUCCIÓN (no TODOs, no placeholders)
- ✅ Ejecutar QA automático antes de entregar
- ✅ **⭐ CREAR SISTEMA LEGAL COMPLETO (4 páginas + 12 .md + Footer + CookieBanner)**
- ✅ **⭐ INCLUIR 3 BADGES DE CERTIFICACIÓN (GDPR, ISO 9001, EU REG)**
- ✅ **⭐ REFERENCIA A ANCLORA NEXUS GROUP EN FOOTER (obligatorio)**

**EL AGENTE NO DEBE:**
- ❌ Improvisar arquitectura (seguir scaffold al pie de la letra)
- ❌ Hardcodear textos en componentes
- ❌ Usar colores fuera de la paleta Anclora
- ❌ Mezclar journeys inversor/partner
- ❌ Cambiar el stack tecnológico
- ❌ Omitir la referencia a Anclora Nexus Group en footer
- ❌ Generar código "ejemplo" o "demo" (siempre producción)
- ❌ **⭐ OMITIR CUALQUIERA DE LAS 4 PÁGINAS LEGALES**
- ❌ **⭐ CREAR FOOTER SIN LINKS LEGALES**
- ❌ **⭐ OMITIR COOKIEBANNER**

---

# FIN DEL SKILL MASTER v4.0

---

## NOTAS FINALES PARA ANTONIO

**Este documento es TU BIBLIA de desarrollo Anclora.**

### NOVEDADES VERSIÓN 4.0

✅ **Sistema Legal Completo Integrado:**
- 4 páginas legales obligatorias en todas las apps
- 12 archivos Markdown (4 textos × 3 idiomas)
- Footer con links legales + badges de certificación
- CookieBanner con consentimiento granular
- Estilos prose-anclora para páginas legales

✅ **Compliance RGPD/GDPR:**
- Política de Privacidad completa (ES/EN/DE)
- Política de Cookies con tablas técnicas
- Código Ético corporativo
- Términos B2B para Partners

✅ **Anti-Gravity Actualizado:**
- Workflow incluye creación automática del sistema legal
- QA valida presencia de todos los archivos legales
- Bloqueo si falta cualquier componente legal en producción

### Cómo usarlo:

1. **Para crear la WEB PRINCIPAL:**
   ```
   Crea la web principal siguiendo PARTE II del Skill Master v4.0
   
   Sistema legal: SÍ (obligatorio)
   Ubicaciones: Son Vida, Port d'Andratx, Bendinat
   Idiomas: ES, EN, DE
   ```

2. **Para crear una LANDING DE PROYECTO (ej. Azure Bay):**
   ```
   Crea landing Azure Bay siguiendo PARTE III del Skill Master v4.0
   
   Sistema legal: SÍ (obligatorio)
   Tipo: Landing Proyecto
   Idiomas: ES, EN, DE
   ```

3. **Coherencia Legal GARANTIZADA:**
   - TODAS las apps tienen el mismo footer legal
   - Mismos 4 links (Privacidad, Cookies, Código Ético, Términos B2B)
   - Mismos 3 badges (GDPR, ISO 9001, EU REG)
   - Mismo CookieBanner

**ANTES DE PRODUCCIÓN:**
1. Completar datos reales en `lib/config/legal-data.ts`:
   - CIF/NIF
   - Nº API Colegio Baleares
   - Registro Mercantil
   - Póliza seguro RC
2. Configurar emails operativos (privacidad@, dpo@, legal@, etica@, partners@)
3. Contratar abogado para revisión legal
4. Auditoría GDPR externa (recomendado)

**Versión:** 4.0.0  
**Última actualización:** 24 Enero 2026  
**Autor:** Claude (para Antonio / Anclora Nexus Group)  
**Changelog v4.0:** Sistema Legal Completo + Footer Universal + Compliance RGPD
\n---\n
## Contenido de SKILL_MASTER_CLAUDE.md

# ANCLORA SKILL MASTER v3.0
## Sistema Completo de Desarrollo para Anclora Private Estates y Ecosistema

---

**Versión:** 3.0.0  
**Fecha:** 24 Enero 2026  
**Paradigma:** Spec-Driven Development (SDD)  
**Alcance:** Web Principal + Aplicaciones Ecosistema  
**Coherencia:** Brand Kit Universal Obligatorio  

---

# TABLA DE CONTENIDOS

## PARTE I: BRAND KIT UNIVERSAL ANCLORA
1. [Identidad Visual Corporativa](#1-identidad-visual-corporativa)
2. [Sistema de Diseño](#2-sistema-de-diseño)
3. [Componentes Base Reutilizables](#3-componentes-base-reutilizables)

## PARTE II: SKILL WEB PRINCIPAL
4. [Arquitectura Web Corporativa](#4-arquitectura-web-corporativa)
5. [Estructura de Directorios Web Principal](#5-estructura-de-directorios-web-principal)
6. [Archivos Críticos Web Principal](#6-archivos-criticos-web-principal)

## PARTE III: SKILL APPS ECOSISTEMA
7. [Arquitectura Apps Ecosistema](#7-arquitectura-apps-ecosistema)
8. [Tipos de Aplicaciones](#8-tipos-de-aplicaciones)
9. [Estructura Apps Landing Pages](#9-estructura-apps-landing-pages)

## PARTE IV: SISTEMA OPERATIVO
10. [Onboarding Adaptativo](#10-onboarding-adaptativo)
11. [Constitution Template](#11-constitution-template)
12. [Sistema QA/KPIs](#12-sistema-qa-kpis)
13. [Instrucciones para Anti-Gravity](#13-instrucciones-para-anti-gravity)

---

# PARTE I: BRAND KIT UNIVERSAL ANCLORA

## 1. IDENTIDAD VISUAL CORPORATIVA

### 1.1 Paleta de Colores Anclora (INNEGOCIABLE)

```css
/* PALETA PRIMARIA - Usar en TODAS las aplicaciones del ecosistema */
:root {
  /* Oro Anclora - Color Principal */
  --anclora-gold: #D4AF37;
  --anclora-gold-light: #E6C96E;
  --anclora-gold-dark: #B9915F;
  --anclora-gold-10: rgba(212, 175, 55, 0.1);
  --anclora-gold-20: rgba(212, 175, 55, 0.2);
  
  /* Navy - Color Secundario */
  --anclora-navy: #2C3E50;
  --anclora-navy-light: #34495E;
  --anclora-navy-dark: #1A252F;
  
  /* Bronce - Acento Mediterráneo */
  --anclora-bronze: #B9915F;
  --anclora-bronze-light: #C9A578;
  --anclora-bronze-dark: #9A7A4F;
  
  /* Neutros */
  --anclora-cream: #F5F5F0;
  --anclora-stone: #EAEAE5;
  --anclora-white: #FFFFFF;
  --anclora-black: #1A1A1A;
  
  /* Gradientes Signature */
  --gold-gradient: linear-gradient(135deg, #D4AF37 0%, #E6C96E 100%);
  --navy-gradient: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
  --sunset-gradient: linear-gradient(135deg, #D4AF37 0%, #B9915F 50%, #2C3E50 100%);
}
```

**REGLAS DE USO:**

| Elemento | Color Obligatorio | Ejemplo |
|----------|-------------------|---------|
| CTAs Principales | `--anclora-gold` | Botones "Contactar", "Ver Propiedades" |
| Headers/Footers | `--anclora-navy` | Navegación principal, pie de página |
| Hover States | `--anclora-gold-light` | Al pasar sobre links, tarjetas |
| Backgrounds | `--anclora-cream` | Fondo general de secciones |
| Textos Principales | `--anclora-black` | Cuerpo de texto, títulos |
| Acentos Cálidos | `--anclora-bronze` | Badges, iconos destacados |

### 1.2 Tipografía Universal

```typescript
// CONFIGURACIÓN OBLIGATORIA EN TODAS LAS APPS
const ancloraFonts = {
  // Títulos y Headers (Serif Elegante)
  heading: {
    family: 'Playfair Display',
    weights: [400, 600, 700],
    usage: 'H1, H2, H3, títulos de propiedades, hero sections',
  },
  
  // Cuerpo y UI (Sans-Serif Moderna)
  body: {
    family: 'Montserrat',
    weights: [300, 400, 500, 600, 700],
    usage: 'Párrafos, navegación, botones, formularios',
  },
};
```

**ESCALA TIPOGRÁFICA:**

```css
/* Aplicar en tailwind.config.ts de TODAS las apps */
.text-display {
  font-family: var(--font-playfair);
  font-size: 4.5rem; /* 72px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-h1 {
  font-family: var(--font-playfair);
  font-size: 3.5rem; /* 56px */
  font-weight: 600;
  line-height: 1.2;
}

.text-h2 {
  font-family: var(--font-playfair);
  font-size: 2.5rem; /* 40px */
  font-weight: 600;
  line-height: 1.3;
}

.text-h3 {
  font-family: var(--font-playfair);
  font-size: 2rem; /* 32px */
  font-weight: 600;
  line-height: 1.4;
}

.text-body-lg {
  font-family: var(--font-montserrat);
  font-size: 1.125rem; /* 18px */
  font-weight: 400;
  line-height: 1.7;
}

.text-body {
  font-family: var(--font-montserrat);
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.6;
}

.text-small {
  font-family: var(--font-montserrat);
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-montserrat);
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### 1.3 Logos y Assets Corporativos

**VARIANTES DE LOGO OBLIGATORIAS:**

```
public/assets/brand/
├── logo-anclora-full-gold.svg          # Logo completo dorado (para fondos oscuros)
├── logo-anclora-full-navy.svg          # Logo completo navy (para fondos claros)
├── logo-anclora-icon-gold.svg          # Isotipo dorado
├── logo-anclora-icon-navy.svg          # Isotipo navy
├── logo-anclora-nexus-group.svg        # Logo grupo (para footers)
└── favicon/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    └── apple-touch-icon.png
```

**REGLAS DE USO:**
- ✅ Usar `logo-anclora-full-gold.svg` en headers con fondo navy
- ✅ Usar `logo-anclora-full-navy.svg` en headers con fondo cream/white
- ✅ Altura mínima de logo: 40px (desktop), 32px (mobile)
- ❌ NUNCA distorsionar proporciones
- ❌ NUNCA cambiar colores del logo

---

## 2. SISTEMA DE DISEÑO

### 2.1 Espaciado Universal

```typescript
// tailwind.config.ts - SPACING SYSTEM
export default {
  theme: {
    extend: {
      spacing: {
        // Espaciado de componentes
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
        '4xl': '6rem',     // 96px
        '5xl': '8rem',     // 128px
        
        // Espaciado de secciones
        'section-sm': '3rem',    // 48px
        'section-md': '5rem',    // 80px
        'section-lg': '7.5rem',  // 120px
        'section-xl': '10rem',   // 160px
      },
      
      // Gaps para grids
      gap: {
        'cards': '2rem',      // 32px - Gap entre property cards
        'grid': '1.5rem',     // 24px - Gap general en grids
      },
      
      // Containers
      maxWidth: {
        'container': '1440px',  // Max width de contenido
      },
    },
  },
};
```

### 2.2 Sombras y Elevaciones

```css
/* SHADOW SYSTEM - Aplicar en todas las apps */
.shadow-anclora-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05),
              0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.shadow-anclora {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-anclora-md {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-anclora-lg {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-anclora-xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Sombra con acento dorado - Para elementos premium */
.shadow-gold {
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15),
              0 0 20px rgba(212, 175, 55, 0.1);
}

/* Glassmorphism - Para overlays */
.glass-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(44, 62, 80, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 2.3 Animaciones y Transiciones

```css
/* ANIMATION SYSTEM - Coherencia en micro-interacciones */
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-luxury: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Animaciones de entrada */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Clases de utilidad */
.animate-fade-in {
  animation: fadeIn var(--transition-slow) ease-out forwards;
}

.animate-slide-up {
  animation: slideUp var(--transition-slow) ease-out forwards;
}

/* Hover effects - OBLIGATORIO en elementos interactivos */
.hover-lift {
  transition: transform var(--transition-base), 
              box-shadow var(--transition-base);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-anclora-lg);
}

.hover-gold {
  transition: color var(--transition-fast);
}

.hover-gold:hover {
  color: var(--anclora-gold);
}
```

---

## 3. COMPONENTES BASE REUTILIZABLES

### 3.1 Button System (Obligatorio en TODO el ecosistema)

```tsx
// components/ui/Button.tsx - COMPONENTE MAESTRO
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base - Aplicado a todos los botones
  `
    inline-flex items-center justify-center gap-2
    font-montserrat font-semibold
    rounded-full
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  {
    variants: {
      variant: {
        // Primario - CTAs principales
        primary: `
          bg-anclora-gold text-white
          hover:bg-anclora-gold-light
          focus:ring-anclora-gold
          shadow-md hover:shadow-gold
        `,
        
        // Secundario - Acciones secundarias
        secondary: `
          bg-anclora-navy text-white
          hover:bg-anclora-navy-light
          focus:ring-anclora-navy
          shadow-md hover:shadow-lg
        `,
        
        // Outline - Acciones terciarias
        outline: `
          border-2 border-anclora-gold text-anclora-gold
          hover:bg-anclora-gold hover:text-white
          focus:ring-anclora-gold
        `,
        
        // Ghost - Links estilizados
        ghost: `
          text-anclora-navy
          hover:bg-anclora-gold-10
          focus:ring-anclora-gold
        `,
      },
      
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**EJEMPLOS DE USO:**

```tsx
// CTA Principal
<Button variant="primary" size="lg">
  Ver Propiedades de Lujo
</Button>

// CTA Secundario
<Button variant="secondary" size="md">
  Contactar Agente
</Button>

// Outline para acciones menos importantes
<Button variant="outline" size="md">
  Más Información
</Button>

// Link estilizado
<Button variant="ghost" size="sm">
  Leer Más →
</Button>
```

### 3.2 Card Component (Property Cards, etc.)

```tsx
// components/ui/Card.tsx - COMPONENTE MAESTRO
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = true,
  glass = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl overflow-hidden
        ${glass ? 'glass-light' : 'shadow-anclora'}
        ${hover ? 'hover-lift cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Sub-componentes para estructura consistente
export const CardImage: React.FC<{
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}> = ({ src, alt, aspectRatio = '4/3' }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-anclora-stone aspect-[${aspectRatio}]`}>
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
      />
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h3 className="font-serif text-2xl font-semibold text-anclora-navy mb-2 hover-gold transition-colors">
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="font-sans text-base text-gray-600 leading-relaxed">
      {children}
    </p>
  );
};
```

### 3.3 Header Universal (Todas las apps)

```tsx
// components/layout/Header.tsx - OBLIGATORIO EN TODAS LAS APPS
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
  showLanguageToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  variant = 'transparent',
  showLanguageToggle = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = variant === 'transparent' && !scrolled;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isTransparent
          ? 'bg-gradient-to-b from-black/30 to-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md'
        }
      `}
    >
      <div className="container mx-auto px-6 max-w-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={isTransparent 
                ? '/assets/brand/logo-anclora-full-gold.svg'
                : '/assets/brand/logo-anclora-full-navy.svg'
              }
              alt="Anclora Private Estates"
              className="h-10"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink 
              href="/propiedades" 
              active={pathname === '/propiedades'}
              light={isTransparent}
            >
              Propiedades
            </NavLink>
            <NavLink 
              href="/servicios" 
              active={pathname === '/servicios'}
              light={isTransparent}
            >
              Servicios
            </NavLink>
            <NavLink 
              href="/nosotros" 
              active={pathname === '/nosotros'}
              light={isTransparent}
            >
              Nosotros
            </NavLink>
            <NavLink 
              href="/blog" 
              active={pathname === '/blog'}
              light={isTransparent}
            >
              Blog
            </NavLink>
            <Button variant="primary" size="sm">
              Contactar
            </Button>
          </nav>

          {/* Language Toggle */}
          {showLanguageToggle && (
            <LanguageToggle light={isTransparent} />
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden">
            <svg className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-anclora-navy'}`}>
              {/* Menu icon */}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

// NavLink Component
const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  active?: boolean;
  light?: boolean;
}> = ({ href, children, active, light }) => {
  return (
    <Link
      href={href}
      className={`
        relative py-2 px-1
        font-montserrat text-sm font-medium tracking-wide
        transition-colors duration-200
        ${active 
          ? 'text-anclora-gold' 
          : light
            ? 'text-white hover:text-anclora-gold'
            : 'text-anclora-navy hover:text-anclora-gold'
        }
      `}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-anclora-gold" />
      )}
    </Link>
  );
};
```

### 3.4 Footer Universal

```tsx
// components/layout/Footer.tsx - OBLIGATORIO EN TODAS LAS APPS
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-anclora-navy text-white">
      {/* Main Footer Content */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 max-w-container">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Column 1: Brand */}
            <div>
              <img
                src="/assets/brand/logo-anclora-full-gold.svg"
                alt="Anclora Private Estates"
                className="h-10 mb-6"
              />
              <p className="font-montserrat text-white/70 leading-relaxed mb-6">
                Agencia boutique especializada en propiedades de lujo en Mallorca.
              </p>
              <div className="flex gap-4">
                <SocialLink href="https://instagram.com/ancloraprivateestates" icon="instagram" />
                <SocialLink href="https://linkedin.com/company/anclora" icon="linkedin" />
                <SocialLink href="https://facebook.com/ancloraprivateestates" icon="facebook" />
              </div>
            </div>

            {/* Column 2: Servicios */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-anclora-gold">
                Servicios
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/servicios/compra">Compra</FooterLink>
                <FooterLink href="/servicios/venta">Venta</FooterLink>
                <FooterLink href="/servicios/valoracion">Valoración</FooterLink>
                <FooterLink href="/servicios/gestion">Gestión</FooterLink>
              </ul>
            </div>

            {/* Column 3: Propiedades */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-anclora-gold">
                Propiedades
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/propiedades?tipo=villa">Villas</FooterLink>
                <FooterLink href="/propiedades?tipo=apartamento">Apartamentos</FooterLink>
                <FooterLink href="/propiedades?tipo=finca">Fincas</FooterLink>
                <FooterLink href="/propiedades/ubicacion/son-vida">Son Vida</FooterLink>
              </ul>
            </div>

            {/* Column 4: Contacto */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-anclora-gold">
                Contacto
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-anclora-gold mt-1">📞</span>
                  <a href="tel:+34971000000" className="hover-gold transition-colors">
                    +34 971 000 000
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-anclora-gold mt-1">✉️</span>
                  <a href="mailto:info@ancloraprivateestates.com" className="hover-gold transition-colors break-all">
                    info@ancloraprivateestates.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-anclora-gold mt-1">📍</span>
                  <div className="text-white/70">
                    Palma de Mallorca<br />
                    Islas Baleares, España
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - REFERENCIA OBLIGATORIA A ANCLORA NEXUS GROUP */}
      <div className="py-6">
        <div className="container mx-auto px-6 max-w-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p className="font-montserrat">
              © 2026 Anclora Private Estates. Una iniciativa de{' '}
              <a 
                href="https://ancloranexusgroup.com" 
                className="text-anclora-gold hover:text-anclora-gold-light transition-colors"
              >
                Anclora Nexus Group
              </a>
            </p>
            <div className="flex gap-6 font-montserrat">
              <Link href="/legal/privacidad" className="hover-gold transition-colors">
                Privacidad
              </Link>
              <Link href="/legal/cookies" className="hover-gold transition-colors">
                Cookies
              </Link>
              <Link href="/legal/terminos" className="hover-gold transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <li>
      <Link 
        href={href}
        className="font-montserrat text-white/70 hover:text-anclora-gold transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

const SocialLink: React.FC<{ href: string; icon: string }> = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full border border-white/20 hover:border-anclora-gold hover:bg-anclora-gold/10 transition-all"
    >
      {/* Icon SVG aquí */}
    </a>
  );
};
```

---

# PARTE II: SKILL WEB PRINCIPAL

## 4. ARQUITECTURA WEB CORPORATIVA

### 4.1 Objetivo de la Web Principal

**URL:** `https://ancloraprivateestates.com`

**Propósito:**
- Sitio corporativo completo de Anclora Private Estates
- Catálogo de propiedades de lujo en Mallorca
- Captación de inversores HNWI/UHNWI
- Generación de leads cualificados
- Hub de servicios inmobiliarios premium

**Stack Tecnológico:**
```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript 5.x (Strict Mode)",
  "styling": "Tailwind CSS 3.4+",
  "i18n": "next-intl 3.0",
  "database": "Redis 7.x (BullMQ)",
  "cms": "Sanity.io (para blog)",
  "deployment": "Docker + AWS ECS"
}
```

### 4.2 Páginas Principales (Mapa del Sitio)

```
https://ancloraprivateestates.com/
├── / (Homepage)
│   ├── Hero con video background
│   ├── Problem/Opportunity (Inversor vs Vendedor)
│   ├── Featured Properties (6 destacadas)
│   ├── Location Showcase (Son Vida, Port d'Andratx, Bendinat)
│   ├── Services Overview
│   ├── Testimonials
│   └── Final CTA
│
├── /propiedades
│   ├── Catálogo completo con filtros avanzados
│   ├── /propiedades/[slug] (Detalle de propiedad)
│   └── /propiedades/ubicacion/[slug] (Landing SEO por zona)
│
├── /servicios
│   ├── /servicios/compra
│   ├── /servicios/venta
│   ├── /servicios/valoracion
│   └── /servicios/gestion
│
├── /inversores
│   ├── Tesis de inversión
│   ├── Data Lab (ROI calculator)
│   ├── Market insights
│   └── CTA cualificación
│
├── /partners
│   ├── Propuesta colaboración B2B
│   ├── Beneficios y comisiones
│   ├── Portal de registro
│   └── Sistema de atribución
│
├── /nosotros
│   ├── Historia y misión
│   ├── Equipo
│   ├── Valores
│   └── Certificaciones
│
├── /blog
│   ├── Artículos de mercado inmobiliario
│   ├── Guías de zonas
│   └── Consejos de inversión
│
├── /contacto
│   └── Formulario con lead scoring
│
├── /valoracion
│   └── Formulario de tasación
│
└── /legal
    ├── /legal/privacidad
    ├── /legal/cookies
    └── /legal/terminos
```

---

## 5. ESTRUCTURA DE DIRECTORIOS WEB PRINCIPAL

### 5.1 Scaffold Completo

```
anclora-private-estates/ (WEB PRINCIPAL)
│
├── .specify/                           # ⚡ NÚCLEO SDD
│   ├── memory/
│   │   └── constitution.md             # Constitución del proyecto
│   ├── templates/
│   │   ├── feature-request.md
│   │   └── bug-report.md
│   └── specs/
│       ├── homepage.md
│       ├── property-detail.md
│       └── lead-scoring.md
│
├── app/                                # Next.js 15 App Router
│   ├── [locale]/                       # Rutas localizadas (es/en/de)
│   │   ├── layout.tsx                  # ⚡ CRÍTICO - Layout raíz
│   │   ├── page.tsx                    # Homepage
│   │   │
│   │   ├── propiedades/
│   │   │   ├── page.tsx                # Catálogo de propiedades
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx            # Detalle de propiedad
│   │   │   └── ubicacion/
│   │   │       └── [slug]/
│   │   │           └── page.tsx        # Landing SEO por zona
│   │   │
│   │   ├── servicios/
│   │   │   ├── page.tsx
│   │   │   ├── compra/
│   │   │   ├── venta/
│   │   │   ├── valoracion/
│   │   │   └── gestion/
│   │   │
│   │   ├── inversores/
│   │   │   └── page.tsx                # Journey inversor
│   │   │
│   │   ├── partners/
│   │   │   └── page.tsx                # Journey partners
│   │   │
│   │   ├── nosotros/
│   │   │   └── page.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   │
│   │   ├── valoracion/
│   │   │   └── page.tsx
│   │   │
│   │   └── legal/
│   │       ├── privacidad/
│   │       ├── cookies/
│   │       └── terminos/
│   │
│   ├── api/                            # API Routes
│   │   ├── whatsapp/
│   │   │   └── webhook/
│   │   │       └── route.ts            # ⚡ CRÍTICO - Evolution API webhook
│   │   ├── leads/
│   │   │   ├── route.ts                # Captura de leads
│   │   │   └── score/
│   │   │       └── route.ts            # Lead scoring endpoint
│   │   └── properties/
│   │       └── route.ts
│   │
│   └── globals.css                     # Estilos globales
│
├── components/                         # Componentes React
│   ├── ui/                             # Design System (desde Brand Kit)
│   │   ├── Button.tsx                  # ⚡ Del Brand Kit
│   │   ├── Card.tsx                    # ⚡ Del Brand Kit
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   └── OptimizedImage.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx                  # ⚡ Del Brand Kit
│   │   ├── Footer.tsx                  # ⚡ Del Brand Kit
│   │   ├── LanguageToggle.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   │
│   ├── home/                           # Componentes específicos de Homepage
│   │   ├── Hero.tsx
│   │   ├── ProblemOpportunity.tsx
│   │   ├── FeaturedProperties.tsx
│   │   ├── LocationShowcase.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── Testimonials.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── properties/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   ├── PropertyFilters.tsx
│   │   ├── PropertyGallery.tsx
│   │   ├── PropertySpecs.tsx
│   │   └── PropertyMap.tsx
│   │
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── ValuationForm.tsx
│   │   └── PartnerRegistrationForm.tsx
│   │
│   └── shared/
│       ├── ScrollReveal.tsx            # Animaciones scroll
│       ├── ImageGallery.tsx
│       └── VideoPlayer.tsx
│
├── services/                           # Lógica de Negocio (Backend)
│   ├── lead-scoring/
│   │   ├── scoring-engine.ts           # ⚡ CRÍTICO - Algoritmo de scoring
│   │   └── crm-integration.ts          # Integración con Twenty CRM
│   │
│   ├── whatsapp/
│   │   ├── bot-engine.ts               # ⚡ CRÍTICO - WhatsApp Bot AI
│   │   ├── queue-processor.ts          # Worker de BullMQ
│   │   └── templates.ts                # Plantillas de mensajes
│   │
│   ├── properties/
│   │   ├── property-service.ts
│   │   └── property-filters.ts
│   │
│   └── email/
│       ├── email-service.ts
│       └── templates/
│
├── lib/                                # Utilidades y Configuración
│   ├── config.ts                       # ⚡ CRÍTICO - Configuración central
│   ├── metadata.ts                     # SEO metadata generator
│   ├── utils.ts
│   ├── validation.ts                   # Esquemas Zod
│   └── security.ts                     # HMAC, sanitización
│
├── data/                               # Datos Estáticos
│   ├── properties/
│   │   └── properties.json             # Propiedades (mock o desde CMS)
│   │
│   ├── location-guides.ts              # ⚡ CRÍTICO - Guías SEO geográfico
│   └── testimonials.json
│
├── locales/                            # Traducciones i18n
│   ├── es/
│   │   ├── common.json
│   │   ├── properties.json
│   │   ├── legal.json
│   │   └── forms.json
│   ├── en/
│   └── de/
│
├── public/                             # Assets Estáticos
│   ├── assets/
│   │   ├── brand/                      # ⚡ Logos del Brand Kit
│   │   │   ├── logo-anclora-full-gold.svg
│   │   │   ├── logo-anclora-full-navy.svg
│   │   │   └── logo-anclora-nexus-group.svg
│   │   ├── videos/
│   │   │   └── hero-background.mp4
│   │   └── images/
│   │       ├── properties/
│   │       └── locations/
│   └── fonts/
│
├── docker/                             # Infraestructura
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
│
├── docs/                               # Documentación
│   ├── WHATSAPP_WEBHOOK_SYSTEM.md
│   ├── DEPLOYMENT.md
│   └── API_DOCUMENTATION.md
│
├── .env.example                        # Variables de entorno template
├── .eslintrc.json
├── .prettierrc
├── next.config.ts                      # ⚡ CRÍTICO - Config Next.js
├── tailwind.config.ts                  # ⚡ CRÍTICO - Design System
├── tsconfig.json
├── package.json
└── README.md
```

---

## 6. ARCHIVOS CRÍTICOS WEB PRINCIPAL

### 6.1 lib/config.ts (Configuración Central)

```typescript
// FILE: lib/config.ts
import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  // Identidad de Marca
  name: 'Anclora Private Estates',
  shortName: 'Anclora',
  domain: 'ancloraprivateestates.com',
  version: '1.0.0',
  
  // Taglines Multiidioma
  tagline: {
    es: 'El privilegio de la privacidad en el Mediterráneo',
    en: 'The privilege of privacy in the Mediterranean',
    de: 'Das Privileg der Privatsphäre im Mittelmeer',
  },
  
  // Descripción SEO
  description: {
    es: 'Agencia inmobiliaria de lujo en Mallorca. Propiedades exclusivas, confidencialidad absoluta y asesoría integral para inversores de alto patrimonio.',
    en: 'Luxury real estate agency in Mallorca. Exclusive properties, absolute confidentiality, and comprehensive advisory for high-net-worth investors.',
    de: 'Luxusimmobilienagentur auf Mallorca. Exklusive Immobilien, absolute Diskretion und umfassende Beratung für vermögende Investoren.',
  },

  // i18n Configuration
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'de'],
    localeLabels: {
      es: 'Español',
      en: 'English',
      de: 'Deutsch',
    },
  },

  // Información de Contacto
  contact: {
    email: 'info@ancloraprivateestates.com',
    phone: '+34 971 000 000',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+34600000000',
    address: {
      line1: 'Paseo del Borne, 15',
      line2: '07012 Palma de Mallorca',
      region: 'Islas Baleares, España',
    },
    social: {
      instagram: 'https://instagram.com/ancloraprivateestates',
      linkedin: 'https://linkedin.com/company/anclora-private-estates',
      facebook: 'https://facebook.com/ancloraprivateestates',
    },
  },

  // Sistema de Diseño (Mapeo a Tailwind)
  theme: {
    colors: {
      primary: '#D4AF37',       // Anclora Gold
      primaryLight: '#E6C96E',
      primaryDark: '#B9915F',
      secondary: '#2C3E50',     // Navy Blue
      background: '#F5F5F0',    // Cream
      text: '#1A1A1A',
    },
    fonts: {
      heading: 'var(--font-playfair)',
      body: 'var(--font-montserrat)',
    },
  },

  // Feature Flags
  features: {
    enableBlog: true,
    enableWhatsAppBot: true,
    enableLeadScoring: true,
    enableDarkMode: false,
    enableInvestorJourney: true,
    enablePartnerPortal: true,
  },

  // Configuración de Propiedades
  properties: {
    currency: 'EUR',
    priceRanges: [
      { min: 1000000, max: 2500000, label: '1M€ - 2.5M€' },
      { min: 2500000, max: 5000000, label: '2.5M€ - 5M€' },
      { min: 5000000, max: 10000000, label: '5M€ - 10M€' },
      { min: 10000000, max: null, label: '> 10M€' },
    ],
    defaultLocation: {
      lat: 39.5696,
      lng: 2.6502, // Palma
      zoom: 12,
    },
  },
  
  // Webhooks n8n
  webhooks: {
    leadCapture: process.env.N8N_WEBHOOK_LEAD_CAPTURE || '',
    propertyInquiry: process.env.N8N_WEBHOOK_PROPERTY_INQUIRY || '',
    partnerRegistration: process.env.N8N_WEBHOOK_PARTNER_REG || '',
  },
};
```

### 6.2 app/[locale]/layout.tsx

```typescript
// FILE: app/[locale]/layout.tsx
import React from 'react';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/config';
import '@/app/globals.css';

// ⚡ Configuración de Fuentes (OBLIGATORIO)
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Metadatos SEO Base
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.es,
  keywords: ['propiedades de lujo', 'Mallorca', 'real estate', 'HNWI', 'inversión inmobiliaria'],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ 
  children, 
  params: { locale } 
}: RootLayoutProps) {
  // Validación de Locale
  if (!siteConfig.i18n.locales.includes(locale as any)) {
    notFound();
  }

  // Carga de mensajes de traducción
  const messages = await getMessages();

  return (
    <html 
      lang={locale} 
      className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-anclora-cream text-anclora-black min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Header Universal */}
          <Header variant="transparent" showLanguageToggle={true} />
          
          {/* Contenido Principal */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* Footer Universal */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 6.3 tailwind.config.ts (Design System)

```typescript
// FILE: tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ⚡ Paleta Anclora (Del Brand Kit)
      colors: {
        anclora: {
          gold: {
            DEFAULT: '#D4AF37',
            light: '#E6C96E',
            dark: '#B9915F',
            10: 'rgba(212, 175, 55, 0.1)',
            20: 'rgba(212, 175, 55, 0.2)',
          },
          navy: {
            DEFAULT: '#2C3E50',
            light: '#34495E',
            dark: '#1A252F',
          },
          bronze: {
            DEFAULT: '#B9915F',
            light: '#C9A578',
            dark: '#9A7A4F',
          },
          cream: '#F5F5F0',
          stone: '#EAEAE5',
          white: '#FFFFFF',
          black: '#1A1A1A',
        },
      },
      
      // ⚡ Tipografía
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      
      // ⚡ Espaciado (Del Brand Kit)
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '7.5rem',
        'section-xl': '10rem',
      },
      
      // ⚡ Max Width
      maxWidth: {
        'container': '1440px',
      },
      
      // ⚡ Gaps
      gap: {
        'cards': '2rem',
        'grid': '1.5rem',
      },
      
      // ⚡ Gradientes
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E6C96E 100%)',
        'navy-gradient': 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B9915F 50%, #2C3E50 100%)',
      },
      
      // ⚡ Sombras
      boxShadow: {
        'anclora-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'anclora': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'anclora-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'anclora-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'anclora-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'gold': '0 10px 30px rgba(212, 175, 55, 0.15), 0 0 20px rgba(212, 175, 55, 0.1)',
      },
      
      // ⚡ Animaciones
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

### 6.4 services/lead-scoring/scoring-engine.ts

```typescript
// FILE: services/lead-scoring/scoring-engine.ts

/**
 * ⚡ ALGORITMO DE LEAD SCORING ANCLORA
 * Sistema de calificación ponderada para leads HNWI/UHNWI
 */

interface LeadInput {
  budget?: number;
  timeline?: 'immediate' | '1-3_months' | '3-6_months' | '6+_months' | 'browsing';
  hasPhone: boolean;
  hasEmail: boolean;
  interactionCount: number;
  source: string;
  propertyType?: string;
  location?: string;
}

interface ScoreResult {
  score: number;        // 0-100
  temperature: 'cold' | 'warm' | 'hot';
  priority: 'low' | 'medium' | 'high';
  reasoning: string[];
}

export class LeadScoringEngine {
  // Pesos de variables (Total = 1.00)
  private static readonly WEIGHTS = {
    BUDGET: 0.35,      // 35% - Capacidad económica
    TIMELINE: 0.25,    // 25% - Urgencia
    COMPLETENESS: 0.20, // 20% - Completitud de datos
    INTERACTION: 0.20,  // 20% - Nivel de engagement
  };

  /**
   * Calcula el score del lead
   */
  public static calculateScore(input: LeadInput): ScoreResult {
    let score = 0;
    const reasoning: string[] = [];

    // 1. BUDGET SCORING (35%)
    if (input.budget) {
      if (input.budget >= 5000000) {
        score += 100 * this.WEIGHTS.BUDGET;
        reasoning.push('Presupuesto UHNWI (>5M€)');
      } else if (input.budget >= 2000000) {
        score += 80 * this.WEIGHTS.BUDGET;
        reasoning.push('Presupuesto HNWI (2M-5M€)');
      } else if (input.budget >= 1000000) {
        score += 60 * this.WEIGHTS.BUDGET;
        reasoning.push('Presupuesto estándar lujo (1M-2M€)');
      } else {
        score += 40 * this.WEIGHTS.BUDGET;
        reasoning.push('Presupuesto bajo para segmento');
      }
    }

    // 2. TIMELINE SCORING (25%)
    switch (input.timeline) {
      case 'immediate':
        score += 100 * this.WEIGHTS.TIMELINE;
        reasoning.push('Compra inmediata (máxima urgencia)');
        break;
      case '1-3_months':
        score += 80 * this.WEIGHTS.TIMELINE;
        reasoning.push('Timeline corto (1-3 meses)');
        break;
      case '3-6_months':
        score += 50 * this.WEIGHTS.TIMELINE;
        reasoning.push('Timeline medio (3-6 meses)');
        break;
      case '6+_months':
        score += 30 * this.WEIGHTS.TIMELINE;
        reasoning.push('Timeline largo (6+ meses)');
        break;
      default:
        score += 10 * this.WEIGHTS.TIMELINE;
        reasoning.push('Solo explorando');
    }

    // 3. COMPLETENESS SCORING (20%)
    if (input.hasPhone && input.hasEmail) {
      score += 100 * this.WEIGHTS.COMPLETENESS;
      reasoning.push('Datos completos (teléfono + email)');
    } else if (input.hasPhone || input.hasEmail) {
      score += 50 * this.WEIGHTS.COMPLETENESS;
      reasoning.push('Datos parciales');
    } else {
      reasoning.push('Datos mínimos');
    }

    // 4. INTERACTION SCORING (20%)
    // Cada interacción = 5 puntos, máximo 100
    const interactionScore = Math.min(input.interactionCount * 5, 100);
    score += interactionScore * this.WEIGHTS.INTERACTION;
    reasoning.push(`${input.interactionCount} interacciones registradas`);

    // CLASIFICACIÓN FINAL
    return this.classifyLead(Math.round(score), reasoning);
  }

  /**
   * Clasifica el lead según score
   */
  private static classifyLead(score: number, reasoning: string[]): ScoreResult {
    if (score >= 80) {
      return { 
        score, 
        temperature: 'hot', 
        priority: 'high',
        reasoning: [...reasoning, '🔥 Lead HOT - Acción inmediata'],
      };
    } else if (score >= 50) {
      return { 
        score, 
        temperature: 'warm', 
        priority: 'medium',
        reasoning: [...reasoning, '🟡 Lead WARM - Seguimiento cercano'],
      };
    } else {
      return { 
        score, 
        temperature: 'cold', 
        priority: 'low',
        reasoning: [...reasoning, '❄️ Lead COLD - Nurturing'],
      };
    }
  }
}
```

### 6.5 data/location-guides.ts (SEO Geográfico)

```typescript
// FILE: data/location-guides.ts

/**
 * ⚡ GUÍAS DE UBICACIÓN PARA SEO GEOGRÁFICO (GEO)
 * Optimizado para ser citado por Perplexity, ChatGPT, Google SGE
 */

export interface LocationGuide {
  slug: string;
  name: {
    es: string;
    en: string;
    de: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
  };
  lifestyle: string[];
  marketData: {
    avgPriceSqm: number;
    appreciation5y: number;
    avgPropertyPrice: number;
    inventory: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  faqs: Array<{
    question: { es: string; en: string; de: string };
    answer: { es: string; en: string; de: string };
  }>;
}

export const locationGuides: LocationGuide[] = [
  {
    slug: 'son-vida',
    name: {
      es: 'Son Vida',
      en: 'Son Vida',
      de: 'Son Vida',
    },
    description: {
      es: 'Zona residencial de ultra lujo con campos de golf de categoría mundial, colegios internacionales y vistas panorámicas a Palma. El barrio más exclusivo de Mallorca.',
      en: 'Ultra-luxury residential area with world-class golf courses, international schools, and panoramic views of Palma. Mallorca\'s most exclusive neighborhood.',
      de: 'Ultra-Luxus-Wohngebiet mit erstklassigen Golfplätzen, internationalen Schulen und Panoramablick auf Palma. Mallorcas exklusivstes Viertel.',
    },
    lifestyle: ['Golf', 'Privacy', 'International Schools', 'Fine Dining', 'Luxury Shopping'],
    marketData: {
      avgPriceSqm: 8500,
      appreciation5y: 42,
      avgPropertyPrice: 3200000,
      inventory: 24,
    },
    coordinates: {
      lat: 39.5852,
      lng: 2.6485,
    },
    faqs: [
      {
        question: {
          es: '¿Por qué invertir en Son Vida?',
          en: 'Why invest in Son Vida?',
          de: 'Warum in Son Vida investieren?',
        },
        answer: {
          es: 'Son Vida es la zona más exclusiva de Mallorca con revalorización constante del 8-10% anual. La limitada oferta de terrenos y la demanda de inversores UHNWI garantizan estabilidad del mercado.',
          en: 'Son Vida is Mallorca\'s most exclusive area with consistent 8-10% annual appreciation. Limited land supply and UHNWI demand ensure market stability.',
          de: 'Son Vida ist Mallorcas exklusivstes Gebiet mit konstanter Wertsteigerung von 8-10% pro Jahr. Begrenztes Landangebot und UHNWI-Nachfrage garantieren Marktstabilität.',
        },
      },
      {
        question: {
          es: '¿Qué tipo de propiedades hay en Son Vida?',
          en: 'What type of properties are in Son Vida?',
          de: 'Welche Art von Immobilien gibt es in Son Vida?',
        },
        answer: {
          es: 'Predominan villas de lujo modernas y clásicas, con parcelas de 1000-3000m² y construcciones de 400-800m². Muchas cuentan con campos de golf adyacentes y vistas al mar.',
          en: 'Modern and classic luxury villas predominate, with plots of 1000-3000m² and constructions of 400-800m². Many feature adjacent golf courses and sea views.',
          de: 'Es dominieren moderne und klassische Luxusvillen mit Grundstücken von 1000-3000m² und Gebäuden von 400-800m². Viele verfügen über angrenzende Golfplätze und Meerblick.',
        },
      },
    ],
  },
  
  {
    slug: 'port-andratx',
    name: {
      es: 'Port d\'Andratx',
      en: 'Port d\'Andratx',
      de: 'Port d\'Andratx',
    },
    description: {
      es: 'Puerto natural con yates de lujo, restaurantes gourmet y galerías de arte. La zona favorita de inversores internacionales que buscan estilo de vida mediterráneo auténtico.',
      en: 'Natural harbor with luxury yachts, gourmet restaurants, and art galleries. The favorite area for international investors seeking authentic Mediterranean lifestyle.',
      de: 'Natürlicher Hafen mit Luxusyachten, Gourmetrestaurants und Kunstgalerien. Die bevorzugte Gegend für internationale Investoren auf der Suche nach authentischem mediterranem Lebensstil.',
    },
    lifestyle: ['Yachting', 'Gastronomy', 'Art Galleries', 'Hiking', 'Water Sports'],
    marketData: {
      avgPriceSqm: 9200,
      appreciation5y: 48,
      avgPropertyPrice: 4500000,
      inventory: 18,
    },
    coordinates: {
      lat: 39.5424,
      lng: 2.3876,
    },
    faqs: [
      {
        question: {
          es: '¿Qué hace especial a Port d\'Andratx?',
          en: 'What makes Port d\'Andratx special?',
          de: 'Was macht Port d\'Andratx besonders?',
        },
        answer: {
          es: 'Combina la privacidad de un pueblo mediterráneo auténtico con infraestructura de lujo. Su puerto natural protegido permite amarre de megayates, mientras mantiene el encanto de pescadores.',
          en: 'It combines the privacy of an authentic Mediterranean village with luxury infrastructure. Its protected natural harbor allows megayacht mooring while maintaining fishing charm.',
          de: 'Es verbindet die Privatsphäre eines authentischen mediterranen Dorfes mit Luxusinfrastruktur. Sein geschützter Naturhafen ermöglicht Megayacht-Liegeplätze bei Erhaltung des Fischercharmes.',
        },
      },
    ],
  },
  
  {
    slug: 'bendinat',
    name: {
      es: 'Bendinat',
      en: 'Bendinat',
      de: 'Bendinat',
    },
    description: {
      es: 'Urbanización residencial premium con club de golf, playas privadas y proximidad a Palma. Ideal para familias HNWI que buscan seguridad y servicios de primer nivel.',
      en: 'Premium residential development with golf club, private beaches, and proximity to Palma. Ideal for HNWI families seeking security and first-class services.',
      de: 'Premium-Wohnsiedlung mit Golfclub, Privatstränden und Nähe zu Palma. Ideal für HNWI-Familien, die Sicherheit und erstklassigen Service suchen.',
    },
    lifestyle: ['Golf', 'Beaches', 'Security', 'Family-Friendly', 'Tennis'],
    marketData: {
      avgPriceSqm: 7800,
      appreciation5y: 38,
      avgPropertyPrice: 2800000,
      inventory: 32,
    },
    coordinates: {
      lat: 39.5483,
      lng: 2.5746,
    },
    faqs: [
      {
        question: {
          es: '¿Es Bendinat adecuado para familias?',
          en: 'Is Bendinat suitable for families?',
          de: 'Ist Bendinat für Familien geeignet?',
        },
        answer: {
          es: 'Sí, es la zona preferida por familias HNWI. Cuenta con colegios internacionales a 10 min, seguridad privada 24/7, y servicios como clubes deportivos y actividades para niños.',
          en: 'Yes, it is the preferred area for HNWI families. Features international schools 10 min away, 24/7 private security, and services like sports clubs and children\'s activities.',
          de: 'Ja, es ist die bevorzugte Gegend für HNWI-Familien. Verfügt über internationale Schulen 10 Min. entfernt, 24/7-Privatsicherheit und Dienstleistungen wie Sportclubs und Kinderaktivitäten.',
        },
      },
    ],
  },
];
```

---

# PARTE III: SKILL APPS ECOSISTEMA

## 7. ARQUITECTURA APPS ECOSISTEMA

### 7.1 Objetivo de las Apps del Ecosistema

**Definición:**
Landing pages especializadas para proyectos inmobiliarios específicos dentro del portfolio de Anclora Private Estates.

**Ejemplos:**
- **Azure Bay** - Desarrollo inmobiliario en Cala d'Or
- **Playa Viva** - Proyecto residencial en zona costera
- **[Proyecto X]** - Futuras landing pages

**Características:**
- URL independiente (ej. `azurebay.ancloraprivateestates.com`)
- Branding coherente con Anclora (paleta, tipografía)
- Enfoque en un SOLO proyecto/desarrollo
- Captura de leads específica al proyecto
- Integración con CRM (mismo sistema que web principal)

### 7.2 Diferencias Web Principal vs Apps Ecosistema

| Aspecto | Web Principal | Apps Ecosistema |
|---------|---------------|-----------------|
| **URL** | `ancloraprivateestates.com` | `[proyecto].ancloraprivateestates.com` |
| **Alcance** | Catálogo completo + servicios | Un solo proyecto inmobiliario |
| **Páginas** | 15-20 páginas | 5-8 páginas |
| **Navegación** | Compleja (multi-nivel) | Simple (single-page o minimal) |
| **SEO** | Multi-keyword amplio | Keyword específica del proyecto |
| **Lead Capture** | General (cualquier propiedad) | Específica (solo este proyecto) |
| **Complejidad** | Alta (blog, CRM, WhatsApp, etc.) | Media (landing optimizada) |

### 7.3 Brand Kit en Apps Ecosistema

**CRÍTICO:** Todas las apps del ecosistema DEBEN:
- ✅ Usar la MISMA paleta Anclora (Gold/Navy/Bronze)
- ✅ Usar las MISMAS fuentes (Playfair Display + Montserrat)
- ✅ Usar los MISMOS componentes base (Button, Card, Header, Footer)
- ✅ Incluir referencia a Anclora Nexus Group en footer
- ✅ Mantener la misma estética glassmorphism y transiciones

**FLEXIBLE:**
- Imágenes específicas del proyecto
- Copy adaptado al desarrollo
- Estructura de página simplificada
- CTAs enfocados en el proyecto

---

## 8. TIPOS DE APLICACIONES

### 8.1 Tipo A: Landing Page Proyecto Inmobiliario

**Descripción:**
Página única (o multi-sección scroll) para un desarrollo inmobiliario específico.

**Ejemplo:** Azure Bay Landing Page

**Estructura típica:**
```
https://azurebay.ancloraprivateestates.com/
│
├── Hero (Video/Imagen del proyecto)
├── Project Overview (Descripción)
├── Location (Mapa + ventajas de la zona)
├── Residences (Tipos de viviendas)
├── Amenities (Piscina, gym, jardines...)
├── Gallery (Renders/Fotos)
├── Contact Form (Lead capture)
└── Footer (Referencia Anclora)
```

**Stack:**
- Next.js 15 (simple, sin blog ni CRM complejo)
- Tailwind CSS (mismo design system)
- Formulario → n8n webhook (mismo que web principal)
- Despliegue: Docker (subdomain en AWS)

### 8.2 Tipo B: Landing Page Ubicación Premium

**Descripción:**
Página para promocionar una zona geográfica específica (no un proyecto).

**Ejemplo:** "Southwest Mallorca Luxury Collection"

**Estructura típica:**
```
https://southwest.ancloraprivateestates.com/
│
├── Hero (Lifestyle de la zona)
├── Why This Area (Beneficios de inversión)
├── Featured Properties (6-8 propiedades en la zona)
├── Market Insights (Gráficos de revalorización)
├── Lifestyle (Restaurantes, golf, yates...)
├── Contact Form
└── Footer
```

### 8.3 Tipo C: Landing Page Evento/Campaña

**Descripción:**
Página temporal para evento (ej. Open House, Feria Inmobiliaria).

**Ejemplo:** "Anclora VIP Preview Weekend"

**Estructura típica:**
```
https://vippreview.ancloraprivateestates.com/
│
├── Hero (Fecha y llamado a la acción)
├── Event Details
├── Properties Showcased
├── RSVP Form (con validación capacidad)
├── FAQ
└── Footer
```

---

## 9. ESTRUCTURA APPS LANDING PAGES

### 9.1 Scaffold Simplificado (Ejemplo Azure Bay)

```
azure-bay-landing/ (APP ECOSISTEMA - PROYECTO)
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md           # ⚡ Adaptada al proyecto
│   └── specs/
│       └── landing-page.md
│
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                # ⚡ Fuentes Anclora
│   │   └── page.tsx                  # Landing completa (single-page)
│   │
│   └── api/
│       └── leads/
│           └── route.ts              # Submit a n8n
│
├── components/
│   ├── ui/                           # ⚡ IMPORTAR del Brand Kit
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx                # ⚡ Simplificado (solo logo + idiomas)
│   │   └── Footer.tsx                # ⚡ Del Brand Kit
│   │
│   └── sections/                     # Secciones de la landing
│       ├── HeroSection.tsx
│       ├── ProjectOverview.tsx
│       ├── LocationSection.tsx
│       ├── ResidencesSection.tsx
│       ├── AmenitiesSection.tsx
│       ├── GallerySection.tsx
│       └── ContactSection.tsx
│
├── lib/
│   ├── config.ts                     # ⚡ Config específica del proyecto
│   └── utils.ts
│
├── data/
│   └── project-data.ts               # Datos del proyecto (residences, amenities)
│
├── locales/                          # Solo ES/EN (o según mercado)
│   ├── es/
│   └── en/
│
├── public/
│   ├── assets/
│   │   ├── brand/                    # ⚡ Logos Anclora
│   │   ├── videos/
│   │   │   └── azure-bay-hero.mp4
│   │   └── images/
│   │       ├── renders/
│   │       └── location/
│   └── fonts/
│
├── tailwind.config.ts                # ⚡ MISMO que web principal
├── next.config.ts
├── package.json
└── README.md
```

### 9.2 Archivos Críticos Apps Ecosistema

#### lib/config.ts (Proyecto específico)

```typescript
// FILE: lib/config.ts (Azure Bay)
export const projectConfig = {
  // Info del Proyecto
  name: 'Azure Bay',
  tagline: {
    es: 'Residencias de lujo frente al Mediterráneo',
    en: 'Luxury residences facing the Mediterranean',
  },
  description: {
    es: 'Desarrollo exclusivo de 24 residencias en Cala d\'Or con acceso directo al mar, piscina infinity y club privado.',
    en: 'Exclusive development of 24 residences in Cala d\'Or with direct sea access, infinity pool and private club.',
  },
  
  // Ubicación
  location: {
    name: 'Cala d\'Or',
    coordinates: { lat: 39.3750, lng: 3.2308 },
    region: 'Mallorca, España',
  },
  
  // Características del Proyecto
  project: {
    totalUnits: 24,
    typologies: ['2 bedrooms', '3 bedrooms', 'Penthouse'],
    priceRange: { min: 850000, max: 2500000 },
    deliveryDate: '2027-Q2',
    status: 'Pre-venta',
  },
  
  // Branding (HEREDADO DE ANCLORA)
  theme: {
    colors: {
      primary: '#D4AF37',      // ⚡ Anclora Gold
      secondary: '#2C3E50',    // ⚡ Anclora Navy
      // ... resto de paleta
    },
    fonts: {
      heading: 'var(--font-playfair)',
      body: 'var(--font-montserrat)',
    },
  },
  
  // Contacto
  contact: {
    email: 'azurebay@ancloraprivateestates.com',
    phone: '+34 971 000 111',
    whatsapp: '+34 600 000 111',
  },
  
  // n8n Webhook (Específico del proyecto)
  webhook: {
    leadCapture: process.env.N8N_WEBHOOK_AZURE_BAY_LEADS,
  },
  
  // i18n
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'], // Solo 2 idiomas para landing
  },
};
```

#### app/[locale]/page.tsx (Landing completa)

```tsx
// FILE: app/[locale]/page.tsx (Azure Bay)
import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectOverview } from '@/components/sections/ProjectOverview';
import { LocationSection } from '@/components/sections/LocationSection';
import { ResidencesSection } from '@/components/sections/ResidencesSection';
import { AmenitiesSection } from '@/components/sections/AmenitiesSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function AzureBayPage() {
  return (
    <>
      {/* Hero con video background */}
      <HeroSection 
        videoSrc="/assets/videos/azure-bay-hero.mp4"
        title="Azure Bay"
        subtitle="Residencias de lujo frente al Mediterráneo"
      />
      
      {/* Overview del proyecto */}
      <ProjectOverview />
      
      {/* Ubicación y ventajas */}
      <LocationSection />
      
      {/* Tipologías de residencias */}
      <ResidencesSection />
      
      {/* Amenities (piscina, gym, etc.) */}
      <AmenitiesSection />
      
      {/* Galería de renders */}
      <GallerySection />
      
      {/* Formulario de contacto */}
      <ContactSection />
    </>
  );
}
```

---

# PARTE IV: SISTEMA OPERATIVO

## 10. ONBOARDING ADAPTATIVO

### 10.1 Detección Automática de Tipo de Proyecto

**El agente Anti-Gravity pregunta:**

```
¿Qué tipo de aplicación vas a crear?

1. 🏢 Web Principal Anclora Private Estates
   - Sitio corporativo completo
   - Catálogo de propiedades
   - Blog, servicios, inversores, partners
   
2. 🏝️ Landing Page Proyecto Inmobiliario
   - Página para un desarrollo específico
   - Ejemplo: Azure Bay, Playa Viva
   
3. 📍 Landing Page Ubicación Premium
   - Página para promover una zona geográfica
   - Ejemplo: "Southwest Mallorca Collection"
   
4. 🎪 Landing Page Evento/Campaña
   - Página temporal para evento
   - Ejemplo: "VIP Preview Weekend"
```

### 10.2 Preguntas de Onboarding por Tipo

#### TIPO 1: Web Principal

```
Onboarding para Web Principal Anclora Private Estates:

1. ¿Nombre del proyecto? (default: "Anclora Private Estates")
2. ¿Dominio principal? (default: "ancloraprivateestates.com")
3. ¿Ubicaciones clave? (ej: Son Vida, Port d'Andratx, Bendinat)
4. ¿Perfil de inversor objetivo? (HNWI / UHNWI / Institucional / Mixto)
5. ¿Idiomas? (default: ES + EN + DE)
6. ¿Objetivo prioritario? (Inversores / Partners / Ambos)
7. ¿Habilitar blog? (Sí / No)
8. ¿Habilitar WhatsApp bot? (Sí / No)
9. ¿Modo producción? (Sí / No)
```

#### TIPO 2: Landing Page Proyecto

```
Onboarding para Landing Page Proyecto Inmobiliario:

1. ¿Nombre del proyecto? (ej: "Azure Bay")
2. ¿Subdominio? (ej: azurebay.ancloraprivateestates.com)
3. ¿Ubicación del proyecto? (ej: "Cala d'Or, Mallorca")
4. ¿Tipo de desarrollo? (Residencial / Mixto / Comercial)
5. ¿Número de unidades? (ej: 24)
6. ¿Tipologías? (ej: "2 bed, 3 bed, Penthouse")
7. ¿Rango de precios? (min / max en EUR)
8. ¿Fecha entrega estimada? (ej: "2027-Q2")
9. ¿Idiomas? (default: ES + EN)
10. ¿Estado del proyecto? (Pre-venta / En construcción / Listo)
```

#### TIPO 3 y 4: Landing Ubicación/Evento

(Similar estructura simplificada)

---

## 11. CONSTITUTION TEMPLATE

### 11.1 Constitution para Web Principal

```markdown
# CONSTITUCIÓN DEL PROYECTO - ANCLORA PRIVATE ESTATES

## 1. IDENTIDAD INMUTABLE

**Nombre:** Anclora Private Estates  
**Dominio:** ancloraprivateestates.com  
**Versión:** 1.0.0  
**Paradigma:** Spec-Driven Development (SDD)  

## 2. BRAND KIT (NO MODIFICABLE)

### Paleta de Colores
- Gold: #D4AF37
- Navy: #2C3E50
- Bronze: #B9915F
- Cream: #F5F5F0

**PROHIBIDO:** Cambiar estos colores bajo cualquier circunstancia.

### Tipografía
- Headings: Playfair Display
- Body: Montserrat

**PROHIBIDO:** Usar fuentes del sistema (Arial, Helvetica, etc.)

### Logos
- Variantes: Gold (fondos oscuros), Navy (fondos claros)
- Altura mínima: 40px desktop, 32px mobile

**PROHIBIDO:** Distorsionar proporciones o cambiar colores de logo.

## 3. STACK TECNOLÓGICO (MANDATORIO)

| Componente | Tecnología | No Negociable |
|------------|------------|---------------|
| Framework | Next.js 15 | ✅ |
| Lenguaje | TypeScript 5.x Strict | ✅ |
| Styling | Tailwind CSS 3.4+ | ✅ |
| i18n | next-intl | ✅ |
| Queue | Redis + BullMQ | ✅ |
| Deploy | Docker + AWS ECS | ✅ |

**PROHIBIDO:** Usar Vue, Angular, CSS-in-JS, o cualquier stack no especificado.

## 4. ARQUITECTURA (INMUTABLE)

### Estructura de Directorios
Seguir EXACTAMENTE el scaffold definido en `project-scaffold-spec.md`.

**PROHIBIDO:** 
- Reorganizar carpetas principales (app/, components/, services/)
- Mezclar lógica de negocio en componentes UI
- Hardcodear credenciales en código

### Archivos Críticos
Los siguientes archivos DEBEN existir con el contenido exacto especificado:
- `.specify/memory/constitution.md`
- `lib/config.ts`
- `app/[locale]/layout.tsx`
- `tailwind.config.ts`
- `services/lead-scoring/scoring-engine.ts`

## 5. REGLAS DE i18n (OBLIGATORIAS)

**PROHIBIDO ABSOLUTAMENTE:**
- Hardcodear texto en JSX/TSX
- Usar texto plano sin traducción
- Omitir idioma en archivos de traducción

**OBLIGATORIO:**
- Todo texto visible → `t('key')`
- Rutas localizadas → `/[locale]/...`
- 3 idiomas: ES (default), EN, DE

## 6. COMPONENTES REUTILIZABLES (BRAND KIT)

**OBLIGATORIO usar estos componentes:**
- `<Button />` (del Brand Kit)
- `<Card />` (del Brand Kit)
- `<Header />` (del Brand Kit)
- `<Footer />` (del Brand Kit con referencia Nexus Group)

**PROHIBIDO:**
- Crear botones custom sin usar el componente
- Crear headers/footers que no sigan el template

## 7. JOURNEYS (SEPARACIÓN OBLIGATORIA)

**Inversor Journey:**
- Tesis de inversión
- Data Lab
- ROI calculators
- CTA: "Agendar Llamada Cualificación"

**Partner Journey:**
- Propuesta B2B
- Beneficios claros
- CTA: "Unirse a la Red"

**PROHIBIDO:** Mezclar mensajes entre journeys.

## 8. LEAD SCORING (ALGORITMO FIJO)

Pesos:
- Budget: 35%
- Timeline: 25%
- Completeness: 20%
- Interaction: 20%

**PROHIBIDO:** Cambiar pesos sin aprobación explícita.

## 9. SEO (GEO OPTIMIZATION)

**OBLIGATORIO:**
- Schema.org markup en propiedades
- FAQs estructuradas en location guides
- Meta descriptions multiidioma
- Sitemap.xml actualizado

**PROHIBIDO:**
- Prometer rentabilidad específica
- Usar lenguaje de asesoramiento financiero sin licencia

## 10. MODO PRODUCCIÓN

**Checks obligatorios:**
- Coherence Check (URLs, imágenes, validación)
- Compliance Check (disclaimers, GDPR)
- Performance Check (Lighthouse > 90)

**BLOQUEA RELEASE si falla algún check crítico.**

---

**Última actualización:** 24 Enero 2026  
**Versión Constitution:** 1.0.0  
**Esta Constitución es LAW. No se modifica sin consenso del equipo.**
```

---

## 12. SISTEMA QA/KPIS

### 12.1 KPIs Automáticos (Web Principal)

| KPI | Métrica | Target | Crítico |
|-----|---------|--------|---------|
| **Conversión Lead Cualificado** | % formularios completos | > 15% | ✅ |
| **Profundidad Cualificación** | Campos completados (teléfono + budget) | > 60% | ✅ |
| **Densidad Señales Confianza** | Track record visible, testimonios | 4/5 | ❌ |
| **Claridad CTA Inversor** | Tiempo a primer clic CTA | < 10s | ✅ |
| **Tiempo Primera Acción** | Segundos hasta scroll o clic | < 5s | ❌ |
| **Drop-off Formulario** | % abandonos | < 40% | ✅ |
| **Lighthouse Performance** | Score Google Lighthouse | > 90 | ✅ (Producción) |
| **Core Web Vitals** | LCP < 2.5s, FID < 100ms, CLS < 0.1 | ✅ | ✅ (Producción) |

### 12.2 KPIs Apps Ecosistema (Simplificados)

| KPI | Métrica | Target |
|-----|---------|--------|
| **Bounce Rate** | % abandonos en < 10s | < 50% |
| **Form Completion** | % formularios enviados | > 10% |
| **Time on Page** | Tiempo medio en landing | > 2 min |
| **CTA Clicks** | Clics en botón principal | > 20% visitantes |

### 12.3 Evaluación y Scoring

**Modo Desarrollo:**
- Score global >= 4/5 → ✅ Aprobado
- Score < 4/5 en KPIs críticos → ⚠️ Iteración obligatoria

**Modo Producción:**
- Score < 3/5 en KPI crítico → 🚫 BLOQUEA release
- Requiere ejecutar Coherence + Compliance Checks

---

## 13. INSTRUCCIONES PARA ANTI-GRAVITY

### 13.1 Workflow del Agente

```
PASO 1: ONBOARDING
├─ Detectar tipo de proyecto (Web Principal / Landing Proyecto / Landing Ubicación / Landing Evento)
├─ Hacer preguntas según tipo
└─ Almacenar parámetros en memoria persistente

PASO 2: GENERACIÓN DE SCAFFOLD
├─ Crear estructura de directorios según tipo
├─ Generar .specify/memory/constitution.md
└─ Crear archivos críticos con contenido mandatorio

PASO 3: POBLADO DE BRAND KIT
├─ Copiar componentes del Brand Kit (Button, Card, Header, Footer)
├─ Configurar tailwind.config.ts con paleta Anclora
├─ Cargar fuentes Playfair Display + Montserrat
└─ Crear lib/config.ts con datos del proyecto

PASO 4: CONTENIDO ESPECÍFICO
├─ Si WEB PRINCIPAL:
│  ├─ Generar páginas: /, /propiedades, /servicios, /inversores, /partners, /blog
│  ├─ Implementar lead-scoring/scoring-engine.ts
│  ├─ Configurar WhatsApp webhook
│  └─ Poblar data/location-guides.ts
│
├─ Si LANDING PROYECTO:
│  ├─ Generar landing single-page con secciones
│  ├─ Crear data/project-data.ts
│  └─ Configurar formulario → n8n webhook
│
└─ [Otros tipos...]

PASO 5: QA AUTOMÁTICO
├─ Validar estructura de carpetas
├─ Verificar archivos críticos existen
├─ Comprobar Brand Kit implementado
├─ Ejecutar checks de coherencia
└─ Generar reporte de score

PASO 6: ENTREGA
├─ Si score >= 4/5 → Presentar proyecto
├─ Si score < 4/5 → Iterar
└─ Si modo producción + score < 3/5 → BLOQUEAR
```

### 13.2 Prompts Clave para Anti-Gravity

**Prompt de Inicio (Usuario):**
```
Crea [tipo de aplicación] siguiendo el Anclora Skill Master.

Tipo: [Web Principal / Landing Proyecto / Landing Ubicación / Landing Evento]
Nombre: [nombre del proyecto]
[Otros parámetros según onboarding]
```

**Respuesta del Agente:**
```
Entendido. Voy a crear [nombre] siguiendo el paradigma SDD con Brand Kit Anclora.

✅ PASO 1: Onboarding completado
   - Tipo: [tipo]
   - Nombre: [nombre]
   - Parámetros almacenados en memoria

✅ PASO 2: Generando scaffold de directorios
   - Estructura creada según spec
   - .specify/memory/constitution.md generado
   - Archivos críticos inicializados

✅ PASO 3: Implementando Brand Kit
   - Paleta Anclora Gold/Navy aplicada
   - Fuentes Playfair Display + Montserrat cargadas
   - Componentes base (Button, Card, Header, Footer) listos
   
✅ PASO 4: [Contenido específico según tipo]
   
✅ PASO 5: QA Automático
   - Score: [X]/5
   - [Detalles de KPIs]
   
[Si aprobado]
🎉 Proyecto listo para despliegue.
Archivos generados: [lista]

¿Deseas que continúe con [siguiente paso]?
```

### 13.3 Reglas de Gobernanza del Agente

**EL AGENTE DEBE:**
- ✅ Leer `.specify/memory/constitution.md` ANTES de generar cualquier código
- ✅ Usar SIEMPRE componentes del Brand Kit (nunca recrearlos)
- ✅ Aplicar paleta Anclora Gold/Navy sin excepción
- ✅ Extraer TODO el texto visible a archivos de traducción
- ✅ Validar cada archivo crítico contra la spec
- ✅ Generar código de PRODUCCIÓN (no TODOs, no placeholders)
- ✅ Ejecutar QA automático antes de entregar

**EL AGENTE NO DEBE:**
- ❌ Improvisar arquitectura (seguir scaffold al pie de la letra)
- ❌ Hardcodear textos en componentes
- ❌ Usar colores fuera de la paleta Anclora
- ❌ Mezclar journeys inversor/partner
- ❌ Cambiar el stack tecnológico
- ❌ Omitir la referencia a Anclora Nexus Group en footer
- ❌ Generar código "ejemplo" o "demo" (siempre producción)

### 13.4 Ejemplo de Conversación Completa

**Usuario (Antonio):**
```
Crea la web principal de Anclora Private Estates siguiendo el skill.

Ubicaciones clave: Son Vida, Port d'Andratx, Bendinat
Inversores: HNWI + UHNWI
Idiomas: ES, EN, DE
Objetivo: Inversores y Partners
Blog: Sí
WhatsApp Bot: Sí
Modo producción: No (aún)
```

**Anti-Gravity:**
```
Perfecto. Creando Anclora Private Estates (Web Principal) con paradigma SDD.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 1: ONBOARDING ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Tipo: Web Principal
✓ Nombre: Anclora Private Estates
✓ Ubicaciones: Son Vida, Port d'Andratx, Bendinat
✓ Perfil: HNWI + UHNWI
✓ Idiomas: ES (default), EN, DE
✓ Objetivo: Inversores + Partners
✓ Features: Blog ✓, WhatsApp Bot ✓
✓ Modo: Desarrollo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 2: SCAFFOLD ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Estructura de directorios creada
✓ .specify/memory/constitution.md generado
✓ Archivos críticos inicializados:
  - lib/config.ts
  - app/[locale]/layout.tsx
  - tailwind.config.ts
  - services/lead-scoring/scoring-engine.ts
  - data/location-guides.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 3: BRAND KIT ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Paleta Anclora aplicada (Gold #D4AF37, Navy #2C3E50)
✓ Fuentes: Playfair Display + Montserrat
✓ Componentes listos:
  - <Button /> (4 variantes: primary, secondary, outline, ghost)
  - <Card /> con hover effects
  - <Header /> sticky con language toggle
  - <Footer /> con referencia Nexus Group

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 4: CONTENIDO WEB PRINCIPAL ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Páginas creadas:
  - / (Homepage con Hero, Featured Properties, Testimonials)
  - /propiedades (Catálogo + Filtros)
  - /propiedades/[slug] (Detalle)
  - /propiedades/ubicacion/[slug] (SEO Landing: Son Vida, Port d'Andratx, Bendinat)
  - /servicios (Overview + sub-páginas)
  - /inversores (Journey HNWI con Data Lab)
  - /partners (Journey B2B)
  - /nosotros
  - /blog (Sistema completo con CMS)
  - /contacto
  - /valoracion

✓ Lead Scoring implementado:
  - Algoritmo con pesos: Budget 35%, Timeline 25%, Completeness 20%, Interaction 20%
  - Clasificación: HOT (80+), WARM (50-79), COLD (<50)

✓ WhatsApp Bot configurado:
  - Webhook en /api/whatsapp/webhook
  - Queue Redis + BullMQ
  - Bot engine con GPT-4o
  - Escalado automático para leads HOT

✓ Location Guides (SEO):
  - Son Vida (FAQs + Market Data)
  - Port d'Andratx (FAQs + Market Data)
  - Bendinat (FAQs + Market Data)

✓ i18n completo:
  - locales/es/, locales/en/, locales/de/
  - Rutas localizadas
  - 0 texto hardcodeado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 5: QA AUTOMÁTICO ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score Global: 4.6/5 ✅ APROBADO

KPIs Evaluados:
✓ Conversión Lead Cualificado: 4/5
✓ Profundidad Cualificación: 5/5
✓ Densidad Señales Confianza: 4/5
✓ Claridad CTA Inversor: 5/5
✓ Tiempo Primera Acción: 4/5
✓ Drop-off Formulario: 5/5
✓ Separación Journeys: 5/5

Checks de Coherencia:
✓ Estructura de directorios: PASS
✓ Archivos críticos: PASS (6/6)
✓ Brand Kit implementado: PASS
✓ i18n completo: PASS (0 hardcoded texts)
✓ Componentes reutilizables: PASS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 PROYECTO LISTO PARA DESARROLLO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Archivos generados: 127
Código de producción: 100%
Placeholder code: 0%

Próximos pasos sugeridos:
1. Revisar .specify/memory/constitution.md
2. Poblar data/properties/ con datos reales
3. Configurar variables de entorno (.env)
4. Deploy a staging para QA manual
5. Activar modo producción cuando esté listo

¿Deseas que genere el README.md con instrucciones de deployment?
```

---

# FIN DEL SKILL MASTER

---

## NOTAS FINALES PARA ANTONIO

**Este documento es TU BIBLIA de desarrollo Anclora.**

**Cómo usarlo:**

1. **Para crear la WEB PRINCIPAL:**
   - Dar a Anti-Gravity: "Crea la web principal siguiendo PARTE II del Skill Master"
   - Hacer onboarding (ubicaciones, inversores, etc.)
   - Anti-Gravity genera todo automáticamente

2. **Para crear una APP DEL ECOSISTEMA (ej. Azure Bay):**
   - Dar a Anti-Gravity: "Crea landing page proyecto Azure Bay siguiendo PARTE III del Skill Master"
   - Hacer onboarding simplificado (nombre, ubicación, tipologías, precios)
   - Anti-Gravity genera landing con Brand Kit Anclora

3. **Coherencia Visual GARANTIZADA:**
   - TODAS las apps (web principal + ecosistema) usan PARTE I (Brand Kit)
   - Mismos componentes (Button, Card, Header, Footer)
   - Misma paleta (Gold/Navy/Bronze)
   - Mismas fuentes (Playfair + Montserrat)

**Versión:** 3.0.0  
**Última actualización:** 24 Enero 2026  
**Autor:** Claude (para Antonio / Anclora Nexus Group)
\n---\n
## Contenido de GUIA_IMPLEMENTACION_FOOTER.md

# GUÍA DE IMPLEMENTACIÓN - FOOTER LEGAL ANCLORA
## Mapeo completo de textos legales para los 4 links del footer

---

## 📸 TU FOOTER ACTUAL

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    [Logo Anclora]                          │
│                                                            │
│              [GDPR]  [ISO 9001]  [EU REG]                 │
│                                                            │
│  PRIVACIDAD  |  COOKIES  |  CÓDIGO ÉTICO  |  TÉRMINOS B2B │
│                                                            │
│        © 2024 ANCLORA NEXUS GROUP. ALL RIGHTS RESERVED.   │
│         ID: ANG-PRT-2026-EU | ANCLORA NEXUS STRATEGIC     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🗺️ MAPEO COMPLETO

### 1️⃣ PRIVACIDAD → `/legal/privacidad`

**Contenido:** Política de Privacidad GDPR completa

**Idiomas disponibles:**
- 🇪🇸 Español (RGPD + LOPDGDD)
- 🇬🇧 English (GDPR + UK Data Protection Act 2018)
- 🇩🇪 Deutsch (DSGVO + BDSG)

**Extensión:** ~4.500 palabras por idioma

**Secciones clave:**
1. Responsable del tratamiento
2. Datos que recopilamos (y los que NO)
3. Finalidades del tratamiento (5 categorías)
4. Destinatarios de datos (tabla con proveedores)
5. Tus derechos RGPD (7 derechos explicados)
6. Medidas de seguridad (ISO 27001)
7. Plazos de conservación (tabla)
8. Menores de edad
9. Actualizaciones de la política
10. Contacto (Email general + DPO)

**¿Cuándo el usuario debe leer esto?**
- Antes de completar cualquier formulario
- Para entender qué datos recopilamos
- Para ejercer derechos RGPD (acceso, supresión, etc.)

---

### 2️⃣ COOKIES → `/legal/cookies`

**Contenido:** Política de Cookies completa con tablas técnicas

**Idiomas disponibles:**
- 🇪🇸 Español
- 🇬🇧 English
- 🇩🇪 Deutsch

**Extensión:** ~3.000 palabras por idioma

**Secciones clave:**
1. ¿Qué son las cookies?
2. Cómo las utilizamos
3. Tipos de cookies (3 categorías):
   - **Necesarias** (no requieren consentimiento)
   - **Analíticas** (Google Analytics) → Requieren consentimiento
   - **Marketing** (Meta Pixel, Google Ads) → Requieren consentimiento
4. Consentimiento y gestión
5. Cookies de terceros (YouTube, Vimeo, Google Maps)
6. Transferencias internacionales (EU-US)
7. Gestión desde navegador (Chrome, Firefox, Safari, Edge)
8. Actualizaciones
9. Contacto

**Tablas técnicas incluidas:**
- Nombre de cada cookie
- Finalidad exacta
- Duración
- Proveedor
- Política de privacidad del proveedor

**¿Cuándo el usuario debe leer esto?**
- Al hacer clic en "Configurar" en el Cookie Banner
- Para entender qué cookies usamos
- Para desactivar cookies específicas

---

### 3️⃣ CÓDIGO ÉTICO → `/legal/codigo-etico`

**Contenido:** Código Ético Corporativo de Anclora Private Estates

**Idiomas disponibles:**
- 🇪🇸 Español
- 🇬🇧 English
- 🇩🇪 Deutsch

**Extensión:** ~3.500 palabras por idioma

**Secciones clave:**
1. Introducción (a quién aplica)
2. Misión y Visión
3. **Valores Fundamentales (5 pilares):**
   - 🔒 **Confidencialidad** - Privacidad de clientes UHNWI
   - ✨ **Integridad** - No comisiones ocultas, transparencia total
   - 🎓 **Profesionalidad** - Formación continua, colegiación API
   - 🤝 **Respeto y Diversidad** - Tolerancia cero discriminación
   - 🌱 **Sostenibilidad** - Compromiso medioambiental Mallorca

4. **Normas de Conducta Específicas:**
   - Relaciones con clientes (deber de asesoramiento, gestión expectativas)
   - Relaciones con partners (comisiones transparentes, no competencia desleal)
   - Prevención de blanqueo de capitales (KYC, señales de alerta)
   - Protección de datos (más allá del RGPD mínimo)

5. **Responsabilidad Social Corporativa:**
   - Compromiso con Mallorca (contratación local)
   - Política medioambiental (oficina paperless, flota eléctrica)
   - Inversión ética (no explotación laboral)

6. **Cumplimiento y Sanciones:**
   - Comité de Ética
   - Canal de denuncias (whistleblowing)
   - Sanciones graduadas (leve → grave → muy grave)

**¿Cuándo el usuario debe leer esto?**
- Partners/empleados: OBLIGATORIO antes de firmar contrato
- Clientes potenciales: Para conocer valores de la empresa
- Inversores: Due diligence corporativa

---

### 4️⃣ TÉRMINOS B2B → `/legal/terminos-b2b`

**Contenido:** Términos y Condiciones del Programa de Partners B2B

**Idiomas disponibles:**
- 🇪🇸 Español
- 🇬🇧 English
- 🇩🇪 Deutsch

**Extensión:** ~5.000 palabras por idioma (el más extenso)

**Audiencia:** EXCLUSIVAMENTE profesionales del sector inmobiliario

**Secciones clave:**

1. **Definiciones** (5 conceptos clave):
   - Partner
   - Lead Cualificado
   - Transacción Cerrada
   - Comisión de Referido
   - Co-brokerage

2. **Requisitos de Admisión:**
   - Documentación obligatoria (licencia API, seguro RC, formación blanqueo)
   - Proceso de aprobación (5 pasos, 10-15 días)

3. **3 Modelos de Colaboración:**
   
   **MODELO A: REFERRAL (Solo Referencia)**
   - Comisión: 20% de comisión Anclora
   - Partner NO gestiona el cliente
   - Ejemplo: Venta 2M€ → Partner cobra 12.000€ + IVA
   
   **MODELO B: CO-BROKERAGE (Colaboración Activa)**
   - Comisión: Split 50/50
   - Partner participa en visitas, negociaciones
   - Ejemplo: Venta 2M€ → Partner cobra 30.000€ + IVA
   
   **MODELO C: EXCLUSIVE PARTNERSHIP**
   - Exclusividad territorial o nicho
   - Comisiones negociables
   - Requiere mínimo 1 transacción cada 6 meses

4. **Condiciones Económicas:**
   - Tabla de comisiones por rango de precio
   - Plazos de pago (Referral: 30 días, Co-brokerage: 15 días)
   - Bonificaciones por volumen (3-5 trans: +5%, 6-10: +10%, 11+: +15%)

5. **Partner Portal:**
   - Lead Management (tracking en tiempo real)
   - Property Access (catálogo completo, fichas PDF)
   - Marketing Materials (brochures personalizables)
   - Reporting & Analytics (dashboard KPIs)
   - Training & Resources (webinars mensuales)

6. **Protección de Datos y Confidencialidad:**
   - Acuerdo de Corresponsabilidad RGPD (DPA)
   - Datos compartidos (mínimo) vs. NO requeridos
   - Penalización por incumplimiento: 50.000€

7. **Atribución y Protección de Leads:**
   - Regla "First Touch Wins"
   - Período de protección (Referral: 12 meses, Co-brokerage: 18 meses)
   - Excepciones (cliente ya en base de datos, contacto directo previo)

8. **Código de Conducta:**
   - ✅ Prácticas permitidas (promocionar, usar materiales, coordinar visitas)
   - ❌ Prácticas prohibidas (plagiar, modificar precios, spam)
   - Uso de marca Anclora (qué se puede y qué no)

9. **Duración y Terminación:**
   - Acuerdo indefinido
   - Preaviso: 30-90 días según transacciones en curso
   - Causas de terminación inmediata (fraude, blanqueo, competencia desleal)

10. **Resolución de Disputas:**
    - 1º: Mediación con Colegio API Baleares (30 días)
    - 2º: Arbitraje en Palma de Mallorca
    - 3º: Juzgados de Palma (último recurso)

**¿Cuándo el usuario debe leer esto?**
- Brokers/agentes: ANTES de solicitar admisión al programa
- Al recibir credenciales del Partner Portal
- Antes de presentar el primer lead

---

## 📂 ESTRUCTURA DE ARCHIVOS A CREAR

```
app/
└── [locale]/
    └── legal/
        ├── privacidad/
        │   └── page.tsx          → Renderiza FOOTER_LEGAL_COMPLETO.md Sección 1
        ├── cookies/
        │   └── page.tsx          → Renderiza FOOTER_LEGAL_COMPLETO.md Sección 2
        ├── codigo-etico/
        │   └── page.tsx          → Renderiza FOOTER_LEGAL_COMPLETO.md Sección 3
        └── terminos-b2b/
            └── page.tsx          → Renderiza FOOTER_LEGAL_COMPLETO.md Sección 4
```

---

## 🎨 EJEMPLO DE PÁGINA LEGAL (Template)

```tsx
// app/[locale]/legal/privacidad/page.tsx

import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';

// Importar contenido Markdown (puedes usar MDX o JSON según prefieras)
import privacidadES from '@/data/legal/privacidad-es.md';
import privacidadEN from '@/data/legal/privacidad-en.md';
import privacidadDE from '@/data/legal/privacidad-de.md';

export default function PrivacidadPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('legal');

  // Seleccionar contenido según idioma
  const content = {
    es: privacidadES,
    en: privacidadEN,
    de: privacidadDE,
  }[params.locale] || privacidadES;

  return (
    <div className="min-h-screen bg-white">
      {/* Header con navegación */}
      <Header />

      {/* Contenido Legal */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <article className="prose prose-lg prose-anclora max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>

        {/* Botón volver */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-anclora-navy hover:text-anclora-gold"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToHome')}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
```

---

## 🎯 DISEÑO VISUAL RECOMENDADO (Páginas Legales)

### Layout Sugerido

```
┌────────────────────────────────────────────────────────────┐
│  [Header con logo + navegación]                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │                                                  │     │
│  │   # POLÍTICA DE PRIVACIDAD                       │     │
│  │                                                  │     │
│  │   **Última actualización:** 24 enero 2026       │     │
│  │                                                  │     │
│  │   En Anclora Private Estates, protegemos        │     │
│  │   tu privacidad y tratamos tus datos...         │     │
│  │                                                  │     │
│  │   ## 1. RESPONSABLE DEL TRATAMIENTO             │     │
│  │                                                  │     │
│  │   **Identidad:** Anclora Private Estates S.L.   │     │
│  │   **NIF:** B-XXXXXXXX                           │     │
│  │   ...                                           │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│              [← Volver a Inicio]                          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  [Footer completo con 4 links legales]                    │
└────────────────────────────────────────────────────────────┘
```

### Estilos CSS Prose (Tailwind)

```css
/* tailwind.config.ts - Extender prose para marca Anclora */

module.exports = {
  theme: {
    extend: {
      typography: {
        anclora: {
          css: {
            '--tw-prose-body': '#2C3E50',
            '--tw-prose-headings': '#2C3E50',
            '--tw-prose-links': '#D4AF37',
            '--tw-prose-bold': '#2C3E50',
            '--tw-prose-counters': '#D4AF37',
            '--tw-prose-bullets': '#D4AF37',
            '--tw-prose-quotes': '#2C3E50',
            '--tw-prose-quote-borders': '#D4AF37',
            '--tw-prose-code': '#2C3E50',
            
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              fontSize: '2.5rem',
              marginBottom: '2rem',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
              fontSize: '2rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              borderBottom: '2px solid #D4AF37',
              paddingBottom: '0.5rem',
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '2rem',
            },
            p: {
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.75',
              marginBottom: '1.25rem',
            },
            a: {
              color: '#D4AF37',
              textDecoration: 'underline',
              '&:hover': {
                color: '#B9915F',
              },
            },
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: '#2C3E50',
              color: '#FFFFFF',
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            'tbody td': {
              padding: '1rem',
              borderBottom: '1px solid #E5E7EB',
            },
            'tbody tr:hover': {
              backgroundColor: '#F5F5F0',
            },
            strong: {
              color: '#2C3E50',
              fontWeight: '700',
            },
            code: {
              backgroundColor: '#F5F5F0',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            },
            blockquote: {
              borderLeftColor: '#D4AF37',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: '#6B7280',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Preparación de Contenido
- [ ] Extraer cada sección del FOOTER_LEGAL_COMPLETO.md
- [ ] Crear 12 archivos Markdown (4 páginas × 3 idiomas):
  - [ ] `privacidad-es.md`, `privacidad-en.md`, `privacidad-de.md`
  - [ ] `cookies-es.md`, `cookies-en.md`, `cookies-de.md`
  - [ ] `codigo-etico-es.md`, `codigo-etico-en.md`, `codigo-etico-de.md`
  - [ ] `terminos-b2b-es.md`, `terminos-b2b-en.md`, `terminos-b2b-de.md`
- [ ] Guardar en `/data/legal/`

### Fase 2: Creación de Páginas
- [ ] Crear `/app/[locale]/legal/privacidad/page.tsx`
- [ ] Crear `/app/[locale]/legal/cookies/page.tsx`
- [ ] Crear `/app/[locale]/legal/codigo-etico/page.tsx`
- [ ] Crear `/app/[locale]/legal/terminos-b2b/page.tsx`
- [ ] Configurar layout.tsx con metadata SEO para cada página

### Fase 3: Actualización del Footer
- [ ] Actualizar `components/layout/Footer.tsx`
- [ ] Añadir badges GDPR, ISO 9001, EU REG
- [ ] Implementar links con traducciones i18n
- [ ] Testear hover states (color gold)

### Fase 4: Cookie Banner
- [ ] Implementar componente `CookieBanner.tsx`
- [ ] Integrar con Google Analytics (carga condicional)
- [ ] Integrar con Meta Pixel (carga condicional)
- [ ] Testear configuración granular (Aceptar/Rechazar/Configurar)
- [ ] Verificar almacenamiento en localStorage

### Fase 5: Datos Reales (CRÍTICO)
- [ ] Completar CIF/NIF real
- [ ] Obtener Nº API del Colegio de Baleares
- [ ] Incluir datos Registro Mercantil completos
- [ ] Añadir datos póliza seguro RC (aseguradora + número)
- [ ] Configurar emails operativos:
  - [ ] privacidad@ancloraprivateestates.com
  - [ ] dpo@ancloraprivateestates.com
  - [ ] legal@ancloraprivateestates.com
  - [ ] etica@ancloraprivateestates.com
  - [ ] partners@ancloraprivateestates.com
  - [ ] cookies@ancloraprivateestates.com

### Fase 6: Testing
- [ ] Testear navegación entre páginas legales
- [ ] Verificar traducciones en los 3 idiomas
- [ ] Validar tablas responsive (mobile)
- [ ] Comprobar enlaces internos (anclas #secciones)
- [ ] Testear Cookie Banner en diferentes navegadores
- [ ] Verificar accesibilidad (WCAG AA)

### Fase 7: SEO y Metadatos
- [ ] Añadir meta descriptions únicas por página
- [ ] Configurar canonical URLs
- [ ] Añadir hreflang tags (ES/EN/DE)
- [ ] Generar sitemap.xml incluyendo páginas legales
- [ ] Robots.txt: permitir indexación de páginas legales

---

## 📊 MÉTRICAS DE COMPLIANCE

### KPIs a Trackear

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Cookie consent rate | >70% | Google Analytics |
| Páginas legales views | Tracking | GA4 Custom Event |
| Tiempo en página legal | >1 min | GA4 |
| Bounce rate legal | <60% | GA4 |
| Partners registrados B2B | 10/mes | Partner Portal Analytics |

---

## 🚨 AVISOS IMPORTANTES

### ⚠️ ANTES DE PRODUCCIÓN

1. **OBLIGATORIO**: Contratar abogado especializado en derecho digital para revisar
2. **OBLIGATORIO**: Completar todos los datos reales (CIF, API, Registro Mercantil)
3. **OBLIGATORIO**: Configurar emails operativos (privacidad@, dpo@, legal@, etc.)
4. **OBLIGATORIO**: Obtener póliza de seguro RC profesional 300.000€ mínimo
5. **RECOMENDADO**: Auditoría GDPR externa antes del launch

### 🔐 SEGURIDAD

- Los textos legales NO contienen ningún dato sensible
- NUNCA hardcodear CIF/NIF/datos reales en repositorio público
- Usar variables de entorno para datos sensibles
- Implementar rate limiting en formularios de contacto

### 📝 MANTENIMIENTO

- Revisar políticas **cada 6 meses** mínimo
- Actualizar fechas "última actualización"
- Seguir cambios legislativos (RGPD, LSSI, blanqueo capitales)
- Mantener log de versiones de políticas

---

## 📞 CONTACTOS CLAVE

### Para Consultas sobre Implementación

**Email:** Tu contacto técnico  
**Este documento:** FOOTER_LEGAL_COMPLETO.md

### Para Consultas Legales (Post-implementación)

Una vez en producción, los usuarios deberán contactar:

- **Privacidad/GDPR:** privacidad@ancloraprivateestates.com
- **DPO:** dpo@ancloraprivateestates.com
- **Legal general:** legal@ancloraprivateestates.com
- **Ética:** etica@ancloraprivateestates.com
- **Partners B2B:** partners@ancloraprivateestates.com

---

**DOCUMENTO CREADO:** 24 Enero 2026  
**VERSIÓN:** 1.0  
**AUTOR:** Claude para Antonio Jiménez (Anclora Nexus Group)  

**PRÓXIMO PASO:** Implementar páginas en Next.js según checklist ⬆️
\n---\n
## Contenido de TEXTOS_LEGALES_ANCLORA_COMPLETO.md

# TEXTOS LEGALES ANCLORA PRIVATE ESTATES
## España, Reino Unido y Alemania - Compliance Multi-Jurisdicción

**Fecha:** 24 Enero 2026  
**Versión:** 1.0.0  
**Alcance:** Web Principal + Apps Ecosistema  
**Jurisdicciones:** España (ES), Reino Unido (UK), Alemania (DE)

---

## 📋 ÍNDICE

1. [Disclaimers Obligatorios por Sección](#1-disclaimers-obligatorios-por-sección)
2. [Footer Legal Completo](#2-footer-legal-completo)
3. [Política de Privacidad GDPR](#3-política-de-privacidad-gdpr)
4. [Términos y Condiciones](#4-términos-y-condiciones)
5. [Cookie Banner y Política](#5-cookie-banner-y-política)
6. [Avisos Específicos por Jurisdicción](#6-avisos-específicos-por-jurisdicción)
7. [Implementación Técnica](#7-implementación-técnica)

---

# 1. DISCLAIMERS OBLIGATORIOS POR SECCIÓN

## 1.1 Disclaimer Journey Inversor / Data Lab

### 🇪🇸 ESPAÑOL (Crítico - No Promesas de Rentabilidad)

```
⚠️ AVISO IMPORTANTE SOBRE INFORMACIÓN DE INVERSIÓN

Las estimaciones de rentabilidad, apreciación de capital y datos de mercado 
presentados en esta sección tienen carácter EXCLUSIVAMENTE INFORMATIVO y se basan 
en datos históricos y proyecciones de terceros.

RENTABILIDADES PASADAS NO GARANTIZAN RENTABILIDADES FUTURAS.

Anclora Private Estates NO es una entidad de asesoramiento financiero ni gestora 
de inversiones. No proporcionamos recomendaciones de inversión personalizadas. 
Toda decisión de adquisición inmobiliaria debe tomarse tras consultar con asesores 
fiscales, legales y financieros independientes.

Los valores inmobiliarios están sujetos a fluctuaciones de mercado. Factores como 
cambios regulatorios, condiciones económicas, tipos de interés y oferta/demanda 
local pueden afectar significativamente el valor de los activos.

Conforme al artículo 247 del Código Penal español, Anclora Private Estates declara 
que no promete ni garantiza beneficios económicos específicos derivados de las 
transacciones inmobiliarias.

Última actualización de datos de mercado: [FECHA AUTOMÁTICA]
Fuentes: Idealista, Fotocasa, INE, Balearic Property Federation
```

### 🇬🇧 ENGLISH (UK FCA Compliance)

```
⚠️ IMPORTANT NOTICE REGARDING INVESTMENT INFORMATION

Estimated returns, capital appreciation projections, and market data presented 
in this section are for INFORMATIONAL PURPOSES ONLY and are based on historical 
data and third-party forecasts.

PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS.

Anclora Private Estates is NOT authorised or regulated by the Financial Conduct 
Authority (FCA). We do not provide financial advice or investment recommendations. 
All property acquisition decisions should be made after consulting with independent 
tax, legal, and financial advisors.

Property values are subject to market fluctuations. Factors including regulatory 
changes, economic conditions, interest rates, and local supply/demand dynamics 
may significantly affect asset values.

The information provided does not constitute an offer to sell or a solicitation 
to buy securities or financial instruments.

Last market data update: [AUTO DATE]
Sources: Rightmove, Zoopla, ONS, Knight Frank Research
```

### 🇩🇪 DEUTSCH (BaFin Compliance)

```
⚠️ WICHTIGER HINWEIS ZU INVESTITIONSINFORMATIONEN

Die in diesem Bereich dargestellten Renditeprognosen, Kapitalwertsteigerungen 
und Marktdaten dienen AUSSCHLIESSLICH INFORMATIONSZWECKEN und basieren auf 
historischen Daten und Prognosen Dritter.

VERGANGENE WERTENTWICKLUNGEN SIND KEIN VERLÄSSLICHER INDIKATOR FÜR KÜNFTIGE ERGEBNISSE.

Anclora Private Estates ist KEIN von der Bundesanstalt für Finanzdienstleistungsaufsicht 
(BaFin) zugelassenes oder reguliertes Finanzinstitut. Wir bieten keine 
Finanzberatung oder Anlageempfehlungen an. Alle Immobilienerwerbsentscheidungen 
sollten erst nach Konsultation unabhängiger Steuer-, Rechts- und Finanzberater 
getroffen werden.

Immobilienwerte unterliegen Marktschwankungen. Faktoren wie regulatorische 
Änderungen, wirtschaftliche Bedingungen, Zinssätze und lokale Angebots-/Nachfrage-
Dynamiken können Vermögenswerte erheblich beeinflussen.

Gemäß § 264a StGB (Kapitalanlagebetrug) erklärt Anclora Private Estates, dass 
wir keine spezifischen wirtschaftlichen Vorteile aus Immobilientransaktionen 
versprechen oder garantieren.

Letzte Aktualisierung der Marktdaten: [AUTO DATUM]
Quellen: ImmoScout24, Statistisches Bundesamt, IVD Research
```

---

## 1.2 Disclaimer Calculadora ROI

**Ubicación:** Encima del formulario de calculadora

### 🇪🇸 ESPAÑOL

```
📊 CALCULADORA DE RETORNO ESTIMADO - SOLO FINES ILUSTRATIVOS

Esta herramienta proporciona estimaciones basadas en:
• Datos históricos del mercado inmobiliario de Baleares (2019-2025)
• Proyecciones de instituciones financieras (Banco de España, BBVA Research)
• Parámetros fiscales generales (sujetos a cambios legislativos)

NO CONSTITUYE:
❌ Asesoramiento financiero personalizado
❌ Garantía de rentabilidad
❌ Promesa de revalorización

VARIABLES NO CONSIDERADAS:
• Costes de mantenimiento y comunidad
• Impuestos locales específicos (IBI, basuras)
• Vacíos estacionales en alquiler turístico
• Desgaste y depreciación de equipamiento

Consulte con un asesor fiscal certificado antes de tomar decisiones de inversión.
```

### 🇬🇧 ENGLISH

```
📊 ESTIMATED RETURN CALCULATOR - ILLUSTRATIVE PURPOSES ONLY

This tool provides estimates based on:
• Historical Balearic property market data (2019-2025)
• Financial institution projections (Bank of England, JLL Research)
• General tax parameters (subject to legislative changes)

THIS DOES NOT CONSTITUTE:
❌ Personalised financial advice
❌ Guaranteed returns
❌ Promise of appreciation

VARIABLES NOT CONSIDERED:
• Maintenance and community fees
• Local taxes (Council Tax equivalent)
• Seasonal rental voids
• Equipment wear and depreciation

Consult a certified tax advisor before making investment decisions.
```

### 🇩🇪 DEUTSCH

```
📊 GESCHÄTZTER RENDITERECHNER - NUR ZU ILLUSTRATIVEN ZWECKEN

Dieses Tool liefert Schätzungen basierend auf:
• Historischen Daten des balearischen Immobilienmarkts (2019-2025)
• Prognosen von Finanzinstituten (Bundesbank, DZ Bank Research)
• Allgemeinen Steuerparametern (vorbehaltlich gesetzlicher Änderungen)

DIES STELLT NICHT DAR:
❌ Personalisierte Finanzberatung
❌ Garantierte Renditen
❌ Wertsteigerungsversprechen

NICHT BERÜCKSICHTIGTE VARIABLEN:
• Instandhaltungs- und Gemeinschaftskosten
• Lokale Steuern (Grundsteuer)
• Saisonale Leerstände bei touristischer Vermietung
• Verschleiß und Wertminderung von Ausstattung

Konsultieren Sie einen zertifizierten Steuerberater vor Investitionsentscheidungen.
```

---

## 1.3 Disclaimer Detalle de Propiedad

**Ubicación:** Debajo del precio de la propiedad

### 🇪🇸 ESPAÑOL

```
ℹ️ El precio indicado no incluye gastos de compraventa (aprox. 10-12% del valor: 
ITP/IVA, notaría, registro, gestoría). Características sujetas a verificación. 
Anclora Private Estates actúa como intermediario. Certificado energético disponible.
```

### 🇬🇧 ENGLISH

```
ℹ️ Price excludes purchase costs (approx. 10-12% of value: SDLT, legal fees, 
survey). Features subject to verification. Anclora Private Estates acts as 
intermediary. EPC available upon request.
```

### 🇩🇪 DEUTSCH

```
ℹ️ Preis exkl. Erwerbsnebenkosten (ca. 10-12% des Wertes: Grunderwerbsteuer, 
Notar, Grundbuch). Angaben vorbehaltlich Überprüfung. Anclora Private Estates 
tritt als Vermittler auf. Energieausweis verfügbar.
```

---

# 2. FOOTER LEGAL COMPLETO

## 2.1 Footer Principal (Debajo del contenido principal)

```tsx
// components/layout/Footer.tsx - Sección Legal

<div className="py-6 border-t border-white/10">
  <div className="container mx-auto px-6 max-w-7xl">
    
    {/* Primera Fila - Copyright y Nexus Group */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <p className="font-sans text-sm text-white/60">
        © 2026 Anclora Private Estates S.L. 
        Todos los derechos reservados. 
        Una iniciativa de{' '}
        <a 
          href="https://ancloranexusgroup.com" 
          className="text-anclora-gold hover:underline"
        >
          Anclora Nexus Group
        </a>
      </p>
      
      <div className="flex gap-6 font-sans text-sm">
        <Link href="/legal/privacidad" className="text-white/60 hover:text-anclora-gold">
          Privacidad
        </Link>
        <Link href="/legal/cookies" className="text-white/60 hover:text-anclora-gold">
          Cookies
        </Link>
        <Link href="/legal/terminos" className="text-white/60 hover:text-anclora-gold">
          Términos
        </Link>
        <Link href="/legal/disclaimer" className="text-white/60 hover:text-anclora-gold">
          Aviso Legal
        </Link>
      </div>
    </div>

    {/* Segunda Fila - Datos Fiscales España */}
    <div className="text-xs text-white/40 font-sans space-y-1">
      <p>
        <strong>Anclora Private Estates S.L.</strong> | 
        CIF: B-XXXXXXXX | 
        Registro Mercantil de Palma de Mallorca, Tomo XXXX, Folio XX, Hoja PM-XXXXX
      </p>
      <p>
        Domicilio social: Paseo del Borne, 15, 07012 Palma de Mallorca, Islas Baleares, España | 
        API (Agente de la Propiedad Inmobiliaria) Nº XXXX - Colegio API Baleares
      </p>
      <p>
        Seguro de Responsabilidad Civil: [Aseguradora] | Póliza nº XXXXXXXX | 
        Cobertura: 300.000€
      </p>
    </div>

    {/* Tercera Fila - Disclaimer Genérico */}
    <div className="mt-6 pt-6 border-t border-white/5">
      <p className="text-xs text-white/40 font-sans leading-relaxed">
        <strong>Aviso Legal:</strong> La información contenida en este sitio web tiene 
        carácter meramente informativo y no constituye asesoramiento legal, fiscal o de 
        inversión. Las fotografías y renders pueden no corresponder exactamente con la 
        realidad. Todos los precios están sujetos a cambios sin previo aviso. 
        Anclora Private Estates no se hace responsable de errores u omisiones en la 
        información publicada. Se recomienda verificar toda la información directamente 
        con nuestros agentes antes de tomar cualquier decisión.
      </p>
    </div>

  </div>
</div>
```

---

## 2.2 Texto Aviso Legal (Página `/legal/disclaimer`)

### 🇪🇸 ESPAÑOL

```markdown
# AVISO LEGAL

**Última actualización:** 24 de enero de 2026

## 1. IDENTIFICACIÓN DEL TITULAR

En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios 
de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa 
de los siguientes datos:

**Denominación social:** Anclora Private Estates S.L.  
**NIF/CIF:** B-XXXXXXXX  
**Domicilio social:** Paseo del Borne, 15, 07012 Palma de Mallorca, Islas Baleares  
**Correo electrónico:** legal@ancloraprivateestates.com  
**Teléfono:** +34 971 000 000  
**Inscrita en:** Registro Mercantil de Palma de Mallorca, Tomo XXXX, Folio XX, Hoja PM-XXXXX  
**Actividad:** Intermediación inmobiliaria  
**Colegio Profesional:** Colegio de Agentes de la Propiedad Inmobiliaria de Baleares  
**Nº Colegiado API:** XXXX  

## 2. OBJETO Y ÁMBITO DE APLICACIÓN

El presente Aviso Legal regula el uso del sitio web www.ancloraprivateestates.com 
(en adelante, el "Sitio Web"), del que es titular Anclora Private Estates S.L.

La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica 
la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas 
en este Aviso Legal.

## 3. RESPONSABILIDAD SOBRE LOS CONTENIDOS

Anclora Private Estates se reserva el derecho a modificar, sin previo aviso, la 
presentación, configuración y contenidos del Sitio Web, así como las condiciones 
requeridas para su acceso y/o utilización.

Las fotografías, renders y descripciones de propiedades tienen carácter meramente 
orientativo y pueden no corresponder exactamente con la realidad. Se recomienda 
verificar toda la información directamente con nuestros agentes.

Anclora Private Estates NO garantiza:
- La exactitud, actualización, exhaustividad o veracidad de los contenidos
- La ausencia de errores en dichos contenidos
- La disponibilidad ininterrumpida del Sitio Web
- La ausencia de virus, malware u otros elementos dañinos

## 4. INFORMACIÓN SOBRE PROPIEDADES INMOBILIARIAS

### 4.1 Precios

Todos los precios publicados están sujetos a cambios sin previo aviso y deben 
ser confirmados directamente con Anclora Private Estates antes de cualquier compromiso.

Los precios NO incluyen:
- Impuestos aplicables (ITP, IVA según corresponda)
- Gastos de notaría
- Gastos de registro de la propiedad
- Honorarios de gestoría
- Otros gastos inherentes a la compraventa

**Estimación de gastos adicionales:** 10-12% del precio de venta.

### 4.2 Disponibilidad

Las propiedades pueden haber sido vendidas, retiradas del mercado o tener su precio 
modificado sin que esta información se haya actualizado inmediatamente en el Sitio Web.

Anclora Private Estates no se responsabiliza de la no disponibilidad de inmuebles 
publicados.

### 4.3 Certificaciones

Todas las propiedades cuentan con Certificado de Eficiencia Energética en vigor, 
disponible bajo petición conforme al Real Decreto 390/2021.

## 5. ROL DE ANCLORA PRIVATE ESTATES

Anclora Private Estates actúa como **intermediario inmobiliario profesional** entre 
compradores y vendedores/promotores.

**NO somos:**
- Asesores financieros regulados (CNMV)
- Gestores de patrimonio
- Entidades de crédito
- Asesores fiscales

**SÍ ofrecemos:**
- Intermediación profesional en transacciones inmobiliarias
- Información de mercado con carácter orientativo
- Coordinación con profesionales independientes (abogados, notarios, gestorías)

## 6. DATOS DE MERCADO E INVERSIÓN

### 6.1 Naturaleza de la Información

Los datos de mercado, proyecciones de rentabilidad y apreciación de capital 
tienen carácter **EXCLUSIVAMENTE INFORMATIVO** y se basan en:
- Datos históricos de fuentes públicas y privadas
- Informes de terceros (Idealista, Fotocasa, INE, etc.)
- Proyecciones de instituciones financieras

### 6.2 Ausencia de Garantías

**RENTABILIDADES PASADAS NO GARANTIZAN RENTABILIDADES FUTURAS.**

Anclora Private Estates:
- NO garantiza ningún nivel de rentabilidad
- NO promete revalorización específica de inmuebles
- NO asegura liquidez de activos inmobiliarios
- NO asume responsabilidad por pérdidas derivadas de inversiones

### 6.3 Calculadoras y Herramientas

Las calculadoras de ROI, hipotecas y simuladores tienen finalidad ilustrativa. 
Los resultados NO constituyen asesoramiento financiero personalizado.

Consulte con asesores fiscales, legales y financieros independientes antes de 
tomar cualquier decisión de inversión.

## 7. PROPIEDAD INTELECTUAL E INDUSTRIAL

Todos los contenidos del Sitio Web (textos, fotografías, gráficos, imágenes, 
tecnología, software, links, diseños gráficos, código fuente, etc.) son propiedad 
intelectual de Anclora Private Estates o de terceros que han autorizado su uso.

Queda prohibido:
- La reproducción, distribución o comunicación pública de contenidos
- La transformación o modificación de contenidos
- El uso comercial sin autorización expresa

Las fotografías de propiedades están protegidas por derechos de autor y/o son 
propiedad de los propietarios/promotores. Su uso está limitado a la promoción 
en el Sitio Web.

## 8. ENLACES A TERCEROS

El Sitio Web puede contener enlaces a sitios web de terceros. Anclora Private Estates 
no controla ni se responsabiliza del contenido, políticas de privacidad o prácticas 
de dichos sitios.

## 9. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD

Anclora Private Estates no se hace responsable de:
- Errores u omisiones en los contenidos
- Falta de disponibilidad del Sitio Web
- Daños derivados del uso del Sitio Web
- Virus informáticos o elementos dañinos
- Uso indebido del Sitio Web por parte de usuarios

## 10. PROTECCIÓN DE DATOS PERSONALES

El tratamiento de datos personales se rige por nuestra [Política de Privacidad](/legal/privacidad).

## 11. LEGISLACIÓN APLICABLE Y JURISDICCIÓN

El presente Aviso Legal se rige por la legislación española.

Para la resolución de cualquier controversia derivada del uso del Sitio Web, 
las partes se someten a los Juzgados y Tribunales de Palma de Mallorca, 
renunciando expresamente a cualquier otro fuero que pudiera corresponderles.

---

**Para consultas sobre este Aviso Legal:**  
📧 legal@ancloraprivateestates.com  
📞 +34 971 000 000
```

---

# 3. POLÍTICA DE PRIVACIDAD GDPR

### 🇪🇸 ESPAÑOL (RGPD + LOPDGDD)

```markdown
# POLÍTICA DE PRIVACIDAD

**Última actualización:** 24 de enero de 2026

## 1. RESPONSABLE DEL TRATAMIENTO

**Identidad:** Anclora Private Estates S.L.  
**NIF:** B-XXXXXXXX  
**Dirección:** Paseo del Borne, 15, 07012 Palma de Mallorca  
**Email:** privacidad@ancloraprivateestates.com  
**Teléfono:** +34 971 000 000  

**Delegado de Protección de Datos (DPD):**  
📧 dpo@ancloraprivateestates.com

## 2. FINALIDADES DEL TRATAMIENTO

### 2.1 Formularios de Contacto
- **Finalidad:** Atender consultas sobre propiedades y servicios
- **Base legal:** Consentimiento del interesado (Art. 6.1.a RGPD)
- **Plazo:** 24 meses desde último contacto
- **Destinatarios:** No se ceden datos a terceros salvo obligación legal

### 2.2 Newsletter/Comunicaciones Comerciales
- **Finalidad:** Envío de información sobre propiedades, eventos y novedades
- **Base legal:** Consentimiento del interesado (Art. 6.1.a RGPD)
- **Plazo:** Hasta que se solicite la baja
- **Destinatarios:** Mailchimp (EE.UU., Privacy Shield), n8n (EU)

### 2.3 Valoración de Propiedades
- **Finalidad:** Realizar tasaciones orientativas
- **Base legal:** Consentimiento del interesado
- **Plazo:** 12 meses
- **Destinatarios:** No se ceden datos

### 2.4 Gestión de Visitas a Propiedades
- **Finalidad:** Coordinar visitas, verificar identidad (prevención blanqueo)
- **Base legal:** Ejecución de medidas precontractuales (Art. 6.1.b RGPD) 
  + Cumplimiento obligación legal Ley 10/2010 (Art. 6.1.c RGPD)
- **Plazo:** 10 años (obligación legal prevención blanqueo)
- **Destinatarios:** SEPBLAC (solo si procede), notarios

### 2.5 Cookies y Analítica Web
- **Finalidad:** Mejorar experiencia de usuario, analizar tráfico
- **Base legal:** Consentimiento (Art. 6.1.a RGPD)
- **Plazo:** Ver [Política de Cookies](/legal/cookies)
- **Destinatarios:** Google Analytics, Meta Pixel

## 3. CATEGORÍAS DE DATOS

Podemos recoger:
- **Datos identificativos:** Nombre, apellidos, NIF/NIE/Pasaporte
- **Datos de contacto:** Email, teléfono, dirección postal
- **Datos económicos:** Rango presupuestario, capacidad financiera estimada
- **Datos de navegación:** IP, cookies, historial de páginas visitadas

**NO recogemos:**
- Datos bancarios (se gestionan directamente con notarios/bancos)
- Datos de salud
- Datos de ideología, religión, afiliación sindical

## 4. DERECHOS DE LOS INTERESADOS

Según el RGPD, tienes derecho a:

✅ **Acceso:** Saber qué datos tenemos sobre ti  
✅ **Rectificación:** Corregir datos inexactos  
✅ **Supresión:** "Derecho al olvido" (con excepciones legales)  
✅ **Limitación:** Restringir el tratamiento en ciertos casos  
✅ **Portabilidad:** Recibir tus datos en formato estructurado  
✅ **Oposición:** Oponerte al tratamiento con fines de marketing  
✅ **No decisiones automatizadas:** No aplicamos perfilado automatizado

**Cómo ejercer tus derechos:**
📧 privacidad@ancloraprivateestates.com  
📬 Paseo del Borne, 15, 07012 Palma de Mallorca  
(Adjuntar copia de DNI/NIE/Pasaporte)

**Plazo de respuesta:** 1 mes (prorrogable 2 meses más en casos complejos)

**Derecho a reclamar:** Agencia Española de Protección de Datos (www.aepd.es)

## 5. MEDIDAS DE SEGURIDAD

Implementamos medidas técnicas y organizativas para proteger tus datos:
- 🔒 Cifrado SSL/TLS en todas las comunicaciones
- 🔐 Acceso restringido mediante contraseñas robustas
- 💾 Copias de seguridad cifradas
- 👥 Formación continua del personal en protección de datos
- 📋 Auditorías periódicas de seguridad

## 6. TRANSFERENCIAS INTERNACIONALES

Utilizamos servicios de terceros que pueden implicar transferencias fuera del EEE:
- **Google Analytics (EE.UU.):** Decisión de Adecuación Comisión Europea
- **Mailchimp (EE.UU.):** Cláusulas Contractuales Tipo aprobadas por CE
- **Meta Pixel (EE.UU.):** Decisión de Adecuación UE-EE.UU.

## 7. MENORES DE EDAD

No recopilamos intencionadamente datos de menores de 14 años. Si detectamos 
datos de menores, los eliminaremos inmediatamente.

## 8. ACTUALIZACIONES DE ESTA POLÍTICA

Revisamos esta política periódicamente. Los cambios sustanciales se notificarán 
por email o mediante aviso destacado en el Sitio Web.

## 9. CONTACTO

Para cualquier duda sobre esta política o el tratamiento de tus datos:

📧 **Email:** privacidad@ancloraprivateestates.com  
📧 **DPD:** dpo@ancloraprivateestates.com  
📞 **Teléfono:** +34 971 000 000  
📬 **Postal:** Paseo del Borne, 15, 07012 Palma de Mallorca

---

**Base legal:** Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018 (LOPDGDD)
```

---

# 4. TÉRMINOS Y CONDICIONES

### 🇪🇸 ESPAÑOL

```markdown
# TÉRMINOS Y CONDICIONES DE USO

**Última actualización:** 24 de enero de 2026

## 1. ACEPTACIÓN DE LOS TÉRMINOS

Al acceder y utilizar www.ancloraprivateestates.com (el "Sitio Web"), aceptas 
quedar vinculado por estos Términos y Condiciones.

Si no estás de acuerdo, por favor, no utilices el Sitio Web.

## 2. USO PERMITIDO DEL SITIO WEB

### 2.1 Uso Personal y No Comercial

El Sitio Web está destinado exclusivamente a tu uso personal y no comercial. 

**Está permitido:**
✅ Navegar por las propiedades publicadas  
✅ Contactar con Anclora para solicitar información  
✅ Compartir enlaces a propiedades específicas  

**Está prohibido:**
❌ Copiar contenidos sin autorización expresa  
❌ Utilizar scrapers, bots o herramientas automatizadas  
❌ Reproducir fotografías con fines comerciales  
❌ Republicar listados en otras plataformas  

### 2.2 Propiedad Intelectual

Todos los contenidos del Sitio Web (textos, fotografías, logos, diseños) son 
propiedad de Anclora Private Estates o de terceros que han autorizado su uso.

El uso no autorizado puede constituir infracción de derechos de autor y dar lugar 
a acciones legales.

## 3. SERVICIOS DE INTERMEDIACIÓN INMOBILIARIA

### 3.1 Naturaleza del Servicio

Anclora Private Estates actúa como **intermediario profesional** entre:
- Compradores/Arrendatarios (Demandantes)
- Vendedores/Propietarios/Promotores (Ofertantes)

**NO somos:**
- Propietarios de las propiedades publicadas (salvo indicación expresa)
- Promotores inmobiliarios (salvo proyectos propios indicados)
- Asesores financieros o fiscales

### 3.2 Honorarios de Intermediación

**Comisión estándar:** 3% + IVA sobre el precio de venta (pagadero por el comprador)  
**Comisión propiedades exclusivas:** Según acuerdo individual con el vendedor

La comisión se devenga:
- Al firmarse el contrato de compraventa (escritura pública)
- O al formalizarse el contrato de arras/señal si se estipula así

**Condiciones especiales:**
- Propiedades > 5.000.000€: Comisión negociable
- Partners/Brokers: Ver [Programa de Partners](/partners)

### 3.3 Obligaciones del Cliente

Como cliente, te comprometes a:
1. Proporcionar información veraz y actualizada
2. Comunicar cualquier contacto directo con propietarios/promotores
3. No eludir la intermediación de Anclora una vez iniciado el proceso
4. Abonar los honorarios pactados en caso de cierre de transacción

### 3.4 Obligaciones de Anclora Private Estates

Nos comprometemos a:
1. Actuar con diligencia profesional
2. Verificar la información de propiedades en la medida de lo posible
3. Coordinación con profesionales (notarios, abogados, gestores)
4. Confidencialidad en el tratamiento de tus datos

## 4. INFORMACIÓN SOBRE PROPIEDADES

### 4.1 Veracidad de la Información

Hacemos esfuerzos razonables para garantizar la exactitud de la información, pero:

⚠️ Las descripciones, fotografías y planos tienen carácter orientativo  
⚠️ Los precios están sujetos a cambios sin previo aviso  
⚠️ Las superficies son aproximadas (verificar con documentación oficial)  
⚠️ El estado legal/urbanístico debe verificarse con el vendedor/notario  

**Recomendamos encarecidamente:**
- Due diligence legal completa
- Inspección física de la propiedad
- Verificación catastral y registral
- Consulta con arquitecto (si procede reforma/ampliación)

### 4.2 Disponibilidad

Las propiedades pueden haberse vendido, retirado o cambiado de precio sin que 
esta información se actualice inmediatamente en el Sitio Web.

Anclora Private Estates no se responsabiliza de la no disponibilidad de inmuebles.

### 4.3 Certificaciones y Documentación

Todas las propiedades cuentan con:
- ✅ Cédula de Habitabilidad (si procede)
- ✅ Certificado de Eficiencia Energética
- ✅ Nota simple registral actualizada (disponible bajo petición)

## 5. DATOS DE MERCADO E INVERSIÓN

### 5.1 Carácter Informativo

Los datos de mercado, estimaciones de rentabilidad y proyecciones tienen 
**carácter exclusivamente informativo**.

**NO constituyen:**
❌ Asesoramiento de inversión  
❌ Garantía de rentabilidad  
❌ Recomendación personalizada  

### 5.2 Fuentes de Datos

Utilizamos datos de fuentes públicas y privadas consideradas fiables:
- Idealista, Fotocasa
- Instituto Nacional de Estadística (INE)
- Banco de España
- Informes de consultoras (Savills, Knight Frank, JLL)

**Limitación de responsabilidad:** No garantizamos la exactitud de datos de terceros.

### 5.3 Calculadoras y Herramientas

Las calculadoras de ROI, hipotecas y costes son herramientas ilustrativas que 
utilizan parámetros generales.

**Consulta con asesores profesionales antes de tomar decisiones de inversión.**

## 6. PREVENCIÓN DEL BLANQUEO DE CAPITALES

Conforme a la Ley 10/2010, de 28 de abril, Anclora Private Estates está sujeta 
a obligaciones de prevención del blanqueo de capitales.

**Esto implica:**
1. Identificación y verificación de clientes (KYC)
2. Comprobación de origen de fondos en transacciones > 10.000€
3. Conservación de documentación durante 10 años
4. Posible comunicación a SEPBLAC de operaciones sospechosas

**Documentación requerida:**
- DNI/NIE/Pasaporte vigente
- Justificante de domicilio (padrón, recibo suministro)
- Declaración de origen de fondos (si procede)

## 7. LIMITACIÓN DE RESPONSABILIDAD

Anclora Private Estates NO se hace responsable de:

❌ Errores u omisiones en las descripciones de propiedades  
❌ Defectos ocultos en inmuebles  
❌ Incumplimientos contractuales de vendedores/compradores  
❌ Pérdidas financieras derivadas de decisiones de inversión  
❌ Interrupciones del servicio del Sitio Web  
❌ Virus informáticos o elementos dañinos  

**Responsabilidad máxima:** Limitada a los honorarios efectivamente percibidos 
por Anclora en la transacción específica que origine el daño.

## 8. MODIFICACIONES

Anclora Private Estates se reserva el derecho a modificar estos Términos y Condiciones 
en cualquier momento.

Los cambios sustanciales se notificarán mediante:
- Aviso destacado en el Sitio Web
- Email a usuarios registrados

El uso continuado del Sitio Web tras la publicación de cambios constituye aceptación.

## 9. RESOLUCIÓN DE DISPUTAS

### 9.1 Mediación Previa

Antes de acudir a tribunales, las partes acuerdan intentar resolver cualquier 
controversia mediante mediación con el Colegio de Agentes de la Propiedad Inmobiliaria 
de Baleares.

### 9.2 Jurisdicción y Ley Aplicable

Estos Términos se rigen por la legislación española.

Para cualquier controversia, las partes se someten a los Juzgados y Tribunales 
de Palma de Mallorca, salvo que la ley establezca fuero imperativo distinto.

### 9.3 Plataforma de Resolución de Litigios en Línea (UE)

Conforme al Reglamento (UE) 524/2013, los consumidores pueden acceder a la plataforma 
europea de resolución de litigios en línea:  
https://ec.europa.eu/consumers/odr/

## 10. CONTACTO

Para consultas sobre estos Términos y Condiciones:

📧 **Email:** legal@ancloraprivateestates.com  
📞 **Teléfono:** +34 971 000 000  
📬 **Postal:** Paseo del Borne, 15, 07012 Palma de Mallorca

---

**Al utilizar el Sitio Web, confirmas haber leído, entendido y aceptado estos 
Términos y Condiciones.**
```

---

# 5. COOKIE BANNER Y POLÍTICA

## 5.1 Cookie Banner (Implementación)

```tsx
// components/CookieBanner.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Preferencias por defecto
  const [preferences, setPreferences] = useState({
    necessary: true,     // Siempre activas (no se puede desactivar)
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Comprobar si ya hay consentimiento previo
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
      loadCookies(saved);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyNecessary);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
    loadCookies(prefs);
  };

  const loadCookies = (prefs: typeof preferences) => {
    // Cargar Google Analytics solo si está aceptado
    if (prefs.analytics) {
      // gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    
    // Cargar Meta Pixel solo si está aceptado
    if (prefs.marketing) {
      // fbq('consent', 'grant');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-anclora-gold shadow-2xl">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        
        {!showSettings ? (
          // Vista Simple
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold mb-2 text-anclora-navy">
                🍪 Uso de Cookies
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, 
                analizar el tráfico y personalizar el contenido. Puedes aceptar todas 
                las cookies, configurarlas o rechazar las no esenciales.{' '}
                <a href="/legal/cookies" className="text-anclora-gold hover:underline">
                  Más información
                </a>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                Configurar
              </Button>
              <Button variant="ghost" size="sm" onClick={rejectAll}>
                Rechazar no esenciales
              </Button>
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Aceptar todas
              </Button>
            </div>
          </div>
        ) : (
          // Vista Configuración
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-anclora-navy">
              Configuración de Cookies
            </h3>
            
            <div className="space-y-4 mb-6">
              {/* Cookies Necesarias */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-sans font-semibold text-sm mb-1">
                    Cookies Necesarias
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    Esenciales para el funcionamiento del sitio web. No se pueden desactivar.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={true} 
                    disabled
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Cookies Analíticas */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-sans font-semibold text-sm mb-1">
                    Cookies Analíticas
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    Google Analytics - Nos ayudan a entender cómo interactúas con el sitio.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Cookies Marketing */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-sans font-semibold text-sm mb-1">
                    Cookies de Marketing
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    Meta Pixel - Para mostrarte anuncios relevantes en redes sociales.
                  </p>
                </div>
                <div className="ml-4">
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                Volver
              </Button>
              <Button variant="primary" size="sm" onClick={acceptSelected}>
                Guardar Preferencias
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 5.2 Política de Cookies (Página `/legal/cookies`)

```markdown
# POLÍTICA DE COOKIES

**Última actualización:** 24 de enero de 2026

## 1. ¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
(ordenador, tablet, smartphone) cuando visitas un sitio web.

Permiten que el sitio web "recuerde" tus acciones y preferencias durante un 
período de tiempo.

## 2. ¿QUÉ COOKIES UTILIZAMOS?

### 2.1 COOKIES NECESARIAS (No requieren consentimiento)

| Nombre | Finalidad | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `cookie-consent` | Almacenar tus preferencias de cookies | 1 año | Anclora (1ª parte) |
| `NEXT_LOCALE` | Recordar idioma seleccionado | Sesión | Anclora (1ª parte) |
| `csrf-token` | Seguridad contra ataques CSRF | Sesión | Anclora (1ª parte) |

### 2.2 COOKIES ANALÍTICAS (Requieren consentimiento)

| Nombre | Finalidad | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `_ga` | Distinguir usuarios únicos | 2 años | Google Analytics |
| `_ga_XXXXXX` | Mantener estado de sesión | 2 años | Google Analytics |
| `_gid` | Distinguir usuarios | 24 horas | Google Analytics |

**Información recopilada:**
- Páginas visitadas
- Tiempo en el sitio
- Fuente de tráfico (directo, búsqueda, referencia)
- Dispositivo y navegador utilizados

**Política de Privacidad de Google Analytics:**  
https://policies.google.com/privacy

### 2.3 COOKIES DE MARKETING (Requieren consentimiento)

| Nombre | Finalidad | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `_fbp` | Rastreo de conversiones y remarketing | 90 días | Meta (Facebook) |
| `fr` | Publicidad personalizada | 90 días | Meta (Facebook) |

**Información recopilada:**
- Interacciones con anuncios de Facebook/Instagram
- Páginas de propiedades visualizadas
- Conversiones (formularios enviados)

**Política de Privacidad de Meta:**  
https://www.facebook.com/privacy/policy/

## 3. FINALIDADES DEL USO DE COOKIES

Utilizamos cookies para:

✅ **Funcionalidad básica** - Permitir navegación fluida (necesarias)  
✅ **Recordar preferencias** - Idioma, moneda (necesarias)  
✅ **Analítica** - Mejorar el sitio basándonos en uso real (analytics)  
✅ **Marketing** - Mostrarte propiedades relevantes (marketing)  

## 4. BASE LEGAL

- **Cookies necesarias:** Interés legítimo (Art. 6.1.f RGPD)
- **Cookies analytics/marketing:** Consentimiento (Art. 6.1.a RGPD)

Conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE), solicitamos tu consentimiento 
para cookies no esenciales.

## 5. GESTIÓN DE COOKIES

### 5.1 Panel de Configuración

Puedes gestionar tus preferencias en cualquier momento:
1. Clic en el icono 🍪 en la esquina inferior derecha
2. Activa/desactiva categorías de cookies
3. Guarda preferencias

### 5.2 Configuración del Navegador

También puedes gestionar cookies desde la configuración de tu navegador:

**Chrome:**  
Configuración > Privacidad y seguridad > Cookies y otros datos de sitios

**Firefox:**  
Preferencias > Privacidad y seguridad > Cookies y datos del sitio

**Safari:**  
Preferencias > Privacidad > Gestionar datos de sitios web

**Edge:**  
Configuración > Cookies y permisos del sitio > Cookies y datos del sitio

⚠️ **Advertencia:** Bloquear todas las cookies puede afectar la funcionalidad del sitio.

## 6. COOKIES DE TERCEROS

Algunos de nuestros partners (Google, Meta) pueden establecer cookies cuando 
visitas nuestro sitio web. Anclora Private Estates no controla estas cookies.

Para más información sobre cookies de terceros:
- Google: https://policies.google.com/technologies/cookies
- Meta: https://www.facebook.com/policies/cookies/

## 7. ACTUALIZACIONES

Revisamos esta política periódicamente para reflejar cambios en nuestras prácticas 
o en la legislación aplicable.

Fecha de última actualización: 24 de enero de 2026

## 8. CONTACTO

Para preguntas sobre cookies:

📧 privacidad@ancloraprivateestates.com  
📞 +34 971 000 000

---

**Legislación aplicable:**  
- Reglamento (UE) 2016/679 (RGPD)
- Ley 34/2002 (LSSI-CE)
- Ley Orgánica 3/2018 (LOPDGDD)
```

---

# 6. AVISOS ESPECÍFICOS POR JURISDICCIÓN

## 6.1 Reino Unido (UK FCA Compliance)

**Ubicación:** Debajo de calculadoras y proyecciones

```
🇬🇧 UK REGULATORY NOTICE

Anclora Private Estates is NOT authorised or regulated by the Financial Conduct 
Authority (FCA). We are NOT permitted to carry on regulated activities under the 
Financial Services and Markets Act 2000.

This website does NOT constitute:
❌ Financial promotion under FSMA 2000
❌ Investment advice
❌ An offer to sell securities

Property investments are NOT covered by the Financial Services Compensation Scheme 
(FSCS). You may lose some or all of your investment.

For independent financial advice, consult an FCA-authorised advisor.
Find one at: https://register.fca.org.uk/

---

**Tax Implications (UK Residents):**
- Stamp Duty Land Tax (SDLT): 0-17% depending on property value
- Annual Tax on Enveloped Dwellings (ATED): If held in a company
- Capital Gains Tax: 18-28% on disposal (main residence relief may apply)
- Inheritance Tax: 40% above threshold (domicile-dependent)

Consult a UK tax advisor before purchasing Spanish property.
```

## 6.2 Alemania (BaFin Compliance)

**Ubicación:** Debajo de calculadoras y proyecciones

```
🇩🇪 DEUTSCHER REGULATORISCHER HINWEIS

Anclora Private Estates ist KEIN von der Bundesanstalt für Finanzdienstleistungs-
aufsicht (BaFin) zugelassenes oder beaufsichtigtes Finanzinstitut.

Diese Website stellt NICHT dar:
❌ Anlageberatung gemäß WpHG
❌ Vermögensverwaltung
❌ Ein öffentliches Angebot von Wertpapieren

Immobilieninvestitionen unterliegen NICHT dem Einlagensicherungs- und Anleger-
entschädigungsgesetz (EAEG). Sie können einen Teil oder Ihre gesamte Investition 
verlieren.

Für unabhängige Finanzberatung konsultieren Sie einen BaFin-zugelassenen Berater.

---

**Steuerliche Auswirkungen (Deutsche Residenten):**
- Grunderwerbsteuer in Spanien: 8-10% (Balearen)
- Grundsteuer (IBI): Jährlich, variiert nach Gemeinde
- Einkommensteuer auf Mieteinnahmen: Progressiv bis 47%
- Abgeltungsteuer auf Veräußerungsgewinne: 19-24%
- Erbschaftsteuer: Unterliegt spanischem Recht

Konsultieren Sie einen deutschen Steuerberater vor Erwerb spanischer Immobilien.

---

**Widerrufsrecht gemäß BGB:**
Bei Fernabsatzverträgen (online abgeschlossen) haben Sie ein 14-tägiges Widerrufsrecht. 
Allerdings gilt dieses NICHT für Immobilienkaufverträge, die vor einem spanischen Notar 
formalisiert werden.
```

---

# 7. IMPLEMENTACIÓN TÉCNICA

## 7.1 Estructura de Archivos Legales

```
app/
└── [locale]/
    └── legal/
        ├── disclaimer/
        │   └── page.tsx          # Aviso Legal
        ├── privacidad/
        │   └── page.tsx          # Política Privacidad
        ├── cookies/
        │   └── page.tsx          # Política Cookies
        └── terminos/
            └── page.tsx          # Términos y Condiciones
```

## 7.2 Componente Disclaimer Universal

```tsx
// components/legal/DisclaimerBox.tsx

interface DisclaimerProps {
  type: 'investment' | 'calculator' | 'property' | 'general';
  locale: 'es' | 'en' | 'de';
}

export function DisclaimerBox({ type, locale }: DisclaimerProps) {
  const disclaimers = {
    investment: {
      es: `⚠️ AVISO IMPORTANTE SOBRE INFORMACIÓN DE INVERSIÓN\n\n...`,
      en: `⚠️ IMPORTANT NOTICE REGARDING INVESTMENT INFORMATION\n\n...`,
      de: `⚠️ WICHTIGER HINWEIS ZU INVESTITIONSINFORMATIONEN\n\n...`,
    },
    // ... otros tipos
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-yellow-400" /* Icono alerta */ />
        </div>
        <div className="ml-3">
          <pre className="text-sm text-gray-700 font-sans whitespace-pre-wrap leading-relaxed">
            {disclaimers[type][locale]}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 7.3 Checklist Pre-Deploy

```markdown
## ✅ CHECKLIST COMPLIANCE LEGAL PRE-PRODUCCIÓN

### Datos Corporativos
- [ ] CIF/NIF actualizado en footer
- [ ] Domicilio social correcto
- [ ] Nº API del Colegio Profesional
- [ ] Registro Mercantil completo
- [ ] Seguro RC vigente con datos de póliza

### Disclaimers
- [ ] Disclaimer inversión en /inversores
- [ ] Disclaimer calculadora ROI
- [ ] Disclaimer en detalle de propiedades
- [ ] Aviso UK (FCA) si hay tráfico UK
- [ ] Aviso DE (BaFin) si hay tráfico DE

### Políticas y Términos
- [ ] Aviso Legal publicado en /legal/disclaimer
- [ ] Política Privacidad GDPR en /legal/privacidad
- [ ] Términos y Condiciones en /legal/terminos
- [ ] Política Cookies en /legal/cookies
- [ ] Cookie Banner funcional y conforme

### GDPR / RGPD
- [ ] Cookie Banner con 3 opciones (Aceptar/Rechazar/Configurar)
- [ ] Consentimiento explícito en formularios
- [ ] Checkbox desactivado por defecto en newsletters
- [ ] Email DPO configurado y operativo
- [ ] Procedimiento ejercicio de derechos documentado

### Seguridad
- [ ] HTTPS habilitado (certificado SSL válido)
- [ ] Headers de seguridad configurados
- [ ] Rate limiting en formularios
- [ ] CAPTCHA en formularios públicos
- [ ] Validación server-side de todos los inputs

### Textos NO Permitidos (Revisar ausencia)
- [ ] No hay promesas de rentabilidad garantizada
- [ ] No se usa "inversión segura" o "sin riesgo"
- [ ] No se prometen plusvalías específicas
- [ ] No se ofrecen "rendimientos asegurados"
- [ ] No hay lenguaje de asesoramiento financiero

### Footer y Links
- [ ] Link "Privacidad" funcional
- [ ] Link "Cookies" funcional
- [ ] Link "Términos" funcional
- [ ] Link "Aviso Legal" funcional
- [ ] Referencia Anclora Nexus Group presente
- [ ] Links a redes sociales actualizados

### Formularios
- [ ] Checkbox consentimiento RGPD obligatorio
- [ ] Texto legal bajo cada formulario
- [ ] Link a Política Privacidad en todos los forms
- [ ] Validación campos obligatorios
- [ ] Mensaje confirmación envío

### Testing
- [ ] Testear desde IP española (disclaimers ES)
- [ ] Testear desde IP UK (disclaimers UK si aplica)
- [ ] Testear desde IP alemana (disclaimers DE si aplica)
- [ ] Cookie Banner aparece en primera visita
- [ ] Preferencias cookies se guardan correctamente
- [ ] Google Analytics solo carga si consentimiento

### Documentación
- [ ] .env.example actualizado con variables legales
- [ ] README.md incluye sección compliance
- [ ] Fechas de "última actualización" correctas
- [ ] Contactos de DPO y legal correctos
```

---

# 8. RECOMENDACIONES FINALES

## 8.1 Antes del Deploy en Producción

1. **Revisión Legal Profesional:**
   - Contratar abogado especializado en derecho digital y RGPD
   - Revisar disclaimers con abogado mercantil
   - Validar cumplimiento Ley Prevención Blanqueo de Capitales

2. **Registro y Licencias:**
   - Alta en Colegio de Agentes Propiedad Inmobiliaria
   - Seguro Responsabilidad Civil profesional (mínimo 300.000€)
   - Registro ante Agencia Española Protección Datos (si aplica)

3. **Auditoría de Seguridad:**
   - Pentesting básico del sitio web
   - Revisión configuración SSL/TLS
   - Test GDPR compliance con herramientas especializadas

## 8.2 Mantenimiento Continuo

**Mensualmente:**
- Revisar enlaces rotos en páginas legales
- Actualizar fechas "última actualización"
- Verificar que Cookie Banner funciona

**Trimestralmente:**
- Revisar cambios legislativos (RGPD, LSSI, etc.)
- Auditar logs de ejercicio de derechos RGPD
- Actualizar datos de mercado en disclaimers

**Anualmente:**
- Renovar póliza Seguro RC
- Renovar colegiación API
- Revisión legal completa con abogado

## 8.3 Red Flags a Evitar SIEMPRE

❌ **NUNCA uses estas frases:**
- "Inversión garantizada"
- "Rentabilidad asegurada del X%"
- "Sin riesgo"
- "Plusvalía garantizada"
- "Beneficios seguros"
- "Revalorización del X% anual garantizada"

✅ **En su lugar, usa:**
- "Históricamente, la zona ha experimentado..."
- "Datos de mercado sugieren..."
- "Proyecciones de terceros indican..."
- "Rentabilidades pasadas no garantizan futuras"

---

**DOCUMENTO CREADO POR:** Claude para Antonio (Anclora Nexus Group)  
**VERSIÓN:** 1.0.0  
**FECHA:** 24 Enero 2026  

**ADVERTENCIA FINAL:** Este documento es orientativo. Consulta con abogado 
especializado antes de publicar en producción.
