const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function harvestEffects(url, selector = 'body') {
    console.log(`🚀 Harvesting effects from: ${url}`);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const effects = await page.evaluate((sel) => {
            const elements = document.querySelectorAll(sel === 'body' ? 'button, a, .card, [class*="hero"], nav, .glass' : sel);
            const groups = {};
            
            elements.forEach(el => {
                // Basic filtering: Ignore elements within a language toggle or similar repetitive containers
                // if they are almost identical to a previous sibling
                const parent = el.parentElement;
                if (parent && parent.children.length > 2) {
                    const prev = el.previousElementSibling;
                    if (prev && prev.tagName === el.tagName && prev.className === el.className) {
                        return; // Skip repeated siblings with same class/tag
                    }
                }

                const style = window.getComputedStyle(el);
                
                // Create a unique key based on visual properties
                const visualProps = {
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    boxShadow: style.boxShadow,
                    borderRadius: style.borderRadius,
                    backdropFilter: style.backdropFilter,
                    filter: style.filter,
                    transition: style.transition,
                    transform: style.transform,
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                    border: style.border,
                };
                
                const propKey = JSON.stringify(visualProps);
                
                if (!groups[propKey]) {
                    groups[propKey] = {
                        tagName: el.tagName.toLowerCase(),
                        sampleClasses: el.className,
                        count: 0,
                        styles: visualProps
                    };
                }
                groups[propKey].count++;
            });
            
            // Collect CSS Variables
            const rootStyle = window.getComputedStyle(document.documentElement);
            const variables = {};
            Array.from(document.styleSheets).forEach(sheet => {
                try {
                    Array.from(sheet.cssRules).forEach(rule => {
                        if (rule.style) {
                            Array.from(rule.style).forEach(prop => {
                                if (prop.startsWith('--')) {
                                    variables[prop] = rootStyle.getPropertyValue(prop).trim();
                                }
                            });
                        }
                    });
                } catch (e) {}
            });

            return { groups: Object.values(groups), variables };
        }, selector);

        // Generate Markdown
        let report = `# Visual Effects Report: ${url}\n\n`;
        report += `Generated on: ${new Date().toISOString()}\n\n`;
        
        report += `## 🎨 Design Tokens (CSS Variables)\n\n`;
        for (const [key, value] of Object.entries(effects.variables)) {
            if (value) report += `- **${key}**: \`${value}\`\n`;
        }
        
        report += `\n## ✨ Grouped Visual Patterns\n\n`;
        report += `*Elements with identical visual properties have been grouped to avoid redundancy.*\n\n`;
        
        effects.groups.forEach((group, i) => {
            report += `### Pattern ${i + 1}: <${group.tagName}> (${group.count} instances)\n`;
            if (group.sampleClasses && typeof group.sampleClasses === 'string') {
                report += `*Sample Classes: \`${group.sampleClasses.split(' ').filter(c => c).join('.')}\`*\n\n`;
            } else if (group.sampleClasses && typeof group.sampleClasses === 'object' && group.sampleClasses.baseVal) {
                // SVG case
                report += `*Sample Classes (SVG): \`${group.sampleClasses.baseVal.split(' ').filter(c => c).join('.')}\`*\n\n`;
            }
            report += `| Property | Value |\n| :--- | :--- |\n`;
            for (const [prop, val] of Object.entries(group.styles)) {
                if (val && val !== 'none' && val !== 'rgba(0, 0, 0, 0)' && val !== 'normal' && val !== '0px') {
                    report += `| ${prop} | \`${val}\` |\n`;
                }
            }
            report += `\n`;
        });

        const outputPath = path.join(process.cwd(), 'visual_effects_report.md');
        fs.writeFileSync(outputPath, report);
        console.log(`✅ Refined report generated at: ${outputPath}`);
        
    } catch (error) {
        console.error(`❌ Error harvesting: ${error.message}`);
    } finally {
        await browser.close();
    }
}

const args = process.argv.slice(2);
const urlArg = args.indexOf('--url');
const url = urlArg !== -1 ? args[urlArg + 1] : null;

if (!url) {
    console.log('Usage: node harvester.js --url <URL> [--selector <SELECTOR>]');
    process.exit(1);
}

const selectorArg = args.indexOf('--selector');
const selector = selectorArg !== -1 ? args[selectorArg + 1] : 'body';

harvestEffects(url, selector);
