/**
 * ============================================================================
 * MODUL         : EDITOR.TS
 * DESKRIPSI     : Editor Interaktif, Dynamic Form Modals, Live Preview Render,
 *                 dan Sinkronisasi Status Dokumen Laporan & Tindak Lanjut (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */

import { store, savePerkaraToStorage } from '../state/store.js';
import { 
  escText, 
  getVal, 
  formatDate, 
  formatDateIndo, 
  autoGenerateTeksTanggalBA,
  terbilangHuruf
} from '../utils/formatters.js';
import { 
  generateNextBookingNumber,
  generateUraianBarangTeks,
  generateKemasanTeks,
  generateTeksDokumenEksPabean
} from '../utils/generators.js';
import { 
  autoPaginateReports, 
  applyPageNumbers, 
  navigatePreviewPage, 
  updatePreviewHeaderUI, 
  updateTLPreviewHeaderUI, 
  renderPageSelector 
} from '../utils/ui.js';
import { LPP, LPF, SPLIT, SPRIN_CACAH, BA, LHP } from '../templates/laporan.js';
import { getDocNum } from '../templates/components.js';
import { getTLNumFormat, BAST_PEMILIK, BA_SEGEL, KEP_BDN, SPSA, BAST_LIMPAH } from '../templates/tindaklanjut.js';
import {
  MASTER_SATUAN_KOLI,
  MASTER_JENIS_KEMASAN,
  MASTER_RANGKA_PENYERAHAN,
  MASTER_AKHIRAN_BARANG,
  MASTER_GOLONGAN_PANGKAT,
  MASTER_JABATAN_DINAS,
  MASTER_JABATAN_TIM_PENELITI,
  MASTER_JENIS_DOKUMEN_PABEAN,
  renderMasterOptions,
  populateSelectElement
} from '../config/constants.js';

/* ============================================================================
 * [BAGIAN A] KONTROLLER & FORM EDITOR: MENU LAPORAN (BERKAS INTI)
 * ----------------------------------------------------------------------------
 * Pengelolaan state, tabel status dokumen, form modal dinamis, dan render preview
 * Dokumen: LPP, LPF, SPLIT, SPRIN_CACAH, BA (Pencacahan), LHP
 * ============================================================================ */

// 1. Menyimpan nilai parameter dinamis form laporan ke state perkara aktif
export function saveDynamicVal(id: string, val: string): void {
  let el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (el) el.value = val;
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    store.databasePerkara[store.activeRecordIndex][id] = val;
    savePerkaraToStorage();
  }
  updateReportLive();
}

// 2. Memperbarui nomor, tanggal, dan status kelengkapan pada tabel menu Laporan
export function refreshReportTableUI(): void {
  let elNumLPP = document.getElementById('table_num_LPP');
  if (elNumLPP) elNumLPP.textContent = getDocNum('LPP');
  let elNumLPF = document.getElementById('table_num_LPF');
  if (elNumLPF) elNumLPF.textContent = getDocNum('LPF');
  let elNumSPLIT = document.getElementById('table_num_SPLIT');
  if (elNumSPLIT) elNumSPLIT.textContent = getDocNum('SPLIT');
  let elNumSPRIN = document.getElementById('table_num_SPRIN_CACAH');
  if (elNumSPRIN) elNumSPRIN.textContent = getDocNum('SPRIN_CACAH');
  let elNumBA = document.getElementById('table_num_BA');
  if (elNumBA) elNumBA.textContent = getDocNum('BA_CACAH');
  let elNumLHP = document.getElementById('table_num_LHP');
  if (elNumLHP) elNumLHP.textContent = getDocNum('LHP');

  let elDateLPP = document.getElementById('table_date_LPP');
  if (elDateLPP) elDateLPP.textContent = formatDate('Tanggal_LPP') !== '-' ? formatDate('Tanggal_LPP') : formatDate('Tanggal_LP_LP_1');
  let elDateLPF = document.getElementById('table_date_LPF');
  if (elDateLPF) elDateLPF.textContent = formatDate('Tanggal_LPF') !== '-' ? formatDate('Tanggal_LPF') : formatDate('Tanggal_LP_LP_1');
  let elDateSPLIT = document.getElementById('table_date_SPLIT');
  if (elDateSPLIT) elDateSPLIT.textContent = formatDate('Tanggal_SPLIT') !== '-' ? formatDate('Tanggal_SPLIT') : formatDate('Tanggal_LP_LP_1');
  let elDateSPRIN = document.getElementById('table_date_SPRIN_CACAH');
  if (elDateSPRIN) elDateSPRIN.textContent = formatDate('Tanggal_Sprin_Cacah') !== '-' ? formatDate('Tanggal_Sprin_Cacah') : formatDate('Tanggal_SBP');
  let elDateBA = document.getElementById('table_date_BA');
  if (elDateBA) elDateBA.textContent = formatDate('Tanggal_BA') !== '-' ? formatDate('Tanggal_BA') : formatDate('Tanggal_SBP');
  let elDateLHP = document.getElementById('table_date_LHP');
  if (elDateLHP) elDateLHP.textContent = formatDate('Tanggal_LHP') !== '-' ? formatDate('Tanggal_LHP') : formatDate('Tanggal_LP_LP_1');

  updateDocumentStatuses();
}

// 3. Menghitung kelengkapan data dokumen Laporan (Badge: SIAP CETAK / BELUM LENGKAP)
export function updateDocumentStatuses(): void {
  let docs = [
    { type: 'LPP', num: getDocNum('No_LPP'), date: getVal('Tanggal_LPP'), extra: getVal('Catatan_LPP') },
    { type: 'LPF', num: getDocNum('No_LPF'), date: getVal('Tanggal_LPF'), extra: getVal('Catatan_LPF') },
    { type: 'SPLIT', num: getDocNum('Nomor_SPLIT'), date: getVal('Tanggal_SPLIT'), extra: getVal('Dasar_SPLIT') },
    { type: 'SPRIN_CACAH', num: getDocNum('No_SPRIN_CACAH'), date: getVal('Tanggal_Sprin_Cacah'), extra: getVal('Komoditi') },
    { type: 'BA', num: getDocNum('Nomor_BA'), date: getVal('Tanggal_BA'), extra: getVal('Hari_Cacah') },
    { type: 'LHP', num: getDocNum('Nomor_LHP'), date: getVal('Tanggal_LHP'), extra: getVal('Jenis_Pelanggaran_Pasal') }
  ];

  docs.forEach(d => {
    let el = document.getElementById(`badge_status_${d.type}`);
    if (!el) return;
    
    let isComplete = d.num && d.num !== '-' && d.date && d.date !== '-' && d.extra && d.extra !== '-';
    if (isComplete) {
      el.className = 'badge-status badge-ready';
      el.textContent = 'SIAP CETAK';
    } else {
      el.className = 'badge-status badge-warning';
      el.textContent = 'BELUM LENGKAP';
    }
  });
}

// 4. Berpindah tab filter/tampilan dokumen Laporan
export function switchDocTab(type: string): void {
  store.currentDoc = type;
  let sel = document.getElementById('docFilterSelect') as HTMLSelectElement;
  if (sel) sel.value = type;

  let tlContainer = document.getElementById('tl_reports');
  if (tlContainer) tlContainer.innerHTML = '';

  renderDynamicInputs(type);
  showReportView(type);
  refreshReportTableUI();
}

// 5. Trigger live update tampilan pratinjau dokumen Laporan saat form diedit
export function updateReportLive(): void {
  let sel = document.getElementById('docFilterSelect') as HTMLSelectElement;
  let activeType = sel ? sel.value : (store.currentDoc || 'LPP');
  refreshReportTableUI();
  showReportView(activeType);
}

// 6. Merender HTML lembar cetak dokumen Laporan ke dalam container preview
export function showReportView(type: string): void {
  let el = document.getElementById('reports');
  if (!el) return;

  if (typeof updatePreviewHeaderUI === 'function') updatePreviewHeaderUI(type);

  if (store.activeRecordIndex < 0) {
    el.innerHTML = `<div class="report"><p>Data Perkara belum divalidasi. Klik "Validasi Data Perkara" untuk mulai mencetak.</p></div>`;
    renderPageSelector(0, 'pageSelectorContainer', 'reports');
    return;
  }

  if (type === 'ALL') {
    let docs = [
      { fn: LPP, type: 'LPP' },
      { fn: LPF, type: 'LPF' },
      { fn: SPLIT, type: 'SPLIT' },
      { fn: SPRIN_CACAH, type: 'SPRIN_CACAH' },
      { fn: BA, type: 'BA' },
      { fn: LHP, type: 'LHP' }
    ];
    el.innerHTML = docs.map(d => d.fn()).join('<div class="pagebreak"></div>');
  } else {
    let f = ({ LPP, LPF, SPLIT, SPRIN_CACAH, BA, LHP } as any)[type];
    if (f) {
      el.innerHTML = f();
    }
  }

  autoPaginateReports('reports');
  applyPageNumbers('reports');
  navigatePreviewPage(0, 'reports');
}

