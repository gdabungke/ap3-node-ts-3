import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const SRC_CLIENT = path.resolve('src/client/app.ts');
const INDEX_HTML_SRC = path.resolve('index.html');
const INDEX_HTML_DIST = path.resolve('public/index.html');

// 1. Jalur Sumber CSS dan Assets
const CSS_DIR = path.resolve('src/client/css');
const ASSETS_SRC = path.resolve('src/client/assets');
const ASSETS_DIST = path.resolve('public/assets');

console.log('📦 Memulai proses ultra-build frontend...');

// 2. Bersihkan sisa JS/CSS bundle dari build sebelumnya di folder public
if (fs.existsSync(PUBLIC_DIR)) {
  const files = fs.readdirSync(PUBLIC_DIR);
  for (const file of files) {
    if (
      (file.startsWith('app.') && file.endsWith('.js')) ||
      (file.startsWith('style.') && file.endsWith('.css'))
    ) {
      fs.unlinkSync(path.join(PUBLIC_DIR, file));
    }
  }
} else {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 3. Salin folder assets ke public
if (fs.existsSync(ASSETS_SRC)) {
  fs.cpSync(ASSETS_SRC, ASSETS_DIST, { recursive: true, force: true });
}

// 4. Bundel & Optimasi JavaScript
const jsResult = await esbuild.build({
  entryPoints: [SRC_CLIENT],
  bundle: true,
  minify: true,
  treeShaking: true,
  legalComments: 'none',
  drop: ['console', 'debugger'],
  target: ['es2020'],
  metafile: true,
  entryNames: '[name].[hash]',
  outdir: 'public',
  format: 'esm',
  sourcemap: false
});

const jsOutputs = Object.keys(jsResult.metafile.outputs);
const jsOutputFile = jsOutputs.find(f => f.endsWith('.js'));
const jsPublicPath = path.resolve(jsOutputFile);
const randomJsName = '/' + path.basename(jsOutputFile);

// Hapus komentar HTML HANYA dari file bundel JS di folder public (file sumber ts tidak disentuh)
if (fs.existsSync(jsPublicPath)) {
  let bundledJs = fs.readFileSync(jsPublicPath, 'utf8');
  bundledJs = bundledJs.replace(/<!--[\s\S]*?-->/g, '');
  fs.writeFileSync(jsPublicPath, bundledJs, 'utf8');
}

// 5. Gabungkan dan Kompres Maksimal CSS ke public
let combinedCss = '';
if (fs.existsSync(CSS_DIR)) {
  const cssOrder = ['main.css', 'layout.css', 'components.css', 'print.css'];
  for (const file of cssOrder) {
    const fullPath = path.join(CSS_DIR, file);
    if (fs.existsSync(fullPath)) {
      combinedCss += fs.readFileSync(fullPath, 'utf8') + '\n';
    }
  }
  const allCss = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  for (const file of allCss) {
    if (!cssOrder.includes(file)) {
      combinedCss += fs.readFileSync(path.join(CSS_DIR, file), 'utf8') + '\n';
    }
  }
}

const cssMinified = await esbuild.transform(combinedCss, {
  loader: 'css',
  minify: true,
  legalComments: 'none'
});

const cssHash = Math.random().toString(36).substring(2, 10).toUpperCase();
const randomCssName = `/style.${cssHash}.css`;
fs.writeFileSync(path.join(PUBLIC_DIR, `style.${cssHash}.css`), cssMinified.code, 'utf8');

console.log(`✅ JS terkompresi : ${randomJsName}`);
console.log(`✅ CSS terkompresi: ${randomCssName}`);

// 6. Sinkronkan & Minifikasi public/index.html saja
let htmlContent = fs.readFileSync(INDEX_HTML_SRC, 'utf8');

htmlContent = htmlContent.replace(/<link\s+rel="stylesheet"[^>]*css\/[^>]*>/gi, '');
htmlContent = htmlContent.replace(/<script\b[^>]*src="[^"]*"[^>]*><\/script>/gi, '');

htmlContent = htmlContent.replace(
  '</head>',
  `<link rel="stylesheet" href="${randomCssName}"></head>`
);

if (htmlContent.includes('</body>')) {
  htmlContent = htmlContent.replace(
    '</body>',
    `<script type="module" src="${randomJsName}"></script></body>`
  );
} else {
  htmlContent += `<script type="module" src="${randomJsName}"></script>`;
}

// Bersihkan komentar HTML dan spasi berlebih hanya untuk public/index.html
htmlContent = htmlContent
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/>\s+</g, '><')
  .trim();

fs.writeFileSync(INDEX_HTML_DIST, htmlContent, 'utf8');

console.log('🚀 Build client selesai! File asli tetap utuh, file public bersih.');