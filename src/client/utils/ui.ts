/**
 * ============================================================================
 * MODUL         : UI.TS
 * DESKRIPSI     : Controller Antarmuka, Toast, Paginasi, & Modal Dialog (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */

import { store, savePerkaraToStorage } from '../state/store.js';
import { escText, tanggalKeTeks } from '../utils/formatters.js';

/* ============================================================================
 * [BAGIAN A] SISTEM UI GLOBAL & NOTIFIKASI UMUM APLIKASI
 * ----------------------------------------------------------------------------
 * Fungsi-fungsi dasar antarmuka yang dipakai bersama oleh seluruh modul.
 * ============================================================================ */

// Menampilkan pemberitahuan banner toast mengambang di pojok layar
export function showToast(title: string, desc: string, type: string = "success"): void {
  let container = document.getElementById('toastContainer');
  if (!container) return;

  let toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = type === 'success' ? '<i class="fi fi-rr-check"></i>' : (type === 'warning' ? '<i class="fi fi-rr-exclamation"></i>' : '<i class="fi fi-rr-cross"></i>');

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${escText(title)}</div>
      <div class="toast-desc">${escText(desc)}</div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Menampilkan popup konfirmasi aksi penting (Ya / Batal)
export function showToastConfirm(title: string, desc: string, onConfirm: () => void): void {
  let container = document.getElementById('toastContainer');
  if (!container) return;

  let toast = document.createElement('div');
  toast.className = `toast warning`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fi fi-rr-exclamation"></i></div>
    <div class="toast-body">
      <div class="toast-title">${escText(title)}</div>
      <div class="toast-desc">${escText(desc)}</div>
      <div class="toast-actions">
        <button type="button" class="btn primary" id="toastYesBtn" style="padding:2px 8px; font-size:10px;">Ya</button>
        <button type="button" class="btn secondary" id="toastNoBtn" style="padding:2px 8px; font-size:10px;">Batal</button>
      </div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  let yesBtn = toast.querySelector('#toastYesBtn') as HTMLButtonElement;
  let noBtn = toast.querySelector('#toastNoBtn') as HTMLButtonElement;

  if (yesBtn) {
    yesBtn.onclick = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
      onConfirm();
    };
  }
  if (noBtn) {
    noBtn.onclick = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    };
  }
}

// Mengatur ukuran kertas cetak preview (A4 vs F4 Folio)
export function changePaperSize(size: string): void {
  store.selectedPaperSize = size;
  let dynamicStyle = document.getElementById('dynamicPaperStyle');
  let paperLabel = document.getElementById('currentPaperSizeLabel');
  let settingSelect = document.getElementById('setting_paperSize') as HTMLSelectElement;

  if (settingSelect) settingSelect.value = size;

  if (size === 'A4') {
    if (dynamicStyle) dynamicStyle.innerHTML = `@page { size: A4; margin: 0; } @page landscape-page { size: A4 landscape; margin: 0; } @media print { .report { width: 210mm !important; min-height: 297mm !important; } .report.landscape { width: 297mm !important; min-height: 210mm !important; } }`;
    if (paperLabel) paperLabel.textContent = 'A4 (210 x 297 mm)';
  } else {
    if (dynamicStyle) dynamicStyle.innerHTML = `@page { size: 215mm 330mm; margin: 0; } @page landscape-page { size: 330mm 215mm; margin: 0; } @media print { .report { width: 215mm !important; min-height: 330mm !important; } .report.landscape { width: 330mm !important; min-height: 215mm !important; } }`;
    if (paperLabel) paperLabel.textContent = 'F4 / FOLIO (215 x 330 mm)';
  }

  if ((window as any).showReportView) (window as any).showReportView(store.currentDoc);
  if ((window as any).showTLReportView) (window as any).showTLReportView(store.currentTLDoc);
  if ((window as any).saveData) (window as any).saveData();
}

