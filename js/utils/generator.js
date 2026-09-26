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
import { terbilangHuruf, formatDate, formatDateIndo, formatModusVerb } from './formatters.js';
import { getAllGlobalRecords, extractDocSequenceNumber } from './validators.js';
// ========================================================
// 1. AUTO-BOOKING NOMOR SEKUANSIAL DOKUMEN
// ========================================================
/**
 * Menghasilkan nomor urut registrasi otomatis berikutnya dari database global.
 * @param prefix Awalan kode (misal: "LP-", "SPLIT-")
 * @param fieldKey Kolom properti data di database
 * @param suffixPattern Pola akhiran (misal: "/KPU.206/2026")
 * @param padLength Jumlah digit padding nol di depan angka
 */
export function generateNextBookingNumber(prefix, fieldKey, suffixPattern = '', padLength = 3) {
    let allRecords = getAllGlobalRecords();
    let maxSeq = 0;
    allRecords.forEach(item => {
        let val = item[fieldKey];
        if (val && String(val).toUpperCase().includes(prefix.toUpperCase())) {
            let seq = extractDocSequenceNumber(val);
            if (seq !== null && seq > maxSeq) {
                maxSeq = seq;
            }
        }
    });
    let storageKey = `last_seq_${fieldKey}`;
    let storedSeq = parseInt(localStorage.getItem(storageKey) || '0', 10);
    if (storedSeq > maxSeq)
        maxSeq = storedSeq;
    let nextSeq = maxSeq + 1;
    localStorage.setItem(storageKey, String(nextSeq));
    let formattedSeq = String(nextSeq).padStart(padLength, '0');
    return `${prefix}${formattedSeq}${suffixPattern}`;
}
/**
 * Menghasilkan teks baku uraian barang bukti.
 * Contoh hasil: "12 (dua belas) carton Sepatu Olahraga, dll."
 */
export function generateUraianBarangTeks(params) {
    const { jumlah, satuan, namaBarang, akhiranTipe = '', kustomAkhiran = '', pakaiTerbilang = true } = params;
    const jmlStr = String(jumlah || '').trim();
    const cleanSatuan = (satuan || '').trim();
    const cleanBarang = (namaBarang || '').replace(/[,.\s]+$/, '').trim();
    if (!jmlStr && !cleanSatuan && !cleanBarang)
        return '';
    let formattedJml = jmlStr;
    if (jmlStr && pakaiTerbilang) {
        const tHuruf = terbilangHuruf(jmlStr);
        formattedJml = `${jmlStr} (${tHuruf})`;
    }
    const parts = [formattedJml, cleanSatuan, cleanBarang].filter(p => p !== '' && p !== '-');
    let baseText = parts.join(' ');
    if (baseText) {
        baseText = baseText.charAt(0).toUpperCase() + baseText.slice(1);
    }
    if (cleanBarang) {
        if (akhiranTipe === 'dll') {
            baseText += ', dll.';
        }
        else if (akhiranTipe === 'etc') {
            baseText += ', etc.';
        }
        else if (akhiranTipe === 'barang_lainnya') {
            baseText += ', dan barang lainnya';
        }
        else if (akhiranTipe === 'manual' && kustomAkhiran.trim()) {
            baseText += `, ${kustomAkhiran.trim().replace(/^,\s*/, '')}`;
        }
    }
    return baseText;
}
/**
 * Menghasilkan format standar keterangan kemasan atau peti kemas.
 */
export function generateKemasanTeks(params) {
    const { jumlahKemasan = '1', jenisKemasan, nomorKontainer = '', ukuranKontainer = '' } = params;
    const jnsUpper = (jenisKemasan || '').toUpperCase();
    if (jnsUpper.includes('FCL') || jnsUpper.includes('PETI KEMAS')) {
        const noKont = nomorKontainer.trim();
        const uk = ukuranKontainer.trim();
        if (noKont && uk)
            return `${noKont} / ${uk}`;
        if (noKont)
            return `${noKont}`;
        return `${jumlahKemasan} Peti Kemas (FCL)`;
    }
    const jml = String(jumlahKemasan || '').trim();
    if (jml) {
        return `${jml} ${jenisKemasan}`.trim();
    }
    return jenisKemasan || '-';
}
/**
 * Menghasilkan narasi resmi kronologi singkat penindakan pabean/cukai.
 */
export function generateKronologisTeks(params) {
    const { hari, tanggalRaw, jamKejadian = '', lokasi, pelaku, modusOperandi, kantor = 'Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam' } = params;
    const tglIndo = formatDate(tanggalRaw);
    const rawJam = jamKejadian.trim();
    const jamFormatted = rawJam ? `${rawJam.replace(':', '.')} WIB` : '-';
    const cleanModus = formatModusVerb(modusOperandi).replace(/[;:]+$/, '').trim();
    return `Pada hari ${hari || '-'}, tanggal ${tglIndo} sekira pukul ${jamFormatted} di ${lokasi || '-'} telah dilakukan penindakan oleh Petugas ${kantor} terhadap ${pelaku || '-'} yang ${cleanModus}.`;
}
// ========================================================
// 5. GENERATOR KESIMPULAN DUGAAN PELANGGARAN PASAL
// ========================================================
export function generateKesimpulanTeks(pasalPelanggaran, modusOperandi) {
    const pasal = (pasalPelanggaran || '').trim();
    const rawModus = (modusOperandi || '').trim();
    const modusVerb = formatModusVerb(rawModus);
    if ((pasal && pasal !== '-') || (rawModus && rawModus !== '-')) {
        return `Diduga melanggar ${pasal || '-'} karena ${modusVerb}.`;
    }
    return '-';
}
// ========================================================
// 6. GENERATOR RUJUKAN EKS DOKUMEN PABEAN (BAST)
// ========================================================
export function generateTeksDokumenEksPabean(jenisDok, nomorDok, tanggalDokRaw) {
    const j = (jenisDok || '').trim();
    const n = (nomorDok || '').trim();
    const t = tanggalDokRaw ? formatDateIndo(tanggalDokRaw) : '-';
    if (!j || j.toLowerCase().includes('tanpa dokumen') || j === '-') {
        return 'Tanpa Dokumen Pemberitahuan Pabean';
    }
    return `Eks. ${j} nomor ${n || '-'} tanggal ${t}`;
}
if (typeof window !== 'undefined') {
    window.generateNextBookingNumber = generateNextBookingNumber;
    window.generateUraianBarangTeks = generateUraianBarangTeks;
    window.generateKemasanTeks = generateKemasanTeks;
    window.generateKronologisTeks = generateKronologisTeks;
    window.generateKesimpulanTeks = generateKesimpulanTeks;
    window.generateTeksDokumenEksPabean = generateTeksDokumenEksPabean;
}
//# sourceMappingURL=generator.js.map