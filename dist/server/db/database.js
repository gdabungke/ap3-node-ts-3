import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../../data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
class JsonDatabase {
    usersFile = path.join(DATA_DIR, 'users.json');
    perkaraFile = path.join(DATA_DIR, 'perkara.json');
    disposisiFile = path.join(DATA_DIR, 'disposisi.json');
    constructor() {
        this.init();
    }
    init() {
        if (!fs.existsSync(this.usersFile)) {
            const defaultAdmin = [
                {
                    id: 1,
                    nama: 'Admin System',
                    email: 'admin',
                    pass: 'admin',
                    role: 'Admin',
                    createdAt: new Date().toISOString()
                }
            ];
            fs.writeFileSync(this.usersFile, JSON.stringify(defaultAdmin, null, 2), 'utf-8');
        }
        if (!fs.existsSync(this.perkaraFile)) {
            fs.writeFileSync(this.perkaraFile, JSON.stringify([], null, 2), 'utf-8');
        }
        if (!fs.existsSync(this.disposisiFile)) {
            fs.writeFileSync(this.disposisiFile, JSON.stringify([], null, 2), 'utf-8');
        }
    }
    getUsers() {
        try {
            const data = fs.readFileSync(this.usersFile, 'utf-8');
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    getUserByEmail(email) {
        const users = this.getUsers();
        const search = email.toLowerCase().trim();
        return users.find((u) => u.email.toLowerCase().trim() === search);
    }
    createUser(user) {
        const users = this.getUsers();
        const nextId = users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1;
        const newUser = {
            ...user,
            id: nextId,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2), 'utf-8');
        return newUser;
    }
    getAllPerkara() {
        try {
            const data = fs.readFileSync(this.perkaraFile, 'utf-8');
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    getPerkaraById(id) {
        const list = this.getAllPerkara();
        const targetId = String(id);
        return list.find((p, idx) => String(p.id) === targetId || String(idx) === targetId);
    }
    savePerkara(rec, index) {
        const list = this.getAllPerkara();
        if (typeof index === 'number' && index >= 0 && index < list.length) {
            list[index] = { ...list[index], ...rec };
        }
        else {
            const nextId = list.length > 0 ? Math.max(...list.map((p) => Number(p.id) || 0)) + 1 : 1;
            if (!rec.id)
                rec.id = nextId;
            list.push(rec);
        }
        fs.writeFileSync(this.perkaraFile, JSON.stringify(list, null, 2), 'utf-8');
        return list;
    }
    replacePerkaraList(newList) {
        fs.writeFileSync(this.perkaraFile, JSON.stringify(newList, null, 2), 'utf-8');
    }
    deletePerkara(indexOrId) {
        let list = this.getAllPerkara();
        const targetStr = String(indexOrId);
        const numIdx = parseInt(targetStr, 10);
        if (!isNaN(numIdx) && numIdx >= 0 && numIdx < list.length && list[numIdx]) {
            list.splice(numIdx, 1);
        }
        else {
            list = list.filter((p) => String(p.id) !== targetStr);
        }
        fs.writeFileSync(this.perkaraFile, JSON.stringify(list, null, 2), 'utf-8');
        return list;
    }
    resetPerkara() {
        fs.writeFileSync(this.perkaraFile, JSON.stringify([], null, 2), 'utf-8');
    }
    getDisposisi() {
        try {
            const data = fs.readFileSync(this.disposisiFile, 'utf-8');
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    saveDisposisi(disp) {
        const list = this.getDisposisi();
        const existingIndex = list.findIndex((d) => String(d.id) === String(disp.id));
        let savedDisp;
        if (existingIndex >= 0) {
            list[existingIndex] = {
                ...list[existingIndex],
                ...disp,
                tanggalDisposisi: list[existingIndex].tanggalDisposisi || disp.tanggalDisposisi || new Date().toISOString()
            };
            savedDisp = list[existingIndex];
        }
        else {
            const nextId = list.length > 0 ? Math.max(...list.map((d) => Number(d.id) || 0)) + 1 : 1;
            savedDisp = {
                ...disp,
                id: disp.id || nextId,
                tanggalDisposisi: disp.tanggalDisposisi || new Date().toISOString()
            };
            list.push(savedDisp);
        }
        fs.writeFileSync(this.disposisiFile, JSON.stringify(list, null, 2), 'utf-8');
        return savedDisp;
    }
}
let dbInstance;
try {
    const SQLiteConstructor = (await import('better-sqlite3')).default;
    const dbFile = path.join(DATA_DIR, 'ap3.sqlite');
    const sqlite = new SQLiteConstructor(dbFile);
    sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      pass TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS perkara (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS disposisi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      perkara_id INTEGER,
      data TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
    const adminStmt = sqlite.prepare('SELECT id, nama, email, pass, role, createdAt FROM users WHERE lower(email) = ?');
    const checkAdmin = adminStmt.get('admin');
    if (!checkAdmin) {
        const insertAdminStmt = sqlite.prepare('INSERT INTO users (nama, email, pass, role, createdAt) VALUES (?, ?, ?, ?, ?)');
        insertAdminStmt.run('Admin System', 'admin', 'admin', 'Admin', new Date().toISOString());
    }
    class SqliteDatabase {
        getUsers() {
            const stmt = sqlite.prepare('SELECT id, nama, email, pass, role, createdAt FROM users');
            const rows = stmt.all();
            return rows.map((r) => ({
                id: r.id,
                nama: r.nama,
                email: r.email,
                pass: r.pass,
                role: r.role,
                createdAt: r.createdAt
            }));
        }
        getUserByEmail(email) {
            const stmt = sqlite.prepare('SELECT id, nama, email, pass, role, createdAt FROM users WHERE lower(email) = ?');
            const row = stmt.get(email.toLowerCase().trim());
            if (!row)
                return undefined;
            return {
                id: row.id,
                nama: row.nama,
                email: row.email,
                pass: row.pass,
                role: row.role,
                createdAt: row.createdAt
            };
        }
        createUser(user) {
            const now = new Date().toISOString();
            const stmt = sqlite.prepare('INSERT INTO users (nama, email, pass, role, createdAt) VALUES (?, ?, ?, ?, ?)');
            const res = stmt.run(user.nama, user.email, user.pass, user.role, now);
            return {
                ...user,
                id: Number(res.lastInsertRowid),
                createdAt: now
            };
        }
        getAllPerkara() {
            const stmt = sqlite.prepare('SELECT id, data, createdAt, updatedAt FROM perkara ORDER BY id ASC');
            const rows = stmt.all();
            return rows.map((r) => {
                try {
                    const parsed = JSON.parse(r.data);
                    const obj = (parsed && typeof parsed === 'object') ? parsed : {};
                    obj.id = r.id;
                    return obj;
                }
                catch {
                    return { id: r.id };
                }
            });
        }
        getPerkaraById(id) {
            const targetId = parseInt(String(id), 10);
            if (isNaN(targetId))
                return undefined;
            const stmt = sqlite.prepare('SELECT id, data, createdAt, updatedAt FROM perkara WHERE id = ?');
            const row = stmt.get(targetId);
            if (!row)
                return undefined;
            try {
                const parsed = JSON.parse(row.data);
                const obj = (parsed && typeof parsed === 'object') ? parsed : {};
                obj.id = row.id;
                return obj;
            }
            catch {
                return { id: row.id };
            }
        }
        savePerkara(rec, index) {
            const list = this.getAllPerkara();
            const now = new Date().toISOString();
            if (typeof index === 'number' && index >= 0 && index < list.length) {
                const target = list[index];
                const updated = { ...target, ...rec };
                const updateStmt = sqlite.prepare('UPDATE perkara SET data = ?, updatedAt = ? WHERE id = ?');
                updateStmt.run(JSON.stringify(updated), now, target.id);
            }
            else {
                const insertStmt = sqlite.prepare('INSERT INTO perkara (data, createdAt, updatedAt) VALUES (?, ?, ?)');
                const result = insertStmt.run(JSON.stringify(rec), now, now);
                rec.id = Number(result.lastInsertRowid);
            }
            return this.getAllPerkara();
        }
        replacePerkaraList(newList) {
            const now = new Date().toISOString();
            const insertStmt = sqlite.prepare('INSERT INTO perkara (data, createdAt, updatedAt) VALUES (?, ?, ?)');
            const tx = sqlite.transaction(() => {
                sqlite.exec('DELETE FROM perkara');
                for (const item of newList) {
                    insertStmt.run(JSON.stringify(item), now, now);
                }
            });
            tx();
        }
        deletePerkara(indexOrId) {
            const list = this.getAllPerkara();
            const deleteStmt = sqlite.prepare('DELETE FROM perkara WHERE id = ?');
            const targetId = parseInt(String(indexOrId), 10);
            if (!isNaN(targetId) && targetId >= 0 && targetId < list.length && list[targetId]) {
                const target = list[targetId];
                deleteStmt.run(target.id);
            }
            else if (!isNaN(targetId)) {
                deleteStmt.run(targetId);
            }
            return this.getAllPerkara();
        }
        resetPerkara() {
            sqlite.exec('DELETE FROM perkara');
        }
        getDisposisi() {
            const stmt = sqlite.prepare('SELECT id, perkara_id, data, createdAt FROM disposisi ORDER BY id ASC');
            const rows = stmt.all();
            return rows.map((r) => {
                try {
                    const parsed = JSON.parse(r.data);
                    const obj = (parsed && typeof parsed === 'object') ? parsed : {};
                    obj.id = r.id;
                    obj.perkaraId = r.perkara_id;
                    return obj;
                }
                catch {
                    return { id: r.id, perkaraId: r.perkara_id };
                }
            });
        }
        saveDisposisi(disp) {
            const now = new Date().toISOString();
            const insertStmt = sqlite.prepare('INSERT INTO disposisi (perkara_id, data, createdAt) VALUES (?, ?, ?)');
            const perkaraId = typeof disp.perkaraId === 'number' ? disp.perkaraId : 0;
            const res = insertStmt.run(perkaraId, JSON.stringify(disp), now);
            return {
                ...disp,
                id: Number(res.lastInsertRowid),
                tanggalDisposisi: disp.tanggalDisposisi || now
            };
        }
    }
    dbInstance = new SqliteDatabase();
    console.log('[DB] Menggunakan SQLite database:', dbFile);
}
catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log('[DB] Fallback ke JSON database:', msg);
    dbInstance = new JsonDatabase();
}
export const db = dbInstance;