// Paginasi otomatis saat tabel dokumen melebihi batas tinggi kertas cetak
export function autoPaginateReports(containerId: string = 'reports'): void {
  let container = document.getElementById(containerId);
  if (!container) return;

  let reportCards = Array.from(container.querySelectorAll('.report')) as HTMLElement[];

  reportCards.forEach((reportEl) => {
    if (reportEl.classList.contains('landscape') || reportEl.dataset.paginated === "true") return;

    let reportText = reportEl.innerText || '';
    if (reportText.includes('SURAT PERINTAH PENELITIAN (SPLIT)') || 
        reportText.includes('SURAT PERINTAH PENCACAHAN') ||
        reportText.includes('BERITA ACARA SERAH TERIMA BARANG BUKTI') ||
        reportText.includes('BERITA ACARA PEMBUKAAN SEGEL') ||
        reportText.includes('SURAT PENETAPAN SANKSI ADMINISTRASI') ||
        reportText.includes('BERITA ACARA SERAH TERIMA')) {
      return;
    }

    if (reportEl.scrollHeight > 1250) {
      reportEl.dataset.paginated = "true";

      let page2 = document.createElement('div');
      page2.className = reportEl.className;
      page2.dataset.paginated = "true";
      page2.innerHTML = '';

      let children = Array.from(reportEl.children) as HTMLElement[];
      let moving = false;
      let currentHeight = 0;

      children.forEach((child) => {
        if (child.classList.contains('office-left') || child.classList.contains('title-center') || child.classList.contains('nomor-center')) {
          currentHeight += child.offsetHeight;
          return;
        }

        if (child.tagName === 'TABLE' && !moving) {
          let rows = Array.from(child.querySelectorAll('tr')) as HTMLElement[];
          let tablePage1 = child;
          
          let firstRowCells = tablePage1.querySelectorAll('tr:first-child > td, tr:first-child > th') as NodeListOf<HTMLElement>;
          let colWidths = Array.from(firstRowCells).map(td => td.style.width || td.getAttribute('width') || '');

          let tablePage2 = tablePage1.cloneNode(false) as HTMLElement;
          tablePage2.style.tableLayout = 'fixed';
          let tbodyPage2 = document.createElement('tbody');
          tablePage2.appendChild(tbodyPage2);

          let tableMoving = false;

          rows.forEach((row) => {
            let rowH = row.offsetHeight || 24;
            if (currentHeight + rowH > 1150 || tableMoving) {
              tableMoving = true;
              moving = true;

              if (tbodyPage2.children.length === 0 && colWidths.length > 0) {
                let cells = row.children as HTMLCollectionOf<HTMLElement>;
                for (let i = 0; i < cells.length; i++) {
                  if (colWidths[i]) cells[i].style.width = colWidths[i];
                }
              }

              tbodyPage2.appendChild(row);
            } else {
              currentHeight += rowH;
            }
          });

          if (tableMoving && tbodyPage2.children.length > 0) {
            page2.appendChild(tablePage2);
          }
          return;
        }

        currentHeight += child.offsetHeight;

        if (currentHeight > 1150 || moving) {
          moving = true;
          page2.appendChild(child);
        }
      });

      let pageBreak = document.createElement('div');
      pageBreak.className = 'pagebreak';

      reportEl.parentNode?.insertBefore(pageBreak, reportEl.nextSibling);
      reportEl.parentNode?.insertBefore(page2, pageBreak.nextSibling);
    }
  });
}

// Menempelkan footer penomoran halaman (Hal 1, Hal 2, dst)
export function applyPageNumbers(containerId: string = 'reports'): void {
  let container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.page-number-footer').forEach((el: Element) => el.remove());

  let reportCards = container.querySelectorAll('.report');
  reportCards.forEach((card: Element, index: number) => {
    let footerEl = document.createElement('div');
    footerEl.className = 'page-number-footer';
    footerEl.innerText = String(index + 1);
    card.appendChild(footerEl);
  });
}

