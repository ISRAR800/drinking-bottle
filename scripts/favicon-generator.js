#!/usr/bin/env node

/**
 * favicon-generator.js
 * 
 * Simple script to convert SVG favicon to PNG variants.
 * Requires: sharp npm package
 * 
 * Installation:
 *   npm install sharp
 * 
 * Usage:
 *   node scripts/favicon-generator.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
  console.log('✓ sharp found');
} catch (error) {
  console.error('✗ sharp not installed. Install with: npm install sharp');
  process.exit(1);
}

const faviconSvg = path.join(__dirname, '../favicon.svg');
const outputDir = path.join(__dirname, '..');

// SVG to PNG conversion sizes
const sizes = [
  { width: 32, height: 32, filename: 'favicon-32.png' },
  { width: 64, height: 64, filename: 'favicon-64.png' },
  { width: 180, height: 180, filename: 'apple-touch-icon-180.png' },
  { width: 192, height: 192, filename: 'favicon-192.png' },
];

async function generateFavicons() {
  if (!fs.existsSync(faviconSvg)) {
    console.error(`✗ Source SVG not found: ${faviconSvg}`);
    process.exit(1);
  }

  console.log(`Reading SVG from: ${faviconSvg}`);

  try {
    for (const size of sizes) {
      const outputPath = path.join(outputDir, size.filename);
      console.log(`→ Generating ${size.filename} (${size.width}×${size.height})...`);

      await sharp(faviconSvg)
        .resize(size.width, size.height)
        .png()
        .toFile(outputPath);

      console.log(`✓ Created ${size.filename}`);
    }

    console.log('\n✓ All favicon variants generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Add PNG links to index.html:');
    console.log('   <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">');
    console.log('   <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png">');
    console.log('   <link rel="apple-touch-icon" href="/apple-touch-icon-180.png">');
    console.log('2. Commit and push: git add favicon-*.png apple-touch-icon-180.png');
  } catch (error) {
    console.error('✗ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();
