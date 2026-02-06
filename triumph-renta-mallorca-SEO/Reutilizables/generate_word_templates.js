const fs = require('fs');
const path = require('path');
const { 
    Document, 
    Packer, 
    Paragraph, 
    TextRun, 
    ImageRun, 
    Header, 
    Footer, 
    AlignmentType, 
    Table, 
    TableRow, 
    TableCell, 
    WidthType, 
    PageNumber, 
    TableOfContents, 
    HeadingLevel,
    PageBreak,
    ShadingType,
    VerticalAlign,
    LevelFormat
} = require('docx');

const BASE_DIR = __dirname;
const LOGO_ANCLORA = "c:\\Users\\Usuario\\Workspace\\01_Proyectos\\Anclora-Agents-Skills\\creador_de_blogs\\assets\\logo-anclora-Nexus-Group.png";
const OUTPUT_DIR = path.join(BASE_DIR, "Generated_Templates");

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Configuration for each Template type
const TEMPLATE_CONFIGS = [
    {
        id: "RESUMEN_EJECUTIVO",
        filename: "Plantilla_Resumen_Ejecutivo",
        titles: { ES: "RESUMEN EJECUTIVO", EN: "EXECUTIVE SUMMARY", DE: "ZUSAMMENFASSUNG" },
        content: {
            ES: [
                { title: "1. Introducción y Objetivos", body: "Describir brevemente el propósito del documento. Definir objetivos comerciales." },
                { title: "2. Diagnóstico del Estado Actual", body: "Enumerar puntos críticos, falta de visibilidad GEO y errores técnicos." },
                { title: "3. Propuesta Estratégica", body: "Desarrollar la solución SEO/GEO de alta fidelidad. Fases." },
                { title: "4. Impacto Esperado", body: "Proyectar resultados y beneficios de negocio." }
            ],
            EN: [
                { title: "1. Introduction and Objectives", body: "Briefly describe the purpose. Define goals." },
                { title: "2. Current Status", body: "List critical points and technical errors." },
                { title: "3. Strategic Proposal", body: "Develop the high-fidelity SEO/GEO solution." },
                { title: "4. Expected Impact", body: "Project results and benefits." }
            ],
            DE: [
                { title: "1. Einleitung und Ziele", body: "Zweck des Dokuments. Geschäftsziele definieren." },
                { title: "2. Aktueller Status", body: "Kritische Punkte und technische Fehler auflisten." },
                { title: "3. Strategischer Vorschlag", body: "High-Fidelity SEO/GEO-Lösung entwickeln." },
                { title: "4. Erwartete Wirkung", body: "Ergebnisse und Vorteile projizieren." }
            ]
        }
    },
    {
        id: "AUDITORIA_SEO_GEO",
        filename: "Plantilla_Auditoria_SEO_GEO",
        titles: { ES: "AUDITORÍA SEO/GEO", EN: "SEO/GEO AUDIT", DE: "SEO/GEO AUDIT" },
        content: {
            ES: [
                { title: "1. Análisis de Visibilidad", body: "Estado actual en buscadores y mapas." },
                { title: "2. Salud Técnica Web", body: "Indexación, velocidad y errores." },
                { title: "3. Perfil de Empresa (GEO)", body: "Optimización de Google Business Profile." },
                { title: "4. Conclusiones Técnicas", body: "Tareas prioritarias." }
            ],
            EN: [
                { title: "1. Visibility Analysis", body: "Current status in search and maps." },
                { title: "2. Web Technical Health", body: "Indexing, speed, and errors." },
                { title: "3. Business Profile (GEO)", body: "Google Business Profile optimization." },
                { title: "4. Technical Conclusions", body: "Priority tasks." }
            ],
            DE: [
                { title: "1. Sichtbarkeitsanalyse", body: "Aktueller Status in Suche und Karten." },
                { title: "2. Technische Web-Gesundheit", body: "Indexierung, Geschwindigkeit und Fehler." },
                { title: "3. Unternehmensprofil (GEO)", body: "Google Business Profile Optimierung." },
                { title: "4. Technische Schlussfolgerungen", body: "Prioritäre Aufgaben." }
            ]
        }
    },
    {
        id: "PLAN_EJECUCION",
        filename: "Plantilla_Plan_Ejecucion",
        titles: { ES: "PLAN DE EJECUCIÓN", EN: "EXECUTION PLAN", DE: "AUSFUEHRUNGSPLAN" },
        content: {
            ES: [
                { title: "1. Cronograma de Fases", body: "Distribución temporal de tareas." },
                { title: "2. Recursos Necesarios", body: "Personal y herramientas." },
                { title: "3. Hitos de Control", body: "Resultados verificables por fase." }
            ],
            EN: [
                { title: "1. Timeline and Phases", body: "Task distribution over time." },
                { title: "2. Required Resources", body: "Staff and tools." },
                { title: "3. Milestones", body: "Verifiable results per phase." }
            ],
            DE: [
                { title: "1. Zeitplan und Phasen", body: "Aufgabenverteilung im Zeitverlauf." },
                { title: "2. Erforderliche Ressourcen", body: "Personal und Werkzeuge." },
                { title: "3. Meilensteine", body: "Überprüfbare Ergebnisse pro Phase." }
            ]
        }
    },
    {
        id: "ANEXO_CONTRACTUAL",
        filename: "Plantilla_Anexo_Contractual",
        titles: { ES: "ANEXO CONTRACTUAL", EN: "CONTRACTUAL ANNEX", DE: "VERTRAGSANHANG" },
        content: {
            ES: [
                { title: "1. Objeto del Anexo", body: "Definición de servicios específicos adicionales." },
                { title: "2. Condiciones Económicas", body: "Detalle de honorarios y formas de pago." },
                { title: "3. Vigencia y Rescisión", body: "Plazos contractuales y condiciones de salida." }
            ],
            EN: [
                { title: "1. Object of the Annex", body: "Definition of specific additional services." },
                { title: "2. Economic Conditions", body: "Detail of fees and payment methods." },
                { title: "3. Validity and Termination", body: "Contractual terms and exit conditions." }
            ],
            DE: [
                { title: "1. Gegenstand des Anhangs", body: "Definition spezifischer Zusatzleistungen." },
                { title: "2. Wirtschaftliche Bedingungen", body: "Detail der Gebühren und Zahlungsmethoden." },
                { title: "3. Gültigkeit und Kündigung", body: "Vertragslaufzeiten und Austrittsbedingungen." }
            ]
        }
    },
    {
        id: "PROPUESTA_CONSULTORIA",
        filename: "Plantilla_Propuesta_Consultoria",
        titles: { ES: "PROPUESTA DE CONSULTORÍA IA", EN: "AI CONSULTANCY PROPOSAL", DE: "STRATEGISCHES ANGEBOT" },
        content: {
            ES: [
                { title: "1. Alcance de la Consultoría", body: "Áreas de intervención y tecnologías cubiertas." },
                { title: "2. Metodología de Trabajo", body: "Enfoque ágil y fases de entrega." },
                { title: "3. Entregables Esperados", body: "Documentación y activos finales." }
            ],
            EN: [
                { title: "1. Scope of Consultancy", body: "Areas of intervention and technologies covered." },
                { title: "2. Work Methodology", body: "Agile approach and delivery phases." },
                { title: "3. Expected Deliverables", body: "Final documentation and assets." }
            ],
            DE: [
                { title: "1. Umfang der Beratung", body: "Interventionsbereiche und abgedeckte Technologien." },
                { title: "2. Arbeitsmethodik", body: "Agiler Ansatz und Lieferphasen." },
                { title: "3. Erwartete Ergebnisse", body: "Abschlussdokumentation und Vermögenswerte." }
            ]
        }
    }
];

