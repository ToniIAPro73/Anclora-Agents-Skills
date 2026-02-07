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
    console.log(`- Ref: ${refPath}`);
    console.log(`- Target: ${targetPath}`);
    
    try {
        if (!fs.existsSync(refPath)) throw new Error(`Reference file not found: ${refPath}`);
        if (!fs.existsSync(targetPath)) throw new Error(`Target file not found: ${targetPath}`);

        const refHtml = fs.readFileSync(refPath, 'utf8');
        const targetHtml = fs.readFileSync(targetPath, 'utf8');

        const refDom = new JSDOM(refHtml);
        const targetDom = new JSDOM(targetHtml);

        const footer = refDom.window.document.querySelector('footer.premium-footer') || refDom.window.document.querySelector('footer');
        if (!footer) {
            throw new Error('Footer not found in reference HTML');
        }

        // --- CSS Extraction ---
        const styles = refDom.window.document.querySelectorAll('style');
        let footerCss = '';
        styles.forEach(styleTag => {
            const content = styleTag.textContent;
            if (content.includes('.premium-footer')) {
                // Try to find the section by comments first
                const startMarker = '/* ============================================';
                const premiumMarker = 'PREMIUM FOOTER';
                
                let startIdx = content.indexOf(premiumMarker);
                if (startIdx !== -1) {
                    // Back up to the previous comment block start
                    const prevComment = content.lastIndexOf(startMarker, startIdx);
                    if (prevComment !== -1) startIdx = prevComment;
                    
                    const endIdx = content.indexOf(startMarker, startIdx + 100);
                    footerCss += content.substring(startIdx, endIdx !== -1 ? endIdx : content.length) + '\n';
                } else {
                    // Fallback: search for .premium-footer blocks
                    footerCss += content + '\n'; 
                }
            }
        });

        // --- Asset Handling with CDN ---
        
        // 1. Handle Footer Logo (Fixed selector to .footer-brand-column img)
        const footerLogo = footer.querySelector('.footer-brand-column img');
        if (footerLogo) {
            const logoFilename = path.basename(logoPath);
            footerLogo.src = `${CDN_BASE_URL}${logoFilename}`;
            console.log(`- Footer Logo updated to CDN: ${logoFilename}`);
        }

        // 2. Handle Footer Background
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
        
        console.log(`- Footer Background updated to CDN: ${bgFilename}`);

        // 3. Handle Header Assets (NEW)
        const HEADER_LOGO_CDN = 'https://cdn.jsdelivr.net/gh/ToniIAPro73/Anclora-Agents-Skills@main/assets_anclora/logo-anclora-private-estate&exp.png';
        const HERO_BG_CDN = 'https://cdn.jsdelivr.net/gh/ToniIAPro73/Anclora-Agents-Skills@main/assets_anclora/Hero_Background_private_estates_data_lab.png';

        // Target: .site-header .header-logo img or .effect-logo-glow
        const headerLogo = targetDom.window.document.querySelector('.site-header img, .effect-logo-glow');
        if (headerLogo) {
            headerLogo.src = HEADER_LOGO_CDN;
            console.log('- Header Logo updated to CDN');
        }

        // Target: .lab-hero background style
        const heroSection = targetDom.window.document.querySelector('.lab-hero');
        if (heroSection) {
            const heroStyle = heroSection.getAttribute('style') || '';
            // If it has internal style, replace it. If it's in a <style> tag, we might need to handle it differently, 
            // but usually we can override with inline style or regex the style tag.
            // In anclora_data_lab.html, it's in a <style> block. Let's find and replace in the DOM's style tags.
            const targetStyles = targetDom.window.document.querySelectorAll('style');
            targetStyles.forEach(styleTag => {
                if (styleTag.textContent.includes('.lab-hero')) {
                    styleTag.textContent = styleTag.textContent.replace(
                        /url\(['"]?.*?anclora_data_lab_cinematic_bg\.png['"]?\)/g,
                        `url('${HERO_BG_CDN}')`
                    );
                    console.log('- Hero Background CSS updated');
                }
            });
        }

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

// CLI Support with Flag Parsing
const args = process.argv.slice(2);
const getArg = (flag, alias) => {
    const idx = args.indexOf(flag) !== -1 ? args.indexOf(flag) : args.indexOf(alias);
    return (idx !== -1 && args[idx + 1]) ? args[idx + 1] : null;
};

const refPath = getArg('--ref', '-r') || args[0];
const targetPath = getArg('--target', '-t') || args[1];
const logoPath = getArg('--logo', '-l') || args[2];
const backgroundPath = getArg('--bg', '-b') || args[3];
const outputPath = getArg('--output', '-o') || args[4];

if (!refPath || !targetPath || !logoPath || !backgroundPath) {
    console.log('Usage: node copy_footer.js --ref <ref_html> --target <target_html> --logo <logo_path> --bg <bg_path> [--output <output_html>]');
    console.log('   or: node copy_footer.js <ref_html> <target_html> <logo_path> <bg_path> [<output_html>]');
    process.exit(1);
}

copyFooter(refPath, targetPath, logoPath, backgroundPath, outputPath);
