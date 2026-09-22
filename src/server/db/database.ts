/**
 * @file database.ts
 * @description Layer basis data SQLite terpadu dengan fallback JSON storage.
 * Seluruh variabel dan tipe data didefinisikan secara eksplisit untuk mencegah error any/unknown.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  UserAccount,
  PerkaraRecord,
  DisposisiRecord,
  UserRow,
  PerkaraRow,
  DisposisiRow
} from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface IDatabase {
  getUsers(): UserAccount[];
  getUserByEmail(email: string): UserAccount | undefined;
  createUser(user: UserAccount): UserAccount;
  getAllPerkara(): PerkaraRecord[];
  getPerkaraById(id: number | string): PerkaraRecord | undefined;
  savePerkara(rec: PerkaraRecord, index?: number): PerkaraRecord[];
  replacePerkaraList(list: PerkaraRecord[]): void;
  deletePerkara(indexOrId: number | string): PerkaraRecord[];
  resetPerkara(): void;
  getDisposisi(): DisposisiRecord[];
  saveDisposisi(disp: DisposisiRecord): DisposisiRecord;
}

interface SqliteRunResult {
  changes: number;
  lastInsertRowid: number | bigint;
}

interface SqliteStatement<TResult = unknown> {
  run(...params: unknown[]): SqliteRunResult;
  get(...params: unknown[]): TResult | undefined;
  all(...params: unknown[]): TResult[];
}

interface SqliteInstance {
  prepare<T = unknown>(sql: string): SqliteStatement<T>;
  exec(sql: string): void;
  transaction<TFunc extends (...args: unknown[]) => unknown>(fn: TFunc): TFunc;
}

class JsonDatabase implements IDatabase {
  private usersFile: string = path.join(DATA_DIR, 'users.json');
  private perkaraFile: string = path.join(DATA_DIR, 'perkara.json');
  private disposisiFile: string = path.join(DATA_DIR, 'disposisi.json');

  constructor() {
    this.init();
  }

  private init(): void {
    if (!fs.existsSync(this.usersFile)) {
      const defaultAdmin: UserAccount[] = [
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

  getUsers(): UserAccount[] {
    try {
      const data: string = fs.readFileSync(this.usersFile, 'utf-8');
      const parsed: unknown = JSON.parse(data);
      return Array.isArray(parsed) ? (parsed as UserAccount[]) : [];
    } catch {
      return [];
    }
  }

  getUserByEmail(email: string): UserAccount | undefined {
    const users: UserAccount[] = this.getUsers();
    const search: string = email.toLowerCase().trim();
    return users.find((u: UserAccount) => u.email.toLowerCase().trim() === search);
  }

  createUser(user: UserAccount): UserAccount {
    const users: UserAccount[] = this.getUsers();
    const nextId: number = users.length > 0 ? Math.max(...users.map((u: UserAccount) => Number(u.id) || 0)) + 1 : 1;
    const newUser: UserAccount = {
      ...user,
      id: nextId,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2), 'utf-8');
    return newUser;
  }

  getAllPerkara(): PerkaraRecord[] {
    try {
      const data: string = fs.readFileSync(this.perkaraFile, 'utf-8');
      const parsed: unknown = JSON.parse(data);
      return Array.isArray(parsed) ? (parsed as PerkaraRecord[]) : [];
    } catch {
      return [];
    }
  }

  getPerkaraById(id: number | string): PerkaraRecord | undefined {
    const list: PerkaraRecord[] = this.getAllPerkara();
    const targetId: string = String(id);
    return list.find((p: PerkaraRecord, idx: number) => String(p.id) === targetId || String(idx) === targetId);
  }

  savePerkara(rec: PerkaraRecord, index?: number): PerkaraRecord[] {
    const list: PerkaraRecord[] = this.getAllPerkara();
    if (typeof index === 'number' && index >= 0 && index < list.length) {
      list[index] = { ...list[index], ...rec };
    } else {
      const nextId: number = list.length > 0 ? Math.max(...list.map((p: PerkaraRecord) => Number(p.id) || 0)) + 1 : 1;
      if (!rec.id) rec.id = nextId;
      list.push(rec);
    }
    fs.writeFileSync(this.perkaraFile, JSON.stringify(list, null, 2), 'utf-8');
    return list;
  }

  replacePerkaraList(newList: PerkaraRecord[]): void {
    fs.writeFileSync(this.perkaraFile, JSON.stringify(newList, null, 2), 'utf-8');
  }

  deletePerkara(indexOrId: number | string): PerkaraRecord[] {
    let list: PerkaraRecord[] = this.getAllPerkara();
    const targetStr: string = String(indexOrId);
    const numIdx: number = parseInt(targetStr, 10);
    if (!isNaN(numIdx) && numIdx >= 0 && numIdx < list.length && list[numIdx]) {
      list.splice(numIdx, 1);
    } else {
      list = list.filter((p: PerkaraRecord) => String(p.id) !== targetStr);
    }
    fs.writeFileSync(this.perkaraFile, JSON.stringify(list, null, 2), 'utf-8');
    return list;
  }

  resetPerkara(): void {
    fs.writeFileSync(this.perkaraFile, JSON.stringify([], null, 2), 'utf-8');
  }

  getDisposisi(): DisposisiRecord[] {
    try {
      const data: string = fs.readFileSync(this.disposisiFile, 'utf-8');
      const parsed: unknown = JSON.parse(data);
      return Array.isArray(parsed) ? (parsed as DisposisiRecord[]) : [];
    } catch {
      return [];
    }
  }

  saveDisposisi(disp: DisposisiRecord): DisposisiRecord {
    const list: DisposisiRecord[] = this.getDisposisi();
    const nextId: number = list.length > 0 ? Math.max(...list.map((d: DisposisiRecord) => Number(d.id) || 0)) + 1 : 1;
    const newDisp: DisposisiRecord = {
      ...disp,
      id: nextId,
      tanggalDisposisi: disp.tanggalDisposisi || new Date().toISOString()
    };
    list.push(newDisp);
    fs.writeFileSync(this.disposisiFile, JSON.stringify(list, null, 2), 'utf-8');
    return newDisp;
  }
}

let dbInstance: IDatabase;

try {
  const SQLiteConstructor = (await import('better-sqlite3')).default;
  const dbFile: string = path.join(DATA_DIR, 'ap3.sqlite');
  const sqlite: SqliteInstance = new SQLiteConstructor(dbFile) as unknown as SqliteInstance;

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

  const adminStmt: SqliteStatement<UserRow> = sqlite.prepare<UserRow>('SELECT id, nama, email, pass, role, createdAt FROM users WHERE lower(email) = ?');
  const checkAdmin: UserRow | undefined = adminStmt.get('admin');

  if (!checkAdmin) {
    const insertAdminStmt: SqliteStatement = sqlite.prepare('INSERT INTO users (nama, email, pass, role, createdAt) VALUES (?, ?, ?, ?, ?)');
    insertAdminStmt.run('Admin System', 'admin', 'admin', 'Admin', new Date().toISOString());
  }

  class SqliteDatabase implements IDatabase {
    getUsers(): UserAccount[] {
      const stmt: SqliteStatement<UserRow> = sqlite.prepare<UserRow>('SELECT id, nama, email, pass, role, createdAt FROM users');
      const rows: UserRow[] = stmt.all();
      return rows.map((r: UserRow): UserAccount => ({
        id: r.id,
        nama: r.nama,
        email: r.email,
        pass: r.pass,
        role: r.role,
        createdAt: r.createdAt
      }));
    }

    getUserByEmail(email: string): UserAccount | undefined {
      const stmt: SqliteStatement<UserRow> = sqlite.prepare<UserRow>('SELECT id, nama, email, pass, role, createdAt FROM users WHERE lower(email) = ?');
      const row: UserRow | undefined = stmt.get(email.toLowerCase().trim());
      if (!row) return undefined;
      return {
        id: row.id,
        nama: row.nama,
        email: row.email,
        pass: row.pass,
        role: row.role,
        createdAt: row.createdAt
      };
    }

    createUser(user: UserAccount): UserAccount {
      const now: string = new Date().toISOString();
      const stmt: SqliteStatement = sqlite.prepare('INSERT INTO users (nama, email, pass, role, createdAt) VALUES (?, ?, ?, ?, ?)');
      const res: SqliteRunResult = stmt.run(user.nama, user.email, user.pass, user.role, now);
      return {
        ...user,
        id: Number(res.lastInsertRowid),
        createdAt: now
      };
    }

    getAllPerkara(): PerkaraRecord[] {
      const stmt: SqliteStatement<PerkaraRow> = sqlite.prepare<PerkaraRow>('SELECT id, data, createdAt, updatedAt FROM perkara ORDER BY id ASC');
      const rows: PerkaraRow[] = stmt.all();
      return rows.map((r: PerkaraRow): PerkaraRecord => {
        try {
          const parsed: unknown = JSON.parse(r.data);
          const obj = (parsed && typeof parsed === 'object') ? (parsed as PerkaraRecord) : {};
          obj.id = r.id;
          return obj;
        } catch {
          return { id: r.id };
        }
      });
    }

    getPerkaraById(id: number | string): PerkaraRecord | undefined {
      const targetId: number = parseInt(String(id), 10);
      if (isNaN(targetId)) return undefined;
      const stmt: SqliteStatement<PerkaraRow> = sqlite.prepare<PerkaraRow>('SELECT id, data, createdAt, updatedAt FROM perkara WHERE id = ?');
      const row: PerkaraRow | undefined = stmt.get(targetId);
      if (!row) return undefined;
      try {
        const parsed: unknown = JSON.parse(row.data);
        const obj = (parsed && typeof parsed === 'object') ? (parsed as PerkaraRecord) : {};
        obj.id = row.id;
        return obj;
      } catch {
        return { id: row.id };
      }
    }

    savePerkara(rec: PerkaraRecord, index?: number): PerkaraRecord[] {
      const list: PerkaraRecord[] = this.getAllPerkara();
      const now: string = new Date().toISOString();

      if (typeof index === 'number' && index >= 0 && index < list.length) {
        const target: PerkaraRecord = list[index];
        const updated: PerkaraRecord = { ...target, ...rec };
        const updateStmt: SqliteStatement = sqlite.prepare('UPDATE perkara SET data = ?, updatedAt = ? WHERE id = ?');
        updateStmt.run(JSON.stringify(updated), now, target.id);
      } else {
        const insertStmt: SqliteStatement = sqlite.prepare('INSERT INTO perkara (data, createdAt, updatedAt) VALUES (?, ?, ?)');
        const result: SqliteRunResult = insertStmt.run(JSON.stringify(rec), now, now);
        rec.id = Number(result.lastInsertRowid);
      }
      return this.getAllPerkara();
    }

    replacePerkaraList(newList: PerkaraRecord[]): void {
      const now: string = new Date().toISOString();
      const insertStmt: SqliteStatement = sqlite.prepare('INSERT INTO perkara (data, createdAt, updatedAt) VALUES (?, ?, ?)');
      const tx = sqlite.transaction(() => {
        sqlite.exec('DELETE FROM perkara');
        for (const item of newList) {
          insertStmt.run(JSON.stringify(item), now, now);
        }
      });
      tx();
    }

    deletePerkara(indexOrId: number | string): PerkaraRecord[] {
      const list: PerkaraRecord[] = this.getAllPerkara();
      const deleteStmt: SqliteStatement = sqlite.prepare('DELETE FROM perkara WHERE id = ?');
      const targetId: number = parseInt(String(indexOrId), 10);
      if (!isNaN(targetId) && targetId >= 0 && targetId < list.length && list[targetId]) {
        const target: PerkaraRecord = list[targetId];
        deleteStmt.run(target.id);
      } else if (!isNaN(targetId)) {
        deleteStmt.run(targetId);
      }
      return this.getAllPerkara();
    }

    resetPerkara(): void {
      sqlite.exec('DELETE FROM perkara');
    }

    getDisposisi(): DisposisiRecord[] {
      const stmt: SqliteStatement<DisposisiRow> = sqlite.prepare<DisposisiRow>('SELECT id, perkara_id, data, createdAt FROM disposisi ORDER BY id ASC');
      const rows: DisposisiRow[] = stmt.all();
      return rows.map((r: DisposisiRow): DisposisiRecord => {
        try {
          const parsed: unknown = JSON.parse(r.data);
          const obj = (parsed && typeof parsed === 'object') ? (parsed as DisposisiRecord) : {};
          obj.id = r.id;
          obj.perkaraId = r.perkara_id;
          return obj;
        } catch {
          return { id: r.id, perkaraId: r.perkara_id };
        }
      });
    }

    saveDisposisi(disp: DisposisiRecord): DisposisiRecord {
      const now: string = new Date().toISOString();
      const insertStmt: SqliteStatement = sqlite.prepare('INSERT INTO disposisi (perkara_id, data, createdAt) VALUES (?, ?, ?)');
      const perkaraId: number = typeof disp.perkaraId === 'number' ? disp.perkaraId : 0;
      const res: SqliteRunResult = insertStmt.run(perkaraId, JSON.stringify(disp), now);
      return {
        ...disp,
        id: Number(res.lastInsertRowid),
        tanggalDisposisi: disp.tanggalDisposisi || now
      };
    }
  }

  dbInstance = new SqliteDatabase();
  console.log('[DB] Menggunakan SQLite database:', dbFile);
} catch (error: unknown) {
  const msg: string = error instanceof Error ? error.message : String(error);
  console.log('[DB] Fallback ke JSON database:', msg);
  dbInstance = new JsonDatabase();
}

export const db: IDatabase = dbInstance;
