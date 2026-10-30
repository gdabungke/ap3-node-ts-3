import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const SRC_CLIENT = path.resolve('src/client/app.ts');
const INDEX_HTML_SRC = path.resolve('index.html');
const INDEX_HTML_DIST = path.resolve('public/index.html');
const CSS_DIR = path.resolve('public/css');

console.log('📦 Memulai bundling, minifikasi, dan pengacakan aset...');

// 1. Bersihkan sisa JS/CSS bundle acak dari build sebelumnya
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

// 2. Bundel JavaScript ke format acak tunggal
const jsResult = await esbuild.build({
  entryPoints: [SRC_CLIENT],
  bundle: true,
  minify: true,
  metafile: true,
  entryNames: '[name].[hash]',
  outdir: 'public',
  format: 'esm',
  sourcemap: false
});

const jsOutputs = Object.keys(jsResult.metafile.outputs);
const jsOutputFile = jsOutputs.find(f => f.endsWith('.js'));
const randomJsName = '/' + path.basename(jsOutputFile);

// 3. Baca dan gabungkan seluruh isi CSS sebelum foldernya dihapus
let combinedCss = '';
if (fs.existsSync(CSS_DIR)) {
  const cssOrder = ['main.css', 'layout.css', 'components.css', 'print.css'];
  
  // Baca file CSS sesuai urutan hierarki
  for (const file of cssOrder) {
    const fullPath = path.join(CSS_DIR, file);
    if (fs.existsSync(fullPath)) {
      combinedCss += fs.readFileSync(fullPath, 'utf8') + '\n';
    }
  }

  // Jika ada file CSS lain di folder tersebut yang belum terbaca
  const allCss = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  for (const file of allCss) {
    if (!cssOrder.includes(file)) {
      combinedCss += fs.readFileSync(path.join(CSS_DIR, file), 'utf8') + '\n';
    }
  }
}

// 4. Minifikasi CSS gabungan & simpan dengan nama acak
const cssMinified = await esbuild.transform(combinedCss, { loader: 'css', minify: true });
const cssHash = Math.random().toString(36).substring(2, 10).toUpperCase();
const randomCssName = `/style.${cssHash}.css`;
fs.writeFileSync(path.join(PUBLIC_DIR, `style.${cssHash}.css`), cssMinified.code, 'utf8');

// 5. Hapus folder public/css dan public/js (Folder assets/img tetap dipertahankan)
if (fs.existsSync(CSS_DIR)) {
  fs.rmSync(CSS_DIR, { recursive: true, force: true });
}
const JS_DIR = path.join(PUBLIC_DIR, 'js');
if (fs.existsSync(JS_DIR)) {
  fs.rmSync(JS_DIR, { recursive: true, force: true });
}

console.log(`✅ JS teracak dibuat  : ${randomJsName}`);
console.log(`✅ CSS teracak dibuat : ${randomCssName}`);
console.log('🧹 Folder css/ dan js/ berhasil dibersihkan.');

// 6. Sinkronkan public/index.html dengan aset teracak baru
let htmlContent = fs.readFileSync(INDEX_HTML_SRC, 'utf8');

// Bersihkan link CSS dan tag script JS lama
htmlContent = htmlContent.replace(/<link\s+rel="stylesheet"[^>]*css\/[^>]*>/gi, '');
htmlContent = htmlContent.replace(/<script\b[^>]*src="[^"]*"[^>]*><\/script>/gi, '');

// Sisipkan CSS acak di dalam <head>
htmlContent = htmlContent.replace(
  '</head>',
  `  <link rel="stylesheet" href="${randomCssName}">\n</head>`
);

// Sisipkan JS acak sebelum penutup </body>
if (htmlContent.includes('</body>')) {
  htmlContent = htmlContent.replace(
    '</body>',
    `  <script type="module" src="${randomJsName}"></script>\n</body>`
  );
} else {
  htmlContent += `\n<script type="module" src="${randomJsName}"></script>`;
}

fs.writeFileSync(INDEX_HTML_DIST, htmlContent, 'utf8');
console.log('🚀 public/index.html selesai dirakit!');