// Berpindah antar lembar halaman pada lembar pratinjau
export function navigatePreviewPage(pageIndex: number, reportContainerId: string = 'reports'): void {
  let reportsEl = document.getElementById(reportContainerId);
  if (!reportsEl) return;

  let reportCards = Array.from(reportsEl.querySelectorAll('.report')) as HTMLElement[];
  let total = reportCards.length;
  if (total === 0) return;

  if (pageIndex < 0) pageIndex = 0;
  if (pageIndex >= total) pageIndex = total - 1;

  store.currentActivePageIdx = pageIndex;

  reportCards.forEach((card, idx) => {
    card.style.display = (idx === pageIndex) ? 'block' : 'none';
  });

  let containerId = (reportContainerId === 'reports') ? 'pageSelectorContainer' : 'tlPageSelectorContainer';
  renderPageSelector(total, containerId, reportContainerId);
}

// Menampilkan toolbar pemilih halaman (Prev / Hal X / Next)
export function renderPageSelector(totalDocs: number, containerId: string = 'pageSelectorContainer', reportContainerId: string = 'reports'): void {
  let container = document.getElementById(containerId);
  if (!container) return;

  if (totalDocs <= 1) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.gap = '6px';

  let prevDisabled = (store.currentActivePageIdx === 0) ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : '';
  let nextDisabled = (store.currentActivePageIdx === totalDocs - 1) ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : '';

  container.innerHTML = `
    <button type="button" class="page-nav-btn" ${prevDisabled} onclick="navigatePreviewPage(${store.currentActivePageIdx - 1}, '${reportContainerId}')">
      <i class="fi fi-rr-angle-left"></i> Prev
    </button>

    <span style="font-size:11px; font-weight:700; color:var(--primary); padding:0 4px;">
      Hal ${store.currentActivePageIdx + 1} / ${totalDocs}
    </span>

    <button type="button" class="page-nav-btn" ${nextDisabled} onclick="navigatePreviewPage(${store.currentActivePageIdx + 1}, '${reportContainerId}')">
      Next <i class="fi fi-rr-angle-right"></i>
    </button>
  `;
}

