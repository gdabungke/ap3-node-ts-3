/**
 * ============================================================================
 * MODULE        : COMPONENTS.TS
 * DESCRIPTION   : Komponen Reusable, Helper Layout, Kop Surat & Penomoran (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */

import { store } from '../state/store.js';
import { escText, getVal, formatDate, formatDateIndo } from '../utils/formatters.js';

// ========================================================
// 1. KOP SURAT DINAS RESMI (LENGKAP & KOP KIRI)
// ========================================================

export function generateKopSurat(jenisDokumen?: string): string {
  const listKopLama = ['lpp', 'lpf', 'split'];
  const doc = (jenisDokumen || '').toLowerCase();

  // 1. Kop Sederhana Rata Kiri (Untuk LPP, LPF, SPLIT)
  if (listKopLama.includes(doc)) {
    return `
      <div class="office-left" style="font-family: Arial, Helvetica, sans-serif !important; font-weight: bold; font-size: 10pt; line-height: 1.3; margin-bottom: 14px;">
        KEMENTERIAN KEUANGAN REPUBLIK INDONESIA<br>
        DIREKTORAT JENDERAL BEA DAN CUKAI<br>
        KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
      </div>
    `;
  }

  // 2. Kop Dinas Resmi dengan Logo Kemenkeu & Alamat Lengkap Batu Ampar
  return `
    <div class="surat-kop" style="width: 100% !important; box-sizing: border-box !important; margin: 0 0 14px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important;">
      <table style="width: 100% !important; border-collapse: collapse !important; border: none !important; table-layout: fixed !important; margin: 0 !important;">
        <colgroup>
          <col style="width: calc(2.3cm + 12px) !important;">
          <col style="width: calc(100% - (2.3cm + 12px)) !important;">
        </colgroup>
        <tr>
          <td style="width: calc(2.3cm + 12px) !important; vertical-align: top !important; text-align: right !important; padding: 0 3px 0 12px !important; border: none !important; box-sizing: border-box !important;">
            <img src="./assets/img/kemenkeu-logo.png" alt="Logo Kemenkeu" style="width: 2.3cm !important; height: 2.2cm !important; max-width: 2.3cm !important; max-height: 2.2cm !important; filter: grayscale(100%) contrast(150%) !important; mix-blend-mode: multiply !important; display: block !important; margin: 0 !important; margin-left: auto !important; margin-top: 1px !important;" />
          </td>

          <td style="vertical-align: top !important; text-align: center !important; padding: 0 0 0 6px !important; border: none !important;">
            <div style="font-size: 13pt !important; font-weight: bold !important; line-height: 1 !important; color: #000000 !important; text-transform: uppercase !important; margin: 1px 0 3px 0 !important;">
              KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
            </div>

            <div style="font-size: 11pt !important; font-weight: bold !important; line-height: 1.15 !important; color: #000000 !important; text-transform: uppercase !important; margin: 0 0 1px 0 !important;">
              DIREKTORAT JENDERAL BEA DAN CUKAI
            </div>
            <div style="font-size: 11pt !important; font-weight: bold !important; line-height: 1.15 !important; color: #000000 !important; text-transform: uppercase !important; margin: 0 0 4px 0 !important;">
              KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
            </div>

            <div style="font-size: 7pt !important; line-height: 1.25 !important; color: #000000 !important; margin: 0 !important; text-transform: none !important; word-wrap: break-word !important; overflow-wrap: break-word !important; white-space: normal !important; text-align: center !important;">
              Jalan Kuda Laut, Batu Ampar, Batam, Kepulauan Riau 29432; TELEPON (0778) 458818, 458263; FAKSIMILE (0778)<br>
              458149; LAMAN www.bcbatam.beacukai.go.id; PUSAT KONTAK LAYANAN 1500225; SUREL bckpubatam@customs.go.id,<br>
              kpubc.batam@kemenkeu.go.id
            </div>
          </td>
        </tr>
      </table>

      <hr style="border: none !important; border-top: 1.5pt solid #000000 !important; margin: 4px 0 0 0 !important; padding: 0 !important; width: 100% !important;" />
    </div>
  `;
}

// ========================================================
// 2. BADGE TANDA TANGAN ELEKTRONIK (TTE) & KEY-VALUE TABLE
// ========================================================

export function tteBadge(): string {
  return `<div class="tte-badge" style="font-size:8.5pt; color:#9ca3af !important; margin:3px 0 2px 0; font-style:normal; font-weight:normal; text-align:left; letter-spacing:0.01em;">Ditandatangani secara elektronik</div>`;
}


export function buildTableKv(rows: any[]): string {
  return `<table class="rtable" style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif;">${rows.map(r => {
    if (r.length === 3) {
      return `<tr>
        <td style="width:4%; vertical-align:top;">${r[0]}</td>
        <td style="width:28%; vertical-align:top;">${r[1]}</td>
        <td style="width:3%; text-align:center; vertical-align:top;">${r[1] ? ':' : ''}</td>
        <td style="text-align:justify; vertical-align:top;">${r[2] || '-'}</td>
      </tr>`;
    } else {
      return `<tr>
        <td style="width:32%; vertical-align:top;">${r[0]}</td>
        <td style="width:3%; text-align:center; vertical-align:top;">:</td>
        <td style="text-align:justify; vertical-align:top;">${r[1] || '-'}</td>
      </tr>`;
    }
  }).join('')}</table>`;
}

