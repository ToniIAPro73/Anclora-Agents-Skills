const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Script to copy footer from a reference HTML to a target HTML.
 * Uses CDN URLs for assets to keep file size small.
 */

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/ToniIAPro73/Anclora-Agents-Skills@main/assets_anclora/';

async function copyFooter(refPath, targetPath, logoPath, backgroundPath, outputPath) {
    console.log('--- Footer Copier (CDN Version) ---');
    
    try {
        const refHtml = fs.readFileSync(refPath, 'utf8');
        const targetHtml = fs.readFileSync(targetPath, 'utf8');

        const refDom = new JSDOM(refHtml);
        const targetDom = new JSDOM(targetHtml);

        const footer = refDom.window.document.querySelector('footer');
        if (!footer) {
            throw new Error('Footer not found in reference HTML');
        }

        // --- CSS Extraction ---
        // Find the style block containing .premium-footer
        const styles = refDom.window.document.querySelectorAll('style');
        let footerCss = '';
        styles.forEach(styleTag => {
            if (styleTag.textContent.includes('.premium-footer')) {
                // Extract everything from .premium-footer onwards or the whole block if it's specific
                // For simplicity and to avoid missing responsive styles, we'll look for the section
                const content = styleTag.textContent;
                const startIdx = content.indexOf('/* ============================================');
                const endIdx = content.indexOf('/* ============================================', startIdx + 100);
                
                if (startIdx !== -1) {
                    footerCss = content.substring(startIdx, endIdx !== -1 ? endIdx : content.length);
                } else {
                    footerCss = content; // Fallback to whole block
                }
            }
        });

        // --- Asset Handling with CDN ---
        
        // 1. Handle Logo
        const footerLogo = footer.querySelector('.footer-logo');
        if (footerLogo) {
            const logoFilename = path.basename(logoPath);
            footerLogo.src = `${CDN_BASE_URL}${logoFilename}`;
            console.log(`- Logo updated to CDN: ${logoFilename}`);
        }

        // 2. Handle Background
        const bgFilename = path.basename(backgroundPath);
        const cdnBgUrl = `${CDN_BASE_URL}${bgFilename}`;
        
        // Check main footer element
        const footerStyle = footer.getAttribute('style') || '';
        if (footerStyle.includes('url(')) {
            const newStyle = footerStyle.replace(/url(['"]?.*?['"]?)/, `url('${cdnBgUrl}')`);
            footer.setAttribute('style', newStyle);
        }

        // Also check children
        const bgStyles = footer.querySelectorAll('[style*="url("]');
        bgStyles.forEach(el => {
            const style = el.getAttribute('style');
            if (style.includes('url(')) {
                const newStyle = style.replace(/url(['"]?.*?['"]?)/, `url('${cdnBgUrl}')`);
                el.setAttribute('style', newStyle);
            }
        });
        
        console.log(`- Background updated to CDN: ${bgFilename}`);

        // --- Injection into target ---
        
        // Inject CSS
        if (footerCss) {
            let targetStyle = targetDom.window.document.querySelector('style#premium-footer-styles');
            if (!targetStyle) {
                targetStyle = targetDom.window.document.createElement('style');
                targetStyle.id = 'premium-footer-styles';
                targetDom.window.document.head.appendChild(targetStyle);
            }
            targetStyle.textContent = footerCss;
            console.log('- Footer CSS injected');
        }

        // Adopt and Inject Footer
        const adoptedFooter = targetDom.window.document.adoptNode(footer);
        const targetFooter = targetDom.window.document.querySelector('footer');
        if (targetFooter) {
            targetFooter.replaceWith(adoptedFooter);
        } else {
            targetDom.window.document.body.appendChild(adoptedFooter);
        }

        const outPath = outputPath || targetPath;
        fs.writeFileSync(outPath, targetDom.serialize());
        console.log(`\nSUCCESS: Footer injected into ${outPath}`);

    } catch (error) {
        console.error('ERROR:', error.message);
        process.exit(1);
    }
}

// CLI Support
const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('Usage: node copy_footer.js <ref_html> <target_html> <logo_filename> <bg_filename> [--output <output_html>]');
    process.exit(1);
}

const refPath = args[0];
const targetPath = args[1];
const logoPath = args[2];
const backgroundPath = args[3];
let outputPath = null;

const outputIndex = args.indexOf('--output');
if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputPath = args[outputIndex + 1];
} else if (args[4] && args[4] !== '--output') {
    outputPath = args[4];
}

copyFooter(refPath, targetPath, logoPath, backgroundPath, outputPath);
