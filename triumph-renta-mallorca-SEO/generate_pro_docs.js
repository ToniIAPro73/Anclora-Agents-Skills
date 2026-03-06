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
    BorderStyle,
    ShadingType,
    VerticalAlign,
    LevelFormat,
    Numbering
} = require('docx');

// Configuration
const BASE_DIR = __dirname;
const OUTPUT_DIR = path.join(BASE_DIR, "Entregables");
const COVER_IMAGE_PATH = path.join(BASE_DIR, "Imagen_portada_documentos.png");
const LOGO_IMAGE_PATH = path.join(BASE_DIR, "extracted_logo_template.png"); // Using the premium logo extracted from template
const AUTHOR = "ANTONIO BALLESTEROS";
const BIO = "FOUNDER & AI STRATEGIST";
const DATE = "09 de febrero de 2026";
const VERSION = "v3.0";

const FILES_TO_PROCESS = [
    // ESPAÑOL
    { md: "resumen_ejecutivo_ES.md", docx: "Resumen_Ejecutivo_ES.docx", title: "Resumen Ejecutivo", lang: "ES", cover: "MASTERPIECE_V7_RESUMEN_ES.jpg" },
    { md: "justificacion_ROI_IA_ES.md", docx: "Justificacion_ROI_IA_ES.docx", title: "Justificación de ROI", lang: "ES", cover: "MASTERPIECE_V7_ROI_ES.jpg" },
    { md: "Propuesta_Consultoria_IA_ES.md", docx: "Propuesta_Consultoria_IA_ES.docx", title: "Propuesta de Consultoría", lang: "ES", cover: "MASTERPIECE_V7_PROPUESTA_ES.jpg" },
    { md: "plan_ejecucion_SEO_GEO_acelerado.md", docx: "Plan_Ejecucion_Acelerado_ES.docx", title: "Plan de Ejecución Acelerado", lang: "ES", cover: "MASTERPIECE_V7_PLAN_ES.jpg" },
    { md: "Anexo_Contractual_Triumph_Rental_Mallorca_V2.md", docx: "Anexo_Contractual_V2_ES.docx", title: "Anexo Contractual", lang: "ES", cover: "MASTERPIECE_V7_ANEXO_ES.jpg" },
    
    // ENGLISH
    { md: "executive_summary_EN.md", docx: "Executive_Summary_EN.docx", title: "Executive Summary", lang: "EN", cover: "MASTERPIECE_V7_RESUMEN_EN.jpg" },
    { md: "ai_roi_justification_EN.md", docx: "AI_ROI_Justification_EN.docx", title: "ROI Justification", lang: "EN", cover: "MASTERPIECE_V7_ROI_EN.jpg" },
    { md: "AI_Consultancy_Proposal_EN.md", docx: "AI_Consultancy_Proposal_EN.docx", title: "AI Consultancy Proposal", lang: "EN", cover: "MASTERPIECE_V7_PROPUESTA_EN.jpg" },
    { md: "accelerated_execution_plan_EN.md", docx: "Accelerated_Execution_Plan_EN.docx", title: "Accelerated Execution Plan", lang: "EN", cover: "MASTERPIECE_V7_PLAN_EN.jpg" },
    { md: "Anexo_Contractual_Triumph_Rental_Mallorca_V2_EN.md", docx: "Anexo_Contractual_V2_EN.docx", title: "Contractual Annex", lang: "EN", cover: "MASTERPIECE_V7_ANEXO_EN.jpg" },
    
    // DEUTSCH
    { md: "kurzbericht_DE.md", docx: "Zusammenfassung_DE.docx", title: "Zusammenfassung", lang: "DE", cover: "MASTERPIECE_V7_RESUMEN_DE.jpg" },
    { md: "ki_roi_justifizierung_DE.md", docx: "KI_ROI_Justifizierung_DE.docx", title: "ROI-Justifizierung", lang: "DE", cover: "MASTERPIECE_V7_ROI_DE.jpg" },
    { md: "KI_Beratung_Angebot_DE.md", docx: "KI_Beratung_Angebot_DE.docx", title: "Strategisches Beratungsangebot", lang: "DE", cover: "MASTERPIECE_V7_PROPUESTA_DE.jpg" },
    { md: "beschleunigter_ausfuehrungsplan_DE.md", docx: "Beschleunigter_Ausfuehrungsplan_DE.docx", title: "Beschleunigter Ausführungsplan", lang: "DE", cover: "MASTERPIECE_V7_PLAN_DE.jpg" },
    { md: "Anexo_Contractual_Triumph_Rental_Mallorca_V2_DE.md", docx: "Anexo_Contractual_V2_DE.docx", title: "Vertragsanhang", lang: "DE", cover: "MASTERPIECE_V7_ANEXO_DE.jpg" },
];

