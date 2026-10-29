/**
 * @file server.cjs
 * @description Universal Server Launcher (Zero-Dependency Node.js & Express Fallback)
 * Mengakomodasi parsing middleware form (JSON & URL-Encoded), pelacakan HTML modular,
 * penyajian data perkara, disposisi, dan konfigurasi sistem terpadu.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = fs.existsSync(path.join(ROOT_DIR, 'public')) ? path.join(ROOT_DIR, 'public') : ROOT_DIR;
const HTML_DIR = path.join(ROOT_DIR, 'html');
const VIEWS_DIR = path.join(ROOT_DIR, 'views');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Inisialisasi basis data file
const usersFile = path.join(DATA_DIR, 'users.json');
const perkaraFile = path.join(DATA_DIR, 'perkara.json');
const disposisiFile = path.join(DATA_DIR, 'disposisi.json');
const configFile = path.join(DATA_DIR, 'config.json');

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([
    { id: 1, nama: 'Admin System', email: 'admin', pass: 'admin', role: 'Admin', createdAt: new Date().toISOString() }
  ], null, 2));
}
if (!fs.existsSync(perkaraFile)) {
  fs.writeFileSync(perkaraFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(disposisiFile)) {
  fs.writeFileSync(disposisiFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(configFile)) {
  fs.writeFileSync(configFile, JSON.stringify({}, null, 2));
}

function readJson(file) {
  try { 
    return JSON.parse(fs.readFileSync(file, 'utf8')); 
  } catch { 
    return []; 
  }
}

function readJsonObject(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
  } catch {
    return {};
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.ts': 'application/typescript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

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

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Middleware Parser (Mendukung JSON dan Form URL-Encoded)
  let rawBody = '';
  req.on('data', chunk => { rawBody += chunk; });
  req.on('end', () => {
    let payload = {};
    const contentTypeHeader = (req.headers['content-type'] || '').toLowerCase();

    if (rawBody) {
      if (contentTypeHeader.includes('application/x-www-form-urlencoded')) {
        try {
          payload = querystring.parse(rawBody);
        } catch {
          payload = {};
        }
      } else {
        try {
          payload = JSON.parse(rawBody);
        } catch {
          try { 
            payload = querystring.parse(rawBody); 
          } catch { 
            payload = {}; 
          }
        }
      }
    }

    // --- API ROUTES ---
    if (pathname.startsWith('/api/')) {
      res.setHeader('Content-Type', 'application/json');

      if (pathname === '/api/health') {
        res.writeHead(200);
        return res.end(JSON.stringify({
          status: 'ok',
          app: 'AP3 Node.js & TypeScript Server',
          sqliteAvailable: false,
          storageMode: 'JSON File Database',
          time: new Date()
        }));
      }

      // === AUTHENTICATION API ===
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const users = readJson(usersFile);
        const email = (payload.email || payload.username || '').toLowerCase().trim();
        const pass = (payload.pass || payload.password || '').trim();
        const user = users.find(u => u.email.toLowerCase() === email && u.pass === pass);
        if (user) {
          res.writeHead(200);
          return res.end(JSON.stringify({ 
            success: true, 
            message: 'Login berhasil.', 
            user: { nama: user.nama, email: user.email, role: user.role } 
          }));
        } else {
          res.writeHead(401);
          return res.end(JSON.stringify({ success: false, error: 'Email/Username atau kata sandi tidak valid.' }));
        }
      }

      if (pathname === '/api/auth/register' && req.method === 'POST') {
        const users = readJson(usersFile);
        const email = (payload.email || payload.username || '').toLowerCase().trim();
        if (users.some(u => u.email.toLowerCase() === email)) {
          res.writeHead(409);
          return res.end(JSON.stringify({ success: false, error: 'Email/Username ini sudah terdaftar!' }));
        }
        const newUser = {
          id: users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1,
          nama: (payload.nama || '').trim(),
          email: email,
          pass: (payload.pass || payload.password || '').trim(),
          role: payload.role || 'Staff Indak',
          createdAt: new Date().toISOString()
        };
        users.push(newUser);
        writeJson(usersFile, users);
        res.writeHead(201);
        return res.end(JSON.stringify({ 
          success: true, 
          message: 'Registrasi berhasil.', 
          user: { nama: newUser.nama, email: newUser.email, role: newUser.role } 
        }));
      }

      if (pathname === '/api/auth/users' && req.method === 'GET') {
        const users = readJson(usersFile).map(u => ({ id: u.id, nama: u.nama, email: u.email, role: u.role, createdAt: u.createdAt }));
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, data: users }));
      }

      // === CONFIG / PENGATURAN SISTEM API ===
      if (pathname === '/api/config' && req.method === 'GET') {
        const configData = readJsonObject(configFile);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, data: configData }));
      }

      if (pathname.startsWith('/api/config/') && req.method === 'GET') {
        const key = decodeURIComponent(pathname.replace('/api/config/', ''));
        const configData = readJsonObject(configFile);
        res.writeHead(200);
        return res.end(JSON.stringify({ 
          success: true, 
          key: key, 
          value: configData[key] !== undefined ? configData[key] : null 
        }));
      }

      if (pathname.startsWith('/api/config/') && req.method === 'POST') {
        const key = decodeURIComponent(pathname.replace('/api/config/', ''));
        const configData = readJsonObject(configFile);

        const value = payload.value !== undefined ? payload.value : (payload[key] !== undefined ? payload[key] : payload);
        configData[key] = value;
        writeJson(configFile, configData);

        res.writeHead(200);
        return res.end(JSON.stringify({ 
          success: true, 
          message: `Konfigurasi '${key}' berhasil disimpan.`, 
          data: { key, value } 
        }));
      }

      // === PERKARA API ===
      if (pathname === '/api/perkara' && req.method === 'GET') {
        const data = readJson(perkaraFile);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, data: data }));
      }

      if (pathname === '/api/perkara' && req.method === 'POST') {
        const list = readJson(perkaraFile);
        let rec = payload.record || payload;
        if (typeof rec === 'string') { try { rec = JSON.parse(rec); } catch {} }
        const index = typeof payload.index === 'number' ? payload.index : undefined;
        if (typeof index === 'number' && index >= 0 && index < list.length) {
          list[index] = { ...list[index], ...rec };
        } else {
          rec.id = list.length > 0 ? Math.max(...list.map(p => Number(p.id) || 0)) + 1 : 1;
          list.push(rec);
        }
        writeJson(perkaraFile, list);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, message: 'Data perkara berhasil disimpan.', data: list }));
      }

      if (pathname === '/api/perkara/bulk' && (req.method === 'PUT' || req.method === 'POST')) {
        let list = payload.list || payload;
        if (typeof list === 'string') { try { list = JSON.parse(list); } catch {} }
        if (Array.isArray(list)) {
          writeJson(perkaraFile, list);
          res.writeHead(200);
          return res.end(JSON.stringify({ success: true, message: 'Seluruh data perkara berhasil diperbarui.', data: list }));
        }
      }

      if (pathname === '/api/perkara/reset' && (req.method === 'DELETE' || req.method === 'POST')) {
        writeJson(perkaraFile, []);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, message: 'Database perkara berhasil direset.' }));
      }

      if (pathname.startsWith('/api/perkara/') && req.method === 'DELETE') {
        const param = pathname.replace('/api/perkara/', '');
        const numIdx = parseInt(param, 10);
        let list = readJson(perkaraFile);
        if (!isNaN(numIdx) && numIdx >= 0 && numIdx < list.length && list[numIdx]) {
          list.splice(numIdx, 1);
        } else {
          list = list.filter(p => String(p.id) !== param);
        }
        writeJson(perkaraFile, list);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, message: 'Perkara berhasil dihapus.', data: list }));
      }

      // === DISPOSISI API ===
      if (pathname === '/api/disposisi' && req.method === 'GET') {
        const data = readJson(disposisiFile);
        res.writeHead(200);
        return res.end(JSON.stringify({ success: true, data: data }));
      }

      if (pathname === '/api/disposisi' && req.method === 'POST') {
        let list = payload.list || payload.data || payload;
        if (typeof list === 'string') { try { list = JSON.parse(list); } catch {} }
        
        if (Array.isArray(list)) {
          writeJson(disposisiFile, list);
          res.writeHead(200);
          return res.end(JSON.stringify({ success: true, message: 'Seluruh data disposisi berhasil diperbarui.', data: list }));
        }

        const existingList = readJson(disposisiFile);
        let item = payload.disposisi || payload;
        const newDisp = {
          ...item,
          id: existingList.length > 0 ? Math.max(...existingList.map(d => Number(d.id) || 0)) + 1 : 1,
          createdAt: new Date().toISOString()
        };
        existingList.push(newDisp);
        writeJson(disposisiFile, existingList);
        res.writeHead(201);
        return res.end(JSON.stringify({ success: true, message: 'Disposisi berhasil disimpan.', data: newDisp }));
      }

      res.writeHead(404);
      return res.end(JSON.stringify({ error: 'Endpoint API tidak ditemukan' }));
    }

    // --- STATIC FILES & PELACAKAN HTML MODULAR ---
    let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    if (safePath === '/' || safePath === '\\') {
      const indexPath = resolveHtmlFile('index.html');
      if (indexPath) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fs.readFileSync(indexPath));
      }
    }

    let filePath = path.join(ROOT_DIR, safePath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const pubPath = path.join(PUBLIC_DIR, safePath);
      if (fs.existsSync(pubPath) && fs.statSync(pubPath).isFile()) {
        filePath = pubPath;
      } else if (safePath.endsWith('.html')) {
        const resolvedHtml = resolveHtmlFile(path.basename(safePath));
        if (resolvedHtml) {
          filePath = resolvedHtml;
        } else {
          filePath = resolveHtmlFile('index.html') || path.join(ROOT_DIR, 'index.html');
        }
      } else {
        filePath = resolveHtmlFile('index.html') || path.join(ROOT_DIR, 'index.html');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(500);
      res.end('Internal Server Error: ' + err.message);
    }
  });
});

server.listen(PORT, () => {
  console.log('===========================================================');
  console.log(`  AP3 Server (Node.js & TypeScript) Berjalan di Port ${PORT}`);
  console.log(`  Akses di peramban: http://localhost:${PORT}`);
  console.log(`  Folder Root: ${ROOT_DIR}`);
  console.log(`  Basis Data: ${DATA_DIR}`);
  console.log('===========================================================');
});