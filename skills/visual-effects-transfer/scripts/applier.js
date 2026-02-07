/**
 * Visual Effects Applier
 * Applies extracted effects to destination HTML
 */

const fs = require('fs');
const { JSDOM } = require('jsdom');

/**
 * Apply extracted effects to destination HTML
 * @param {string} destPath - Path to destination HTML file
 * @param {object} effects - Extracted effects data
 * @param {object} options - Application options
 * @returns {object} Result with modified HTML and statistics
 */
async function applyEffects(destPath, effects, options = {}) {
    const destHTML = fs.readFileSync(destPath, 'utf8');
    const dom = new JSDOM(destHTML);
    const document = dom.window.document;

    const result = {
        html: '',
        css: '',
        tokensInjected: 0,
        classesCreated: [],
        elementsEnhanced: []
    };

    // Find or create style tag in head
    let styleTag = document.querySelector('style');
    if (!styleTag) {
        styleTag = document.createElement('style');
        document.head.appendChild(styleTag);
    }

    let css = styleTag.textContent || '';

    // 1. Inject design tokens into :root
    const rootTokens = effects.tokens.map(t => `    ${t.name}: ${t.value};`).join('\n');
    
    if (!css.includes(':root')) {
        css = `:root {\n${rootTokens}\n}\n\n` + css;
    } else {
        // Merge with existing :root
        css = css.replace(/:root\s*{([^}]*)}/, (match, existingTokens) => {
            return `:root {\n${existingTokens}\n${rootTokens}\n}`;
        });
    }
    
    result.tokensInjected = effects.tokens.length;

    // 2. Create utility classes from patterns
    const utilityClasses = generateUtilityClasses(effects.patterns, effects.pseudoElements);
    css += '\n\n/* === Premium Visual Effects === */\n';
    css += utilityClasses.css;
    result.classesCreated = utilityClasses.classes;

    // 3. Add animations
    effects.animations.forEach(anim => {
        if (!css.includes(`@keyframes ${anim.name}`)) {
            css += '\n' + anim.cssText + '\n';
        }
    });

    // 4. Map and enhance elements
    const mappings = createElementMappings(document, effects.patterns);
    mappings.forEach(mapping => {
        const elements = document.querySelectorAll(mapping.selector);
        elements.forEach(elem => {
            mapping.classes.forEach(cls => {
                if (!elem.classList.contains(cls)) {
                    elem.classList.add(cls);
                }
            });
        });
        
        if (elements.length > 0) {
            result.elementsEnhanced.push({
                selector: mapping.selector,
                count: elements.length,
                effects: mapping.classes
            });
        }
    });

    // Update style tag
    styleTag.textContent = css;
    result.css = css;

    // 5. Inject header scroll JavaScript
    const scrollScript = document.createElement('script');
    scrollScript.textContent = `
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) {
                const scrolled = window.pageYOffset;
                if (scrolled > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    `;
    document.body.appendChild(scrollScript);

    result.html = dom.serialize();

    return result;
}

/**
 * Generate utility CSS classes from patterns
 */