async function createDocument(config) {
    const mdPath = path.join(BASE_DIR, config.md);
    if (!fs.existsSync(mdPath)) {
        console.warn(`Archivo no encontrado: ${mdPath}`);
        return;
    }
    
    let mdContent = fs.readFileSync(mdPath, 'utf-8');
    mdContent = mdContent.replace(/Agustín Medina/g, AUTHOR);
    
    const sections = [];

    // --- 1. SECTION 1: COVER PAGE (FULL-PAGE) ---
    let coverSource = path.join(BASE_DIR, "pro_covers", config.cover);
    if (!fs.existsSync(coverSource)) {
        coverSource = COVER_IMAGE_PATH;
    }

    if (fs.existsSync(coverSource)) {
        sections.push({
            properties: {
                page: {
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                }
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
                            data: fs.readFileSync(coverSource),
                            transformation: { width: 794, height: 1123 }, // Full A4 Docx Units
                            type: coverSource.endsWith('.png') ? "png" : "jpg"
                        })
                    ]
                })
            ]
        });
    }

    // --- 2. PREPARE CONTENT FOR SECTION 2 ---
    const docChildren = [];

    // Title Page Header
    docChildren.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: config.title.toUpperCase(), bold: true, size: 40, color: "000000" })],
        spacing: { before: 1000, after: 600 }
    }));

    // TOC Header
    docChildren.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "ÍNDICE DE CONTENIDOS", bold: true, size: 28, color: "333333" })],
        spacing: { before: 400, after: 400 }
    }));
    docChildren.push(new TableOfContents("Contenidos", {
        hyperlink: true,
        headingStyleRange: "1-3",
    }));
    docChildren.push(new Paragraph({ children: [new PageBreak()] }));

    // CONTENT PROCESSING
    const lines = mdContent.split('\n');
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) {
            docChildren.push(new Paragraph({}));
            return;
        }

        if (trimmed.startsWith('# ')) {
            docChildren.push(new Paragraph({ 
                text: trimmed.substring(2), 
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));
        } else if (trimmed.startsWith('## ')) {
            docChildren.push(new Paragraph({ 
                text: trimmed.substring(3), 
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 150 }
            }));
        } else if (trimmed.startsWith('### ')) {
            docChildren.push(new Paragraph({ 
                text: trimmed.substring(4), 
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 200, after: 100 }
            }));
        } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            docChildren.push(new Paragraph({ 
                text: trimmed.substring(2), 
                bullet: { level: 0 },
                spacing: { after: 100 }
            }));
        } else if (trimmed.startsWith('> ')) {
            docChildren.push(new Paragraph({ 
                children: [new TextRun({ text: trimmed.substring(2), italics: true, color: "666666" })],
                indent: { left: 720 },
                spacing: { after: 200 }
            }));
        } else {
            let content = trimmed;
            const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/);
            const children = parts.map(part => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return new TextRun({ text: part.slice(2, -2), bold: true });
                }
                if (part.startsWith('[') && part.includes('](')) {
                    const labelPart = part.match(/\[(.*?)\]/);
                    const label = labelPart ? labelPart[1] : part;
                    return new TextRun({ text: label, color: "0000EE", underline: {} });
                }
                return new TextRun({ text: part });
            });
            docChildren.push(new Paragraph({ children, spacing: { after: 150 } }));
        }
    });

    // --- 3. SECTION 2: BODY ---
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
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: config.title, bold: true, size: 20 }),
                                                    new TextRun({ text: ` | ${VERSION}`, italics: true, size: 16, color: "666666" })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.RIGHT,
                                                children: [
                                                    fs.existsSync(LOGO_IMAGE_PATH) ? new ImageRun({
                                                        data: fs.readFileSync(LOGO_IMAGE_PATH),
                                                        transformation: { width: 40, height: 40 },
                                                        type: "png"
                                                    }) : new TextRun(""),
                                                    new TextRun({ text: ` ${AUTHOR}`, bold: true, size: 18 }),
                                                ]
                                            }),
                                            new Paragraph({
                                                alignment: AlignmentType.RIGHT,
                                                children: [
                                                    new TextRun({ text: BIO, size: 12, color: "777777", italics: true })
                                                ]
                                            })
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
                        spacing: { before: 200 },
                        children: [
                            new TextRun({ text: "Propiedad de Anclora Cognitive Solutions | Página ", size: 16, color: "888888" }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "888888" }),
                            new TextRun({ text: " de ", size: 16, color: "888888" }),
                            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "888888" }),
                        ]
                    })
                ]
            })
        },
        children: docChildren
    });

    const doc = new Document({
        features: {
            updateFields: true,
        },
        styles: {
            default: { document: { run: { font: "Arial", size: 22 } } },
            paragraphStyles: [
                { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                  run: { size: 32, bold: true, color: "000000" },
                  paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
                { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                  run: { size: 28, bold: true, color: "333333" },
                  paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
                { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
                  run: { size: 24, bold: true, color: "555555" },
                  paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
            ]
        },
        sections: sections
    });

    const buffer = await Packer.toBuffer(doc);
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUTPUT_DIR, config.docx), buffer);
    console.log(`[OK] ${config.docx}`);
}

async function main() {
    console.log(`Iniciando generación corregida de documentos para Triumph Renta Mallorca...`);
    console.log(`Carpeta de salida: ${OUTPUT_DIR}`);
    
    for (const file of FILES_TO_PROCESS) {
        try {
            await createDocument(file);
        } catch (err) {
            console.error(`[ERROR] en ${file.md}:`, err);
        }
    }
    console.log("Proceso finalizado. Los documentos están disponibles en la carpeta 'Entregables'.");
}

main();

