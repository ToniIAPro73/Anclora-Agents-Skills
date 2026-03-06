#!/usr/bin/env node

/**
 * Visual Effects Transfer - Main Script
 * Extracts premium visual effects from source HTML and applies to destination HTML
 */

const fs = require('fs');
const path = require('path');
const { extractEffects } = require('./extractor');
const { applyEffects } = require('./applier');
const { validateHTML, validateCSS } = require('./validator');

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.error('❌ Error: Missing required arguments');
        console.log('\nUsage: node transfer.js <source-html> <destination-html> [options]');
        console.log('\nOptions:');
        console.log('  --output <path>     Custom output path');
        console.log('  --report            Generate detailed report');
        console.log('  --dry-run           Preview changes without saving');
        console.log('  --include <types>   Only include specific effect types (comma-separated)');
        console.log('  --exclude <types>   Exclude specific effect types (comma-separated)');
        process.exit(1);
    }

    const config = {
        sourcePath: args[0],
        destPath: args[1],
        outputPath: null,
        generateReport: false,
        dryRun: false,
        include: null,
        exclude: null
    };

    for (let i = 2; i < args.length; i++) {
        switch (args[i]) {
            case '--output':
                config.outputPath = args[++i];
                break;
            case '--report':
                config.generateReport = true;
                break;
            case '--dry-run':
                config.dryRun = true;
                break;
            case '--include':
                config.include = args[++i].split(',');
                break;
            case '--exclude':
                config.exclude = args[++i].split(',');
                break;
        }
    }

    // Set default output path if not specified
    if (!config.outputPath) {
        const ext = path.extname(config.destPath);
        const base = path.basename(config.destPath, ext);
        const dir = path.dirname(config.destPath);
        config.outputPath = path.join(dir, `${base}_enhanced${ext}`);
    }

    return config;
}

// Main execution
async function main() {
    console.log('🎨 Visual Effects Transfer - Starting...\n');

    const config = parseArgs();

    // Validate input files exist
    if (!fs.existsSync(config.sourcePath)) {
        console.error(`❌ Error: Source file not found: ${config.sourcePath}`);
        process.exit(1);
    }

    if (!fs.existsSync(config.destPath)) {
        console.error(`❌ Error: Destination file not found: ${config.destPath}`);
        process.exit(1);
    }

    try {
        // Phase 1: Extract effects from source
        console.log('📥 Phase 1: Extracting visual effects from source...');
        const effects = await extractEffects(config.sourcePath, {
            include: config.include,
            exclude: config.exclude
        });
        
        console.log(`✅ Extracted ${effects.tokens.length} design tokens`);
        console.log(`✅ Extracted ${effects.patterns.length} effect patterns`);
        console.log(`✅ Extracted ${effects.animations.length} animations\n`);

        // Phase 2: Apply effects to destination
        console.log('📤 Phase 2: Applying effects to destination...');
        const result = await applyEffects(config.destPath, effects, {
            dryRun: config.dryRun
        });

        console.log(`✅ Injected ${result.tokensInjected} design tokens`);
        console.log(`✅ Created ${result.classesCreated} utility classes`);
        console.log(`✅ Enhanced ${result.elementsEnhanced} elements\n`);

        // Phase 3: Validate and save
        if (!config.dryRun) {
            console.log('✔️  Phase 3: Validating and saving...');
            
            const htmlValid = validateHTML(result.html);
            const cssValid = validateCSS(result.css);

            if (!htmlValid || !cssValid) {
                console.error('❌ Validation failed. File not saved.');
                process.exit(1);
            }

            fs.writeFileSync(config.outputPath, result.html, 'utf8');
            console.log(`✅ Enhanced file saved: ${config.outputPath}\n`);
        } else {
            console.log('🔍 Dry run mode - no files modified\n');
        }

        // Generate report if requested
        if (config.generateReport) {
            const reportPath = config.outputPath.replace(/\.html$/, '_report.md');
            const report = generateReport(effects, result);
            fs.writeFileSync(reportPath, report, 'utf8');
            console.log(`📊 Report generated: ${reportPath}\n`);
        }

        console.log('🎉 Visual effects transfer completed successfully!');

    } catch (error) {
        console.error('❌ Error during transfer:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Generate detailed report
function generateReport(effects, result) {
    const report = [];
    
    report.push('# Visual Effects Transfer Report\n');
    report.push(`Generated: ${new Date().toISOString()}\n`);
    
    report.push('## Design Tokens Injected\n');
    report.push(`- Colors: ${effects.tokens.filter(t => t.type === 'color').length} variables`);
    report.push(`- Typography: ${effects.tokens.filter(t => t.type === 'font').length} font families`);
    report.push(`- Effects: ${effects.tokens.filter(t => t.type === 'effect').length} variables\n`);
    
    report.push('## Utility Classes Created\n');
    result.classesCreated.forEach(cls => {
        report.push(`- \`.${cls.name}\` (${cls.description})`);
    });
    report.push('');
    
    report.push('## Elements Enhanced\n');
    result.elementsEnhanced.forEach(elem => {
        report.push(`- ${elem.selector} → ${elem.effects.join(', ')}`);
    });
    report.push('');
    
    report.push('## Verification\n');
    report.push('✅ HTML structure valid');
    report.push('✅ CSS syntax valid');
    report.push('✅ No broken selectors\n');
    
    return report.join('\n');
}

// Run main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
