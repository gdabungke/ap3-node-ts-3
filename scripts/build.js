import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

// Output diarahkan ke 'docs' agar langsung dikenali oleh GitHub Pages
const DOCS_DIR = path.resolve('docs');
const SRC_CLIENT = path.resolve('src/client/app.ts');
const INDEX_HTML_SRC = path.resolve('src/client/index.html');
const INDEX_HTML_DIST = path.resolve('docs/index.html');

// 1. Jalur Sumber CSS dan Assets
const CSS_DIR = path.resolve('src/client/css');
const ASSETS_SRC = path.resolve('src/client/assets');
const ASSETS_DIST = path.resolve('docs/assets');

console.log('📦 Memulai proses ultra-build frontend untuk GitHub Pages (docs)...');

// 2. Bersihkan sisa JS/CSS bundle dari build sebelumnya di folder docs
if (fs.existsSync(DOCS_DIR)) {
  const files = fs.readdirSync(DOCS_DIR);
  for (const file of files) {
    if (
      (file.startsWith('app.') && file.endsWith('.js')) ||
      (file.startsWith('style.') && file.endsWith('.css'))
    ) {
      fs.unlinkSync(path.join(DOCS_DIR, file));
    }
  }
} else {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// 3. Salin folder assets ke docs
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
  outdir: 'docs',
  format: 'esm',
  sourcemap: false
});

const jsOutputs = Object.keys(jsResult.metafile.outputs);
const jsOutputFile = jsOutputs.find(f => f.endsWith('.js'));
const jsDocsPath = path.resolve(jsOutputFile);
// Menggunakan relative path './' agar tidak 404 pada subpath /ap3-node-ts-3/
const relativeJsName = './' + path.basename(jsOutputFile);

// Hapus komentar HTML HANYA dari file bundel JS di folder docs (file sumber ts tetap utuh)
if (fs.existsSync(jsDocsPath)) {
  let bundledJs = fs.readFileSync(jsDocsPath, 'utf8');
  bundledJs = bundledJs.replace(/<!--[\s\S]*?-->/g, '');
  fs.writeFileSync(jsDocsPath, bundledJs, 'utf8');
}

// 5. Gabungkan dan Kompres Maksimal CSS ke docs
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
const cssFileName = `style.${cssHash}.css`;
const relativeCssName = `./${cssFileName}`;
fs.writeFileSync(path.join(DOCS_DIR, cssFileName), cssMinified.code, 'utf8');

console.log(`✅ JS terkompresi : ${relativeJsName}`);
console.log(`✅ CSS terkompresi: ${relativeCssName}`);

// 6. Sinkronkan & Minifikasi docs/index.html saja
let htmlContent = fs.readFileSync(INDEX_HTML_SRC, 'utf8');

// Bersihkan seluruh link CSS lokal dan script bundle lama
htmlContent = htmlContent.replace(/<link\s+rel="stylesheet"[^>]*href="[^"]*(style|\.css)[^"]*"[^>]*>/gi, '');
htmlContent = htmlContent.replace(/<script\b[^>]*src="[^"]*(bundle|app)[^"]*"[^>]*>\s*<\/script>/gi, '');

// Sisipkan stylesheet bundel baru sebelum </head>
htmlContent = htmlContent.replace(
  '</head>',
  `<link rel="stylesheet" href="${relativeCssName}"></head>`
);

// Sisipkan script module bundel baru sebelum </body>
if (htmlContent.includes('</body>')) {
  htmlContent = htmlContent.replace(
    '</body>',
    `<script type="module" src="${relativeJsName}"></script></body>`
  );
} else {
  htmlContent += `<script type="module" src="${relativeJsName}"></script>`;
}

// Minifikasi HTML: bersihkan komentar dan spasi berlebih
htmlContent = htmlContent
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/>\s+</g, '><')
  .trim();

fs.writeFileSync(INDEX_HTML_DIST, htmlContent, 'utf8');

console.log('🚀 Build client selesai! Folder docs siap dideploy ke GitHub Pages.');
