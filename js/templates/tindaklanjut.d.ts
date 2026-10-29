/**
 * ============================================================================
 * MODUL TEMPLATE : TINDAKLANJUT.TS
 * KELOMPOK       : TINDAK LANJUT / EKSEKUSI HASIL PENELITIAN PERKARA (LHP)
 * DESKRIPSI      : Berisi fungsi cetak dokumen tindak lanjut operasional
 *                  berdasarkan rekomendasi LHP (pengembalian ke pemilik,
 *                  buka segel, penetapan status BDN, denda SPSA, atau pelimpahan).
 * ============================================================================
 */
import { getTLNumFormat, closeTLReportTag } from './components.js';
export { getTLNumFormat, closeTLReportTag };
export declare function BAST_PEMILIK(): string;
export declare function BA_SEGEL(): string;
export declare function KEP_BDN(): string;
export declare function SPSA(): string;
export declare function BAST_LIMPAH(): string;