function generateUtilityClasses(patterns, pseudoElements) {
    const classes = [];
    let css = '';

    // Group patterns by type
    const grouped = {};
    patterns.forEach(p => {
        if (!grouped[p.type]) grouped[p.type] = [];
        grouped[p.type].push(p);
    });

    // Glassmorphism classes
    if (grouped.glassmorphism) {
        const glassPattern = grouped.glassmorphism[0];
        css += `\n.effect-glass-card {\n`;
        Object.entries(glassPattern.properties).forEach(([prop, value]) => {
            if (prop !== 'background' && prop !== 'border' && prop !== 'border-color') {
                css += `    ${prop}: ${value};\n`;
            }
        });
        css += `    background: #0F3F45;\n`;
        css += `    border: 1px solid rgba(212, 175, 55, 0.2);\n`;
        css += `    transition: all 0.3s ease;\n`;
        css += `}\n`;
        
        css += `.effect-glass-card:hover {\n`;
        css += `    transform: translateY(-10px);\n`;
        css += `    background: rgba(44, 62, 80, 0.6);\n`;
        css += `    border-color: var(--anclora-gold, #D4AF37);\n`;
        css += `    box-shadow: \n`;
        css += `        0 25px 50px rgba(0,0,0,0.4),\n`;
        css += `        0 15px 40px rgba(212, 175, 55, 0.25),\n`;
        css += `        0 5px 20px rgba(212, 175, 55, 0.15);\n`;
        css += `}\n`;
        
        classes.push({ name: 'effect-glass-card', description: 'Glassmorphism effect for cards' });
    }

    // Gold gradient classes
    if (grouped.gradient) {
        const gradPattern = grouped.gradient.find(p => p.cssText.includes('gold') || p.cssText.includes('#D4AF37'));
        if (gradPattern) {
            css += `\n.effect-gold-gradient {\n`;
            css += `    background: var(--gold-gradient, linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 50%, #FBF5B7 55%, #AA771C 100%));\n`;
            css += `    border: 1px solid var(--anclora-gold, #D4AF37);\n`;
            css += `    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.15);\n`;
            css += `    transition: all 0.3s ease;\n`;
            css += `    position: relative;\n`;
            css += `    overflow: hidden;\n`;
            css += `}\n`;
            
            css += `.effect-gold-gradient:hover {\n`;
            css += `    transform: scale(1.05);\n`;
            css += `    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.25);\n`;
            css += `    filter: brightness(1.1);\n`;
            css += `}\n`;
            
            classes.push({ name: 'effect-gold-gradient', description: 'Premium gold gradient for buttons' });
        }
    }

    // Shadow/glow classes
    if (grouped.shadow) {
        const shadowPattern = grouped.shadow.find(p => p.selector.includes('logo') || p.selector.includes('img'));
        if (shadowPattern) {
            css += `\n.effect-logo-glow {\n`;
            css += `    height: 75px !important;\n`;
            css += `    width: auto;\n`;
            css += `    object-fit: contain;\n`;
            css += `    filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));\n`;
            css += `    transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);\n`;
            css += `    border: 1px solid transparent;\n`;
            css += `    border-radius: 12px;\n`;
            css += `    padding: 5px;\n`;
            css += `}\n`;
            
            css += `.effect-logo-glow:hover {\n`;
            css += `    filter: brightness(1.3) drop-shadow(0 5px 15px rgba(212, 175, 55, 0.4));\n`;
            css += `    transform: scale(1.05);\n`;
            css += `    border-color: var(--anclora-gold, #D4AF37);\n`;
            css += `    box-shadow: \n`;
            css += `        0 25px 50px rgba(0,0,0,0.5),\n`;
            css += `        0 15px 35px rgba(212, 175, 55, 0.25),\n`;
            css += `        0 5px 15px rgba(212, 175, 55, 0.15);\n`;
            css += `}\n`;
            
            classes.push({ name: 'effect-logo-glow', description: 'Animated glow effect for logos' });
        }
    }

    // Premium transition class
    css += `\n.effect-transition-premium {\n`;
    css += `    transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);\n`;
    css += `}\n`;
    classes.push({ name: 'effect-transition-premium', description: 'Smooth premium transitions' });

    // Header shrink effect on scroll
    css += `\n/* Header shrink effect */\n`;
    css += `header.scrolled .header-logo img,\n`;
    css += `header.scrolled img[class*="logo"] {\n`;
    css += `    height: 55px !important;\n`;
    css += `}\n`;

    return { css, classes };
}

/**
 * Create element mappings based on semantic analysis
 */
function createElementMappings(document, patterns) {
    const mappings = [];

    // Map logos to glow effect (header logos specifically)
    const logos = document.querySelectorAll('header img, .header-logo img, .logo img, [class*="logo"] img');
    if (logos.length > 0) {
        mappings.push({
            selector: 'header img, .header-logo img, .logo img, [class*="logo"] img',
            classes: ['effect-logo-glow']
        });
    }

    // Map cards to glassmorphism (but NOT header or inner content)
    const cards = document.querySelectorAll('.card, .data-card, [class*="card"]:not(header):not(.card-value):not(.card-label)');
    if (cards.length > 0) {
        mappings.push({
            selector: '.card, .data-card, [class*="card"]:not(header):not(.card-value):not(.card-label)',
            classes: ['effect-glass-card', 'effect-transition-premium']
        });
    }

    // Map chart containers
    const charts = document.querySelectorAll('.chart-container, [class*="chart"]');
    if (charts.length > 0) {
        mappings.push({
            selector: '.chart-container, [class*="chart"]',
            classes: ['effect-glass-card']
        });
    }

    // Map primary buttons to gold gradient
    const buttons = document.querySelectorAll('.btn-primary, .btn-anclora, [class*="btn-"][class*="primary"]');
    if (buttons.length > 0) {
        mappings.push({
            selector: '.btn-primary, .btn-anclora, [class*="btn-"][class*="primary"]',
            classes: ['effect-gold-gradient', 'effect-transition-premium']
        });
    }

    return mappings;
}

module.exports = { applyEffects };