// Memilih halaman spesifik dari nomor halaman tertentu atau mode ALL
export function selectPreviewPage(pageIndex: any, reportContainerId: string = 'reports', clickedBtn: HTMLElement | null = null): void {
  store.selectedViewPage = pageIndex;
  
  let reportsEl = document.getElementById(reportContainerId);
  if (!reportsEl) return;

  let reportCards = reportsEl.querySelectorAll('.report') as NodeListOf<HTMLElement>;
  let pageBreaks = reportsEl.querySelectorAll('.pagebreak') as NodeListOf<HTMLElement>;

  if (clickedBtn && clickedBtn.parentNode) {
    clickedBtn.parentNode.querySelectorAll('.page-nav-btn').forEach((btn: Element) => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
  }

  reportCards.forEach((card, idx) => {
    if (pageIndex === 'ALL' || (pageIndex - 1) === idx) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  pageBreaks.forEach(pb => {
    pb.style.display = (pageIndex === 'ALL') ? 'block' : 'none';
  });
}


/* ============================================================================
 * [BAGIAN B] KONTROLLER KHUSUS: MENU LAPORAN (BERKAS INTI)
 * ----------------------------------------------------------------------------
 * Pengaturan header judul preview dan modal edit dokumen penelitian perkara:
 * Dokumen: LPP, LPF, SPLIT, SPRIN CACAH, BA, LHP
 * ============================================================================ */

// 1. Memperbarui teks dan ikon header pratinjau dokumen Laporan
export function updatePreviewHeaderUI(docType: string): void {
  let rawType = (docType || store.currentDoc || 'LPP').toString().toUpperCase().trim();
  store.currentDoc = rawType;

  const docMeta: Record<string, { title: string; icon: string }> = {
    'ALL': { title: 'SEMUA DOKUMEN LAPORAN', icon: 'fi-rr-documents' },
    'LPP': { title: 'LEMBAR PENELITIAN PERKARA (LPP)', icon: 'fi-rr-document' },
    'LPF': { title: 'LEMBAR PENELITIAN FORMAL (LPF)', icon: 'fi-rr-document-signed' },
    'SPLIT': { title: 'SURAT PERINTAH PENELITIAN (SPLIT)', icon: 'fi-rr-users-alt' },
    'SPRIN_CACAH': { title: 'SURAT PERINTAH PENCACAHAN', icon: 'fi-rr-shield-check' },
    'SPRIN': { title: 'SURAT PERINTAH PENCACAHAN', icon: 'fi-rr-shield-check' },
    'BA': { title: 'BERITA ACARA PENCACAHAN (BA CACAH)', icon: 'fi-rr-box-open' },
    'BA_CACAH': { title: 'BERITA ACARA PENCACAHAN (BA CACAH)', icon: 'fi-rr-box-open' },
    'LHP': { title: 'LAPORAN HASIL PENELITIAN (LHP)', icon: 'fi-rr-diploma' }
  };

  let titleEl = document.getElementById('previewHeaderText');
  let iconEl = document.getElementById('previewHeaderIcon');
  let meta = docMeta[rawType] || { title: `DOKUMEN ${rawType}`, icon: 'fi-rr-document' };

  if (titleEl) titleEl.textContent = `PRATINJAU DOKUMEN: ${meta.title}`;
  if (iconEl) iconEl.className = `fi ${meta.icon}`;
}

// 2. Membuka dialog modal edit isian parameter dokumen Laporan
export function handleEditDocFocus(type: string): void {
  if (store.activeRecordIndex < 0 && store.databasePerkara.length > 0) {
    store.activeRecordIndex = 0;
  }

  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    showToast("PERINGATAN", "Simpan atau pilih data perkara terlebih dahulu sebelum mengedit parameter.", "warning");
    return;
  }

  if ((window as any).loadRecordToCurrentView) {
    (window as any).loadRecordToCurrentView(store.databasePerkara[store.activeRecordIndex]);
  }

  store.currentDoc = type;
  let sel = document.getElementById('docFilterSelect') as HTMLSelectElement;
  if (sel) sel.value = type;

  const docTitles: Record<string, string> = {
    'LPP': 'Edit Dokumen LPP',
    'LPF': 'Edit Dokumen LPF',
    'SPLIT': 'Edit Dokumen SPLIT',
    'SPRIN_CACAH': 'Edit Sprin Cacah',
    'BA': 'Edit BA Cacah',
    'LHP': 'Edit Dokumen LHP'
  };
  
  let modalTitle = document.getElementById('editDocModalTitle');
  if (modalTitle) modalTitle.textContent = docTitles[type] || 'Edit Dokumen';

  if ((window as any).renderDynamicInputs) (window as any).renderDynamicInputs(type);
  let modal = document.getElementById('editDocModal');
  if (modal) modal.classList.add('active');
}

// 3. Menutup dialog modal edit dokumen Laporan
export function closeEditDocModal(): void {
  let modal = document.getElementById('editDocModal');
  if (modal) modal.classList.remove('active');
}

// 4. Menyimpan perubahan form dokumen Laporan dan me-refresh tampilan preview
export function saveAndCloseEditDocModal(): void {
  closeEditDocModal();
  if ((window as any).refreshReportTableUI) (window as any).refreshReportTableUI();
  if ((window as any).updateReportLive) (window as any).updateReportLive();
  showToast("PERUBAHAN TERSIMPAN", `Parameter ${store.currentDoc} berhasil diperbarui.`, "success");
}


/* ============================================================================
 * [BAGIAN C] KONTROLLER KHUSUS: MENU TINDAK LANJUT (EKSEKUSI LHP)
 * ----------------------------------------------------------------------------
 * Pengaturan header pratinjau, modal edit parameter, serta tombol validasi LHP:
 * Dokumen: BAST_PEMILIK, BA_SEGEL, KEP_BDN, SPSA, BAST_LIMPAH
 * ============================================================================ */

// 1. Memperbarui teks dan ikon header pratinjau dokumen Tindak Lanjut
export function updateTLPreviewHeaderUI(docType: string): void {
  let rawType = (docType || store.currentTLDoc || 'BAST_PEMILIK').toString().toUpperCase().trim();
  store.currentTLDoc = rawType;

  const tlDocMeta: Record<string, { title: string; icon: string }> = {
    'ALL': { title: 'SEMUA DOKUMEN TINDAK LANJUT', icon: 'fi-rr-documents' },
    'BAST_PEMILIK': { title: 'BAST KE PEMILIK / KUASA', icon: 'fi-rr-user-check' },
    'BA_SEGEL': { title: 'BERITA ACARA BUKA SEGEL', icon: 'fi-rr-unlock' },
    'KEP_BDN': { title: 'KEPUTUSAN BPP / BDN', icon: 'fi-rr-diploma' },
    'SPSA': { title: 'SURAT PERINTAH SPSA', icon: 'fi-rr-shield-check' },
    'BAST_LIMPAH': { title: 'BAST LIMPAH INSTANSI LAIN', icon: 'fi-rr-paper-plane' }
  };

  let titleEl = document.getElementById('tlPreviewHeaderText');
  let iconEl = document.getElementById('tlPreviewHeaderIcon');
  let meta = tlDocMeta[rawType] || { title: `DOKUMEN ${rawType}`, icon: 'fi-rr-document' };

  if (titleEl) titleEl.textContent = `PRATINJAU DOKUMEN: ${meta.title}`;
  if (iconEl) iconEl.className = `fi ${meta.icon}`;
}

// 2. Membuka dialog modal edit isian parameter dokumen Tindak Lanjut
export function focusEditTLDoc(docType: string): void {
  if (store.activeRecordIndex < 0 && store.databasePerkara.length > 0) {
    store.activeRecordIndex = 0;
  }

  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    showToast("PERINGATAN", "Simpan atau pilih data perkara terlebih dahulu sebelum mengedit parameter tindak lanjut.", "warning");
    return;
  }

  if ((window as any).loadRecordToCurrentView) {
    (window as any).loadRecordToCurrentView(store.databasePerkara[store.activeRecordIndex]);
  }

  store.currentTLDoc = docType;
  let sel = document.getElementById('tlDocFilterSelect') as HTMLSelectElement;
  if (sel) sel.value = docType;

  const tlDocTitles: Record<string, string> = {
    'BAST_PEMILIK': 'Edit BAST Ke Pemilik / Kuasa',
    'BA_SEGEL': 'Edit Berita Acara Buka Segel',
    'KEP_BDN': 'Edit Keputusan BDN',
    'SPSA': 'Edit Surat SPSA',
    'BAST_LIMPAH': 'Edit BAST Limpah Ke Instansi Lain'
  };
  
  let modalTitle = document.getElementById('editTLDocModalTitle');
  if (modalTitle) modalTitle.textContent = tlDocTitles[docType] || 'Edit Dokumen Tindak Lanjut';

  if ((window as any).renderTLFormSection) (window as any).renderTLFormSection(docType);
  let modal = document.getElementById('editTLDocModal');
  if (modal) modal.classList.add('active');
}

// 3. Menutup dialog modal edit dokumen Tindak Lanjut
export function closeEditTLDocModal(): void {
  let modal = document.getElementById('editTLDocModal');
  if (modal) modal.classList.remove('active');
}

// 4. Menyimpan perubahan form dokumen Tindak Lanjut dan me-refresh preview
export function saveAndCloseEditTLDocModal(): void {
  closeEditTLDocModal();
  if ((window as any).refreshTLTableUI) (window as any).refreshTLTableUI();
  if ((window as any).showTLReportView) (window as any).showTLReportView(store.currentTLDoc);
  showToast("PERUBAHAN TERSIMPAN", `Parameter ${store.currentTLDoc} berhasil diperbarui.`, "success");
}

// 5. Tombol Validasi & Sinkronisasi data Laporan otomatis dari Perkara
export function handleSingleValidation(): void {
  if ((typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0) && store.databasePerkara.length > 0) {
    store.activeRecordIndex = 0;
  }

  if (typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    showToast("INFORMASI", "Belum ada data perkara untuk divalidasi.", "warning");
    return;
  }

  let activeRecord = store.databasePerkara[store.activeRecordIndex];
  let noLp = activeRecord.NoLP_LP_1 || '';

  let docTypes = ['LPP', 'LPF', 'SPLIT', 'SPRIN_CACAH', 'BA', 'LHP'];
  docTypes.forEach(type => {
    if (type === 'LPP') {
      activeRecord.No_LPP = noLp.replace(/^LP/i, 'LPP');
      activeRecord.Tanggal_LPP = activeRecord.Tanggal_LPP || activeRecord.Tanggal_LP_LP_1;
    } else if (type === 'LPF') {
      activeRecord.No_LPF = noLp.replace(/^LP/i, 'LPF');
      activeRecord.Tanggal_LPF = activeRecord.Tanggal_LPF || activeRecord.Tanggal_LP_LP_1;
    } else if (type === 'SPLIT') {
      activeRecord.Nomor_SPLIT = noLp.replace(/^LP/i, 'SPLIT');
      activeRecord.Tanggal_SPLIT = activeRecord.Tanggal_SPLIT || activeRecord.Tanggal_LP_LP_1;
    } else if (type === 'SPRIN_CACAH' && !activeRecord.No_SPRIN_CACAH) {
      activeRecord.No_SPRIN_CACAH = noLp;
      activeRecord.Tanggal_SPRIN_CACAH = activeRecord.Tanggal_SBP || activeRecord.Tanggal_LP_LP_1;
    } else if (type === 'BA' && !activeRecord.Nomor_BA) {
      activeRecord.Nomor_BA = noLp;
      activeRecord.Tanggal_BA = activeRecord.Tanggal_SBP || activeRecord.Tanggal_LP_LP_1;
    } else if (type === 'LHP') {
      activeRecord.No_LHP = noLp.replace(/^LP/i, 'LHP');
      activeRecord.Tanggal_LHP = activeRecord.Tanggal_LHP || activeRecord.Tanggal_LP_LP_1;
    }
  });

  savePerkaraToStorage();

  let existingToast = document.getElementById('customToastNotification');
  if (!existingToast) {
    let toastDiv = document.createElement('div');
    toastDiv.id = 'customToastNotification';
    toastDiv.innerHTML = `<i class="fi fi-rr-check-circle" style="color: #22c55e; margin-right: 8px;"></i><span id="toastMessage">Sudah divalidasi dan disinkronkan!</span>`;
    toastDiv.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); display: flex; align-items: center; z-index: 9999; font-size: 14px; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; transform: translateY(20px); border-left: 4px solid #10b981;";
    document.body.appendChild(toastDiv);
    existingToast = toastDiv;
  } else {
    let msgEl = document.getElementById('toastMessage');
    if (msgEl) msgEl.innerText = "Sudah divalidasi dan disinkronkan!";
  }

  setTimeout(() => {
    existingToast!.style.opacity = '1';
    existingToast!.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    existingToast!.style.opacity = '0';
    existingToast!.style.transform = 'translateY(20px)';
  }, 3000);

  if (typeof (window as any).refreshReportTableUI === 'function') {
    (window as any).refreshReportTableUI();
  }
}

