/**
 * ============================================================================
 * MODULE        : STORAGE.TS
 * DESCRIPTION   : Pengelolaan Pengaturan Sistem & Konfigurasi via Backend API
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
export * from '../state/store.js';
export declare function initSettingPejabatDropdowns(): Promise<void>;
export declare function saveData(): Promise<void>;
export declare function changePaperSize(val: string): void;
export declare function addCustomKantor(): Promise<void>;
export declare function removeCustomKantor(idx: number): Promise<void>;
export declare function renderCustomKantorList(): Promise<void>;
export declare function loadData(): Promise<void>;
export declare function confirmResetAllData(): void;
