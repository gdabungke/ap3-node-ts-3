import { store, savePerkaraToStorage } from '../state/store.js';
import { escText, getVal, formatDate, formatDateIndo, autoGenerateTeksTanggalBA} from '../utils/formatters.js';
import { autoPaginateReports, applyPageNumbers, navigatePreviewPage, updatePreviewHeaderUI, updateTLPreviewHeaderUI, renderPageSelector } from './ui.js';
import { getDocNum, fmtLP, fmtLPF, fmtSplit, fmtPrintCacah, fmtBA, fmtLHP, LPP, LPF, SPLIT, SPRIN_CACAH, BA, LHP } from '../templates/laporan.js';
import { getTLNumFormat, BAST_PEMILIK, BA_SEGEL, KEP_BDN, SPSA, BAST_LIMPAH } from '../templates/tindaklanjut.js';

export function saveDynamicVal(id: string, val: string): void {
  let el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (el) el.value = val;
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    store.databasePerkara[store.activeRecordIndex][id] = val;
    savePerkaraToStorage();
  }
  updateReportLive();
}

export function saveDynamicValTL(key: string, val: string): void {
  if (store.activeRecordIndex >= 0 && store.databasePerkara[store.activeRecordIndex]) {
    store.databasePerkara[store.activeRecordIndex][key] = val;
    savePerkaraToStorage();
    refreshTLTableUI();
  }
}

