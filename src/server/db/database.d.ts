/**
 * @file database.ts
 * @description Layer basis data SQLite terpadu dengan fallback JSON storage.
 */
import { UserAccount, PerkaraRecord, DisposisiRecord } from '../types/index.js';
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
export declare const db: IDatabase;
