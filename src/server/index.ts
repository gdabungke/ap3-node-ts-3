import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import perkaraRouter from './routes/perkara.js';
import disposisiRouter from './routes/disposisi.js';
import { appendPerkaraToSheet, getPerkaraFromSheet, PerkaraData } from './googleSheets.js';
import compression from 'compression';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolusi jalur direktori
const ROOT_DIR: string = path.resolve(__dirname, '../../');
const PUBLIC_DIR: string = path.join(ROOT_DIR, 'public');

const app = express();
const PORT: number | string = process.env.PORT || 3000;

// =========================================================================
// 1. MIDDLEWARES WAJIB
// =========================================================================
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// =========================================================================
// 2. PENYAJIAN BERKAS STATIK DARI PUBLIC (PRIORITAS UTAMA)
// =========================================================================
// Melayani hasil build acak: app.[hash].js, style.[hash].css, assets/img, dll.
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
}

// =========================================================================
// 3. API ENDPOINTS
// =========================================================================
app.use('/api/auth', authRouter);
app.use('/api/perkara', perkaraRouter);
app.use('/api/disposisi', disposisiRouter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'AP3 - Aplikasi Penyusunan Penelitian Perkara',
    engine: 'Node.js Express + TypeScript + SQLite / Google Sheets',
    mode: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Google Sheets Integration (Pengujian Eksternal)
app.post('/api/google-test/perkara', async (req: Request, res: Response) => {
  try {
    const data: PerkaraData = req.body;
    const result = await appendPerkaraToSheet(data);
    return res.status(200).json({
      success: true,
      message: 'Data perkara berhasil disinkronkan ke Google Sheets',
      data: result
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[Google Sheets Append Error]:', errorMsg);
    return res.status(500).json({ success: false, error: errorMsg });
  }
});

app.get('/api/google-test/perkara', async (_req: Request, res: Response) => {
  try {
    const records = await getPerkaraFromSheet();
    return res.status(200).json({ success: true, data: records });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[Google Sheets Fetch Error]:', errorMsg);
    return res.status(500).json({ success: false, error: errorMsg });
  }
});

// =========================================================================
// 4. PENANGANAN RUTE BERKAS HTML (PUBLIC FIRST)
// =========================================================================
function getPublicIndex(): string | null {
  const publicIndexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(publicIndexPath)) {
    return publicIndexPath;
  }
  const rootIndexPath = path.join(ROOT_DIR, 'index.html');
  if (fs.existsSync(rootIndexPath)) {
    return rootIndexPath;
  }
  return null;
}

app.get('/', (_req: Request, res: Response) => {
  const indexPath = getPublicIndex();
  if (indexPath) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('index.html tidak ditemukan. Jalankan npm run build:client.');
});

// SPA fallback handler untuk navigasi halaman
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/') || path.extname(req.path)) {
    return next();
  }
  const indexPath = getPublicIndex();
  if (indexPath) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Halaman tidak ditemukan');
});

// =========================================================================
// 5. ERROR HANDLING MIDDLEWARE
// =========================================================================
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message: string = err instanceof Error ? err.message : String(err);
  console.error('[Server Error]:', message);
  res.status(500).json({ success: false, error: 'Internal Server Error: ' + message });
});

// =========================================================================
// 6. AKTIFKAN SERVER PORT SECARA LANGSUNG
// =========================================================================
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  🚀 AP3 Server Berhasil Berjalan!`);
  console.log(`  🌐 URL: http://localhost:${PORT}`);
  console.log(`  📁 Direktori Public: ${PUBLIC_DIR}`);
  console.log(`=======================================================`);
});

export default app;