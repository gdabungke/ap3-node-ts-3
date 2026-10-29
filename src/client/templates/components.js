/**
 * ============================================================================
 * MODULE        : COMPONENTS.TS
 * DESCRIPTION   : Komponen Reusable, Helper Layout, Kop Surat & Penomoran (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
import { store } from '../state/store.js';
// ========================================================
// 1. KOP SURAT DINAS RESMI
// ========================================================
export function generateKopSurat(tipeDoc = 'DEFAULT') {
    return `
    <div class="kop-surat" style="text-align:center; border-bottom:2px solid #000; padding-bottom:6px; margin-bottom:14px; font-family:'Bookman Old Style', Arial, serif;">
      <div style="font-size:11pt; font-weight:bold; letter-spacing:0.5px;">KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</div>
      <div style="font-size:10.5pt; font-weight:bold;">DIREKTORAT JENDERAL BEA DAN CUKAI</div>
      <div style="font-size:10pt; font-weight:bold;">KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM</div>
    </div>
  `;
}
// ========================================================
// 2. BADGE TANDA TANGAN ELEKTRONIK (TTE) & KEY-VALUE TABLE
// ========================================================
export function tteBadge() {
    return `
    <div style="margin: 4px 0 6px 0; font-size: 8pt; color: #1e293b; display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #94a3b8; padding: 2px 6px; border-radius: 4px; background: #f8fafc;">
      <span style="font-weight: bold; color: #0284c7;">✓ TTE Terverifikasi</span>
      <span style="color: #64748b;">Kemenkeu RI</span>
    </div>
  `;
}
export function buildTableKv(rows) {
    return `
    <table style="width:100%; border-collapse:collapse; margin-bottom:8px; font-size:10pt; font-family:Arial, sans-serif;">
      ${rows.map(([kategori, sub, val]) => `
        <tr>
          <td style="width:180px; vertical-align:top; padding:2px 0;"><b>${kategori}</b></td>
          <td style="width:15px; vertical-align:top; text-align:center; padding:2px 0;">:</td>
          <td style="vertical-align:top; padding:2px 0;">${val}</td>
        </tr>
      `).join('')}
    </table>
  `;
}
// ========================================================
// 3. FORMAT NOMOR DOKUMEN (LAPORAN & TINDAK LANJUT)
// ========================================================
export function getDocNum(type) {
    if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex])
        return '-';
    const rec = store.databasePerkara[store.activeRecordIndex];
    const noLp = rec.NoLP_LP_1 || rec.Nomor_LHP || '01';
    switch (type) {
        case 'LPP':
            return `LPP-${rec.Nomor_LPP || noLp}/KPU.206/2026`;
        case 'LPF':
            return `LPF-${rec.Nomor_LPF || noLp}/KPU.206/2026`;
        case 'SPLIT':
            return `PRIN-${rec.Nomor_SPLIT || noLp}/KPU.206/2026`;
        case 'SPRIN_CACAH':
            return `PRIN-${rec.Nomor_Sprin_Cacah || noLp}/KPU.206/2026`;
        case 'BA':
            return `BA-${rec.Nomor_BA || noLp}/KPU.206/2026`;
        case 'LHP':
            return `LHP-${rec.Nomor_LHP || noLp}/KPU.206/2026`;
        default:
            return '-';
    }
}
export function getTLNumFormat(type) {
    if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex])
        return '-';
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
export function renderTtdPejabat(pejabat) {
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
export function closeTLReportTag(customSignHTML, tglStr) {
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
export const toLetter = (i) => String.fromCharCode(97 + i) + '.';
export function renderBastItemBlock(title, rowsHtml) {
    return `
    <tr>
      <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">${title}</td>
    </tr>
    ${rowsHtml}
  `;
}
export function renderPlaceholderRow() {
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
    window.getDocNum = getDocNum;
    window.getTLNumFormat = getTLNumFormat;
    window.renderTtdPejabat = renderTtdPejabat;
    window.closeTLReportTag = closeTLReportTag;
    window.generateKopSurat = generateKopSurat;
    window.tteBadge = tteBadge;
    window.buildTableKv = buildTableKv;
}