export function refreshReportTableUI(): void {
  let elNumLPP = document.getElementById('table_num_LPP');
  if (elNumLPP) elNumLPP.textContent = fmtLP();
  let elNumLPF = document.getElementById('table_num_LPF');
  if (elNumLPF) elNumLPF.textContent = fmtLPF();
  let elNumSPLIT = document.getElementById('table_num_SPLIT');
  if (elNumSPLIT) elNumSPLIT.textContent = fmtSplit();
  let elNumSPRIN = document.getElementById('table_num_SPRIN_CACAH');
  if (elNumSPRIN) elNumSPRIN.textContent = fmtPrintCacah();
  let elNumBA = document.getElementById('table_num_BA');
  if (elNumBA) elNumBA.textContent = fmtBA();
  let elNumLHP = document.getElementById('table_num_LHP');
  if (elNumLHP) elNumLHP.textContent = fmtLHP();

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

export function updateReportLive(): void {
  let sel = document.getElementById('docFilterSelect') as HTMLSelectElement;
  let activeType = sel ? sel.value : (store.currentDoc || 'LPP');
  refreshReportTableUI();
  showReportView(activeType);
}

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
          <input id="input_No_LPP" value="${escText(getDocNum('No_LPP') || getVal('NoLP_LP_1'))}" oninput="saveDynamicVal('No_LPP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPP</label>
          <input type="date" id="input_Tgl_LPP" value="${getVal('Tanggal_LPP') !== '-' ? getVal('Tanggal_LPP') : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_LPP', this.value); refreshReportTableUI();">
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
    let catLpf = getVal('Catatan_LPF');
    if (!catLpf || catLpf === '-' || catLpf === '') {
      catLpf = "Setuju dengan usulan tim peneliti, segera tindak lanjuti proses penyusunan administrasi penanganan perkara sesuai ketentuan yang berlaku.";
    }

    container.innerHTML = recordSelectorHtml + autoInfoBanner + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LPF (Cukup Angka)</label>
          <input id="input_No_LPF" value="${escText(getDocNum('No_LPF') || getVal('NoLP_LP_1'))}" oninput="saveDynamicVal('No_LPF', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPF</label>
          <input type="date" id="input_Tgl_LPF" value="${getVal('Tanggal_LPF') !== '-' ? getVal('Tanggal_LPF') : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_LPF', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div>
        <label>Catatan / Disposisi Atasan LPF</label>
        <textarea id="Catatan_LPF" oninput="saveDynamicVal('Catatan_LPF', this.value)">${escText(catLpf)}</textarea>
      </div>
    `;
  } else if (type === 'SPLIT') {
    let dasarSplit = getVal('Dasar_SPLIT');
    if (!dasarSplit || dasarSplit === '') dasarSplit = '-';

    container.innerHTML = recordSelectorHtml + autoInfoBanner + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPLIT (Cukup Angka)</label>
          <input id="input_Nomor_SPLIT" value="${escText(getDocNum('Nomor_SPLIT') || getVal('NoLP_LP_1'))}" oninput="saveDynamicVal('Nomor_SPLIT', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPLIT</label>
          <input type="date" id="input_Tgl_SPLIT" value="${getVal('Tanggal_SPLIT') !== '-' ? getVal('Tanggal_SPLIT') : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_SPLIT', this.value); refreshReportTableUI();">
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
    container.innerHTML = recordSelectorHtml + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPRIN CACAH (Cukup Angka)</label>
          <input id="input_No_SPRIN" value="${escText(getDocNum('No_SPRIN_CACAH'))}" oninput="saveDynamicVal('No_SPRIN_CACAH', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPRIN CACAH</label>
          <input type="date" id="input_Tgl_SPRIN" value="${getVal('Tanggal_Sprin_Cacah') !== '-' ? getVal('Tanggal_Sprin_Cacah') : ((document.getElementById('Tanggal_SBP') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_Sprin_Cacah', this.value); refreshReportTableUI();">
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
    let items = activeRec.cacahItems || [];
    container.innerHTML = recordSelectorHtml + `
      <div class="grid3" style="margin-bottom:10px;">
        <div>
          <label>Nomor BA (Cukup Angka)</label>
          <input id="input_Nomor_BA" value="${escText(getDocNum('Nomor_BA'))}" oninput="saveDynamicVal('Nomor_BA', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal BA Cacah</label>
          <input type="date" id="input_Tgl_BA" value="${getVal('Tanggal_BA') !== '-' ? getVal('Tanggal_BA') : ((document.getElementById('Tanggal_SBP') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_BA', this.value); if(this.value){ const r = autoGenerateTeksTanggalBA(this.value); saveDynamicVal('Hari_Cacah', r.hari.toLowerCase()); saveDynamicVal('TeksTanggal', r.teksLengkap.toLowerCase()); (document.getElementById('Hari_Cacah') as HTMLInputElement).value = r.hari.toLowerCase(); (document.getElementById('TeksTanggal') as HTMLInputElement).value = r.teksLengkap.toLowerCase(); } refreshReportTableUI();">
        </div>
        <div>
          <label>Hari Cacah (Huruf Kecil)</label>
          <input id="Hari_Cacah" class="lowercase-input" value="${escText(getVal('Hari_Cacah') || '')}" oninput="saveDynamicVal('Hari_Cacah', this.value.toLowerCase());">
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>Teks Tanggal Lengkap (Huruf Kecil)</label>
        <input id="TeksTanggal" class="lowercase-input" value="${escText(getVal('TeksTanggal') || '')}" oninput="saveDynamicVal('TeksTanggal', this.value.toLowerCase());">
      </div>
      <h4>Isian Tambahan Barang Hasil Pencacahan (BA)</h4>
      <div id="items"></div>
      <button type="button" class="btn secondary" onclick="addItem()" style="margin-top:6px;">
        <i class="fi fi-rr-plus"></i> Tambah Barang Cacah
      </button>
    `;
    renderItems(items);
  } else if (type === 'LHP') {
    let penyelesaianVal = getVal('Penyelesaian_Perkara') !== '-' ? getVal('Penyelesaian_Perkara') : (getVal('Alternatif_Penyelesaian_Perkara') !== '-' ? getVal('Alternatif_Penyelesaian_Perkara') : '');

    container.innerHTML = recordSelectorHtml + `
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LHP (Cukup Angka)</label>
          <input id="input_Nomor_LHP" value="${escText(getDocNum('Nomor_LHP'))}" oninput="saveDynamicVal('Nomor_LHP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LHP</label>
          <input type="date" id="input_Tgl_LHP" value="${getVal('Tanggal_LHP') !== '-' ? getVal('Tanggal_LHP') : ((document.getElementById('Tanggal_LP_LP_1') as HTMLInputElement)?.value || '')}" onchange="saveDynamicVal('Tanggal_LHP', this.value); refreshReportTableUI();">
        </div>
      </div>

      <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.15); border:1px solid var(--border-color, #334155); border-radius:6px;">
          <label style="font-weight:600; font-size:11px; margin-bottom:8px; display:block; text-align:left; text-transform:none; letter-spacing:normal;">Alternatif Penyelesaian Perkara (Centang Pilihan):</label>

          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 6px 12px; margin-bottom:10px;">
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="bdn" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Penetapan BDN</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="spsa" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Sanksi Denda (SPSA)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="kembali" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Barang Dikembalikan</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="reekspor" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Re-Ekspor</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="keluar_sebagian" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pengeluaran Barang Sebagian</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="ur" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Ultimum Remedium (Pasal 40B)</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="musnah" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pemusnahan (BMN)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="sidik" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Naik Penyidikan</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="pelimpahan" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pelimpahan / Serah Terima</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="batal_dok" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pembatalan Dokumen</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="henti" onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Tidak Ditemukan Pelanggaran</span>
            </label>
          </div>

          <textarea id="input_Penyelesaian_Perkara" rows="5" class="form-control" style="width:100%; font-size:12px; line-height:1.5; resize:vertical;" placeholder="Uraian otomatis akan terbentuk di sini berdasarkan opsi yang dicentang..." oninput="saveDynamicVal('Penyelesaian_Perkara', this.value); saveDynamicVal('Alternatif_Penyelesaian_Perkara', this.value);">${escText(penyelesaianVal)}</textarea>
        </div>
    `;
  }
}

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
    hasil.push("Apabila sanksi denda tidak diselesaikan dalam jangka waktu yang ditentukan, proses perkara segera ditingkatkan ke tahap Penyidikan.");
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
(window as any).syncUraianKombinasiLHP = syncUraianKombinasiLHP;

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
  rec.splitPegawaiList.push({ nama: '', nip: '', jabatan: '' });
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

  container.innerHTML = list.map((p: any, i: number) => `
    <div class="item">
      <div class="grid3">
        <div><label>Nama Pegawai #${i+1}</label><input value="${escText(p.nama || '')}" data-pi="${i}" data-pk="nama"></div>
        <div><label>NIP Pegawai #${i+1}</label><input value="${escText(p.nip || '')}" data-pi="${i}" data-pk="nip"></div>
        <div><label>Jabatan Pegawai #${i+1}</label><input value="${escText(p.jabatan || '')}" data-pi="${i}" data-pk="jabatan"></div>
      </div>
      <button type="button" class="btn danger" onclick="delSplitPegawai(${i})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> HAPUS PEGAWAI
      </button>
    </div>
  `).join('');

  container.querySelectorAll('input[data-pi]').forEach((inp: any) => {
    inp.oninput = () => {
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
  rec.sprinPegawaiList.push({ nama: '', nip: '', pangkat: '', jabatan: '' });
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

  container.innerHTML = list.map((p: any, i: number) => `
    <div class="item">
      <div class="grid4">
        <div><label>Nama Pegawai #${i + 1}</label><input value="${escText(p.nama || '')}" data-spi="${i}" data-spk="nama"></div>
        <div><label>NIP Pegawai #${i + 1}</label><input value="${escText(p.nip || '')}" data-spi="${i}" data-spk="nip"></div>
        <div><label>Pangkat/Gol. #${i + 1}</label><input value="${escText(p.pangkat || '')}" data-spi="${i}" data-spk="pangkat"></div>
        <div><label>Jabatan #${i + 1}</label><input value="${escText(p.jabatan || '')}" data-spi="${i}" data-spk="jabatan"></div>
      </div>
      <button type="button" class="btn danger" onclick="delSprinPegawai(${i})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> Hapus Pegawai
      </button>
    </div>
  `).join('');

  container.querySelectorAll('input[data-spi]').forEach((inp: any) => {
    inp.oninput = () => {
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
    if (!rec.TL_BAST_BarangList) {
      let jmlKoli = rec.Jumlah_Koli || '12';
      let teksJml = (window as any).tanggalKeTeks ? (window as any).tanggalKeTeks(jmlKoli) : 'dua belas';
      let jenisKoli = rec.Jenis_Koli || 'koli';
      let komoditi = rec.Komoditi || rec.Uraian_Barang || 'Sepatu';
      
      let defKemasan = (rec.No_Kontainer && rec.No_Kontainer !== '-') ? `${rec.No_Kontainer} / ${rec.Ukuran_Kontainer || ''}` : `${jmlKoli} ${jenisKoli}`;
      let defBarang = `${jmlKoli} (${teksJml}) ${jenisKoli} ${komoditi}`;
      rec.TL_BAST_BarangList = [{ kemasan: defKemasan, uraian: defBarang }];
    }
    if (!rec.TL_BAST_DokumenList) {
      let jns = rec.Dokumen_Pemberitahuan || 'BC 2.0';
      let no = rec.Nomor_Dok_Pemberitahuan || '12345';
      let tgl = rec.Tanggal_Dokumen_Pemberitahuan ? formatDateIndo(rec.Tanggal_Dokumen_Pemberitahuan) : '12 Januari 2026';
      rec.TL_BAST_DokumenList = [{ uraian: `Eks. ${jns} nomor ${no} tanggal ${tgl}` }];
    }
    if (!rec.TL_BAST_OrangList) {
      rec.TL_BAST_OrangList = [{ nama: '-', identitas: '-' }];
    }

    let defaultNoBast = rec.TL_BAST_Num || rec.NoLP_LP_1 || '';
    let defaultTglBast = rec.TL_Tanggal_Surat || rec.Tanggal_LP_LP_1 || '';

    let opsiRangka = [
      'Penyelesaian kewajiban pabean dalam bentuk berupa SPSA',
      'Tidak ditemukan pelanggaran',
      'Penyelesaian kewajiban pabean dalam bentuk pembuatan dokumen pemberitahuan pabean',
      'Penyelesaian pemenuhan larangan dan/atau pembatasan',
      'Pengeluaran barang sebagian atas barang yang tidak terkena larangan dan/atau pembatasan',
      'Penyelesaian lainnya'
    ];
    let selectedRangka = rec.TL_Rangka_Penyerahan || opsiRangka[0];
    let isManualRangka = !opsiRangka.slice(0, 5).includes(selectedRangka);
    let optionsHtml = opsiRangka.map(o => `<option value="${o}" ${(isManualRangka && o === 'Penyelesaian lainnya') || selectedRangka === o ? 'selected' : ''}>${o}</option>`).join('');

    (window as any).onTanggalBastChange = function(val: string) {
      saveDynamicValTL('TL_Tanggal_Surat', val);
      if (!val) return;
      if (typeof autoGenerateTeksTanggalBA === 'function') {
        const res = autoGenerateTeksTanggalBA(val);
        saveDynamicValTL('TL_Hari_BAST', res.hari);
        saveDynamicValTL('TL_Tgl_Huruf_BAST', res.teksLengkap);
        let elHari = document.getElementById('input_TL_Hari_BAST') as HTMLInputElement;
        if (elHari) elHari.value = res.hari;
        let elTeks = document.getElementById('input_TL_Tgl_Huruf_BAST') as HTMLInputElement;
        if (elTeks) elTeks.value = res.teksLengkap;
      }
      showTLReportView('BAST_PEMILIK');
    };

    (window as any).addBastItem = function(category: string) {
      if (category === 'sarkut') rec.TL_BAST_SarkutList.push({ jenis: '', nopol: '' });
      if (category === 'barang') rec.TL_BAST_BarangList.push({ kemasan: '', uraian: '' });
      if (category === 'dokumen') rec.TL_BAST_DokumenList.push({ uraian: '' });
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

    const toLetter = (i: number) => String.fromCharCode(97 + i) + '.';

    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:12px;">
        <span style="font-size:11px; font-weight:700; color:var(--primary);"><i class="fi fi-rr-document"></i> NOMOR & TANGGAL BAST</span>
        <div class="grid" style="margin-top:8px;">
          <div>
            <label>Nomor BAST (Cukup Angka)</label>
            <input id="input_TL_BAST_PEMILIK_Num" placeholder="Contoh: 1" value="${escText(defaultNoBast)}" oninput="saveDynamicValTL('TL_BAST_Num', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
          <div>
            <label>Tanggal BAST</label>
            <input type="date" id="input_TL_Tanggal_Surat" value="${escText(defaultTglBast)}" onchange="window.onTanggalBastChange(this.value)">
          </div>
        </div>
        <div class="grid" style="margin-top:8px;">
          <div>
            <label>Hari BAST</label>
            <input id="input_TL_Hari_BAST" class="lowercase-input" value="${escText(rec.TL_Hari_BAST || '')}" oninput="saveDynamicValTL('TL_Hari_BAST', this.value.toLowerCase()); showTLReportView('BAST_PEMILIK');">
          </div>
          <div>
            <label>Ejaan Huruf Tanggal</label>
            <input id="input_TL_Tgl_Huruf_BAST" class="lowercase-input" value="${escText(rec.TL_Tgl_Huruf_BAST || '')}" oninput="saveDynamicValTL('TL_Tgl_Huruf_BAST', this.value.toLowerCase()); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
      </div>

      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">1. SARANA PENGANGKUT</span>
          <button type="button" class="btn primary" onclick="addBastItem('sarkut')" style="padding:2px 8px; font-size:11px;">+ Tambah Sarkut (b, c..)</button>
        </div>
        ${rec.TL_BAST_SarkutList.map((s: any, idx: number) => `
          <div style="background:#1e293b; padding:8px; border-radius:4px; margin-bottom:6px;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:4px; color:var(--primary);">${toLetter(idx)} Sarkut #${idx+1}</div>
            <div class="grid">
              <div><label>Jenis Sarkut</label><input value="${escText(s.jenis)}" oninput="rec.TL_BAST_SarkutList[${idx}].jenis = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
              <div><label>No. Reg/Polisi</label><input value="${escText(s.nopol)}" oninput="rec.TL_BAST_SarkutList[${idx}].nopol = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
            </div>
            ${rec.TL_BAST_SarkutList.length > 1 ? `<button type="button" class="btn danger" onclick="delBastItem('sarkut', ${idx})" style="margin-top:6px; padding:2px 8px; font-size:11px;">Hapus</button>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">2. BARANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('barang')" style="padding:2px 8px; font-size:11px;">+ Tambah Barang (b, c..)</button>
        </div>
        ${rec.TL_BAST_BarangList.map((b: any, idx: number) => `
          <div style="background:#1e293b; padding:8px; border-radius:4px; margin-bottom:6px;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:4px; color:var(--primary);">${toLetter(idx)} Barang #${idx+1}</div>
            <div class="grid">
              <div>
                <label>Jml/Kemasan (Dropdown/Edit)</label>
                <input list="kemasanOptions" value="${escText(b.kemasan)}" oninput="rec.TL_BAST_BarangList[${idx}].kemasan = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');">
                <datalist id="kemasanOptions">
                  <option value="5 koli">
                  <option value="12 koli">
                  <option value="1 x 40 ft Peti Kemas">
                  <option value="1 x 20 ft Peti Kemas">
                  <option value="Curah">
                </datalist>
              </div>
              <div><label>Jumlah/Jenis Barang</label><input value="${escText(b.uraian)}" oninput="rec.TL_BAST_BarangList[${idx}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
            </div>
            ${rec.TL_BAST_BarangList.length > 1 ? `<button type="button" class="btn danger" onclick="delBastItem('barang', ${idx})" style="margin-top:6px; padding:2px 8px; font-size:11px;">Hapus</button>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">3. DOKUMEN</span>
          <button type="button" class="btn primary" onclick="addBastItem('dokumen')" style="padding:2px 8px; font-size:11px;">+ Tambah Dokumen (b, c..)</button>
        </div>
        ${rec.TL_BAST_DokumenList.map((d: any, idx: number) => `
          <div style="background:#1e293b; padding:8px; border-radius:4px; margin-bottom:6px;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:4px; color:var(--primary);">${toLetter(idx)} Dokumen #${idx+1}</div>
            <input value="${escText(d.uraian)}" oninput="rec.TL_BAST_DokumenList[${idx}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');">
            ${rec.TL_BAST_DokumenList.length > 1 ? `<button type="button" class="btn danger" onclick="delBastItem('dokumen', ${idx})" style="margin-top:6px; padding:2px 8px; font-size:11px;">Hapus</button>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">4. ORANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('orang')" style="padding:2px 8px; font-size:11px;">+ Tambah Orang (b, c..)</button>
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
            ${optionsHtml}
          </select>
          <div id="wrapper_manual_rangka" style="display: ${isManualRangka ? 'block' : 'none'};">
            <input id="input_manual_rangka" placeholder="Ketik alasan lainnya..." value="${escText(selectedRangka)}" oninput="saveDynamicValTL('TL_Rangka_Penyerahan', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
      </div>

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

  // Menarik nilai default dari Nomor_SPLIT dan Tanggal_SPLIT di modal perkara jika belum diisi manual di TL
  let defaultSplitNo = rec.TL_Segel_No_SPLI || rec.Nomor_SPLIT || '';
  let defaultSplitTgl = rec.TL_Segel_Tgl_SPLI || rec.Tanggal_SPLIT || '';

  container.innerHTML = `
    <!-- 1. NOMOR & TANGGAL BA SEGEL -->
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

    <!-- 2. A. SARANA PENGANGKUT -->
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

    <!-- 3. B. BARANG -->
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

    <!-- 4. C. BANGUNAN ATAU TEMPAT -->
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

    <!-- 5. DATA SAKSI / PENGHADAP -->
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

    <!-- 6. PETUGAS PENANDATANGAN -->
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
    <!-- 1. NOMOR & TANGGAL KEPUTUSAN KEP -->
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

    <!-- 2. PEJABAT PENANDATANGAN -->
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

    <!-- 3. DAFTAR BARANG YANG DIKUASAI NEGARA -->
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
      <div class="grid" style="margin-bottom:10px;">
        <div><label>Nomor SPSA</label><input value="${escText(rec.SPSA_Nomor || '')}" oninput="saveDynamicValTL('SPSA_Nomor', this.value)"></div>
        <div><label>Tanggal SPSA</label><input value="${escText(rec.SPSA_Tanggal || '')}" oninput="saveDynamicValTL('SPSA_Tanggal', this.value)"></div>
        <div><label>Besaran Denda</label><input value="${escText(rec.SPSA_Denda || '')}" oninput="saveDynamicValTL('SPSA_Denda', this.value)"></div>
        <div><label>Jatuh Tempo Pembayaran</label><input value="${escText(rec.SPSA_Jatuh_Tempo || '')}" oninput="saveDynamicValTL('SPSA_Jatuh_Tempo', this.value)"></div>
        <div style="grid-column: span 2;"><label>Pasal Pelanggaran SPSA</label><textarea oninput="saveDynamicValTL('SPSA_Pasal_Pelanggaran', this.value)">${escText(rec.SPSA_Pasal_Pelanggaran || '')}</textarea></div>
        <div style="grid-column: span 2;"><label>Alasan Penetapan Denda</label><textarea oninput="saveDynamicValTL('SPSA_Alasan', this.value)">${escText(rec.SPSA_Alasan || '')}</textarea></div>
      </div>
    `;
  } else if (type === 'BAST_LIMPAH') {
    container.innerHTML = `
      <div class="grid" style="margin-bottom:10px;">
        <div><label>Hari Pelimpahan</label><input value="${escText(rec.Limpah_Hari || '')}" oninput="saveDynamicValTL('Limpah_Hari', this.value)"></div>
        <div><label>Tanggal Surat</label><input value="${escText(rec.Limpah_Tanggal || '')}" oninput="saveDynamicValTL('Limpah_Tanggal', this.value)"></div>
        <div style="grid-column: span 2;"><label>Tanggal Dalam Huruf</label><input value="${escText(rec.Limpah_Tgl_Huruf || '')}" oninput="saveDynamicValTL('Limpah_Tgl_Huruf', this.value)"></div>
        <div><label>Instansi Penerima</label><input value="${escText(rec.Instansi_Penerima || '')}" oninput="saveDynamicValTL('Instansi_Penerima', this.value)"></div>
        <div><label>Nama Pejabat Penerima</label><input value="${escText(rec.Limpah_Pejabat_Penerima || '')}" oninput="saveDynamicValTL('Limpah_Pejabat_Penerima', this.value)"></div>
        <div><label>NIP Pejabat Penerima</label><input value="${escText(rec.Limpah_NIP_Penerima || '')}" oninput="saveDynamicValTL('Limpah_NIP_Penerima', this.value)"></div>
        <div><label>Petugas Pelimpah (Bea Cukai)</label><input value="${escText(rec.Limpah_Petugas_1 || rec.ketua_tim || '')}" oninput="saveDynamicValTL('Limpah_Petugas_1', this.value)"></div>
      </div>
    `;
  }
}

(window as any).saveDynamicVal = saveDynamicVal;
(window as any).saveDynamicValTL = saveDynamicValTL;
(window as any).showReportView = showReportView;
(window as any).showTLReportView = showTLReportView;
(window as any).renderDynamicInputs = renderDynamicInputs;
(window as any).renderTLFormSection = renderTLFormSection;
(window as any).switchDocTab = switchDocTab;
(window as any).switchTLDocTab = switchTLDocTab;
(window as any).addItem = addItem;
(window as any).delItem = delItem;
(window as any).addSplitPegawai = addSplitPegawai;
(window as any).delSplitPegawai = delSplitPegawai;
(window as any).addSprinPegawai = addSprinPegawai;
(window as any).delSprinPegawai = delSprinPegawai;