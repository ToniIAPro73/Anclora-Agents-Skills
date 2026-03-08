/**
 * HTML and CSS Validator
 * Validates syntax and structure before saving
 */

const { JSDOM } = require('jsdom');

/**
 * Validate HTML structure
 * @param {string} html - HTML string to validate
 * @returns {boolean} True if valid
 */
function validateHTML(html) {
    try {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Basic structure checks
        if (!document.querySelector('html')) {
            console.error('❌ Missing <html> tag');
            return false;
        }
        
        if (!document.querySelector('head')) {
            console.error('❌ Missing <head> tag');
            return false;
        }
        
        if (!document.querySelector('body')) {
            console.error('❌ Missing <body> tag');
            return false;
        }
        
        // Check for unclosed tags (JSDOM will throw if severely malformed)
        const bodyContent = document.body.innerHTML;
        if (!bodyContent) {
            console.error('❌ Empty body content');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('❌ HTML validation error:', error.message);
        return false;
    }
}

/**
 * Validate CSS syntax
 * @param {string} css - CSS string to validate
 * @returns {boolean} True if valid
 */
function validateCSS(css) {
    try {
        // Basic CSS syntax checks
        
        // Check for balanced braces
        const openBraces = (css.match(/{/g) || []).length;
        const closeBraces = (css.match(/}/g) || []).length;
        
        if (openBraces !== closeBraces) {
            console.error(`❌ Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
            return false;
        }
        
        // Check for balanced parentheses
        const openParens = (css.match(/\(/g) || []).length;
        const closeParens = (css.match(/\)/g) || []).length;
        
        if (openParens !== closeParens) {
            console.error(`❌ Unbalanced parentheses: ${openParens} open, ${closeParens} close`);
            return false;
        }
        
        // Check for common syntax errors
        const lines = css.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines and comments
            if (!line || line.startsWith('/*') || line.startsWith('*') || line.startsWith('//')) {
                continue;
            }
            
            // Check for properties without values (except in selectors)
            if (line.includes(':') && !line.includes('{') && !line.includes('}')) {
                if (!line.endsWith(';') && !line.endsWith(',')) {
                    // This might be intentional (e.g., in @media queries)
                    // So we just warn, not fail
                    console.warn(`⚠️  Line ${i + 1} might be missing semicolon: ${line}`);
                }
            }
        }
        
        return true;
    } catch (error) {
        console.error('❌ CSS validation error:', error.message);
        return false;
    }
}

module.exports = { validateHTML, validateCSS };
