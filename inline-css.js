'use strict';
// Post-build: inline the CSS into HTML to eliminate render-blocking request.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const htmlPath = path.join(distDir, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');

const match = html.match(/<link rel=stylesheet href=\/([^>]+\.css)>/);
if (!match) {
    console.log('No stylesheet link found — already inlined or not built yet.');
    process.exit(0);
}

const cssFile = match[1];
const cssPath = path.join(distDir, cssFile);
const css = fs.readFileSync(cssPath, 'utf8');

html = html.replace(match[0], `<style>${css}</style>`);
fs.writeFileSync(htmlPath, html);

console.log(`Inlined ${cssFile} (${(css.length / 1024).toFixed(1)} KB) into index.html`);