// 7. Merender form input modal dinamis khusus dokumen Laporan
export function renderDynamicInputs(type: string): void {
  let container = document.getElementById('modalDynamicInputBody');
  if (!container) return;

  let recordOptions = store.databasePerkara.map((rec, idx) => 
    `<option value="${idx}" ${idx === store.activeRecordIndex ? 'selected' : ''}>LP-${escText(rec.NoLP_LP_1 || '-')} / SBP-${escText(rec.Nomor_SBP || '-')} (${escText(rec.Nama_Pelaku || 'Tanpa Nama')})</option>`
  ).join('');

  let recordSelectorHtml = `
    <div style="background:#1e293b; border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:14px;">
      <label style="color:var(--primary); margin-bottom:4px; font-weight:700;"><i class="fi fi-rr-folder"></i> Pilih Perkara Aktif (LP & SBP)</label>
      <select id="modalRecordSelector" onchange="store.activeRecordIndex = parseInt(this.value); renderDynamicInputs('${type}'); refreshReportTableUI(); updateReportLive();" style="width:100%; padding:8px; background:#0f172a; color:#fff; border:1px solid var(--border-color); border-radius:4px; font-size:12px; font-weight:600; cursor:pointer;">
        <option value="-1">- Pilih Perkara Aktif -</option>
        ${recordOptions}
      </select>
    </div>
  `;

  if (store.activeRecordIndex < 0) {
    container.innerHTML = recordSelectorHtml + `<p class="small" style="color:#ef4444; text-align:center; padding:10px;">Silakan pilih data perkara terlebih dahulu dari dropdown di atas.</p>`;
    return;
  }

  let autoInfoBanner = `
    <div style="background:#eff6ff; border-left:3px solid #3b82f6; padding:8px 12px; border-radius:4px; margin-bottom:12px; font-size:12px; color:#1e40af; line-height:1.4;">
      <i class="fi fi-rr-info" style="margin-right:4px;"></i> 
      Nomor & tanggal terisi otomatis dari data perkara. Anda tetap dapat mengubahnya secara fleksibel jika diperlukan.
    </div>
  `;

  let activeRec = store.databasePerkara[store.activeRecordIndex];

  if (type === 'LPP') {
    if (!activeRec.No_LPP || activeRec.No_LPP === '-' || activeRec.No_LPP === '') {
      activeRec.No_LPP = generateNextBookingNumber('', 'No_LPP', '', 3);
      savePerkaraToStorage();
    }

    let catLpp = getVal('Catatan_LPP');
    let detBarang = getVal('Detail_Barang_LPP') !== '-' ? getVal('Detail_Barang_LPP') : getVal('Uraian_Barang');
    if (!catLpp || catLpp === '-' || catLpp === '') {
      catLpp = "Laporan penerimaan perkara diterima, segera lanjutkan dengan penelitian formal dan pengumpulan bahan keterangan lebih lanjut.";
    }
    if (!detBarang || detBarang === '') detBarang = '-';

    container.innerHTML = recordSelectorHtml + autoInfoBanner + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LPP (Cukup Angka)</label>
          <input id="input_No_LPP" value="${escText(activeRec.No_LPP)}" oninput="saveDynamicVal('No_LPP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPP</label>
          <input type="date" id="input_Tgl_LPP" value="${activeRec.Tanggal_LPP && activeRec.Tanggal_LPP !== '-' ? activeRec.Tanggal_LPP : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_LPP', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>Catatan Atasan Pembuat LPP</label>
        <textarea id="Catatan_LPP" oninput="saveDynamicVal('Catatan_LPP', this.value)">${escText(catLpp)}</textarea>
      </div>
      <div>
        <label>Detail Uraian Barang LPP</label>
        <textarea id="Detail_Barang_LPP" oninput="saveDynamicVal('Detail_Barang_LPP', this.value)">${escText(detBarang)}</textarea>
      </div>
    `;
  } else if (type === 'LPF') {
    if (!activeRec.No_LPF || activeRec.No_LPF === '-' || activeRec.No_LPF === '') {
      activeRec.No_LPF = generateNextBookingNumber('', 'No_LPF', '', 3);
      savePerkaraToStorage();
    }

    let catLpf = getVal('Catatan_LPF');
    if (!catLpf || catLpf === '-' || catLpf === '') {
      catLpf = "Setuju dengan usulan tim peneliti, segera tindak lanjuti proses penyusunan administrasi penanganan perkara sesuai ketentuan yang berlaku.";
    }

    container.innerHTML = recordSelectorHtml + autoInfoBanner + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LPF (Cukup Angka)</label>
          <input id="input_No_LPF" value="${escText(activeRec.No_LPF)}" oninput="saveDynamicVal('No_LPF', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPF</label>
          <input type="date" id="input_Tgl_LPF" value="${activeRec.Tanggal_LPF && activeRec.Tanggal_LPF !== '-' ? activeRec.Tanggal_LPF : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_LPF', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div>
        <label>Catatan / Disposisi Atasan LPF</label>
        <textarea id="Catatan_LPF" oninput="saveDynamicVal('Catatan_LPF', this.value)">${escText(catLpf)}</textarea>
      </div>
    `;
  } else if (type === 'SPLIT') {
    if (!activeRec.Nomor_SPLIT || activeRec.Nomor_SPLIT === '-' || activeRec.Nomor_SPLIT === '') {
      activeRec.Nomor_SPLIT = generateNextBookingNumber('', 'Nomor_SPLIT', '', 3);
      savePerkaraToStorage();
    }

    let dasarSplit = getVal('Dasar_SPLIT');
    if (!dasarSplit || dasarSplit === '') dasarSplit = '-';

    container.innerHTML = recordSelectorHtml + autoInfoBanner + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPLIT (Cukup Angka)</label>
          <input id="input_Nomor_SPLIT" value="${escText(activeRec.Nomor_SPLIT)}" oninput="saveDynamicVal('Nomor_SPLIT', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPLIT</label>
          <input type="date" id="input_Tgl_SPLIT" value="${activeRec.Tanggal_SPLIT && activeRec.Tanggal_SPLIT !== '-' ? activeRec.Tanggal_SPLIT : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_SPLIT', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div>
        <label>Dasar Tambahan / Catatan SPLIT</label>
        <textarea id="Dasar_SPLIT" oninput="saveDynamicVal('Dasar_SPLIT', this.value)">${escText(dasarSplit)}</textarea>
      </div>
      <h4 style="font-size:11px; margin-top:14px; color:var(--primary);">Daftar Pegawai Khusus Dokumen SPLIT:</h4>
      <div id="splitPegawaiContainer"></div>
      <button type="button" class="btn primary" onclick="addSplitPegawai()" style="margin-top:8px;">
        <i class="fi fi-rr-plus"></i> Tambah Pegawai Ke SPLIT
      </button>
    `;
    renderSplitPegawaiList();
  } else if (type === 'SPRIN_CACAH') {
    let nomorSprinCacahVal = activeRec.No_SPRIN_CACAH || '';
    let tanggalSprinCacahVal = activeRec.Tanggal_Sprin_Cacah && activeRec.Tanggal_Sprin_Cacah !== '-' ? activeRec.Tanggal_Sprin_Cacah : ((document.getElementById('Tanggal_SBP') as HTMLInputElement)?.value || '');

    container.innerHTML = recordSelectorHtml + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPRIN CACAH (Cukup Angka)</label>
          <input id="input_No_SPRIN" value="${escText(nomorSprinCacahVal)}" oninput="saveDynamicVal('No_SPRIN_CACAH', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPRIN CACAH</label>
          <input type="date" id="input_Tgl_SPRIN" value="${tanggalSprinCacahVal}" onchange="saveDynamicVal('Tanggal_Sprin_Cacah', this.value); refreshReportTableUI();">
        </div>
      </div>
      <p class="small" style="margin-top:0;">Daftar petugas pelaksana pencacahan barang hasil penindakan:</p>
      <div id="sprinPegawaiContainer"></div>
      <button type="button" class="btn primary" onclick="addSprinPegawai()" style="margin-top:8px;">
        <i class="fi fi-rr-plus"></i> Tambah Pegawai Ke SPRIN CACAH
      </button>
    `;
    renderSprinPegawaiList();
  } else if (type === 'BA') {
    let nomorBaVal = activeRec.Nomor_BA || '';
    let tanggalBaVal = activeRec.Tanggal_BA && activeRec.Tanggal_BA !== '-' ? activeRec.Tanggal_BA : ((document.getElementById('Tanggal_SBP') as HTMLInputElement)?.value || '');
    
    let hariCacahVal = activeRec.Hari_Cacah || '';
    let teksTanggalVal = activeRec.TeksTanggal || '';

    if (tanggalBaVal && (!hariCacahVal || !teksTanggalVal)) {
      const r = autoGenerateTeksTanggalBA(tanggalBaVal);
      hariCacahVal = hariCacahVal || r.hari.toLowerCase();
      teksTanggalVal = teksTanggalVal || r.teksLengkap.toLowerCase();
      activeRec.Hari_Cacah = hariCacahVal;
      activeRec.TeksTanggal = teksTanggalVal;
      savePerkaraToStorage();
    }

    let items = activeRec.cacahItems || [];
    container.innerHTML = recordSelectorHtml + `
      <div class="grid3" style="margin-bottom:10px;">
        <div>
          <label>Nomor BA (Cukup Angka)</label>
          <input id="input_Nomor_BA" value="${escText(nomorBaVal)}" oninput="saveDynamicVal('Nomor_BA', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal BA Cacah</label>
          <input type="date" id="input_Tgl_BA" value="${tanggalBaVal}" onchange="saveDynamicVal('Tanggal_BA', this.value); if(this.value){ const r = autoGenerateTeksTanggalBA(this.value); saveDynamicVal('Hari_Cacah', r.hari.toLowerCase()); saveDynamicVal('TeksTanggal', r.teksLengkap.toLowerCase()); (document.getElementById('Hari_Cacah') as HTMLInputElement).value = r.hari.toLowerCase(); (document.getElementById('TeksTanggal') as HTMLInputElement).value = r.teksLengkap.toLowerCase(); } refreshReportTableUI();">
        </div>
        <div>
          <label>Hari Cacah (Huruf Kecil)</label>
          <input id="Hari_Cacah" class="lowercase-input" value="${escText(hariCacahVal)}" oninput="saveDynamicVal('Hari_Cacah', this.value.toLowerCase());">
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>Teks Tanggal Lengkap (Huruf Kecil)</label>
        <input id="TeksTanggal" class="lowercase-input" value="${escText(teksTanggalVal)}" oninput="saveDynamicVal('TeksTanggal', this.value.toLowerCase());">
      </div>
      <h4>Isian Tambahan Barang Hasil Pencacahan (BA)</h4>
      <div id="items"></div>
      <button type="button" class="btn secondary" onclick="addItem()" style="margin-top:6px;">
        <i class="fi fi-rr-plus"></i> Tambah Barang Cacah
      </button>
    `;
    renderItems(items);
  } else if (type === 'LHP') {
    let nomorLhpVal = activeRec.Nomor_LHP || '';
    let tanggalLhpVal = activeRec.Tanggal_LHP && activeRec.Tanggal_LHP !== '-' ? activeRec.Tanggal_LHP : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '');
    let penyelesaianVal = activeRec.Penyelesaian_Perkara || activeRec.Alternatif_Penyelesaian_Perkara || '';

    const isChecked = (val: string) => penyelesaianVal.toLowerCase().includes(val.toLowerCase()) ? 'checked' : '';

    container.innerHTML = recordSelectorHtml + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LHP (Cukup Angka)</label>
          <input id="input_Nomor_LHP" value="${escText(nomorLhpVal)}" oninput="saveDynamicVal('Nomor_LHP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LHP</label>
          <input type="date" id="input_Tgl_LHP" value="${tanggalLhpVal}" onchange="saveDynamicVal('Tanggal_LHP', this.value); refreshReportTableUI();">
        </div>
      </div>

      <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.15); border:1px solid var(--border-color, #334155); border-radius:6px;">
          <label style="font-weight:600; font-size:11px; margin-bottom:8px; display:block; text-align:left; text-transform:none; letter-spacing:normal;">Alternatif Penyelesaian Perkara (Centang Pilihan):</label>

          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 6px 12px; margin-bottom:10px;">
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="bdn" ${isChecked('bdn')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Penetapan BDN</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="spsa" ${isChecked('spsa')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Sanksi Denda (SPSA)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="kembali" ${isChecked('kembali')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Barang Dikembalikan</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="reekspor" ${isChecked('reekspor')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Re-Ekspor</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="keluar_sebagian" ${isChecked('keluar_sebagian')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pengeluaran Barang Sebagian</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="ur" ${isChecked('ur')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Ultimum Remedium (Pasal 40B)</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="musnah" ${isChecked('musnah')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pemusnahan (BMN)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="sidik" ${isChecked('sidik')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Naik Penyidikan</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="pelimpahan" ${isChecked('pelimpahan')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pelimpahan / Serah Terima</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="batal_dok" ${isChecked('batal_dok')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pembatalan Dokumen</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="henti" ${isChecked('henti')} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Tidak Ditemukan Pelanggaran</span>
            </label>
          </div>

          <textarea id="input_Penyelesaian_Perkara" rows="5" class="form-control" style="width:100%; font-size:12px; line-height:1.5; resize:vertical;" placeholder="Uraian otomatis akan terbentuk di sini berdasarkan opsi yang dicentang..." oninput="saveDynamicVal('Penyelesaian_Perkara', this.value); saveDynamicVal('Alternatif_Penyelesaian_Perkara', this.value);">${escText(penyelesaianVal)}</textarea>
      </div>
    `;
  }
}

// 8. Logika otomatis narasi Alternatif Penyelesaian Perkara pada Dokumen LHP
export function syncUraianKombinasiLHP(): void {
  const active: any = {};
  document.querySelectorAll('.chk-lhp-opsi:checked').forEach((c: any) => {
    active[c.value] = true;
  });

  let hasil: string[] = [];

  if (active.bdn && active.spsa && !active.kembali) {
    hasil.push("Terhadap barang hasil penindakan yang melanggar ketentuan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk diproses menjadi Barang Milik Negara (BMN).");
    hasil.push("Terhadap pihak yang bertanggung jawab dikenakan sanksi administrasi berupa denda dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA).");
  }
  else if (active.bdn && active.kembali) {
    hasil.push("Terhadap barang bukti hasil penindakan yang terbukti melanggar ketentuan perundang-undangan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk selanjutnya diusulkan menjadi Barang Milik Negara (BMN).");
    hasil.push("Terhadap barang dan/atau sarana pengangkut yang telah diteliti dan tidak terbukti melanggar ketentuan peraturan perundang-undangan dikembalikan kepada pemilik yang sah.");
    if (active.spsa) {
      hasil.push("Terhadap pelanggaran administratif yang timbul dikenakan sanksi administrasi berupa denda (SPSA).");
    }
  }
  else if (active.spsa && active.kembali && !active.bdn) {
    hasil.push("Terhadap pihak yang bertanggung jawab dikenakan sanksi administrasi berupa denda dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA) dan penagihan pungutan negara.");
    hasil.push("Terhadap barang hasil penindakan dapat disetujui pengeluarannya / dikembalikan kepada pemilik setelah seluruh kewajiban pungutan negara dan sanksi denda (SPSA) dilunasi.");
  }
  else if (active.ur || (active.ur && active.musnah)) {
    hasil.push("Memberikan rekomendasi penyelesaian perkara melalui asas Ultimum Remedium (Pasal 40B UU Cukai jo. UU HPP) dengan mewajibkan pembayaran sanksi denda sebesar 4 (empat) kali nilai cukai.");
    hasil.push("Terhadap Barang Kena Cukai (BKC) hasil penindakan dirampas untuk negara, ditetapkan sebagai Barang Milik Negara (BMN), dan selanjutnya diusulkan untuk dilakukan pemusnahan.");
    if (active.sidik) {
      hasil.push("Apabila sanksi denda tidak diselesaikan dalam jangka waktu yang ditentukan, proses perkara segera ditingkatkan ke tahap Penyidikan.");
    }
  }
  else if (active.reekspor && active.keluar_sebagian) {
    hasil.push("Terhadap barang impor yang terkena ketentuan larangan dan pembatasan (lartas) direkomendasikan untuk diekspor kembali (re-ekspor) ke negara asal dalam batas waktu yang ditentukan.");
    hasil.push("Terhadap barang impor yang telah memenuhi dokumen perizinan disetujui untuk dilakukan pengeluaran barang sebagian (parsial release).");
    if (active.bdn) {
      hasil.push("Apabila barang yang dire-ekspor tidak dikeluarkan dalam batas waktu yang ditetapkan, maka diproses penetapannya menjadi Barang yang Dikuasai Negara (BDN).");
    }
  }
  else {
    if (active.bdn) hasil.push("Terhadap seluruh barang hasil penindakan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk diproses pengadministrasiannya menjadi BMN.");
    if (active.spsa) hasil.push("Dikenakan sanksi administrasi berupa denda sesuai ketentuan dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA).");
    if (active.kembali) hasil.push("Terhadap barang hasil penindakan yang telah memenuhi ketentuan peraturan perundang-undangan dikembalikan kepada pemilik yang sah.");
    if (active.reekspor) hasil.push("Terhadap barang impor yang tidak memenuhi ketentuan perizinan direkomendasikan untuk diekspor kembali (re-ekspor) ke negara asal.");
    if (active.keluar_sebagian) hasil.push("Terhadap barang impor yang telah memenuhi persyaratan disetujui untuk dilakukan pengeluaran barang sebagian.");
    if (active.musnah) hasil.push("Terhadap barang hasil penindakan yang tidak laik atau dilarang diusulkan untuk dilakukan pemusnahan sesuai prosedur yang berlaku.");
    if (active.sidik) hasil.push("Telah terpenuhi bukti permulaan yang cukup sehingga penanganan perkara direkomendasikan untuk Ditingkatkan ke Tahap Penyidikan (menerbitkan SPRIN-DIK dan SPDP).");
    if (active.pelimpahan) hasil.push("Melakukan serah terima berkas perkara beserta barang bukti kepada instansi yang berwenang.");
    if (active.batal_dok) hasil.push("Dilakukan pembatalan terhadap dokumen pemberitahuan pabean sesuai tata laksana kepabeanan yang berlaku.");
    if (active.henti) hasil.push("Proses penelitian dihentikan karena tidak ditemukan bukti permulaan yang cukup adanya pelanggaran peraturan perundang-undangan.");
  }

  const textHasil = hasil.map((txt, idx) => `${idx + 1}. ${txt}`).join('\n\n');

  const textarea = document.getElementById('input_Penyelesaian_Perkara') as HTMLTextAreaElement;
  if (textarea) {
    textarea.value = textHasil;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof saveDynamicVal === 'function') {
      saveDynamicVal('Penyelesaian_Perkara', textHasil);
      saveDynamicVal('Alternatif_Penyelesaian_Perkara', textHasil);
    }
  }
}

// 9. Sub-item Barang pada Berita Acara Pencacahan (BA)
export function renderItems(items: any[]): void {
  let c = document.getElementById('items');
  if (!c) return;
  c.innerHTML = items.map((x, i) => `
    <div class="item">
      <div class="grid5">
        <div><label>Komoditi</label><input value="${escText(x.komoditi || '')}" data-i="${i}" data-k="komoditi"></div>
        <div><label>Uraian Barang</label><input value="${escText(x.uraian || '')}" data-i="${i}" data-k="uraian"></div>
        <div><label>Jumlah</label><input value="${escText(x.jumlah || '')}" data-i="${i}" data-k="jumlah"></div>
        <div><label>Kondisi</label><input value="${escText(x.kondisi || '')}" data-i="${i}" data-k="kondisi"></div>
        <div><label>Keterangan</label><input value="${escText(x.keterangan || '')}" data-i="${i}" data-k="keterangan"></div>
      </div>
      <button type="button" class="btn danger" onclick="delItem(${i})" style="margin-top:6px;">
        <i class="fi fi-rr-trash"></i> Hapus Barang
      </button>
    </div>
  `).join('');

  c.querySelectorAll('input[data-i]').forEach((inp: any) => {
    inp.oninput = () => {
      if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
        let rec = store.databasePerkara[store.activeRecordIndex];
        if (!rec.cacahItems) rec.cacahItems = [];
        rec.cacahItems[inp.dataset.i][inp.dataset.k] = inp.value;
        savePerkaraToStorage();
        updateReportLive();
      }
    };
  });
}

export function addItem(): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    let rec = store.databasePerkara[store.activeRecordIndex];
    if (!rec.cacahItems) rec.cacahItems = [];
    rec.cacahItems.push({ komoditi: '', uraian: '', jumlah: '', kondisi: '', keterangan: '', asal: '-' });
    savePerkaraToStorage();
    renderItems(rec.cacahItems);
    updateReportLive();
  }
}

export function delItem(i: number): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    let rec = store.databasePerkara[store.activeRecordIndex];
    if (!rec.cacahItems) rec.cacahItems = [];
    rec.cacahItems.splice(i, 1);
    savePerkaraToStorage();
    renderItems(rec.cacahItems);
    updateReportLive();
  }
}

// 10. Daftar Pegawai Khusus Surat Perintah Penelitian (SPLIT)
export function addSplitPegawai(): void {
  if (store.activeRecordIndex < 0) return;
  let rec = store.databasePerkara[store.activeRecordIndex];
  if (!rec.splitPegawaiList || rec.splitPegawaiList.length === 0) {
    rec.splitPegawaiList = [
      { nama: getVal('form_nama_seksi'), nip: getVal('form_nip_seksi'), jabatan: getVal('form_jabatan_seksi') || 'Kepala Seksi Penyidikan' },
      { nama: getVal('form_ketua_tim'), nip: getVal('form_nip_ketua_tim'), jabatan: getVal('form_jabatan_ketua_tim') || 'Ketua Tim Peneliti' },
      { nama: getVal('form_petugas_lpf'), nip: getVal('form_nip_petugas_lpf'), jabatan: getVal('form_jabatan_petugas_lpf') || 'Petugas LPF' },
      { nama: getVal('form_pembuat_lpp'), nip: getVal('form_nip_pembuat_lpp'), jabatan: getVal('form_jabatan_pembuat_lpp') || 'Petugas LPP' }
    ];
  }
  rec.splitPegawaiList.push({ nama: '', nip: '', jabatan: 'Anggota Tim Peneliti' });
  savePerkaraToStorage();
  renderSplitPegawaiList();
  updateReportLive();
}

export function renderSplitPegawaiList(): void {
  let container = document.getElementById('splitPegawaiContainer');
  if (!container || store.activeRecordIndex < 0) return;

  let rec = store.databasePerkara[store.activeRecordIndex];
  if (!rec.splitPegawaiList || rec.splitPegawaiList.length === 0) {
    rec.splitPegawaiList = [
      { nama: getVal('form_nama_seksi'), nip: getVal('form_nip_seksi'), jabatan: getVal('form_jabatan_seksi') || 'Kepala Seksi Penyidikan' },
      { nama: getVal('form_ketua_tim'), nip: getVal('form_nip_ketua_tim'), jabatan: getVal('form_jabatan_ketua_tim') || 'Ketua Tim Peneliti' },
      { nama: getVal('form_petugas_lpf'), nip: getVal('form_nip_petugas_lpf'), jabatan: getVal('form_jabatan_petugas_lpf') || 'Petugas LPF' },
      { nama: getVal('form_pembuat_lpp'), nip: getVal('form_nip_pembuat_lpp'), jabatan: getVal('form_jabatan_pembuat_lpp') || 'Petugas LPP' }
    ];
  }

  let list = rec.splitPegawaiList;
  const allJabatan = Array.from(new Set([...MASTER_JABATAN_DINAS, ...MASTER_JABATAN_TIM_PENELITI]));

  container.innerHTML = list.map((p: any, i: number) => `
    <div class="item">
      <div class="grid3">
        <div><label>Nama Pegawai #${i+1}</label><input value="${escText(p.nama || '')}" data-pi="${i}" data-pk="nama"></div>
        <div><label>NIP Pegawai #${i+1}</label><input value="${escText(p.nip || '')}" data-pi="${i}" data-pk="nip"></div>
        <div>
          <label>Jabatan Pegawai #${i+1}</label>
          <select data-pi="${i}" data-pk="jabatan" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${renderMasterOptions(allJabatan, p.jabatan || 'Anggota Tim Peneliti', '- Pilih Jabatan -')}
          </select>
        </div>
      </div>
      <button type="button" class="btn danger" onclick="delSplitPegawai(${i})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> HAPUS PEGAWAI
      </button>
    </div>
  `).join('');

  container.querySelectorAll('input[data-pi], select[data-pi]').forEach((inp: any) => {
    inp.onchange = inp.oninput = () => {
      if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
        let r = store.databasePerkara[store.activeRecordIndex];
        if (!r.splitPegawaiList) r.splitPegawaiList = [];
        r.splitPegawaiList[inp.dataset.pi][inp.dataset.pk] = inp.value;
        savePerkaraToStorage();
        updateReportLive();
      }
    };
  });
}

export function delSplitPegawai(i: number): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    let rec = store.databasePerkara[store.activeRecordIndex];
    if (rec.splitPegawaiList) {
      rec.splitPegawaiList.splice(i, 1);
      savePerkaraToStorage();
      renderSplitPegawaiList();
      updateReportLive();
    }
  }
}

// 11. Daftar Petugas Pelaksana Pencacahan (SPRIN CACAH)
export function addSprinPegawai(): void {
  if (store.activeRecordIndex < 0) return;
  let rec = store.databasePerkara[store.activeRecordIndex];
  if (!rec.sprinPegawaiList || rec.sprinPegawaiList.length === 0) {
    rec.sprinPegawaiList = [
      { nama: getVal('form_ketua_tim'), nip: getVal('form_nip_ketua_tim'), pangkat: getVal('form_gol_ketua_tim'), jabatan: getVal('form_jabatan_ketua_tim') || 'Ketua Tim Peneliti' },
      { nama: getVal('form_pembuat_lpp'), nip: getVal('form_nip_pembuat_lpp'), pangkat: getVal('form_gol_pembuat_lpp'), jabatan: getVal('form_jabatan_pembuat_lpp') || 'Petugas LPP' },
      { nama: getVal('form_petugas_lpf'), nip: getVal('form_nip_petugas_lpf'), pangkat: getVal('form_gol_petugas_lpf'), jabatan: getVal('form_jabatan_petugas_lpf') || 'Petugas LPF' },
      { nama: getVal('form_indak_1'), nip: getVal('form_nip_indak_1'), pangkat: getVal('form_gol_indak_1'), jabatan: getVal('form_jabatan_indak_1') || 'Petugas Penindakan 1' },
      { nama: getVal('form_indak_2'), nip: getVal('form_nip_indak_2'), pangkat: getVal('form_gol_indak_2'), jabatan: getVal('form_jabatan_indak_2') || 'Petugas Penindakan 2' },
      { nama: getVal('form_indak_lainnya'), nip: getVal('form_nip_indak_lainnya'), pangkat: getVal('form_gol_indak_lainnya'), jabatan: getVal('form_jabatan_indak_lainnya') || 'Petugas Penindakan 3' }
    ];
  }
  rec.sprinPegawaiList.push({ nama: '', nip: '', pangkat: '', jabatan: 'Petugas Pencacah' });
  savePerkaraToStorage();
  renderSprinPegawaiList();
  updateReportLive();
}

export function renderSprinPegawaiList(): void {
  let container = document.getElementById('sprinPegawaiContainer');
  if (!container || store.activeRecordIndex < 0) return;

  let rec = store.databasePerkara[store.activeRecordIndex];
  if (!rec.sprinPegawaiList || rec.sprinPegawaiList.length === 0) {
    rec.sprinPegawaiList = [
      { nama: getVal('form_ketua_tim'), nip: getVal('form_nip_ketua_tim'), pangkat: getVal('form_gol_ketua_tim'), jabatan: getVal('form_jabatan_ketua_tim') || 'Ketua Tim Peneliti' },
      { nama: getVal('form_pembuat_lpp'), nip: getVal('form_nip_pembuat_lpp'), pangkat: getVal('form_gol_pembuat_lpp'), jabatan: getVal('form_jabatan_pembuat_lpp') || 'Petugas LPP' },
      { nama: getVal('form_petugas_lpf'), nip: getVal('form_nip_petugas_lpf'), pangkat: getVal('form_gol_petugas_lpf'), jabatan: getVal('form_jabatan_petugas_lpf') || 'Petugas LPF' },
      { nama: getVal('form_indak_1'), nip: getVal('form_nip_indak_1'), pangkat: getVal('form_gol_indak_1'), jabatan: getVal('form_jabatan_indak_1') || 'Petugas Penindakan 1' },
      { nama: getVal('form_indak_2'), nip: getVal('form_nip_indak_2'), pangkat: getVal('form_gol_indak_2'), jabatan: getVal('form_jabatan_indak_2') || 'Petugas Penindakan 2' },
      { nama: getVal('form_indak_lainnya'), nip: getVal('form_nip_indak_lainnya'), pangkat: getVal('form_gol_indak_lainnya'), jabatan: getVal('form_jabatan_indak_lainnya') || 'Petugas Penindakan 3' }
    ];
  }

  let list = rec.sprinPegawaiList;
  const allJabatan = Array.from(new Set([...MASTER_JABATAN_DINAS, ...MASTER_JABATAN_TIM_PENELITI]));

  container.innerHTML = list.map((p: any, i: number) => `
    <div class="item">
      <div class="grid4">
        <div><label>Nama Pegawai #${i + 1}</label><input value="${escText(p.nama || '')}" data-spi="${i}" data-spk="nama"></div>
        <div><label>NIP Pegawai #${i + 1}</label><input value="${escText(p.nip || '')}" data-spi="${i}" data-spk="nip"></div>
        <div>
          <label>Pangkat/Gol. #${i + 1}</label>
          <select data-spi="${i}" data-spk="pangkat" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${renderMasterOptions(MASTER_GOLONGAN_PANGKAT, p.pangkat || '', '- Pilih Golongan -')}
          </select>
        </div>
        <div>
          <label>Jabatan #${i + 1}</label>
          <select data-spi="${i}" data-spk="jabatan" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${renderMasterOptions(allJabatan, p.jabatan || 'Petugas Pencacah', '- Pilih Jabatan -')}
          </select>
        </div>
      </div>
      <button type="button" class="btn danger" onclick="delSprinPegawai(${i})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> Hapus Pegawai
      </button>
    </div>
  `).join('');

  container.querySelectorAll('input[data-spi], select[data-spi]').forEach((inp: any) => {
    inp.onchange = inp.oninput = () => {
      if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
        let r = store.databasePerkara[store.activeRecordIndex];
        if (!r.sprinPegawaiList) r.sprinPegawaiList = [];
        r.sprinPegawaiList[inp.dataset.spi][inp.dataset.spk] = inp.value;
        savePerkaraToStorage();
        updateReportLive();
      }
    };
  });
}

export function delSprinPegawai(i: number): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    let rec = store.databasePerkara[store.activeRecordIndex];
    if (rec.sprinPegawaiList) {
      rec.sprinPegawaiList.splice(i, 1);
      savePerkaraToStorage();
      renderSprinPegawaiList();
      updateReportLive();
    }
  }
}


/* ============================================================================
 * [BAGIAN B] KONTROLLER & FORM EDITOR: MENU TINDAK LANJUT (EKSEKUSI LHP)
 * ----------------------------------------------------------------------------
 * Pengelolaan state, tabel status dokumen, form modal dinamis, dan render preview
 * Dokumen: BAST_PEMILIK, BA_SEGEL, KEP_BDN, SPSA, BAST_LIMPAH
 * ============================================================================ */

// 1. Menyimpan nilai parameter dinamis form tindak lanjut ke state perkara aktif
export function saveDynamicValTL(key: string, val: string): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    store.databasePerkara[store.activeRecordIndex][key] = val;
    savePerkaraToStorage();
    refreshTLTableUI();
  }
}

// 2. Memperbarui nomor, tanggal, dan status kelengkapan pada tabel menu Tindak Lanjut
export function refreshTLTableUI(): void {
  if (store.activeRecordIndex < 0) return;
  let rec = store.databasePerkara[store.activeRecordIndex];
  
  let b1 = document.getElementById('tl_table_num_BAST_PEMILIK');
  if (b1) b1.textContent = getTLNumFormat('BAST_PEMILIK');
  let bd1 = document.getElementById('tl_table_date_BAST_PEMILIK');
  if (bd1) bd1.textContent = formatDateIndo(rec.TL_Tanggal_Surat || rec.Tanggal_LP_LP_1);

  let b2 = document.getElementById('tl_table_num_BA_SEGEL');
  if (b2) b2.textContent = getTLNumFormat('BA_SEGEL');
  let bd2 = document.getElementById('tl_table_date_BA_SEGEL');
  if (bd2) bd2.textContent = formatDateIndo(rec.TL_Tanggal_Surat || rec.Tanggal_LP_LP_1);

  let b3 = document.getElementById('tl_table_num_KEP_BDN');
  if (b3) b3.textContent = getTLNumFormat('KEP_BDN');
  let bd3 = document.getElementById('tl_table_date_KEP_BDN');
  if (bd3) bd3.textContent = formatDateIndo(rec.KEP_Tanggal_ND || rec.Tanggal_LP_LP_1);

  let b4 = document.getElementById('tl_table_num_SPSA');
  if (b4) b4.textContent = getTLNumFormat('SPSA');
  let bd4 = document.getElementById('tl_table_date_SPSA');
  if (bd4) bd4.textContent = formatDateIndo(rec.SPSA_Tanggal || rec.Tanggal_LP_LP_1);

  let b5 = document.getElementById('tl_table_num_BAST_LIMPAH');
  if (b5) b5.textContent = getTLNumFormat('BAST_LIMPAH');
  let bd5 = document.getElementById('tl_table_date_BAST_LIMPAH');
  if (bd5) bd5.textContent = formatDateIndo(rec.Limpah_Tanggal || rec.Tanggal_LP_LP_1);

  updateTLDocumentStatuses();
  renderTLFormSection(store.currentTLDoc);
  showTLReportView(store.currentTLDoc);
}

// 3. Menghitung kelengkapan data dokumen Tindak Lanjut (Badge: SIAP CETAK / BELUM LENGKAP)
export function updateTLDocumentStatuses(): void {
  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) return;
  let rec = store.databasePerkara[store.activeRecordIndex];

  let docsTL = [
    {
      type: 'BAST_PEMILIK',
      num: getTLNumFormat('BAST_PEMILIK'),
      date: rec.TL_Tanggal_Surat || rec.Tanggal_LP_LP_1,
      extra: rec.TL_Hari_BAST && rec.TL_Tgl_Huruf_BAST
    },
    {
      type: 'BA_SEGEL',
      num: getTLNumFormat('BA_SEGEL'),
      date: rec.TL_Tanggal_Surat || rec.Tanggal_LP_LP_1,
      extra: rec.TL_Segel_No_SPLI && rec.TL_Segel_Hari
    },
    {
      type: 'KEP_BDN',
      num: getTLNumFormat('KEP_BDN'),
      date: rec.KEP_Tanggal_ND || rec.Tanggal_LP_LP_1,
      extra: rec.KEP_Nomor_ND && rec.Kepala_Kantor
    },
    {
      type: 'SPSA',
      num: getTLNumFormat('SPSA'),
      date: rec.SPSA_Tanggal || rec.Tanggal_LP_LP_1,
      extra: rec.SPSA_Denda && rec.SPSA_Pasal_Pelanggaran
    },
    {
      type: 'BAST_LIMPAH',
      num: getTLNumFormat('BAST_LIMPAH'),
      date: rec.Limpah_Tanggal || rec.Tanggal_LP_LP_1,
      extra: rec.Instansi_Penerima && rec.Limpah_Pejabat_Penerima
    }
  ];

  docsTL.forEach(d => {
    let el = document.getElementById(`badge_status_${d.type}`);
    if (!el) return;

    let isComplete = d.num && d.num !== '-' && d.date && d.date !== '-' && d.extra && d.extra !== '-';
    if (isComplete) {
      el.className = 'badge-status badge-ready';
      el.textContent = 'SIAP CETAK';
    } else {
      el.className = 'badge-status badge-warning';
      el.textContent = 'BELUM LENGKAP';
    }
  });
}

// 4. Berpindah tab filter/tampilan dokumen Tindak Lanjut
export function switchTLDocTab(type: string): void {
  store.currentTLDoc = type;
  let sel = document.getElementById('tlDocFilterSelect') as HTMLSelectElement;
  if (sel) sel.value = type;

  let repContainer = document.getElementById('reports');
  if (repContainer) repContainer.innerHTML = '';

  updateTLPreviewHeaderUI(type);
  renderTLFormSection(type);
  showTLReportView(type);
}

// 5. Merender HTML lembar cetak dokumen Tindak Lanjut ke container preview
export function showTLReportView(type: string): void {
  let el = document.getElementById('tl_reports');
  if (!el) return;

  if (typeof updateTLPreviewHeaderUI === 'function') updateTLPreviewHeaderUI(type);

  if (store.activeRecordIndex < 0) {
    el.innerHTML = `<div class="report"><p>Silakan validasi SBP & LP untuk mencetak Dokumen Tindak Lanjut.</p></div>`;
    renderPageSelector(0, 'tlPageSelectorContainer', 'tl_reports');
    return;
  }

  if (type === 'ALL') {
    let docsTL = [
      { fn: BAST_PEMILIK, type: 'BAST_PEMILIK' },
      { fn: BA_SEGEL, type: 'BA_SEGEL' },
      { fn: KEP_BDN, type: 'KEP_BDN' },
      { fn: SPSA, type: 'SPSA' },
      { fn: BAST_LIMPAH, type: 'BAST_LIMPAH' }
    ];
    el.innerHTML = docsTL.map(d => d.fn()).join('<div class="pagebreak"></div>');
  } else {
    let f = ({ BAST_PEMILIK, BA_SEGEL, KEP_BDN, SPSA, BAST_LIMPAH } as any)[type];
    if (f) {
      el.innerHTML = f();
    }
  }

  autoPaginateReports('tl_reports');
  applyPageNumbers('tl_reports');
  navigatePreviewPage(0, 'tl_reports');
}

// 6. Merender form input modal dinamis khusus dokumen Tindak Lanjut
export function renderTLFormSection(type: string): void {
  let container = document.getElementById('modalDynamicInputBodyTL');
  if (!container) return;
  if (store.activeRecordIndex < 0) {
    container.innerHTML = `<h4>PILIH PERKARA DULU</h4><p class="small">Silakan gunakan tombol Validasi Data LHP untuk mulai.</p>`;
    return;
  }
  let rec = store.databasePerkara[store.activeRecordIndex];

  if (type === 'BAST_PEMILIK') {
    if (!rec.TL_BAST_SarkutList) {
      rec.TL_BAST_SarkutList = [{ jenis: rec.TL_Nama_Sarkut || rec.Pengangkut || '-', nopol: rec.TL_No_Reg_Sarkut || '-' }];
    }
    
    // Inisialisasi Barang Terpusat
    if (!rec.TL_BAST_BarangList) {
      let jmlKoli = rec.Jumlah_Koli || '1';
      let jenisKoli = rec.Jenis_Koli || 'koli';
      let komoditi = rec.Komoditi || rec.Uraian_Barang || 'Barang Bukti';
      let isFcl = !!(rec.No_Kontainer && rec.No_Kontainer !== '-');
      let jnsKemasan = isFcl ? 'FCL' : (rec.Jenis_Kemasan || 'LCL');

      let defKemasan = generateKemasanTeks({
        jumlahKemasan: jmlKoli,
        jenisKemasan: jnsKemasan,
        nomorKontainer: isFcl ? `${rec.No_Kontainer}${rec.Ukuran_Kontainer ? ' / ' + rec.Ukuran_Kontainer : ''}` : ''
      });

      let defBarang = generateUraianBarangTeks({
        jumlah: jmlKoli,
        satuan: jenisKoli,
        namaBarang: komoditi,
        akhiranTipe: ''
      });

      rec.TL_BAST_BarangList = [{ 
        jumlahKemasan: jmlKoli,
        jenisKemasan: jnsKemasan,
        nomorKontainer: rec.No_Kontainer || '',
        kemasan: defKemasan,
        jumlahBarang: jmlKoli,
        satuanBarang: jenisKoli,
        namaBarang: komoditi,
        tambahanAkhiran: '',
        uraian: defBarang 
      }];
    }

    // Inisialisasi Dokumen Terpusat
    if (!rec.TL_BAST_DokumenList) {
      let jns = rec.Dokumen_Pemberitahuan || 'BC 2.0';
      let no = rec.Nomor_Dok_Pemberitahuan || '-';
      let tglRaw = rec.Tanggal_Dokumen_Pemberitahuan || '';
      
      rec.TL_BAST_DokumenList = [{
        jenisDok: jns,
        nomorDok: no,
        tanggalDok: tglRaw,
        uraian: generateTeksDokumenEksPabean(jns, no, tglRaw)
      }];
    }

    if (!rec.TL_BAST_OrangList) {
      rec.TL_BAST_OrangList = [{ nama: '-', identitas: '-' }];
    }

    (window as any).updateBastDokumenOtomatis = function(idx: number) {
      let d = rec.TL_BAST_DokumenList[idx];
      if (!d) return;

      d.uraian = generateTeksDokumenEksPabean(
        d.jenisDok || 'BC 2.0',
        d.nomorDok || '-',
        d.tanggalDok || ''
      );

      savePerkaraToStorage();
      showTLReportView('BAST_PEMILIK');
    };

    let selectedRangka = rec.TL_Rangka_Penyerahan || MASTER_RANGKA_PENYERAHAN[0];
    let isManualRangka = !MASTER_RANGKA_PENYERAHAN.includes(selectedRangka as any);

    (window as any).onTanggalBastChange = function(val: string) {
      saveDynamicValTL('TL_Tanggal_Surat', val);
      if (!val) return;
      const res = autoGenerateTeksTanggalBA(val);
      saveDynamicValTL('TL_Hari_BAST', res.hari);
      saveDynamicValTL('TL_Tgl_Huruf_BAST', res.teksLengkap);
      let elHari = document.getElementById('input_TL_Hari_BAST') as HTMLInputElement;
      if (elHari) elHari.value = res.hari;
      let elTeks = document.getElementById('input_TL_Tgl_Huruf_BAST') as HTMLInputElement;
      if (elTeks) elTeks.value = res.teksLengkap;
      showTLReportView('BAST_PEMILIK');
    };

    (window as any).addBastItem = function(category: string) {
      if (category === 'sarkut') rec.TL_BAST_SarkutList.push({ jenis: '', nopol: '' });
      if (category === 'barang') rec.TL_BAST_BarangList.push({ kemasan: '', uraian: '', jumlahKemasan: '', jenisKemasan: 'LCL', nomorKontainer: '', jumlahBarang: '', satuanBarang: 'koli', namaBarang: '', tambahanAkhiran: '' });
      if (category === 'dokumen') rec.TL_BAST_DokumenList.push({ jenisDok: 'BC 2.0', nomorDok: '', tanggalDok: '', uraian: '' });
      if (category === 'orang') rec.TL_BAST_OrangList.push({ nama: '', identitas: '' });
      savePerkaraToStorage();
      renderTLFormSection('BAST_PEMILIK');
      showTLReportView('BAST_PEMILIK');
    };

    (window as any).delBastItem = function(category: string, idx: number) {
      if (category === 'sarkut' && rec.TL_BAST_SarkutList.length > 1) rec.TL_BAST_SarkutList.splice(idx, 1);
      if (category === 'barang' && rec.TL_BAST_BarangList.length > 1) rec.TL_BAST_BarangList.splice(idx, 1);
      if (category === 'dokumen' && rec.TL_BAST_DokumenList.length > 1) rec.TL_BAST_DokumenList.splice(idx, 1);
      if (category === 'orang' && rec.TL_BAST_OrangList.length > 1) rec.TL_BAST_OrangList.splice(idx, 1);
      savePerkaraToStorage();
      renderTLFormSection('BAST_PEMILIK');
      showTLReportView('BAST_PEMILIK');
    };

    // Fungsi otomatis generator teks kemasan dan uraian barang BAST
    (window as any).updateBastBarangOtomatis = function(idx: number) {
      let b = rec.TL_BAST_BarangList[idx];
      if (!b) return;

      b.kemasan = generateKemasanTeks({
        jumlahKemasan: b.jumlahKemasan,
        jenisKemasan: b.jenisKemasan,
        nomorKontainer: b.nomorKontainer
      });

      b.uraian = generateUraianBarangTeks({
        jumlah: b.jumlahBarang,
        satuan: b.satuanBarang,
        namaBarang: b.namaBarang,
        akhiranTipe: b.tambahanAkhiran
      });

      savePerkaraToStorage();
      showTLReportView('BAST_PEMILIK');
    };

    const toLetter = (i: number) => String.fromCharCode(97 + i) + '.';

    container.innerHTML = `
      <!-- 2. BARANG -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">2. BARANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('barang')" style="padding:2px 8px; font-size:11px;">+ Tambah Barang</button>
        </div>
        ${rec.TL_BAST_BarangList.map(function(b: any, idx: number) {
          var isFcl = b.jenisKemasan && (b.jenisKemasan.toUpperCase().includes('FCL') || b.jenisKemasan.toLowerCase().includes('peti kemas'));

          return `
            <div style="background:#1e293b; padding:10px; border-radius:6px; margin-bottom:8px; border:1px solid #334155;">
              <div style="font-weight:bold; font-size:11px; margin-bottom:6px; color:var(--primary); display:flex; justify-content:space-between;">
                <span>${toLetter(idx)} Barang #${idx+1}</span>${rec.TL_BAST_BarangList.length > 1 ? `<button type="button" class="btn danger" onclick="delBastItem('barang', ${idx})" style="padding:2px 8px; font-size:10px;">Hapus Barang Ini</button>` : ''}
              </div>

              <!-- Jml/Kemasan -->
              <div style="background:rgba(15, 23, 42, 0.6); padding:8px; border-radius:4px; border:1px solid #334155; margin-bottom:8px;">
                <div style="font-size:10px; font-weight:700; color:#fbbf24; margin-bottom:4px; text-transform:uppercase;">Jml/Kemasan</div>
                <div class="grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:6px;">
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jumlah Kemasan</label>
                    <input value="${escText(b.jumlahKemasan || '')}" placeholder="Contoh: 1" oninput="rec.TL_BAST_BarangList[${idx}].jumlahKemasan = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  </div>
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jenis Kemasan</label>
                    <select onchange="rec.TL_BAST_BarangList[${idx}].jenisKemasan = this.value; renderTLFormSection('BAST_PEMILIK'); updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                      ${renderMasterOptions(MASTER_JENIS_KEMASAN, b.jenisKemasan || '', '- Pilih Kemasan -')}
                    </select>
                  </div>
                </div>

                ${isFcl ? `
                  <div style="margin-bottom:6px;">
                    <label style="font-size:10px; color:#93c5fd;">Nomor Peti Kemas / Kontainer</label>
                    <input value="${escText(b.nomorKontainer || '')}" placeholder="Contoh: OOCL 234567 / 40 feet" oninput="rec.TL_BAST_BarangList[${idx}].nomorKontainer = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #3b82f6; border-radius:4px; font-size:11px;">
                  </div>
                ` : ''}

                <div style="margin-top:6px;">
                  <label style="font-size:10px; color:#93c5fd;">Preview Jml/Kemasan</label>
                  <input value="${escText(b.kemasan || '')}" oninput="rec.TL_BAST_BarangList[${idx}].kemasan = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#93c5fd; border:1px solid #3b82f6; border-radius:4px; font-size:11px;">
                </div>
              </div>

              <!-- Jumlah/Jenis Barang -->
              <div style="background:rgba(15, 23, 42, 0.6); padding:8px; border-radius:4px; border:1px solid #334155; margin-bottom:8px;">
                <div style="font-size:10px; font-weight:700; color:#fbbf24; margin-bottom:4px; text-transform:uppercase;">Jumlah/Jenis Barang</div>
                <div class="grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:6px;">
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jumlah Barang</label>
                    <input value="${escText(b.jumlahBarang || '')}" placeholder="Contoh: 12" oninput="rec.TL_BAST_BarangList[${idx}].jumlahBarang = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  </div>
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jenis Koli / Satuan</label>
                    <select onchange="rec.TL_BAST_BarangList[${idx}].satuanBarang = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                      ${renderMasterOptions(MASTER_SATUAN_KOLI, b.satuanBarang || '', '- Pilih Satuan -')}
                    </select>
                  </div>
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#94a3b8;">Nama / Komoditi Barang</label>
                  <input value="${escText(b.namaBarang || '')}" placeholder="Contoh: Sepatu Olahraga Pria" oninput="rec.TL_BAST_BarangList[${idx}].namaBarang = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#cbd5e1;">Pilihan Tambahan Akhiran</label>
                  <select onchange="rec.TL_BAST_BarangList[${idx}].tambahanAkhiran = this.value; updateBastBarangOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                    <option value="" ${!b.tambahanAkhiran ? 'selected' : ''}>- Tanpa Tambahan Akhiran -</option>
                    ${MASTER_AKHIRAN_BARANG.map(a => `<option value="${a.value}" ${b.tambahanAkhiran === a.value ? 'selected' : ''}>${a.label}</option>`).join('')}
                  </select>
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#34d399;">Uraian Barang (Otomatis)</label>
                  <input value="${escText(b.uraian || '')}" placeholder="Ketik atau sesuaikan uraian barang..." oninput="rec.TL_BAST_BarangList[${idx}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#34d399; border:1px solid #34d399; border-radius:4px; font-size:11px;">
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 3. DOKUMEN -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">3. DOKUMEN</span>
          <button type="button" class="btn primary" onclick="addBastItem('dokumen')" style="padding:2px 8px; font-size:11px;">+ Tambah Dokumen</button>
        </div>
        ${rec.TL_BAST_DokumenList.map((d: any, idx: number) => `
          <div style="background:#1e293b; padding:10px; border-radius:6px; margin-bottom:8px; border:1px solid #334155;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:6px; color:var(--primary);">${toLetter(idx)} Dokumen #${idx + 1}</div>
            
            <div class="grid3" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; margin-bottom:6px;">
              <div>
                <label style="font-size:10px; color:#94a3b8;">Jenis Dokumen</label>
                <select onchange="rec.TL_BAST_DokumenList[${idx}].jenisDok = this.value; updateBastDokumenOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  ${renderMasterOptions(MASTER_JENIS_DOKUMEN_PABEAN, d.jenisDok || 'BC 2.0', '- Pilih Jenis Dokumen -')}
                </select>
              </div>
              <div>
                <label style="font-size:10px; color:#94a3b8;">Nomor Dokumen</label>
                <input value="${escText(d.nomorDok || '')}" placeholder="Contoh: 001234" oninput="rec.TL_BAST_DokumenList[${idx}].nomorDok = this.value; updateBastDokumenOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
              </div>
              <div>
                <label style="font-size:10px; color:#94a3b8;">Tanggal Dokumen</label>
                <input type="date" value="${escText(d.tanggalDok || '')}" onchange="rec.TL_BAST_DokumenList[${idx}].tanggalDok = this.value; updateBastDokumenOtomatis(${idx});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
              </div>
            </div>

            <div>
              <label style="font-size:10px; color:#38bdf8;">Preview Uraian Dokumen</label>
              <input value="${escText(d.uraian || '')}" oninput="rec.TL_BAST_DokumenList[${idx}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#38bdf8; border:1px solid #0284c7; border-radius:4px; font-size:11px;">
            </div>

            ${rec.TL_BAST_DokumenList.length > 1 ? `
              <button type="button" class="btn danger" onclick="delBastItem('dokumen', ${idx})" style="margin-top:6px; padding:2px 8px; font-size:10px;">
                <i class="fi fi-rr-trash"></i> Hapus Dokumen
              </button>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- 4. ORANG -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">4. ORANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('orang')" style="padding:2px 8px; font-size:11px;">+ Tambah Orang</button>
        </div>
        ${rec.TL_BAST_OrangList.map((o: any, idx: number) => `
          <div style="background:#1e293b; padding:8px; border-radius:4px; margin-bottom:6px;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:4px; color:var(--primary);">${toLetter(idx)} Orang #${idx+1}</div>
            <div class="grid">
              <div><label>Nama</label><input value="${escText(o.nama)}" oninput="rec.TL_BAST_OrangList[${idx}].nama = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
              <div><label>No. Identitas</label><input value="${escText(o.identitas)}" oninput="rec.TL_BAST_OrangList[${idx}].identitas = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
            </div>
            ${rec.TL_BAST_OrangList.length > 1 ? `<button type="button" class="btn danger" onclick="delBastItem('orang', ${idx})" style="margin-top:6px; padding:2px 8px; font-size:11px;">Hapus</button>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- PENERIMA & RANGKA PENYERAHAN -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:12px;">
        <span style="font-size:11px; font-weight:700; color:#cbd5e1;">PENERIMA & RANGKA PENYERAHAN</span>
        <div class="grid">
          <div><label>Nama Penerima</label><input value="${escText(rec.TL_Nama_Pemilik || rec.Nama_Pelaku || '')}" oninput="saveDynamicValTL('TL_Nama_Pemilik', this.value); showTLReportView('BAST_PEMILIK');"></div>
          <div><label>No. Identitas</label><input value="${escText(rec.TL_NIK_Pemilik || rec.Nomor_Identitas || '')}" oninput="saveDynamicValTL('TL_NIK_Pemilik', this.value); showTLReportView('BAST_PEMILIK');"></div>
        </div>
        <div style="margin-top:8px;">
          <label>Alamat Penerima</label>
          <textarea oninput="saveDynamicValTL('TL_Alamat_Pemilik', this.value); showTLReportView('BAST_PEMILIK');">${escText(rec.TL_Alamat_Pemilik || rec.Alamat_Pelaku || '')}</textarea>
        </div>
        <div style="margin-top:8px;">
          <label>Menerima Untuk / Atas Nama:</label>
          <input value="${escText(rec.TL_Atas_Nama_Pt || rec.TL_Nama_Pemilik || rec.Nama_Pelaku || '')}" oninput="saveDynamicValTL('TL_Atas_Nama_Pt', this.value); showTLReportView('BAST_PEMILIK');">
        </div>
        <div style="margin-top:8px;">
          <label>Penyerahan Dilaksanakan Dalam Rangka:</label>
          <select style="width:100%; padding:7px; margin-bottom:6px;" onchange="
            if (this.value === 'Penyelesaian lainnya') {
              (document.getElementById('wrapper_manual_rangka') as HTMLElement).style.display = 'block';
            } else {
              (document.getElementById('wrapper_manual_rangka') as HTMLElement).style.display = 'none';
              saveDynamicValTL('TL_Rangka_Penyerahan', this.value);
            }
            showTLReportView('BAST_PEMILIK');
          ">
            ${renderMasterOptions(MASTER_RANGKA_PENYERAHAN, selectedRangka, '- Pilih Rangka Penyerahan -')}
          </select>
          <div id="wrapper_manual_rangka" style="display: ${isManualRangka ? 'block' : 'none'};">
            <input id="input_manual_rangka" placeholder="Ketik alasan lainnya..." value="${escText(selectedRangka)}" oninput="saveDynamicValTL('TL_Rangka_Penyerahan', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
      </div>

      <!-- PETUGAS PENYERAH & SAKSI -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px;">
        <span style="font-size:11px; font-weight:700; color:#cbd5e1;">PETUGAS PENYERAH & SAKSI</span>
        <div class="grid" style="margin-top:8px;">
          <div>
            <label>Petugas Penyerah 1</label>
            <input placeholder="Nama Petugas 1" value="${escText(rec.TL_Petugas_Bast_1 || rec.ketua_tim || '')}" oninput="saveDynamicValTL('TL_Petugas_Bast_1', this.value); showTLReportView('BAST_PEMILIK');">
            <input placeholder="NIP Petugas 1" style="margin-top:4px;" value="${escText(rec.TL_NIP_Bast_1 || rec.nip_ketua_tim || '')}" oninput="saveDynamicValTL('TL_NIP_Bast_1', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
          <div>
            <label>Petugas Penyerah 2</label>
            <input placeholder="Nama Petugas 2" value="${escText(rec.TL_Petugas_Bast_2 || '')}" oninput="saveDynamicValTL('TL_Petugas_Bast_2', this.value); showTLReportView('BAST_PEMILIK');">
            <input placeholder="NIP Petugas 2" style="margin-top:4px;" value="${escText(rec.TL_NIP_Bast_2 || '')}" oninput="saveDynamicValTL('TL_NIP_Bast_2', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
        <div style="margin-top:8px;">
          <label>Saksi Pemilik / Kuasa (Kosongkan jika ingin berupa garis panjang)</label>
          <input placeholder="Nama Saksi (Kosongkan untuk _________)" value="${escText(rec.TL_Saksi_Penerima || '')}" oninput="saveDynamicValTL('TL_Saksi_Penerima', this.value); showTLReportView('BAST_PEMILIK');">
        </div>
      </div>
    `;
  } else if (type === 'BA_SEGEL') {
    let rawDate = rec.TL_Tanggal_Surat || '';
    let autoDateInfo = autoGenerateTeksTanggalBA(rawDate);
    let displayHari = rec.TL_Segel_Hari || autoDateInfo.hari || '';
    let displayTglHuruf = rec.TL_Segel_Tgl_Huruf || autoDateInfo.teksLengkap || '';

    let defaultSplitNo = rec.TL_Segel_No_SPLI || rec.Nomor_SPLIT || '';
    let defaultSplitTgl = rec.TL_Segel_Tgl_SPLI || rec.Tanggal_SPLIT || '';

    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> NOMOR & TANGGAL BA SEGEL
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor BA Segel (Cukup Angka)</label>
            <input value="${escText(rec.TL_Segel_Num || '')}" oninput="saveDynamicValTL('TL_Segel_Num', this.value)" placeholder="Contoh: 1" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Surat</label>
            <input type="date" value="${escText(rawDate)}" oninput="
              let val = this.value;
              saveDynamicValTL('TL_Tanggal_Surat', val);
              let gen = autoGenerateTeksTanggalBA(val);
              let hariEl = document.getElementById('editorHariSegelInput') as HTMLInputElement;
              let hurufEl = document.getElementById('editorHurufSegelInput') as HTMLInputElement;
              if (hariEl) { hariEl.value = gen.hari; saveDynamicValTL('TL_Segel_Hari', gen.hari); }
              if (hurufEl) { hurufEl.value = gen.teksLengkap; saveDynamicValTL('TL_Segel_Tgl_Huruf', gen.teksLengkap); }
            " style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Hari Pembukaan Segel</label>
            <input id="editorHariSegelInput" value="${escText(displayHari)}" oninput="saveDynamicValTL('TL_Segel_Hari', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor SPLIT (Otomatis dari Perkara)</label>
            <input value="${escText(defaultSplitNo)}" oninput="saveDynamicValTL('TL_Segel_No_SPLI', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
        <div style="margin-bottom:8px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Dalam Huruf</label>
          <input id="editorHurufSegelInput" value="${escText(displayTglHuruf)}" oninput="saveDynamicValTL('TL_Segel_Tgl_Huruf', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal SPLIT (Otomatis dari Perkara)</label>
          <input type="date" value="${escText(defaultSplitTgl)}" oninput="saveDynamicValTL('TL_Segel_Tgl_SPLI', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">A. Sarana Pengangkut</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama & Jenis Sarkut</label><input value="${escText(rec.TL_Segel_Nama_Sarkut || '')}" oninput="saveDynamicValTL('TL_Segel_Nama_Sarkut', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">No. Register Sarkut</label><input value="${escText(rec.TL_Segel_Reg_Sarkut || '')}" oninput="saveDynamicValTL('TL_Segel_Reg_Sarkut', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Bendera</label><input value="${escText(rec.TL_Segel_Bendera || '')}" oninput="saveDynamicValTL('TL_Segel_Bendera', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nahkoda / Pilot / Pengemudi</label><input value="${escText(rec.TL_Segel_Nahkoda || '')}" oninput="saveDynamicValTL('TL_Segel_Nahkoda', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas Nahkoda</label><input value="${escText(rec.TL_Segel_Nik_Nahkoda || '')}" oninput="saveDynamicValTL('TL_Segel_Nik_Nahkoda', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">B. Barang</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jml/Jenis/No Peti Kemas/Kemasan</label><input value="${escText(rec.TL_Segel_Jml_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Jml_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jumlah/Jenis Barang</label><input value="${escText(rec.TL_Segel_Jenis_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Jenis_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jenis/No & Tgl Dokumen</label><input value="${escText(rec.TL_Segel_Dok_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Dok_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pemilik/Importir/Eksportir/Kuasa</label><input value="${escText(rec.TL_Segel_Pemilik_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Pemilik_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas (NPWP) Barang</label><input value="${escText(rec.TL_Segel_NPWP_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_NPWP_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">C. Bangunan Atau Tempat</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alamat Bangunan/Tempat</label><input value="${escText(rec.TL_Segel_Alamat_Bangunan || '')}" oninput="saveDynamicValTL('TL_Segel_Alamat_Bangunan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">No. Reg Bangunan/NPPBKC/NPWP</label><input value="${escText(rec.TL_Segel_Reg_Bangunan || '')}" oninput="saveDynamicValTL('TL_Segel_Reg_Bangunan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Pemilik/Yang Menguasai</label><input value="${escText(rec.TL_Segel_Nama_Pemilik_Tempat || '')}" oninput="saveDynamicValTL('TL_Segel_Nama_Pemilik_Tempat', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas Pemilik Tempat</label><input value="${escText(rec.TL_Segel_Nik_Pemilik_Tempat || '')}" oninput="saveDynamicValTL('TL_Segel_Nik_Pemilik_Tempat', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Data Saksi / Penghadap</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Saksi / Penghadap</label><input value="${escText(rec.TL_Nama_Pemilik || '')}" oninput="saveDynamicValTL('TL_Nama_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIK Saksi</label><input value="${escText(rec.TL_NIK_Pemilik || '')}" oninput="saveDynamicValTL('TL_NIK_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div style="margin-bottom:8px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pekerjaan Saksi</label>
          <input value="${escText(rec.TL_Segel_Pekerjaan || '')}" oninput="saveDynamicValTL('TL_Segel_Pekerjaan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alamat Saksi</label>
          <textarea oninput="saveDynamicValTL('TL_Alamat_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; min-height:60px;">${escText(rec.TL_Alamat_Pemilik || '')}</textarea>
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Petugas Penandatangan</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Petugas Pembuka Segel 1 (Penerima 1)</label><input value="${escText(rec.TL_Segel_P1 || '')}" oninput="saveDynamicValTL('TL_Segel_P1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas 1</label><input value="${escText(rec.TL_NIP_Segel_1 || '')}" oninput="saveDynamicValTL('TL_NIP_Segel_1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Petugas Pembuka Segel 2 (Saksi Penerima 1)</label><input value="${escText(rec.TL_Segel_P2 || '')}" oninput="saveDynamicValTL('TL_Segel_P2', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas 2</label><input value="${escText(rec.TL_NIP_Segel_2 || '')}" oninput="saveDynamicValTL('TL_NIP_Segel_2', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
      </div>
    `;
  } else if (type === 'KEP_BDN') {
    let listBarang = rec.KEP_List_Barang || [];
    
    let rowsInputHtml = listBarang.map((item: any, idx: number) => `
      <tr data-idx="${idx}">
        <td style="padding:4px;"><input value="${escText(item.jumlah || '')}" oninput="updateKEPBarang(${idx}, 'jumlah', this.value)" placeholder="Jumlah" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${escText(item.uraian || '')}" oninput="updateKEPBarang(${idx}, 'uraian', this.value)" placeholder="Uraian Barang" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${escText(item.kondisi || '')}" oninput="updateKEPBarang(${idx}, 'kondisi', this.value)" placeholder="Kondisi" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${escText(item.asal || '')}" oninput="updateKEPBarang(${idx}, 'asal', this.value)" placeholder="Negara Asal" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${escText(item.ket || '')}" oninput="updateKEPBarang(${idx}, 'ket', this.value)" placeholder="Ket" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px; text-align:center;"><button type="button" onclick="removeKEPBarang(${idx})" style="background:#dc2626; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:11px;">Hapus</button></td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> NOMOR & TANGGAL KEPUTUSAN KEP
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Keputusan KEP</label>
            <input value="${escText(rec.KEP_Nomor_ND || '')}" oninput="saveDynamicValTL('KEP_Nomor_ND', this.value)" placeholder="Contoh: KEP-..." style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Keputusan KEP</label>
            <input type="date" value="${escText(rec.KEP_Tanggal_ND || '')}" oninput="saveDynamicValTL('KEP_Tanggal_ND', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Pejabat Penandatangan</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Kepala Kantor</label>
            <input value="${escText(rec.Kepala_Kantor || '')}" oninput="saveDynamicValTL('Kepala_Kantor', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Kepala Kantor</label>
            <input value="${escText(rec.NIP_Kepala_Kantor || '')}" oninput="saveDynamicValTL('NIP_Kepala_Kantor', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:11px; font-weight:700; color:#fbbf24; text-transform:uppercase;">Daftar Barang yang Dikuasai Negara</span>
          <button type="button" onclick="addKEPBarang()" style="background:#2563eb; color:#fff; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:11px; font-weight:600;">+ Tambah Barang</button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:11px;">
            <thead>
              <tr style="color:#94a3b8; text-align:left; border-bottom:1px solid #334155;">
                <th style="padding:6px; width:20%;">Jumlah</th>
                <th style="padding:6px; width:30%;">Uraian</th>
                <th style="padding:6px; width:15%;">Kondisi</th>
                <th style="padding:6px; width:15%;">Asal</th>
                <th style="padding:6px; width:10%;">Ket</th>
                <th style="padding:6px; width:10%; text-align:center;">Aksi</th>
              </tr>
            </thead>
            <tbody id="kep-barang-tbody">
              ${rowsInputHtml || '<tr><td colspan="6" style="text-align:center; padding:10px; color:#64748b;">Belum ada data barang. Klik Tambah Barang.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (type === 'SPSA') {
    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> INFORMASI NOMOR & TANGGAL SPSA
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor SPSA</label>
            <input value="${escText(rec.SPSA_Nomor || '')}" oninput="saveDynamicValTL('SPSA_Nomor', this.value)" placeholder="Contoh: 01" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal SPSA</label>
            <input type="date" value="${escText(rec.SPSA_Tanggal || '')}" oninput="saveDynamicValTL('SPSA_Tanggal', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-money"></i> DETAIL DENDA & JATUH TEMPO
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Besaran Denda</label>
            <input value="${escText(rec.SPSA_Denda || '')}" oninput="saveDynamicValTL('SPSA_Denda', this.value)" placeholder="Contoh: Rp 10.000.000,-" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jatuh Tempo Pembayaran</label>
            <input type="date" value="${escText(rec.SPSA_Jatuh_Tempo || '')}" oninput="saveDynamicValTL('SPSA_Jatuh_Tempo', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-books"></i> PASAL & ALASAN PENETAPAN
        </span>
        <div style="margin-bottom:10px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pasal Pelanggaran SPSA</label>
          <textarea oninput="saveDynamicValTL('SPSA_Pasal_Pelanggaran', this.value)" rows="3" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-family:inherit; font-size:11px;">${escText(rec.SPSA_Pasal_Pelanggaran || '')}</textarea>
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alasan Penetapan Denda</label>
          <textarea oninput="saveDynamicValTL('SPSA_Alasan', this.value)" rows="3" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-family:inherit; font-size:11px;">${escText(rec.SPSA_Alasan || '')}</textarea>
        </div>
      </div>
    `;
  } else if (type === 'BAST_LIMPAH') {
    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-calendar"></i> WAKTU & TANGGAL PELIMPAHAN
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Hari Pelimpahan</label>
            <input value="${escText(rec.Limpah_Hari || '')}" oninput="saveDynamicValTL('Limpah_Hari', this.value)" placeholder="Contoh: Kamis" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Surat</label>
            <input type="date" value="${escText(rec.Limpah_Tanggal || '')}" oninput="saveDynamicValTL('Limpah_Tanggal', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Dalam Huruf</label>
            <input value="${escText(rec.Limpah_Tgl_Huruf || '')}" oninput="saveDynamicValTL('Limpah_Tgl_Huruf', this.value)" placeholder="Contoh: dua belas Desember tahun dua ribu dua puluh enam" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-building"></i> INSTANSI & PEJABAT PENERIMA (PIHAK KEDUA)
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Instansi / Lembaga</label>
            <input value="${escText(rec.Instansi_Penerima || '')}" oninput="saveDynamicValTL('Instansi_Penerima', this.value)" placeholder="Contoh: Dinas LHK Provinsi Kepri" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Pejabat Penerima</label>
            <input value="${escText(rec.Limpah_Pejabat_Penerima || '')}" oninput="saveDynamicValTL('Limpah_Pejabat_Penerima', this.value)" placeholder="Nama lengkap & gelar" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Pejabat Penerima</label>
            <input value="${escText(rec.Limpah_NIP_Penerima || '')}" oninput="saveDynamicValTL('Limpah_NIP_Penerima', this.value)" placeholder="NIP Pejabat" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jabatan Pejabat Penerima</label>
            <input value="${escText(rec.Limpah_Jabatan_Penerima || '')}" oninput="saveDynamicValTL('Limpah_Jabatan_Penerima', this.value)" placeholder="Contoh: Kepala Dinas / Penyidik Pegawai Negeri Sipil" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-user"></i> PETUGAS PELIMPAH (PIHAK PERTAMA)
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Petugas Pelimpah</label>
            <input value="${escText(rec.Limpah_Petugas_1 || rec.ketua_tim || '')}" oninput="saveDynamicValTL('Limpah_Petugas_1', this.value)" placeholder="Nama Petugas" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas Pelimpah</label>
            <input value="${escText(rec.Limpah_NIP_1 || '')}" oninput="saveDynamicValTL('Limpah_NIP_1', this.value)" placeholder="NIP Petugas" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pangkat / Golongan</label>
            <select onchange="saveDynamicValTL('Limpah_Pangkat_1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-size:11px;">
              ${renderMasterOptions(MASTER_GOLONGAN_PANGKAT, rec.Limpah_Pangkat_1 || '', '- Pilih Golongan -')}
            </select>
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jabatan Petugas</label>
            <input value="${escText(rec.Limpah_Jabatan_1 || '')}" oninput="saveDynamicValTL('Limpah_Jabatan_1', this.value)" placeholder="Contoh: Pemeriksa Bea dan Cukai" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>
    `;
  }
}


/* ============================================================================
 * [BAGIAN C] GLOBAL WINDOW EXPOSURE
 * ----------------------------------------------------------------------------
 * Binding ke window object agar dapat dipanggil dari onclick / oninput atribut HTML.
 * ============================================================================ */

// Binding Menu Laporan
(window as any).saveDynamicVal = saveDynamicVal;
(window as any).showReportView = showReportView;
(window as any).renderDynamicInputs = renderDynamicInputs;
(window as any).switchDocTab = switchDocTab;
(window as any).addItem = addItem;
(window as any).delItem = delItem;
(window as any).addSplitPegawai = addSplitPegawai;
(window as any).delSplitPegawai = delSplitPegawai;
(window as any).addSprinPegawai = addSprinPegawai;
(window as any).delSprinPegawai = delSprinPegawai;
(window as any).syncUraianKombinasiLHP = syncUraianKombinasiLHP;

// Binding Menu Tindak Lanjut
(window as any).saveDynamicValTL = saveDynamicValTL;
(window as any).showTLReportView = showTLReportView;
(window as any).renderTLFormSection = renderTLFormSection;
(window as any).switchTLDocTab = switchTLDocTab;