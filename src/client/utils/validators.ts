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

import { store } from '../state/store.js';

/**
 * Mengambil seluruh gabungan data register dari database lokal maupun state memori.
 */
export function getAllGlobalRecords(): any[] {
  let perkaraList: any[] = [];
  if (typeof store !== 'undefined' && Array.isArray(store.databasePerkara)) {
    perkaraList = store.databasePerkara;
  } else {
    try {
      perkaraList = JSON.parse(localStorage.getItem('databasePerkara') || '[]');
    } catch (e) {
      perkaraList = [];
    }
  }

  let disposisiList: any[] = [];
  try {
    disposisiList = JSON.parse(localStorage.getItem('databaseDisposisi') || '[]');
  } catch (e) {
    disposisiList = [];
  }

  return [...perkaraList, ...disposisiList];
}

/**
 * Mengekstrak angka murni dari string nomor dokumen (misal: "01" dari "SPRIN-01/KPU.206/2026").
 */
export function extractDocSequenceNumber(docString: string): number | null {
  if (!docString) return null;
  let match = String(docString).match(/\b(\d+)\b/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Memvalidasi apakah urutan nomor dan tanggal dokumen sinkron dengan database global.
 */
export function validateGlobalDocSequence(
  newDocNum: string, 
  newDocDate: string, 
  fieldNumKey: string, 
  fieldDateKey: string, 
  currentRecordId: any = null, 
  linkedParentId: any = null
): { isValid: boolean; message?: string } {
  if (!newDocNum || !newDocDate) {
    return { isValid: true };
  }

  let cleanNum = String(newDocNum).trim().toLowerCase();
  let targetSeq = extractDocSequenceNumber(cleanNum);
  let targetTime = new Date(newDocDate).getTime();
  let allRecords = getAllGlobalRecords();

  for (let item of allRecords) {
    let itemId = item.id || item.recordId;
    
    // Lewati jika membandingkan dengan diri sendiri
    if (currentRecordId && String(itemId) === String(currentRecordId)) {
      continue;
    }

    if (linkedParentId && String(itemId) === String(linkedParentId)) {
      continue;
    }

    if (linkedParentId && item.disposisiId && String(item.disposisiId) === String(linkedParentId)) {
      continue;
    }

    let existNum = item[fieldNumKey] ? String(item[fieldNumKey]).trim() : '';
    let existDate = item[fieldDateKey] ? String(item[fieldDateKey]).trim() : '';
    if (!existNum || !existDate) continue;

    if (existNum.toLowerCase() === cleanNum) {
      return {
        isValid: false,
        message: `Nomor "${newDocNum}" sudah digunakan pada berkas lain! Tidak boleh ada nomor ganda.`
      };
    }

    if (targetSeq !== null) {
      let existSeq = extractDocSequenceNumber(existNum);
      if (existSeq !== null) {
        let existTime = new Date(existDate).getTime();

        if (targetSeq > existSeq && targetTime < existTime) {
          return {
            isValid: false,
            message: `Anomali Tanggal: Nomor (${newDocNum}) lebih tinggi dari (${existNum}), tetapi tanggalnya (${newDocDate}) mendahului dokumen sebelumnya (${existDate}).`
          };
        }

        if (targetSeq < existSeq && targetTime > existTime) {
          return {
            isValid: false,
            message: `Anomali Tanggal: Nomor (${newDocNum}) lebih kecil dari (${existNum}), tetapi tanggalnya (${newDocDate}) melewati berkas yang bernomor lebih besar (${existDate}).`
          };
        }
      }
    }
  }

  return { isValid: true };
}

/**
 * Memvalidasi kepatuhan kronologis antar tanggal proses penindakan sampai penelitian perkara.
 */
export function validateOperationalChronology(dates: any = {}): { isValid: boolean; message?: string } {
  let { tglSprin, tglSbp, tglLp, tglLpp, tglLpf, tglSplit, tglSprinCacah, tglBa, tglLhp } = dates;

  let parse = (d: any) => (d ? new Date(d).getTime() : null);

  let dSprin = parse(tglSprin);
  let dSbp = parse(tglSbp);
  let dLp = parse(tglLp);
  let dLpp = parse(tglLpp);
  let dLpf = parse(tglLpf);
  let dSplit = parse(tglSplit);
  let dSprinCacah = parse(tglSprinCacah);
  let dBa = parse(tglBa);
  let dLhp = parse(tglLhp);

  if (dSprin && dSbp && dSprin > dSbp) {
    return { isValid: false, message: "Tanggal SPRIN INDAK tidak boleh melebihi Tanggal SBP!" };
  }
  if (dSbp && dLp && dSbp > dLp) {
    return { isValid: false, message: "Tanggal SBP tidak boleh mendahului/melewati Tanggal LP!" };
  }
  if (dLp && dLpp && dLp > dLpp) {
    return { isValid: false, message: "Tanggal Laporan Pelanggaran (LP) tidak boleh lebih baru dari LPP!" };
  }
  if (dLpp && dLpf && dLpp > dLpf) {
    return { isValid: false, message: "Tanggal LPP tidak boleh melebihi Tanggal LPF!" };
  }
  if (dLpf && dSplit && dLpf > dSplit) {
    return { isValid: false, message: "Tanggal LPF tidak boleh melebihi Tanggal SPLIT!" };
  }

  if (dSbp && dSprinCacah && dSprinCacah < dSbp) {
    return { isValid: false, message: "Tanggal SPRIN CACAH tidak boleh mendahului Tanggal SBP!" };
  }
  if (dSprinCacah && dBa && dBa < dSprinCacah) {
    return { isValid: false, message: "Tanggal BA CACAH tidak boleh mendahului Tanggal SPRIN CACAH!" };
  }
  if (dBa && dLhp && dLhp < dBa) {
    return { isValid: false, message: "Tanggal LHP tidak boleh mendahului Tanggal BA CACAH!" };
  }

  return { isValid: true };
}

/**
 * Validasi kumpulan form input nomor dokumen operasional.
 */
export function validateFormDocumentNumbers(
  docItems: any[] = [], 
  currentRecordId: any = null, 
  linkedParentId: any = null
): { isValid: boolean; message: string } {
  for (let item of docItems) {
    if (item.num && item.date) {
      let result = validateGlobalDocSequence(item.num, item.date, item.numKey, item.dateKey, currentRecordId, linkedParentId);
      if (!result.isValid) {
        return {
          isValid: false,
          message: `[${item.label || item.numKey}] ${result.message}`
        };
      }
    }
  }
  return { isValid: true, message: '' };
}

/**
 * Pintu masuk utama (Master Validator) untuk seluruh form dan modal AP3.
 */
export function validateMasterOperationalData(
  docItems: any[] = [], 
  datesObj: any = {}, 
  currentRecordId: any = null, 
  linkedParentId: any = null
): { isValid: boolean; message: string } {
  if (docItems && docItems.length > 0) {
    let docValidation = validateFormDocumentNumbers(docItems, currentRecordId, linkedParentId);
    if (!docValidation.isValid) {
      return {
        isValid: false,
        message: docValidation.message
      };
    }
  }

  if (datesObj && Object.keys(datesObj).length > 0) {
    let chronoValidation = validateOperationalChronology(datesObj);
    if (!chronoValidation.isValid) {
      return {
        isValid: false,
        message: chronoValidation.message || 'Terjadi anomali pada kronologi tanggal operasional.'
      };
    }
  }

  return { isValid: true, message: '' };
}

if (typeof window !== 'undefined') {
  (window as any).extractDocSequenceNumber = extractDocSequenceNumber;
  (window as any).getAllGlobalRecords = getAllGlobalRecords;
  (window as any).validateGlobalDocSequence = validateGlobalDocSequence;
  (window as any).validateFormDocumentNumbers = validateFormDocumentNumbers;
  (window as any).validateOperationalChronology = validateOperationalChronology;
  (window as any).validateMasterOperationalData = validateMasterOperationalData;
}