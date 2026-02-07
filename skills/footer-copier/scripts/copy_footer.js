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
            const newStyle = footerStyle.replace(/url\(['"]?.*?['"]?\)/, `url('${cdnBgUrl}')`);
            footer.setAttribute('style', newStyle);
        }

        // Also check children
        const bgStyles = footer.querySelectorAll('[style*="url("]');
        bgStyles.forEach(el => {
            const style = el.getAttribute('style');
            if (style.includes('url(')) {
                const newStyle = style.replace(/url\(['"]?.*?['"]?\)/, `url('${cdnBgUrl}')`);
                el.setAttribute('style', newStyle);
            }
        });
        
        console.log(`- Background updated to CDN: ${bgFilename}`);

        // Inject into target
        const targetFooter = targetDom.window.document.querySelector('footer');
        if (targetFooter) {
            targetFooter.replaceWith(footer);
        } else {
            targetDom.window.document.body.appendChild(footer);
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
    console.log('Usage: node copy_footer.js <ref_html> <target_html> <logo_img> <bg_img> [output_html]');
    process.exit(1);
}

copyFooter(args[0], args[1], args[2], args[3], args[4]);