// ========================================================
// 3. FORMAT NOMOR DOKUMEN (LAPORAN & TINDAK LANJUT)
// ========================================================

export function getDocNum(type: string, customInput?: string): string {
  let formatted = '-';
  let activeRec = (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) ? store.databasePerkara[store.activeRecordIndex] : {};

  if (type === 'GET_ELEMENT') {
    let el = document.getElementById(customInput || '') as HTMLInputElement;
    return el ? el.value.trim() : '';
  }

  const ttype = (type || '').toUpperCase();

  // Helper untuk membersihkan nilai & validasi isi
  const resolveValue = (...candidates: any[]): string => {
    for (const val of candidates) {
      if (val && val !== '-' && String(val).trim() !== '') {
        return String(val).trim();
      }
    }
    return '';
  };

  if (ttype === 'SPRIN_INDAK') {
    let val = resolveValue(customInput, getVal('No_SPRIN_Indak'), activeRec.No_SPRIN_Indak);
    let rawTgl = resolveValue(getVal('Tanggal_SPRIN_Indak'), activeRec.Tanggal_SPRIN_Indak);
    let tgl = rawTgl ? formatDateIndo(rawTgl) : '';
    if (val) {
      let sprinPad = val.length < 2 ? val.padStart(2, '0') : val;
      let noFormatted = `SPRIN-${sprinPad}/KPU.206/2026`;
      formatted = tgl ? `${noFormatted} tanggal ${tgl}` : noFormatted;
    }
  } 
  else if (ttype === 'SBP') {
    let val = resolveValue(customInput, getVal('Nomor_SBP'), activeRec.Nomor_SBP);
    if (val) {
      let status = resolveValue(getVal('Status_Penangkapan'), activeRec.Status_Penangkapan);
      let tipe = status.toUpperCase().includes('LIMPAHAN') ? 'LIMPAH' : 'MANDIRI';
      formatted = `SBP-${val}/${tipe}/KPU.2/2026`;
    }
  } 

  else if (ttype === 'LP') {
    let val = resolveValue(customInput, getVal('NoLP_LP_1'), getVal('No_LP'), activeRec.NoLP_LP_1, activeRec.No_LP);
    if (val) {
      let cleaned = val.replace(/^LP[-\s]*/i, '').trim();
      formatted = `LP-${cleaned}/KPU.206/2026`;
    }
  }
  else if (ttype === 'LPP') {
    let val = resolveValue(customInput, getVal('No_LPP'), activeRec.No_LPP);
    if (val) {
      let cleaned = val.replace(/^LPP[-\s]*/i, '').trim();
      formatted = `LPP-${cleaned}/KPU.206/2026`;
    }
  }
  else if (ttype === 'LPF') {
    let val = resolveValue(customInput, getVal('No_LPF'), activeRec.No_LPF);
    if (val) {
      let cleaned = val.replace(/^LPF[-\s]*/i, '').trim();
      formatted = `LPF-${cleaned}/KPU.206/2026`;
    }
  } 
  else if (ttype === 'SPLIT') {
    let val = resolveValue(customInput, getVal('Nomor_SPLIT'), activeRec.Nomor_SPLIT);
    if (val) {
      let cleaned = val.replace(/^(SPLIT|SPLI)[-\s]*/i, '').trim();
      formatted = `SPLIT-${cleaned}/KPU.206/2026`;
    }
  } 
  else if (ttype === 'SPRIN_CACAH' || ttype === 'PRIN_CACAH') {
    let val = resolveValue(customInput, getVal('No_SPRIN_CACAH'), activeRec.No_SPRIN_CACAH);
    if (val) {
      let cleaned = val.replace(/^(PRIN)[-\s]*/i, '').trim();
      formatted = `PRIN-${cleaned}/KPU.206/CACAH/2026`;
    }
  } 
  else if (ttype === 'BA' || ttype === 'BA_CACAH') {
    let val = resolveValue(customInput, getVal('Nomor_BA'), activeRec.Nomor_BA);
    if (val) {
      let cleaned = val.replace(/^(BA)[-\s]*/i, '').trim();
      formatted = `BA-${cleaned}/KPU.206/CACAH/2026`;
    }
  } 
  else if (ttype === 'LHP') {
    let val = resolveValue(customInput, getVal('Nomor_LHP'), activeRec.Nomor_LHP);
    if (val) {
      let cleaned = val.replace(/^(LHP)[-\s]*/i, '').trim();
      formatted = `LHP-${cleaned}/KPU.206/2026`;
    }
  }

  return formatted;
}