async function generateDoc(template, lang) {
    const sections = [];
    const coverFilename = `mock_${template.id.toLowerCase()}_${lang.toLowerCase()}.jpg`;
    const coverPath = path.join(BASE_DIR, coverFilename);
    
    // 1. SECTION 1: FULL-PAGE COVER
    if (fs.existsSync(coverPath)) {
        sections.push({
            properties: {
                page: {
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                },
            },
            headers: {
                default: new Header({ children: [] }),
            },
            footers: {
                default: new Footer({ children: [] }),
            },
            children: [
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: fs.readFileSync(coverPath),
                            transformation: { width: 794, height: 1123 }, // Full A4 at 96 DPI
                            type: "jpg"
                        })
                    ]
                })
            ]
        });
    }

    // 2. PREPARE CONTENT FOR SECTION 2
    const docChildren = [];
    
    // TOC Header
    docChildren.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: lang === "ES" ? "ÍNDICE" : (lang === "EN" ? "INDEX" : "INHALTSVERZEICHNIS"), bold: true, size: 36 })],
        spacing: { after: 400 }
    }));
    docChildren.push(new TableOfContents("Contenidos", {
        hyperlink: true,
        headingStyleRange: "1-3",
    }));
    docChildren.push(new Paragraph({ children: [new PageBreak()] }));

    // SECTIONS
    template.content[lang].forEach(sec => {
        docChildren.push(new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: sec.title, bold: true })]
        }));
        docChildren.push(new Paragraph({
            spacing: { before: 200, after: 400 },
            children: [new TextRun({ text: sec.body, italics: true, color: "666666" })]
        }));
    });

    // 3. SECTION 2: CONTENT BODY
    sections.push({
        properties: {
            page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
                pageNumberStart: 1,
                pageNumberFormatType: LevelFormat.DECIMAL,
            }
        },
        headers: {
            default: new Header({
                children: [
                    new Table({
                        columnWidths: [4680, 4680],
                        width: { size: 9360, type: WidthType.DXA },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: { size: 4680, type: WidthType.DXA },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [
                                            fs.existsSync(LOGO_ANCLORA) ? 
                                            new Paragraph({ children: [new ImageRun({ data: fs.readFileSync(LOGO_ANCLORA), transformation: { width: 40, height: 40 }, type: "png" })] }) : 
                                            new Paragraph({ children: [new TextRun("Anclora Nexus")] })
                                        ]
                                    }),
                                    new TableCell({
                                        width: { size: 4680, type: WidthType.DXA },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [
                                            new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ANTONIO BALLESTEROS", bold: true, size: 16 })] }),
                                            new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "FOUNDER & AI STRATEGIST", size: 14, color: "888888" })] }),
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: "PROTOTIPO REUTILIZABLE | ", size: 16, color: "888888" }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "888888" }),
                        ]
                    })
                ]
            })
        },
        children: docChildren
    });

    const doc = new Document({
        styles: {
            default: { document: { run: { font: "Arial", size: 22 } } },
            paragraphStyles: [
                { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", run: { size: 32, bold: true, color: "000000" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
            ]
        },
        sections: sections
    });

    const buffer = await Packer.toBuffer(doc);
    const finalPath = path.join(OUTPUT_DIR, `${template.filename}_${lang}.docx`);
    fs.writeFileSync(finalPath, buffer);
    console.log(`[OK] Created: ${finalPath}`);
}

async function main() {
    for (const config of TEMPLATE_CONFIGS) {
        for (const lang of ["ES", "EN", "DE"]) {
            await generateDoc(config, lang);
        }
    }
}

main();