// 6. Tombol Validasi & Sinkronisasi data Tindak Lanjut otomatis dari LHP
export function handleSingleValidationTL(): void {
  if ((typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0) && store.databasePerkara.length > 0) {
    store.activeRecordIndex = 0;
  }

  if (typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    showToast("INFORMASI", "Belum ada data perkara/LHP yang tersedia untuk divalidasi.", "warning");
    return;
  }

  const activeRecord = store.databasePerkara[store.activeRecordIndex];
  const noLhp = activeRecord.Nomor_LHP || activeRecord.NoLP_LP_1 || '1';
  const tglLhp = activeRecord.Tanggal_LHP || activeRecord.Tanggal_LP_LP_1 || '';

  activeRecord.TL_Tanggal_Surat = activeRecord.TL_Tanggal_Surat || tglLhp;
  activeRecord.TL_Hari_BAST = activeRecord.TL_Hari_BAST || activeRecord.Hari_SBP || 'Selasa';
  activeRecord.TL_Tgl_Huruf_BAST = activeRecord.TL_Tgl_Huruf_BAST || tanggalKeTeks(tglLhp);
  activeRecord.TL_Nama_Pemilik = activeRecord.TL_Nama_Pemilik || activeRecord.Nama_Pelaku || '-';
  activeRecord.TL_NIK_Pemilik = activeRecord.TL_NIK_Pemilik || activeRecord.Nomor_Identitas || '-';
  activeRecord.TL_Alamat_Pemilik = activeRecord.TL_Alamat_Pemilik || activeRecord.Alamat_Pelaku || '-';
  
  activeRecord.KEP_Tanggal_ND = activeRecord.KEP_Tanggal_ND || tglLhp;
  activeRecord.KEP_Nomor_ND = activeRecord.KEP_Nomor_ND || `KEP-${noLhp}/KPU.2064/2026`;
  activeRecord.SPSA_Nomor = activeRecord.SPSA_Nomor || noLhp;
  activeRecord.SPSA_Tanggal = activeRecord.SPSA_Tanggal || tglLhp;
  activeRecord.Limpah_Tanggal = activeRecord.Limpah_Tanggal || tglLhp;

  savePerkaraToStorage();

  const bannerBox = document.getElementById('tlValidatorBanner');
  if (bannerBox) bannerBox.style.display = 'flex';
  
  const statusLabel = document.getElementById('tlActiveStatusLabel');
  if (statusLabel) {
    const lhpLabel = activeRecord.Nomor_LHP ? `LHP-${activeRecord.Nomor_LHP}` : `LP-${activeRecord.NoLP_LP_1}`;
    statusLabel.textContent = `TERVALIDASI: ${lhpLabel} (Pelaku: ${escText(activeRecord.Nama_Pelaku)})`;
  }

  showToast("SUKSES", "Data Tindak Lanjut berhasil divalidasi & disinkronkan dari LHP!", "success");

  if (typeof (window as any).refreshTLTableUI === 'function') {
    (window as any).refreshTLTableUI();
  }
}