export function baseReport(title: string, no: string, isBA: boolean = false, docType: string = ''): string {
  let detectedType = docType;
  if (!detectedType) {
    const t = title.toUpperCase();
    if (t.includes('LPP')) detectedType = 'LPP';
    else if (t.includes('LPF')) detectedType = 'LPF';
    else if (t.includes('SPLIT')) detectedType = 'SPLIT';
    else if (t.includes('SURAT PERINTAH PENCACAHAN')) detectedType = 'SPRIN_CACAH';
    else if (t.includes('PENCACAHAN') && !t.includes('BA CACAH')) detectedType = 'BA_CACAH';
    else if (t.includes('LHP')) detectedType = 'LHP';
  }

  const dokumenGunakanKopLama = ['LPP', 'LPF', 'SPLIT'];
  let kopContent = '';

  if (dokumenGunakanKopLama.includes((detectedType || '').toUpperCase())) {
    kopContent = `<div class="office-left" style="font-family: Arial, Helvetica, sans-serif !important; font-weight: bold; font-size: 10pt; line-height: 1.3; margin-bottom: 15px;">
      KEMENTERIAN KEUANGAN REPUBLIK INDONESIA<br>
      DIREKTORAT JENDERAL BEA DAN CUKAI<br>
      KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
    </div>`;
  } else {
    kopContent = generateKopSurat(detectedType);
  }

  return `<div class="report" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10pt; color: #000 !important; line-height: 1.3;">
    ${kopContent}
    <div class="title-center" style="font-family: Arial, Helvetica, sans-serif; text-align:center; font-weight:bold; font-size:11.5pt; margin:14px 0 4px 0;">${title}</div>
    <div class="nomor-center" style="font-family: Arial, Helvetica, sans-serif; text-align:center; margin-bottom:16px;">Nomor : ${no}</div>`;
}

export function getTLNumFormat(type: string): string {
  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) return '-';
  const rec = store.databasePerkara[store.activeRecordIndex];
  const fallbackNum = rec.Nomor_LHP || rec.NoLP_LP_1 || '338';

  switch (type) {
    case 'BAST_PEMILIK':
      return `BAST-${rec.TL_BAST_Num || fallbackNum}/KPU.2064/2026`;
    case 'BAST_LIMPAH':
      return `BAST-${rec.TL_Limpah_Num || fallbackNum}/LIMPAH/KPU.2064/2026`;
    case 'BA_SEGEL':
      return `BA-${rec.TL_Segel_Num || fallbackNum}/BUKASEGEL/KPU.2064/2026`;
    case 'SPSA':
      return `SPSA-${rec.TL_SPSA_Num || fallbackNum}/KPU.2/2026`;
    case 'KEP_BDN':
      return `KEP-${rec.TL_KEP_Num || fallbackNum}/KPU.2/2026`;
    default:
      return '-';
  }
}

// ========================================================
// 4. HELPER TANDA TANGAN & PENUTUP DOKUMEN
// ========================================================

export function renderTtdPejabat(pejabat: {
  kota?: string;
  tanggal?: string;
  jabatan: string;
  nama: string;
  pangkatGol?: string;
  nip: string;
}): string {
  const tglTtd = pejabat.tanggal ? `${pejabat.kota || 'Batam'}, ${pejabat.tanggal}` : '&nbsp;';
  return `
    <div style="page-break-inside: avoid !important; margin-top:20px; font-family:'Bookman Old Style', Arial, serif; font-size:10pt;">
      <table style="width:100%; border-collapse:collapse; border:none !important;">
        <tr>
          <td style="border:none !important; width:55%;"></td>
          <td style="border:none !important; width:45%; vertical-align:top; text-align:left;">
            <div>${tglTtd}</div>
            <div style="margin-top:2px; font-weight:bold;">${pejabat.jabatan}</div>
            <div class="signature" style="height:45px;"></div>
            ${tteBadge()}
            <div style="font-weight:bold; text-decoration:underline;">${pejabat.nama}</div>
            ${pejabat.pangkatGol ? `<div>${pejabat.pangkatGol}</div>` : ''}
            <div>NIP ${pejabat.nip}</div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function closeTLReportTag(customSignHTML: string, tglStr: string): string {
  const t = tglStr || '28 September 2026';
  return `
    <div style="page-break-inside: avoid !important; margin-top:16px; font-family:Arial, sans-serif; font-size:10pt;">
      <div style="text-align:right; margin-bottom:8px;">Batam, ${t}</div>
      ${customSignHTML}
    </div>
  </div>`;
}

// ========================================================
// 5. HELPER TABEL BAST
// ========================================================

export const toLetter = (i: number): string => String.fromCharCode(97 + i) + '.';

export function renderBastItemBlock(title: string, rowsHtml: string): string {
  return `
    <tr>
      <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">${title}</td>
    </tr>
    ${rowsHtml}
  `;
}

export function renderPlaceholderRow(): string {
  return `
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
      <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">…………………………………………</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
    </tr>
  `;
}

// Global binding untuk compatibility template
if (typeof window !== 'undefined') {
  (window as any).getDocNum = getDocNum;
  (window as any).getTLNumFormat = getTLNumFormat;
  (window as any).renderTtdPejabat = renderTtdPejabat;
  (window as any).closeTLReportTag = closeTLReportTag;
  (window as any).generateKopSurat = generateKopSurat;
  (window as any).tteBadge = tteBadge;
  (window as any).buildTableKv = buildTableKv;
}