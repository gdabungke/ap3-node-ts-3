/**
 * ============================================================================
 * MODULE        : GENERATORS.TS
 * DESCRIPTION   : Modul Generator Teks Otomatis & Penomoran Dokumen (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 *
 * RUANG LINGKUP & TANGGUNG JAWAB:
 * 1. Auto-Booking Nomor: Melakukan reservasi nomor urut sekuensial secara otomatis
 *    untuk berkas perkara (LPP, LPF, SPLIT, Sprin Cacah, BA, LHP, dll.).
 * 2. Generator Uraian Barang: Menyusun teks baku rincian barang bukti dengan format
 *    "Jumlah (Terbilang) Satuan Nama Barang, dll." secara seragam.
 * 3. Generator Kemasan: Memformat narasi kemasan FCL/Kontainer atau koli retail.
 * 4. Generator Narasi Hukum: Merakit kalimat baku kronologis penindakan, kesimpulan dugaan
 *    pasal pelanggaran, serta rujukan dokumen pabean pada formulir BAST.
 * ============================================================================
 */
/**
 * Menghasilkan nomor urut registrasi otomatis berikutnya dari database global.
 * @param prefix Awalan kode (misal: "LP-", "SPLIT-")
 * @param fieldKey Kolom properti data di database
 * @param suffixPattern Pola akhiran (misal: "/KPU.206/2026")
 * @param padLength Jumlah digit padding nol di depan angka
 */
export declare function generateNextBookingNumber(prefix: string, fieldKey: string, suffixPattern?: string, padLength?: number): string;
export interface GeneratorUraianBarangParams {
    jumlah: string | number;
    satuan: string;
    namaBarang: string;
    akhiranTipe?: string;
    kustomAkhiran?: string;
    pakaiTerbilang?: boolean;
}
/**
 * Menghasilkan teks baku uraian barang bukti.
 * Contoh hasil: "12 (dua belas) carton Sepatu Olahraga, dll."
 */
export declare function generateUraianBarangTeks(params: GeneratorUraianBarangParams): string;
export interface GeneratorKemasanParams {
    jumlahKemasan?: string | number;
    jenisKemasan: string;
    nomorKontainer?: string;
    ukuranKontainer?: string;
}
/**
 * Menghasilkan format standar keterangan kemasan atau peti kemas.
 */
export declare function generateKemasanTeks(params: GeneratorKemasanParams): string;
export interface GeneratorKronologisParams {
    hari: string;
    tanggalRaw: string;
    jamKejadian?: string;
    lokasi: string;
    pelaku: string;
    modusOperandi: string;
    kantor?: string;
}
/**
 * Menghasilkan narasi resmi kronologi singkat penindakan pabean/cukai.
 */
export declare function generateKronologisTeks(params: GeneratorKronologisParams): string;
export declare function generateKesimpulanTeks(pasalPelanggaran: string, modusOperandi: string): string;
export declare function generateTeksDokumenEksPabean(jenisDok: string, nomorDok: string, tanggalDokRaw: string): string;
