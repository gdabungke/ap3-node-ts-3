/**
 * ============================================================================
 * MODULE        : VALIDATORS.TS
 * DESCRIPTION   : Modul Validasi Integritas Data & Aturan Bisnis Perkara (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 *
 * RUANG LINGKUP & TANGGUNG JAWAB:
 * 1. Validasi Keunikan Nomor: Mencegah duplikasi nomor dokumen operasional
 *    (SBP, LP, LPP, LPF, SPLIT, Sprin Cacah, BA, LHP) lintas database perkara
 *    dan disposisi.
 * 2. Validasi Sekuensial: Memastikan korelasi antara urutan nomor dan kronologi
 *    tanggal tidak terjadi anomali (nomor lebih besar tidak boleh bertanggal lebih lampau).
 * 3. Validasi Alur Kronologis: Memastikan urutan tahapan dokumen logis secara yuridis
 *    (SPRIN Indak <= SBP <= LP <= LPP <= LPF <= SPLIT).
 * 4. Pengecualian Rekord Aktif: Mengabaikan ID perkara yang sedang diedit agar
 *    tidak bentrok dengan datanya sendiri.
 * ============================================================================
 */
/**
 * Mengambil seluruh gabungan data register dari database lokal maupun state memori.
 */
export declare function getAllGlobalRecords(): any[];
/**
 * Mengekstrak angka murni dari string nomor dokumen (misal: "01" dari "SPRIN-01/KPU.206/2026").
 */
export declare function extractDocSequenceNumber(docString: string): number | null;
/**
 * Memvalidasi apakah urutan nomor dan tanggal dokumen sinkron dengan database global.
 */
export declare function validateGlobalDocSequence(newDocNum: string, newDocDate: string, fieldNumKey: string, fieldDateKey: string, currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message?: string;
};
/**
 * Memvalidasi kepatuhan kronologis antar tanggal proses penindakan sampai penelitian perkara.
 */
export declare function validateOperationalChronology(dates?: any): {
    isValid: boolean;
    message?: string;
};
/**
 * Validasi kumpulan form input nomor dokumen operasional.
 */
export declare function validateFormDocumentNumbers(docItems?: any[], currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message: string;
};
/**
 * Pintu masuk utama (Master Validator) untuk seluruh form dan modal AP3.
 */
export declare function validateMasterOperationalData(docItems?: any[], datesObj?: any, currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message: string;
};
