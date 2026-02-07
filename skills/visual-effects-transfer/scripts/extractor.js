/**
 * Visual Effects Extractor
 * Extracts complete CSS rules, design tokens, and patterns from source HTML
 */

const fs = require('fs');
const { chromium } = require('playwright');

/**
 * Extract all visual effects from source HTML
 * @param {string} sourcePath - Path to source HTML file
 * @param {object} options - Extraction options
 * @returns {object} Extracted effects data
 */
async function extractEffects(sourcePath, options = {}) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Load the source HTML
    const sourceHTML = fs.readFileSync(sourcePath, 'utf8');
    await page.setContent(sourceHTML);
    
    // Extract all effects using page evaluation
    const effects = await page.evaluate((opts) => {
        const result = {
            tokens: [],
            patterns: [],
            animations: [],
            pseudoElements: []
        };

        // 1. Extract design tokens from :root
        const rootStyles = getComputedStyle(document.documentElement);
        const styleSheets = Array.from(document.styleSheets);
        
        styleSheets.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.selectorText === ':root') {
                        const cssText = rule.cssText;
                        const matches = cssText.matchAll(/--([^:]+):\s*([^;]+);/g);
                        for (const match of matches) {
                            const name = match[1].trim();
                            const value = match[2].trim();
                            
                            // Categorize token type
                            let type = 'other';
                            if (value.includes('#') || value.includes('rgb') || value.includes('hsl')) {
                                type = 'color';
                            } else if (value.includes('px') || value.includes('rem') || value.includes('em')) {
                                type = 'spacing';
                            } else if (value.includes('gradient')) {
                                type = 'gradient';
                            } else if (value.includes('blur') || value.includes('shadow')) {
                                type = 'effect';
                            } else if (value.includes('cubic-bezier') || value.includes('ease')) {
                                type = 'transition';
                            } else if (name.includes('font')) {
                                type = 'font';
                            }
                            
                            result.tokens.push({
                                name: `--${name}`,
                                value,
                                type
                            });
                        }
                    }
                });
            } catch (e) {
                // Skip inaccessible stylesheets (CORS)
            }
        });

        // 2. Extract complete CSS patterns
        styleSheets.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.type === CSSRule.STYLE_RULE) {
                        const selector = rule.selectorText;
                        const cssText = rule.cssText;
                        
                        // Check for premium effects
                        const hasGlass = cssText.includes('backdrop-filter') || cssText.includes('-webkit-backdrop-filter');
                        const hasGradient = cssText.includes('gradient');
                        const hasShadow = cssText.includes('box-shadow') || cssText.includes('drop-shadow') || cssText.includes('text-shadow');
                        const hasTransform = cssText.includes('transform');
                        const hasTransition = cssText.includes('transition');
                        const hasFilter = cssText.includes('filter:');
                        
                        // Extract patterns based on effects
                        if (hasGlass) {
                            result.patterns.push({
                                type: 'glassmorphism',
                                selector,
                                cssText,
                                properties: extractProperties(rule.style, ['backdrop-filter', '-webkit-backdrop-filter', 'background', 'border'])
                            });
                        }
                        
                        if (hasGradient) {
                            result.patterns.push({
                                type: 'gradient',
                                selector,
                                cssText,
                                properties: extractProperties(rule.style, ['background', 'background-image'])
                            });
                        }
                        
                        if (hasShadow) {
                            result.patterns.push({
                                type: 'shadow',
                                selector,
                                cssText,
                                properties: extractProperties(rule.style, ['box-shadow', 'text-shadow', 'filter'])
                            });
                        }
                        
                        if (hasTransform && hasTransition) {
                            result.patterns.push({
                                type: 'interactive',
                                selector,
                                cssText,
                                properties: extractProperties(rule.style, ['transform', 'transition', 'filter', 'opacity'])
                            });
                        }
                        
                        // Extract pseudo-elements
                        if (selector.includes('::before') || selector.includes('::after')) {
                            result.pseudoElements.push({
                                selector,
                                cssText,
                                type: selector.includes('::before') ? 'before' : 'after'
                            });
                        }
                    }
                    
                    // Extract keyframe animations
                    if (rule.type === CSSRule.KEYFRAMES_RULE) {
                        result.animations.push({
                            name: rule.name,
                            cssText: rule.cssText
                        });
                    }
                });
            } catch (e) {
                // Skip inaccessible stylesheets
            }
        });

        // Helper function to extract specific properties
        function extractProperties(style, propertyNames) {
            const props = {};
            propertyNames.forEach(name => {
                const value = style.getPropertyValue(name);
                if (value) {
                    props[name] = value;
                }
            });
            return props;
        }

        return result;
    }, options);

    await browser.close();

    // Filter based on include/exclude options
    if (options.include) {
        effects.patterns = effects.patterns.filter(p => options.include.includes(p.type));
    }
    if (options.exclude) {
        effects.patterns = effects.patterns.filter(p => !options.exclude.includes(p.type));
    }

    return effects;
}

module.exports = { extractEffects };