/* ============================================================================
 * [BAGIAN D] GLOBAL WINDOW EXPOSURE
 * ----------------------------------------------------------------------------
 * Binding ke window object agar dapat dipanggil dari onclick atribut HTML.
 * ============================================================================ */

// Global
(window as any).showToast = showToast;
(window as any).showToastConfirm = showToastConfirm;
(window as any).changePaperSize = changePaperSize;
(window as any).autoPaginateReports = autoPaginateReports;
(window as any).applyPageNumbers = applyPageNumbers;
(window as any).navigatePreviewPage = navigatePreviewPage;
(window as any).renderPageSelector = renderPageSelector;
(window as any).selectPreviewPage = selectPreviewPage;

// Menu Laporan
(window as any).updatePreviewHeaderUI = updatePreviewHeaderUI;
(window as any).handleEditDocFocus = handleEditDocFocus;
(window as any).closeEditDocModal = closeEditDocModal;
(window as any).saveAndCloseEditDocModal = saveAndCloseEditDocModal;

// Menu Tindak Lanjut
(window as any).updateTLPreviewHeaderUI = updateTLPreviewHeaderUI;
(window as any).focusEditTLDoc = focusEditTLDoc;
(window as any).closeEditTLDocModal = closeEditTLDocModal;
(window as any).saveAndCloseEditTLDocModal = saveAndCloseEditTLDocModal;
(window as any).handleSingleValidationTL = handleSingleValidationTL;