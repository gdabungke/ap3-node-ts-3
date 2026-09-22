import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import perkaraRouter from './routes/perkara.js';
import disposisiRouter from './routes/disposisi.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolusi jalur direktori utama secara absolut
const ROOT_DIR = path.resolve(__dirname, '../../');
const PUBLIC_DIR = fs.existsSync(path.join(ROOT_DIR, 'public')) ? path.join(ROOT_DIR, 'public') : ROOT_DIR;
const HTML_DIR = path.join(ROOT_DIR, 'html');
const VIEWS_DIR = path.join(ROOT_DIR, 'views');
const CSS_DIR = path.join(ROOT_DIR, 'css');
const JS_DIR = path.join(ROOT_DIR, 'js');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================================
// 1. MIDDLEWARES WAJIB (Diaktifkan sebelum routing agar data form terbaca)
// =========================================================================
app.use(cors());

// Parsing body bertipe application/x-www-form-urlencoded (HTML Form Submit)
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

// Parsing body bertipe application/json (REST API Client / Fetch)
app.use(express.json({
  limit: '50mb'
}));

// =========================================================================
// 2. PELACAKAN FOLDER STATIK & HTML MODULAR (Mencegah Express Gagal Melacak)
// =========================================================================
app.use(express.static(ROOT_DIR));
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
}
if (fs.existsSync(HTML_DIR)) {
  app.use('/html', express.static(HTML_DIR));
}
if (fs.existsSync(VIEWS_DIR)) {
  app.use('/views', express.static(VIEWS_DIR));
}
if (fs.existsSync(CSS_DIR)) {
  app.use('/css', express.static(CSS_DIR));
}
if (fs.existsSync(JS_DIR)) {
  app.use('/js', express.static(JS_DIR));
}
if (fs.existsSync(ASSETS_DIR)) {
  app.use('/assets', express.static(ASSETS_DIR));
}

/**
 * Fungsi pembantu untuk melacak keberadaan berkas HTML di berbagai kemungkinan folder
 */
function resolveHtmlFile(filename) {
  const candidateDirs = [ROOT_DIR, PUBLIC_DIR, HTML_DIR, VIEWS_DIR];
  for (const dir of candidateDirs) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return fullPath;
    }
  }
  return null;
}

// =========================================================================
// 3. API ENDPOINTS
// =========================================================================
app.use('/api/auth', authRouter);
app.use('/api/perkara', perkaraRouter);
app.use('/api/disposisi', disposisiRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'AP3 - Aplikasi Penyusunan Penelitian Perkara',
    engine: 'Node.js Express + TypeScript + SQLite',
    timestamp: new Date().toISOString()
  });
});

// =========================================================================
// 4. PENANGANAN RUTE BERKAS HTML (MODULAR & ROOT)
// =========================================================================
app.get('/', (_req, res) => {
  const indexPath = resolveHtmlFile('index.html');
  if (indexPath) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('index.html tidak ditemukan');
});
app.get('/:page.html', (req, res, next) => {
  const pageFile = `${req.params.page}.html`;
  const resolved = resolveHtmlFile(pageFile);
  if (resolved) {
    return res.sendFile(resolved);
  }
  next();
});

// SPA fallback handler untuk navigasi peramban
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || path.extname(req.path)) {
    return next();
  }
  const indexPath = resolveHtmlFile('index.html');
  if (indexPath) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Halaman tidak ditemukan');
});

// Error handler middleware
app.use((err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[Server Error]:', message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error: ' + message
  });
});
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  AP3 Server (Express + TypeScript + SQLite) Berjalan!`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Root Direktori: ${ROOT_DIR}`);
    console.log(`=======================================================`);
  });
}
export default app;