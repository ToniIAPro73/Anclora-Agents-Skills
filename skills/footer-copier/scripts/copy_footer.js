const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function getBase64Image(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Asset file not found: ${filePath}. Using placeholder.`);
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    }
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const data = fs.readFileSync(filePath);
    const base64 = data.toString('base64');
    return `data:image/${ext === 'svg' ? 'svg+xml' : ext};base64,${base64}`;
}

async function copyFooter(refPath, targetPath, logoPath, backgroundPath, outputPath) {
    console.log(`Copying footer from ${refPath} to ${targetPath}`);
    console.log(`Using logo: ${logoPath}`);
    console.log(`Using background: ${backgroundPath}`);

    const refHtml = fs.readFileSync(refPath, 'utf8');
    const targetHtml = fs.readFileSync(targetPath, 'utf8');

    const refDom = new JSDOM(refHtml);
    const targetDom = new JSDOM(targetHtml);
    const refDoc = refDom.window.document;
    const targetDoc = targetDom.window.document;

    // 1. Extract Footer HTML
    const refFooter = refDoc.querySelector('footer.premium-footer') || refDoc.querySelector('footer');
    if (!refFooter) {
        throw new Error('No footer found in reference file.');
    }

    // 2. Extract Footer CSS
    // Heuristic: Find style tags containing '.premium-footer'
    const styles = refDoc.querySelectorAll('style');
    let footerCss = '';
    styles.forEach(style => {
        if (style.textContent.includes('.premium-footer') || style.textContent.includes('footer')) {
            // This is a naive extraction. Ideally we parse CSS properly.
            // For now, we append relevant blocks.
            // A better way might be to copy ALL styles if specific footer styles aren't isolated.
            // But let's assume we want to be additive.
           footerCss += style.textContent + '\n';
        }
    });
    
    // We can filter the CSS to only include footer related selectors if needed,
    // but for now let's just create a new style block with the gathered CSS.
    // However, including ALL CSS from reference might break target styles if they conflict.
    // Let's try to be smart: extract blocks that start with .premium-footer
    const extractedFooterCss = footerCss.split('}').filter(block => block.includes('.premium-footer') || block.includes('.footer')).join('}') + '}';
    
    // 3. Prepare Target
    // Remove existing footer
    const existingFooter = targetDoc.querySelector('footer');
    if (existingFooter) {
        existingFooter.remove();
    }

    // Inject CSS
    if (extractedFooterCss.length > 10) { // simple check
        const newStyle = targetDoc.createElement('style');
        newStyle.textContent = `/* Imported Footer Styles */\n${extractedFooterCss}`;
        targetDoc.head.appendChild(newStyle);
    }

    // Inject Footer HTML
    // We need to clone the node to import it into the target document
    // JSDOM handles this automatically if we use innerHTML or cloneNode
    // But since we are crossing documents, we might need to serialize/parse or importNode
    const newFooter = targetDoc.importNode(refFooter, true);
    targetDoc.body.appendChild(newFooter);

    // 4. Asset Integration
    // Replace Logo
    const logoBase64 = getBase64Image(logoPath);
    const logoImg = newFooter.querySelector('img.footer-logo') || newFooter.querySelector('.footer-brand-column img');
    if (logoImg) {
        logoImg.src = logoBase64;
        console.log('Logo updated.');
        // Ensure visibility
        logoImg.style.display = 'block';
        logoImg.style.visibility = 'visible';
    } else {
        console.warn('Footer logo image element not found.');
    }

    // Replace Background
    // Check if background is in extracted CSS or inline style.
    // We will force it on the footer element via inline style for high specificity
    const bgBase64 = getBase64Image(backgroundPath);
    newFooter.style.backgroundImage = `url('${bgBase64}')`;
    newFooter.style.backgroundSize = 'cover';
    newFooter.style.backgroundPosition = 'center';
    console.log('Footer background updated.');

    // 5. Verification
    const verification = {
        footerExists: !!targetDoc.querySelector('footer.premium-footer'),
        logoUpdated: logoImg && logoImg.src.startsWith('data:'),
        backgroundUpdated: newFooter.style.backgroundImage.includes('data:')
    };

    console.log('Verification:', verification);

    if (!verification.footerExists) throw new Error('Footer injection failed.');
    
    // Save
    const outPath = outputPath || targetPath;
    fs.writeFileSync(outPath, targetDom.serialize());
    console.log(`Saved output to ${outPath}`);
}

// CLI args
const args = process.argv.slice(2);
if (args.length < 4) {
    console.error('Usage: node copy_footer.js <ref> <target> <logo> <bg> [--output <out>]');
    process.exit(1);
}

const [ref, target, logo, bg] = args;
let output = null;
if (args[4] === '--output') output = args[5];

copyFooter(ref, target, logo, bg, output).catch(err => {
    console.error(err);
    process.exit(1);
});
