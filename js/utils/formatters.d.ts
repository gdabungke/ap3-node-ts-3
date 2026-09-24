export declare function formatProperCase(str: string): string;
export declare function getVal(id: string): string;
export declare function escText(s: any): string;
export declare function formatModusVerb(modus: string): string;
export declare function terbilangHuruf(angka: any): string;
export declare function terbilang(angka: any): string;
export declare function tanggalKeTeks(dateString: string): string;
export declare function formatJam24(el: HTMLInputElement): void;
export declare function validateJam24(el: HTMLInputElement): void;
export declare function formatRupiahInput(el: HTMLInputElement): void;
export declare function formatRupiahFinal(el: HTMLInputElement): void;
export declare function formatDateIndo(dateStr: string): string;
export declare function formatDate(id: string): string;
export declare function autoGenerateTeksTanggalBA(dateStr: string): {
    hari: string;
    teksLengkap: string;
};
export declare function formatTrailingDashes(text: string, prefix?: string): string;
export declare function formatRowTrailingDashes(label: string, value: string, labelWidth?: string): string;
export declare function formatRowTrailingDots(label: string, value: string, labelWidth?: string): string;
/**
 * Fungsi Master Validator Terpusat untuk seluruh dokumen operasional.
 * Menggabungkan validasi nomor ganda, urutan sekuensial, dan kronologi tanggal.
 *
 * @param {Array} docItems - Daftar dokumen yang ingin dicek [{num, date, numKey, dateKey, label}, ...]
 * @param {Object} datesObj - Objek tanggal untuk cek kronologi {tglSprin, tglSbp, tglLp, ...}
 * @param {any} currentRecordId - ID record yang sedang diedit (biar tidak bentrok dengan datanya sendiri)
 * @param {any} linkedParentId - ID parent jika ada relasi
 */
export declare function validateMasterOperationalData(docItems?: any[], datesObj?: any, currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message: string;
};
export declare function extractDocSequenceNumber(docString: string): number | null;
export declare function getAllGlobalRecords(): any[];
export declare function generateNextBookingNumber(prefix: string, fieldKey: string, suffixPattern?: string, padLength?: number): string;
export declare function validateGlobalDocSequence(newDocNum: string, newDocDate: string, fieldNumKey: string, fieldDateKey: string, currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message?: string;
};
export declare function validateFormDocumentNumbers(docItems?: any[], currentRecordId?: any, linkedParentId?: any): {
    isValid: boolean;
    message: string;
};
export declare function validateOperationalChronology(dates?: any): {
    isValid: boolean;
    message?: string;
};
