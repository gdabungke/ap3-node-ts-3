import { store, savePerkaraToStorage } from '../state/store.js';
import { escText, terbilangHuruf } from '../utils/formatters.js';
import { showToast } from './ui.js';

export function syncDspJenisPerkara(val: string): void {
  let el = document.getElementById('dsp_jenis_perkara') as HTMLInputElement;
  if(el) el.value = val;
}

export function toggleDspJenisDokumen(val: string): void {
  let manual = document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement;
  let nomorInput = document.getElementById('dsp_nomor_dok') as HTMLInputElement;
  
  if(val === 'Tanpa Dokumen') {
    if(manual) {
      manual.style.display = 'none';
      manual.value = '';
    }
    if(nomorInput) {
      nomorInput.value = '';
      nomorInput.disabled = true;
    }
    let dokEl = document.getElementById('dsp_dokumen_pemberitahuan') as HTMLInputElement;
    if(dokEl) dokEl.value = 'Tanpa Dokumen';
  } else {
    if(nomorInput) nomorInput.disabled = false;
    if(manual) {
      if(val === 'LAINNYA') {
        manual.style.display = 'block';
      } else {
        manual.style.display = 'none';
        manual.value = val === '-' ? '' : val;
      }
    }
    syncDspDokumenPemberitahuan();
  }
}

export function syncDspDokumenPemberitahuan(): void {
  let selEl = document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement;
  let sel = selEl ? selEl.value : 'Tanpa Dokumen';
  let dokEl = document.getElementById('dsp_dokumen_pemberitahuan') as HTMLInputElement;
  if (sel === 'Tanpa Dokumen') {
    if(dokEl) dokEl.value = 'Tanpa Dokumen';
    return;
  }
  let manEl = document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement;
  let jenis = sel === 'LAINNYA' ? (manEl ? manEl.value : '') : (sel === '-' ? '' : sel);
  let nomorEl = document.getElementById('dsp_nomor_dok') as HTMLInputElement;
  let nomor = nomorEl ? nomorEl.value : '';
  
  let res: string[] = [];
  if(jenis && jenis.trim()) res.push(jenis.trim());
  if(nomor && nomor.trim()) res.push(nomor.trim());
  if(dokEl) dokEl.value = res.length > 0 ? res.join(' ') : 'Tanpa Dokumen';
}

export function handleDspJenisKoliChange(val: string): void {
  let manualInput = document.getElementById('dsp_jenis_koli') as HTMLInputElement;
  if (!manualInput) return;

  if (val === 'LAINNYA') {
    manualInput.style.display = 'block';
    manualInput.value = '';
    manualInput.focus();
  } else {
    manualInput.style.display = 'none';
    manualInput.value = (val === '-' ? '' : val);
  }
  generateDspUraianBarangOtomatis();
}

export function handleDspJenisKoliSelectChange(val: string): void {
  handleDspJenisKoliChange(val);
}

export function generateDspUraianBarangOtomatis(): void {
  let jml = (document.getElementById('dsp_jumlah_koli') as HTMLInputElement) ? (document.getElementById('dsp_jumlah_koli') as HTMLInputElement).value.trim() : '';
  let satuanSelect = (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement) ? (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement).value : '';
  let satuan = satuanSelect === 'LAINNYA' 
    ? ((document.getElementById('dsp_jenis_koli') as HTMLInputElement) ? (document.getElementById('dsp_jenis_koli') as HTMLInputElement).value.trim() : '') 
    : (satuanSelect !== '-' ? satuanSelect : '');
  let barang = (document.getElementById('dsp_auto_barang') as HTMLInputElement) ? (document.getElementById('dsp_auto_barang') as HTMLInputElement).value.trim() : '';
  let akhiranTipe = (document.getElementById('dsp_auto_akhiran_select') as HTMLSelectElement) ? (document.getElementById('dsp_auto_akhiran_select') as HTMLSelectElement).value : '';
  let kustomText = (document.getElementById('dsp_auto_kustom_text') as HTMLInputElement) ? (document.getElementById('dsp_auto_kustom_text') as HTMLInputElement).value.trim() : '';

  let kustomContainer = document.getElementById('dsp_auto_kustom_container') as HTMLElement;
  if (kustomContainer) {
    kustomContainer.style.display = (akhiranTipe === 'manual') ? 'block' : 'none';
  }

  if (!jml && !satuan && !barang) return;

  let cleanBarang = barang.replace(/[,.\s]+$/, '').trim();
  let jmlTerbilang = typeof terbilangHuruf === 'function' ? terbilangHuruf(jml) : jml;
  let formattedJml = jml ? `${jml} (${jmlTerbilang})` : '';

  let parts = [formattedJml, satuan, cleanBarang].filter(p => p !== '' && p !== '-');
  let baseText = parts.join(' ');

  if (baseText) {
    baseText = baseText.charAt(0).toUpperCase() + baseText.slice(1);
  }

  if (cleanBarang) {
    if (akhiranTipe === 'dll') {
      baseText += ', dll.';
    } else if (akhiranTipe === 'etc') {
      baseText += ', etc.';
    } else if (akhiranTipe === 'barang_lainnya') {
      baseText += ', dan barang lainnya';
    } else if (akhiranTipe === 'manual' && kustomText) {
      baseText += `, ${kustomText.replace(/^,\s*/, '')}`;
    }
  }

  let uraianTarget = document.getElementById('dsp_uraian_barang') as HTMLInputElement;
  if (uraianTarget) {
    uraianTarget.value = baseText;
  }
}

export function updateDspCodePreviews(): void {
  let valLP = (document.getElementById('dsp_no_lp') as HTMLInputElement) ? (document.getElementById('dsp_no_lp') as HTMLInputElement).value.trim() : '';
  let valSBP = (document.getElementById('dsp_no_sbp') as HTMLInputElement) ? (document.getElementById('dsp_no_sbp') as HTMLInputElement).value.trim() : '';
  let valSPRIN = (document.getElementById('dsp_no_sprin') as HTMLInputElement) ? (document.getElementById('dsp_no_sprin') as HTMLInputElement).value.trim() : '';

  let previewLP = document.getElementById('dsp_preview_NoLP');
  let previewSBP = document.getElementById('dsp_preview_SBP');
  let previewSPRIN = document.getElementById('dsp_preview_SPRIN');

  if(previewLP) {
    previewLP.textContent = valLP !== '' ? `LP-${valLP}/KPU.206/2026` : 'LP-/KPU.206/2026';
  }
  if(previewSBP) {
    previewSBP.textContent = valSBP !== '' ? `SBP-${valSBP}/MANDIRI/KPU.2/2026` : 'SBP-/MANDIRI/KPU.2/2026';
  }
  if(previewSPRIN) {
    let sprinPad = valSPRIN !== '' ? (valSPRIN.length < 2 ? String(valSPRIN).padStart(2, '0') : valSPRIN) : '01';
    previewSPRIN.textContent = valSPRIN !== '' ? `SPRIN-${sprinPad}/KPU.206/2026` : 'SPRIN-/KPU.206/2026';
  }
}

let currentDisposisiPage = 1;
const rowsPerPage = 5;

function cloneDropdown(masterId: string, dspId: string): void {
  let master = document.getElementById(masterId) as HTMLSelectElement;
  let dsp = document.getElementById(dspId) as HTMLSelectElement;
  if (master && dsp) {
    dsp.innerHTML = master.innerHTML;
    dsp.value = master.value;
    dsp.dispatchEvent(new Event('change'));
  }
}

// Helper untuk mengambil data disposisi dari server via API
async function fetchDisposisiList(): Promise<any[]> {
  try {
    let res = await fetch('/api/disposisi');
    let json = await res.json();
    if (json.success) {
      return json.data || [];
    }
  } catch (e) {
    console.error("Gagal mengambil disposisi dari server:", e);
  }
  // Fallback ke localStorage jika server gagal
  return JSON.parse(localStorage.getItem('databaseDisposisi') || '[]');
}

// Helper untuk menyimpan data disposisi ke server via API
async function saveDisposisiListToServer(list: any[]): Promise<void> {
  // Simpan juga ke localStorage sebagai cache lokal
  localStorage.setItem('databaseDisposisi', JSON.stringify(list));
  try {
    await fetch('/api/disposisi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
  } catch (e) {
    console.error("Gagal menyimpan disposisi ke server:", e);
  }
}

export async function openDisposisiModal(editIndex: number = -1): Promise<void> {
  let modal = document.getElementById('disposisiModal') || document.getElementById('modalDisposisi') || document.getElementById('modalUsulDisposisi');
  let modalTitle = document.getElementById('disposisiModalTitle') || document.getElementById('modalDisposisiTitle');
  let editingIndexInput = document.getElementById('editingDisposisiIndex') as HTMLInputElement || document.getElementById('editingDisposisiId') as HTMLInputElement;
  if (editingIndexInput) editingIndexInput.value = String(editIndex);

  cloneDropdown('Jenis_Identitas_Select', 'dsp_jenis_identitas');
  cloneDropdown('Jenis_Perkara_Select', 'dsp_jenis_perkara_select');
  cloneDropdown('Jenis_Dok_Pemberitahuan_Select', 'dsp_jenis_dok_select');
  cloneDropdown('Komoditi_Select', 'dsp_komoditi_select');
  cloneDropdown('Komoditi_Select', 'dsp_komoditi');
  cloneDropdown('Jenis_Koli_Select', 'dsp_jenis_koli_select');
  
  if (editIndex < 0) {
    if (document.getElementById('dsp_nama_pelaku')) (document.getElementById('dsp_nama_pelaku') as HTMLInputElement).value = '';
    
    let jenisIdentitasSelect = document.getElementById('dsp_jenis_identitas') as HTMLSelectElement;
    if (jenisIdentitasSelect) {
      jenisIdentitasSelect.value = jenisIdentitasSelect.options[0] ? jenisIdentitasSelect.options[0].value : 'KTP';
    }
    let nomorIdentitasInput = document.getElementById('dsp_nomor_identitas') as HTMLInputElement || document.getElementById('dsp_no_identitas') as HTMLInputElement;
    if (nomorIdentitasInput) nomorIdentitasInput.value = '';

    let jenisPerkaraSelect = document.getElementById('dsp_jenis_perkara_select') as HTMLSelectElement;
    if (jenisPerkaraSelect) jenisPerkaraSelect.value = '-';
    if (document.getElementById('dsp_jenis_perkara')) (document.getElementById('dsp_jenis_perkara') as HTMLInputElement).value = '';
    
    let jenisDokSelect = document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement;
    if (jenisDokSelect) jenisDokSelect.value = 'Tanpa Dokumen';
    let manualDok = document.getElementById('dsp_jenis_dok_manual') as HTMLElement;
    if (manualDok) manualDok.style.display = 'none';
    let nomorDok = document.getElementById('dsp_nomor_dok') as HTMLInputElement;
    if (nomorDok) {
      nomorDok.value = '';
      nomorDok.disabled = true;
    }
    if (document.getElementById('dsp_dokumen_pemberitahuan')) (document.getElementById('dsp_dokumen_pemberitahuan') as HTMLInputElement).value = 'Tanpa Dokumen';
    if (document.getElementById('dsp_tgl_dokumen')) (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement).value = '';
    
    let komoditiSelect = document.getElementById('dsp_komoditi_select') as HTMLSelectElement || document.getElementById('dsp_komoditi') as HTMLSelectElement;
    if (komoditiSelect) komoditiSelect.value = '-';

    if (document.getElementById('dsp_jumlah_koli')) (document.getElementById('dsp_jumlah_koli') as HTMLInputElement).value = '';
    let jenisKoliSelect = document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement;
    if (jenisKoliSelect) jenisKoliSelect.value = '-';
    let manualKoli = document.getElementById('dsp_jenis_koli') as HTMLElement;
    if (manualKoli) manualKoli.style.display = 'none';
    if (document.getElementById('dsp_auto_barang')) (document.getElementById('dsp_auto_barang') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_uraian_barang')) (document.getElementById('dsp_uraian_barang') as HTMLInputElement).value = '';
    
    if (document.getElementById('dsp_no_lp')) (document.getElementById('dsp_no_lp') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_tgl_lp')) (document.getElementById('dsp_tgl_lp') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_no_sbp')) (document.getElementById('dsp_no_sbp') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_tgl_sbp')) (document.getElementById('dsp_tgl_sbp') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_no_sprin')) (document.getElementById('dsp_no_sprin') as HTMLInputElement).value = '';
    if (document.getElementById('dsp_tgl_sprin')) (document.getElementById('dsp_tgl_sprin') as HTMLInputElement).value = '';
    
    let targetSelect = document.getElementById('dsp_target_penyidik') as HTMLSelectElement;
    if (targetSelect) targetSelect.value = '-';
  }

  let isReadOnly = false;
  if (editIndex >= 0) {
    let listDisposisi = await fetchDisposisiList();
    let dspData = listDisposisi[editIndex];
    
    if (dspData) {
      let rawStatus = String(dspData.status || dspData.statusDisposisi || '').toLowerCase();
      if (rawStatus.includes('didisposisikan') || rawStatus.includes('diterima')) {
        isReadOnly = true;
      }

      if (document.getElementById('dsp_nama_pelaku')) (document.getElementById('dsp_nama_pelaku') as HTMLInputElement).value = dspData.pelaku || '';
      
      let jenisIdentitasSelect = document.getElementById('dsp_jenis_identitas') as HTMLSelectElement;
      if (jenisIdentitasSelect) jenisIdentitasSelect.value = dspData.jenisIdentitas || 'KTP';

      let nomorIdentitasInput = document.getElementById('dsp_nomor_identitas') as HTMLInputElement || document.getElementById('dsp_no_identitas') as HTMLInputElement;
      if (nomorIdentitasInput) nomorIdentitasInput.value = dspData.nomorIdentitas || '';

      if (document.getElementById('dsp_jenis_perkara')) (document.getElementById('dsp_jenis_perkara') as HTMLInputElement).value = dspData.jenisPerkara || '';
      let jpSel = document.getElementById('dsp_jenis_perkara_select') as HTMLSelectElement;
      if (jpSel && dspData.jenisPerkara) jpSel.value = dspData.jenisPerkara;

      let komoditiTarget = document.getElementById('dsp_komoditi_select') as HTMLSelectElement || document.getElementById('dsp_komoditi') as HTMLSelectElement;
      if (komoditiTarget) komoditiTarget.value = dspData.komoditi || '-';

      if (dspData.dokPemberitahuan && dspData.dokPemberitahuan !== 'Tanpa Dokumen') {
        let parts = dspData.dokPemberitahuan.split(' Nomor ');
        let jDok = parts[0] ? parts[0].trim() : '';
        let nDok = parts[1] ? parts[1].trim() : '';

        let jDokSelect = document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement;
        let jDokManual = document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement;
        let nDokInput = document.getElementById('dsp_nomor_dok') as HTMLInputElement;

        if (jDokSelect) {
          let hasOpt = Array.from(jDokSelect.options).some(o => o.value === jDok);
          if (hasOpt) {
            jDokSelect.value = jDok;
            if (jDokManual) jDokManual.style.display = 'none';
          } else {
            jDokSelect.value = 'LAINNYA';
            if (jDokManual) {
              jDokManual.style.display = 'block';
              jDokManual.value = jDok;
            }
          }
        }
        if (nDokInput) {
          nDokInput.disabled = false;
          nDokInput.value = nDok;
        }
      } else {
        let jDokSelect = document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement;
        if (jDokSelect) jDokSelect.value = 'Tanpa Dokumen';
        let nDokInput = document.getElementById('dsp_nomor_dok') as HTMLInputElement;
        if (nDokInput) {
          nDokInput.value = '';
          nDokInput.disabled = true;
        }
      }

      if (document.getElementById('dsp_dokumen_pemberitahuan')) (document.getElementById('dsp_dokumen_pemberitahuan') as HTMLInputElement).value = dspData.dokPemberitahuan || 'Tanpa Dokumen';
      if (document.getElementById('dsp_tgl_dokumen')) (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement).value = dspData.tglDokPemberitahuan || '';
      
      if (document.getElementById('dsp_jumlah_koli')) (document.getElementById('dsp_jumlah_koli') as HTMLInputElement).value = dspData.jumlahKoli || '';
      if (document.getElementById('dsp_jenis_koli_select')) {
        (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement).value = dspData.jenisKoli || '-';
        handleDspJenisKoliChange(dspData.jenisKoli || '-');
      }
      if (document.getElementById('dsp_auto_barang')) (document.getElementById('dsp_auto_barang') as HTMLInputElement).value = dspData.autoBarang || '';
      if (document.getElementById('dsp_uraian_barang')) (document.getElementById('dsp_uraian_barang') as HTMLInputElement).value = dspData.uraianBarang || '';

      if (document.getElementById('dsp_no_lp')) (document.getElementById('dsp_no_lp') as HTMLInputElement).value = dspData.noLp || '';
      if (document.getElementById('dsp_tgl_lp')) (document.getElementById('dsp_tgl_lp') as HTMLInputElement).value = dspData.tglLp || '';
      if (document.getElementById('dsp_no_sbp')) (document.getElementById('dsp_no_sbp') as HTMLInputElement).value = dspData.noSbp || '';
      if (document.getElementById('dsp_tgl_sbp')) (document.getElementById('dsp_tgl_sbp') as HTMLInputElement).value = dspData.tglSbp || '';
      if (document.getElementById('dsp_no_sprin')) (document.getElementById('dsp_no_sprin') as HTMLInputElement).value = dspData.noSprin || '';
      if (document.getElementById('dsp_tgl_sprin')) (document.getElementById('dsp_tgl_sprin') as HTMLInputElement).value = dspData.tglSprin || '';
      
      let targetSelect = document.getElementById('dsp_target_penyidik') as HTMLSelectElement;
      if (targetSelect) targetSelect.value = dspData.targetPenyidik || '-';
    }
  }

  if (modal) {
    let inputs = modal.querySelectorAll('input, select, textarea');
    inputs.forEach((el: any) => {
      if (el.id !== 'editingDisposisiIndex') {
        el.disabled = isReadOnly;
      }
    });

    let footerContainers = modal.querySelectorAll('.modal-footer, .modal-actions, .form-actions, div[style*="justify-content: flex-end"]');
    footerContainers.forEach((container: any) => {
      let buttons = container.querySelectorAll('button');
      buttons.forEach((btn: HTMLElement) => {
        if (!btn.classList.contains('close-modal-btn') && !btn.classList.contains('btn-close')) {
          btn.style.display = isReadOnly ? 'none' : '';
        }
      });
    });

    if (modalTitle) {
      modalTitle.textContent = isReadOnly 
        ? "Detail Disposisi Berkas (Read-Only)" 
        : (editIndex < 0 ? "Form Pengusulan & Disposisi Berkas" : "Edit Draf Disposisi");
    }
  }

  updateDspCodePreviews();
  populatePenyidikDropdownForDisposisi();
  if (modal) modal.classList.add('active');
}

export function closeDisposisiModal(): void {
  let modal = document.getElementById('disposisiModal') || document.getElementById('modalDisposisi') || document.getElementById('modalUsulDisposisi');
  if(modal) modal.classList.remove('active');
}

export function populatePenyidikDropdownForDisposisi(): void {
  let select = document.getElementById('dsp_target_penyidik') as HTMLSelectElement;
  if (!select) return;

  let sourceUsers = store.userAccounts || (store as any).databaseUser || JSON.parse(localStorage.getItem('databaseUser') || '[]');
  let penyidikList = sourceUsers.filter((u: any) => 
    u.role === 'Penyidik / Ketua Tim Peneliti' || u.role === 'Penyidik'
  );

  if (penyidikList.length > 0) {
    select.innerHTML = `<option value="-">- Pilih Penyidik / Peneliti Tujuan -</option>` + 
      penyidikList.map((u: any) => `<option value="${escText(u.nama || u.username)}">${escText(u.nama || u.username)} (${escText(u.email || u.role || 'Penyidik')})</option>`).join('');
  } else {
    let masterTarget = document.getElementById('val_disposisi_user') as HTMLSelectElement;
    if (masterTarget && masterTarget.options.length > 0) {
      select.innerHTML = masterTarget.innerHTML;
    }
  }
}

export async function simpanDraftDisposisi(): Promise<void> {
  let pelaku = (document.getElementById('dsp_nama_pelaku') as HTMLInputElement) ? (document.getElementById('dsp_nama_pelaku') as HTMLInputElement).value.trim() : '';
  
  let jenisIdentitasSelect = document.getElementById('dsp_jenis_identitas') as HTMLSelectElement;
  let jenisIdentitas = jenisIdentitasSelect ? jenisIdentitasSelect.value : 'KTP';
  let nomorIdentitasInput = document.getElementById('dsp_nomor_identitas') as HTMLInputElement || document.getElementById('dsp_no_identitas') as HTMLInputElement;
  let nomorIdentitas = nomorIdentitasInput ? nomorIdentitasInput.value.trim() : '';

  let jenisPerkaraSelect = document.getElementById('dsp_jenis_perkara_select') as HTMLSelectElement;
  let jenisPerkaraSelectVal = jenisPerkaraSelect ? jenisPerkaraSelect.value : '';
  let jenisPerkaraManual = (document.getElementById('dsp_jenis_perkara') as HTMLInputElement) ? (document.getElementById('dsp_jenis_perkara') as HTMLInputElement).value.trim() : '';
  let jenisPerkara = jenisPerkaraManual || (jenisPerkaraSelectVal !== '-' ? jenisPerkaraSelectVal : '');

  let jenisDokSelect = (document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement) ? (document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement).value : 'Tanpa Dokumen';
  let jenisDokManual = (document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement) ? (document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement).value.trim() : '';
  let nomorDok = (document.getElementById('dsp_nomor_dok') as HTMLInputElement) ? (document.getElementById('dsp_nomor_dok') as HTMLInputElement).value.trim() : '';
  
  let jenisDokFinal = (jenisDokSelect === 'Lainnya' || jenisDokSelect === 'LAINNYA') ? jenisDokManual : jenisDokSelect;
  let dokPemberitahuan = jenisDokFinal;
  if (jenisDokFinal && jenisDokFinal !== 'Tanpa Dokumen' && nomorDok) {
    dokPemberitahuan = `${jenisDokFinal} Nomor ${nomorDok}`;
  }

  let komoditiSelect = document.getElementById('dsp_komoditi_select') as HTMLSelectElement || document.getElementById('dsp_komoditi') as HTMLSelectElement;
  let komoditi = komoditiSelect ? komoditiSelect.value : '-';

  let tglDokPemberitahuan = (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement) ? (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement).value : '';
  let jumlahKoli = (document.getElementById('dsp_jumlah_koli') as HTMLInputElement) ? (document.getElementById('dsp_jumlah_koli') as HTMLInputElement).value.trim() : '';
  let jenisKoli = (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement) ? (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement).value : '-';
  let autoBarang = (document.getElementById('dsp_auto_barang') as HTMLInputElement) ? (document.getElementById('dsp_auto_barang') as HTMLInputElement).value.trim() : '';
  let uraianBarang = (document.getElementById('dsp_uraian_barang') as HTMLInputElement) ? (document.getElementById('dsp_uraian_barang') as HTMLInputElement).value.trim() : '';
  
  let noLp = (document.getElementById('dsp_no_lp') as HTMLInputElement) ? (document.getElementById('dsp_no_lp') as HTMLInputElement).value.trim() : '';
  let tglLp = (document.getElementById('dsp_tgl_lp') as HTMLInputElement) ? (document.getElementById('dsp_tgl_lp') as HTMLInputElement).value : '';
  let noSbp = (document.getElementById('dsp_no_sbp') as HTMLInputElement) ? (document.getElementById('dsp_no_sbp') as HTMLInputElement).value.trim() : '';
  let tglSbp = (document.getElementById('dsp_tgl_sbp') as HTMLInputElement) ? (document.getElementById('dsp_tgl_sbp') as HTMLInputElement).value : '';
  let noSprin = (document.getElementById('dsp_no_sprin') as HTMLInputElement) ? (document.getElementById('dsp_no_sprin') as HTMLInputElement).value.trim() : '';
  let tglSprin = (document.getElementById('dsp_tgl_sprin') as HTMLInputElement) ? (document.getElementById('dsp_tgl_sprin') as HTMLInputElement).value : '';
  let targetPenyidik = (document.getElementById('dsp_target_penyidik') as HTMLSelectElement) ? (document.getElementById('dsp_target_penyidik') as HTMLSelectElement).value : '-';

  if(!noLp || !pelaku) {
    showToast("ISIAN BELUM LENGKAP", "Nomor LP dan Nama Pelaku wajib diisi untuk menyimpan draf!", "warning");
    return;
  }

  let editIndexInput = document.getElementById('editingDisposisiIndex') as HTMLInputElement || document.getElementById('editingDisposisiId') as HTMLInputElement;
  let editIndex = editIndexInput ? parseInt(editIndexInput.value) : -1;

  let listDisposisi = await fetchDisposisiList();
  let targetId = (editIndex >= 0 && listDisposisi[editIndex]) ? listDisposisi[editIndex].id : Date.now();

  let dspDataObj = {
    id: targetId,
    pelaku,
    jenisIdentitas,
    nomorIdentitas,
    jenisPerkara,
    komoditi,
    dokPemberitahuan,
    tglDokPemberitahuan, 
    jumlahKoli,
    jenisKoli,
    autoBarang,
    uraianBarang,
    noLp,
    tglLp,
    noSbp,
    tglSbp,
    noSprin,
    tglSprin,
    targetPenyidik: targetPenyidik,
    pengusul: store && store.currentUser ? (store.currentUser.namaLengkap || store.currentUser.nama || store.currentUser.username) : 'Admin',
    status: 'DRAF (BELUM DITUNJUK)',
    statusDisposisi: 'DRAF (BELUM DITUNJUK)',
    tanggalDisposisi: (editIndex >= 0 && listDisposisi[editIndex]) ? listDisposisi[editIndex].tanggalDisposisi : new Date().toISOString(),
    notifiedForMe: false
  };

  let existingIndexById = listDisposisi.findIndex((d: any) => Number(d.id) === Number(targetId));
  if (existingIndexById !== -1) {
    listDisposisi[existingIndexById] = dspDataObj;
  } else {
    listDisposisi.push(dspDataObj);
  }
  
  await saveDisposisiListToServer(listDisposisi);
  renderDisposisiTable();
  closeDisposisiModal();
  showToast("BERHASIL", "Draf disposisi berhasil disimpan.", "success");
}

export async function kirimDisposisiBerkat(): Promise<void> {
  let pelaku = (document.getElementById('dsp_nama_pelaku') as HTMLInputElement) ? (document.getElementById('dsp_nama_pelaku') as HTMLInputElement).value.trim() : '';
  
  let jenisIdentitasSelect = document.getElementById('dsp_jenis_identitas') as HTMLSelectElement;
  let jenisIdentitas = jenisIdentitasSelect ? jenisIdentitasSelect.value : 'KTP';
  let nomorIdentitasInput = document.getElementById('dsp_nomor_identitas') as HTMLInputElement || document.getElementById('dsp_no_identitas') as HTMLInputElement;
  let nomorIdentitas = nomorIdentitasInput ? nomorIdentitasInput.value.trim() : '';

  let jenisPerkaraSelect = document.getElementById('dsp_jenis_perkara_select') as HTMLSelectElement;
  let jenisPerkaraSelectVal = jenisPerkaraSelect ? jenisPerkaraSelect.value : '';
  let jenisPerkaraManual = (document.getElementById('dsp_jenis_perkara') as HTMLInputElement) ? (document.getElementById('dsp_jenis_perkara') as HTMLInputElement).value.trim() : '';
  let jenisPerkara = jenisPerkaraManual || (jenisPerkaraSelectVal !== '-' ? jenisPerkaraSelectVal : '');

  let jenisDokSelect = (document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement) ? (document.getElementById('dsp_jenis_dok_select') as HTMLSelectElement).value : 'Tanpa Dokumen';
  let jenisDokManual = (document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement) ? (document.getElementById('dsp_jenis_dok_manual') as HTMLInputElement).value.trim() : '';
  let nomorDok = (document.getElementById('dsp_nomor_dok') as HTMLInputElement) ? (document.getElementById('dsp_nomor_dok') as HTMLInputElement).value.trim() : '';
  
  let jenisDokFinal = (jenisDokSelect === 'Lainnya' || jenisDokSelect === 'LAINNYA') ? jenisDokManual : jenisDokSelect;
  let dokPemberitahuan = jenisDokFinal;
  if (jenisDokFinal && jenisDokFinal !== 'Tanpa Dokumen' && nomorDok) {
    dokPemberitahuan = `${jenisDokFinal} Nomor ${nomorDok}`;
  }

  let komoditiSelect = document.getElementById('dsp_komoditi_select') as HTMLSelectElement || document.getElementById('dsp_komoditi') as HTMLSelectElement;
  let komoditi = komoditiSelect ? komoditiSelect.value : '-';

  let tglDokPemberitahuan = (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement) ? (document.getElementById('dsp_tgl_dokumen') as HTMLInputElement).value : '';
  let jumlahKoli = (document.getElementById('dsp_jumlah_koli') as HTMLInputElement) ? (document.getElementById('dsp_jumlah_koli') as HTMLInputElement).value.trim() : '';
  let jenisKoli = (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement) ? (document.getElementById('dsp_jenis_koli_select') as HTMLSelectElement).value : '-';
  let autoBarang = (document.getElementById('dsp_auto_barang') as HTMLInputElement) ? (document.getElementById('dsp_auto_barang') as HTMLInputElement).value.trim() : '';
  let uraianBarang = (document.getElementById('dsp_uraian_barang') as HTMLInputElement) ? (document.getElementById('dsp_uraian_barang') as HTMLInputElement).value.trim() : '';
  
  let noLp = (document.getElementById('dsp_no_lp') as HTMLInputElement) ? (document.getElementById('dsp_no_lp') as HTMLInputElement).value.trim() : '';
  let tglLp = (document.getElementById('dsp_tgl_lp') as HTMLInputElement) ? (document.getElementById('dsp_tgl_lp') as HTMLInputElement).value : '';
  let noSbp = (document.getElementById('dsp_no_sbp') as HTMLInputElement) ? (document.getElementById('dsp_no_sbp') as HTMLInputElement).value.trim() : '';
  let tglSbp = (document.getElementById('dsp_tgl_sbp') as HTMLInputElement) ? (document.getElementById('dsp_tgl_sbp') as HTMLInputElement).value : '';
  let noSprin = (document.getElementById('dsp_no_sprin') as HTMLInputElement) ? (document.getElementById('dsp_no_sprin') as HTMLInputElement).value.trim() : '';
  let tglSprin = (document.getElementById('dsp_tgl_sprin') as HTMLInputElement) ? (document.getElementById('dsp_tgl_sprin') as HTMLInputElement).value : '';
  let targetPenyidik = (document.getElementById('dsp_target_penyidik') as HTMLSelectElement) ? (document.getElementById('dsp_target_penyidik') as HTMLSelectElement).value : '-';

  if(!noLp || !pelaku || !targetPenyidik || targetPenyidik === '-') {
    showToast("BELUM LENGKAP", "Nomor LP, Nama Pelaku, dan Penyidik Tujuan WAJIB diisi untuk mengirim disposisi!", "warning");
    return;
  }

  let editIndexInput = document.getElementById('editingDisposisiIndex') as HTMLInputElement || document.getElementById('editingDisposisiId') as HTMLInputElement;
  let editIndex = editIndexInput ? parseInt(editIndexInput.value) : -1;

  let listDisposisi = await fetchDisposisiList();
  let targetId = (editIndex >= 0 && listDisposisi[editIndex]) ? listDisposisi[editIndex].id : Date.now();

  let dspDataObj = {
    id: targetId,
    pelaku,
    jenisIdentitas,
    nomorIdentitas,
    jenisPerkara,
    komoditi,
    dokPemberitahuan,
    tglDokPemberitahuan, 
    jumlahKoli,
    jenisKoli,
    autoBarang,
    uraianBarang,
    noLp,
    tglLp,
    noSbp,
    tglSbp,
    noSprin,
    tglSprin,
    targetPenyidik: targetPenyidik,
    pengusul: store && store.currentUser ? (store.currentUser.namaLengkap || store.currentUser.nama || store.currentUser.username) : 'Admin',
    status: 'DIDISPOSISIKAN',
    statusDisposisi: 'DIDISPOSISIKAN',
    tanggalDisposisi: (editIndex >= 0 && listDisposisi[editIndex]) ? listDisposisi[editIndex].tanggalDisposisi : new Date().toISOString(),
    notifiedForMe: false
  };

  let existingIndexById = listDisposisi.findIndex((d: any) => Number(d.id) === Number(targetId));
  if (existingIndexById !== -1) {
    listDisposisi[existingIndexById] = dspDataObj;
  } else {
    listDisposisi.push(dspDataObj);
  }
  
  await saveDisposisiListToServer(listDisposisi);
  renderDisposisiTable();
  closeDisposisiModal();
  showToast("BERHASIL", `Berkas LP-${noLp} berhasil didisposisikan kepada ${targetPenyidik}.`, "success");
}

export async function renderDisposisiTable(): Promise<void> {
  let tbody = document.getElementById('disposisiTableBody');
  if(!tbody) return;

  let listDisposisi = await fetchDisposisiList();
  let filtered = listDisposisi;
  
  let isPenyidik = store.currentUser && (
    store.currentUser.role === 'Penyidik / Ketua Tim Peneliti' || 
    store.currentUser.role === 'Penyidik'
  );

  if(isPenyidik) {
    let curNama = (store.currentUser?.namaLengkap || store.currentUser?.nama || store.currentUser?.username || '').toLowerCase();
    filtered = listDisposisi.filter((d: any) => 
      d.targetPenyidik && curNama && d.targetPenyidik.trim().toLowerCase() === curNama
    );
  }

  let totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  if (currentDisposisiPage > totalPages) currentDisposisiPage = totalPages;
  if (currentDisposisiPage < 1) currentDisposisiPage = 1;

  let startIdx = (currentDisposisiPage - 1) * rowsPerPage;
  let paginatedData = filtered.slice(startIdx, startIdx + rowsPerPage);

  if(paginatedData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:20px; color:var(--text-muted, #94a3b8);">Belum ada data disposisi berkas.</td></tr>`;
    renderDisposisiPagination(totalPages, filtered.length);
    return;
  }

  tbody.innerHTML = paginatedData.map((d: any, index: number) => {
    let realIndex = listDisposisi.findIndex((item: any) => item.id === d.id);
    let i = startIdx + index;
    let actionBtn = '';
    let rawStatus = String(d.status || d.statusDisposisi || 'DIDISPOSISIKAN');

    let statusText = '';
    let statusBadgeClass = 'badge-ready';

    if (rawStatus.includes('Ditolak')) {
      statusText = 'DITOLAK';
      statusBadgeClass = 'badge-danger';
    } else if (rawStatus.toLowerCase().includes('diterima')) {
      statusText = 'SUDAH DITERIMA';
      statusBadgeClass = 'badge-success';
    } else {
      if (isPenyidik) {
        statusText = 'DISPOSISI MASUK';
        statusBadgeClass = 'badge-warning';
      } else {
        statusText = 'DISPOSISI TERKIRIM';
        statusBadgeClass = 'badge-warning';
      }
    }

    let tglFormatted = d.tanggalDisposisi ? new Date(d.tanggalDisposisi).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '-';

    if(isPenyidik) {
      if(!rawStatus.toLowerCase().includes('diterima') && !rawStatus.toLowerCase().includes('ditolak')) {
        actionBtn = `
          <div style="display:flex; gap:4px; justify-content:flex-end;">
            <button type="button" class="btn primary btn-terima-dsp" onclick="responDisposisi('terima', '${d.id}')" style="padding:4px 8px; font-size:10px;">
              <i class="fi fi-rr-check"></i> Terima
            </button>
            <button type="button" class="btn danger btn-tolak-dsp" onclick="responDisposisi('tolak', '${d.id}')" style="padding:4px 8px; font-size:10px;">
              <i class="fi fi-rr-cross"></i> Tolak
            </button>
          </div>
        `;
      } else {
        actionBtn = `<button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${realIndex})'><i class="fi fi-rr-eye"></i> Detail</button>`;
      }
    } else {
      actionBtn = `
        <button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${realIndex})'>
          <i class="fi fi-rr-eye"></i> Detail
        </button>
      `;
    }

    let cleanSBP = String(d.noSbp || '-').replace(/^SBP-?/i, '');
    let cleanLP = String(d.noLp || '-').replace(/^LP-?/i, '');

    return `
      <tr>
        <td><b>${i + 1}</b></td>
        <td>
          <b>SBP-${escText(cleanSBP)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${escText(d.tglSbp || '-')}</small>
        </td>
        <td>
          <b>LP-${escText(cleanLP)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${escText(d.tglLp || '-')}</small>
        </td>
        <td>
          <span style="font-weight:600; font-size:12px; color:var(--text-main, #f8fafc);">${escText(d.pelaku || '-')}</span>
        </td>
        <td>
          <span style="font-size:11px; color:var(--text-main, #cbd5e1); font-weight:500;">
            <i class="fi fi-rr-document" style="font-size:10px; margin-right:3px;"></i>${escText(d.jenisPerkara || d.dokPemberitahuan || 'Kepabeanan & Cukai')}
          </span>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
            <span class="badge" style="background:rgba(14, 165, 233, 0.15); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.3); font-size:11px; padding:2px 7px; border-radius:4px; white-space:normal; line-height:1.3; text-align:left;">
              ${escText(d.komoditi || '-')}
            </span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px; line-height:1.35; word-break:break-word;">
              <i class="fi fi-rr-box-alt" style="font-size:10px; margin-right:3px;"></i>${escText(d.uraianBarang || '-')}
            </small>
          </div>
        </td>
        <td>
          <span class="badge-status ${statusBadgeClass}">${escText(statusText)}</span><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${tglFormatted}</small>
        </td>
        <td>
          <b>${escText(d.targetPenyidik || '-')}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Oleh: ${escText(d.pengusul || '-')}</small>
        </td>
        <td style="text-align:right;">${actionBtn}</td>
      </tr>
    `;
  }).join('');

  renderDisposisiPagination(totalPages, filtered.length);
}

function renderDisposisiPagination(totalPages: number, totalItems: number = 0): void {
  let paginationContainer = document.getElementById('disposisiPaginationContainer') || document.getElementById('perkaraPageInfo')?.parentElement;
  if (!paginationContainer) {
    let cardBodyEl = document.querySelector('#disposisi .panel-body, #disposisi .data-table-container, #disposisi');
    if (cardBodyEl) {
      let div = document.createElement('div');
      div.id = 'disposisiPaginationContainer';
      div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 4px 8px; font-size: 12px;';
      cardBodyEl.appendChild(div);
      paginationContainer = div;
    } else {
      return;
    }
  }

  const maxPage = totalPages > 0 ? totalPages : 1;
  if (currentDisposisiPage > maxPage) currentDisposisiPage = maxPage;

  paginationContainer.innerHTML = `
    <span style="color: var(--text-muted);">Halaman ${currentDisposisiPage} dari ${maxPage} <b style="margin-left: 8px; color: var(--text-main);">Total: ${totalItems} Data</b></span>
    <div style="display: flex; gap: 4px;">
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentDisposisiPage === 1 ? 'disabled' : ''} onclick="window.changeDisposisiPage(${currentDisposisiPage - 1})">Sebelumnya</button>
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentDisposisiPage >= maxPage ? 'disabled' : ''} onclick="window.changeDisposisiPage(${currentDisposisiPage + 1})">Selanjutnya</button>
    </div>
  `;
}

export function changeDisposisiPage(direction: number): void {
  currentDisposisiPage += direction;
  renderDisposisiTable();
}

export function terimaDisposisi(dspData: any): void {
  responDisposisi('terima', dspData.id || dspData.noLp);
}

export async function responDisposisi(aksi: string, idDisposisi: any): Promise<void> {
  let listDisposisi = await fetchDisposisiList();
  let target = listDisposisi.find((d: any) => String(d.id) === String(idDisposisi) || String(d.noLp) === String(idDisposisi));
  
  if (aksi === 'terima') {
    if (!target) {
      showToast("DATA TIDAK DITEMUKAN", "Data disposisi tidak ditemukan.", "danger");
      return;
    }

    target.status = "Disposisi Diterima";
    target.statusDisposisi = "Disposisi Diterima";
    target.waktuRespon = new Date().toISOString();
    await saveDisposisiListToServer(listDisposisi);

    let cleanTargetLP = String(target.noLp || '').replace(/^LP-?/i, '').trim();

    let foundIdx = store.databasePerkara.findIndex((r: any) => {
      let rLP = String(r.NoLP_LP_1 || '').replace(/^LP-?/i, '').trim();
      let rId = r.disposisiId ? String(r.disposisiId) : '';
      return (rId && rId === String(target.id)) || (rLP && rLP === cleanTargetLP);
    });

    let autoHariSBP = '';
    if (target.tglSbp) {
      let d = new Date(target.tglSbp);
      if (isNaN(d.getTime()) && String(target.tglSbp).includes('/')) {
        let p = target.tglSbp.split('/');
        d = new Date(`${p[2]}-${p[1]}-${p[0]}`);
      }
      if (!isNaN(d.getTime())) {
        const listHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        autoHariSBP = listHari[d.getDay()];
      }
    }

    let teksBarang = target.uraianBarang || target.autoBarang || target.komoditi || '';

    let mappedData: any = {
      disposisiId: target.id,
      NoLP_LP_1: target.noLp || '',
      Tanggal_LP_LP_1: target.tglLp || new Date().toISOString().split('T')[0],
      Nomor_SBP: target.noSbp || '',
      Tanggal_SBP: target.tglSbp || '',
      Hari_SBP: autoHariSBP || '-',
      No_SPRIN_Indak: target.noSprin || '',
      Tanggal_SPRIN_Indak: target.tglSprin || '',
      Nama_Pelaku: target.pelaku || '',
      Jenis_Identitas: target.jenisIdentitas || 'KTP',
      Nomor_Identitas: target.nomorIdentitas || '',
      Jenis_Perkara: target.jenisPerkara || '',
      Komoditi: target.komoditi || '-',
      Dokumen_Pemberitahuan: target.dokPemberitahuan || 'Tanpa Dokumen',
      Tanggal_Dokumen_Pemberitahuan: target.tglDokPemberitahuan || '',
      Jumlah_Koli: target.jumlahKoli || '',
      Jenis_Koli: target.jenisKoli || '',
      Nama_Barang: teksBarang,
      Uraian_Barang: teksBarang,
      Detail_Barang_LPP: teksBarang,
      disposisiPetugas: target.targetPenyidik || (store.currentUser ? (store.currentUser.namaLengkap || store.currentUser.nama) : 'Penyidik'),
      statusAlur: "DITERIMA PENYIDIK"
    };
    
    if (foundIdx !== -1) {
      store.databasePerkara[foundIdx] = {
        ...store.databasePerkara[foundIdx],
        ...mappedData
      };
      store.activeRecordIndex = foundIdx;
    } else {
      mappedData.id = Date.now();
      store.databasePerkara.push(mappedData);
      store.activeRecordIndex = store.databasePerkara.length - 1;
    }

    savePerkaraToStorage();
    if (typeof (window as any).renderPerkaraTable === 'function') (window as any).renderPerkaraTable();

    document.querySelectorAll('.nav-btn').forEach((btn: Element) => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach((tab: Element) => tab.classList.remove('active'));
    
    let dataBtn = document.querySelector('.nav-btn[data-target="data"]');
    if(dataBtn) dataBtn.classList.add('active');
    let dataTab = document.getElementById('data');
    if(dataTab) dataTab.classList.add('active');

    if (typeof (window as any).editPerkara === 'function') {
      (window as any).editPerkara(store.activeRecordIndex);
    }

    showToast("DISPOSISI DITERIMA", `Berkas a.n ${target.pelaku} diterima. Data berhasil dipetakan otomatis ke form perkara.`, "success");
    renderDisposisiTable();
  } 
  else if (aksi === 'tolak') {
    let modal = document.getElementById('alasanTolakModal');
    let inputData = document.getElementById('currentTolakDspData') as HTMLInputElement;
    let inputText = document.getElementById('inputAlasanTolak') as HTMLInputElement;
    
    if(inputData) inputData.value = String(idDisposisi);
    if(inputText) inputText.value = '';
    if(modal) modal.classList.add('active');
    if(inputText) inputText.focus();
  }
}

export function closeAlasanTolakModal(): void {
  let modal = document.getElementById('alasanTolakModal');
  if(modal) modal.classList.remove('active');
}

export async function submitTolakDisposisi(): Promise<void> {
  let rawId = (document.getElementById('currentTolakDspData') as HTMLInputElement) ? (document.getElementById('currentTolakDspData') as HTMLInputElement).value : '';
  let alasan = (document.getElementById('inputAlasanTolak') as HTMLInputElement) ? (document.getElementById('inputAlasanTolak') as HTMLInputElement).value.trim() : '';

  if(!rawId) {
    showToast("GAGAL", "ID data tidak valid.", "danger");
    return;
  }

  let listDisposisi = await fetchDisposisiList();
  let target = listDisposisi.find((d: any) => String(d.id) === String(rawId) || String(d.noLp) === String(rawId));
  
  if(target) {
    target.status = "Disposisi Ditolak: " + (alasan || "Tanpa alasan");
    target.statusDisposisi = "Disposisi Ditolak: " + (alasan || "Tanpa alasan");
    target.waktuRespon = new Date().toISOString();
    await saveDisposisiListToServer(listDisposisi);

    closeAlasanTolakModal();
    renderDisposisiTable();
    showToast("DISPOSISI DITOLAK", `Berkas a.n ${target.pelaku} ditolak dan dikembalikan ke Admin/Kasi.`, "warning");
  } else {
    showToast("GAGAL", "Data disposisi tidak ditemukan saat menyimpan alasan.", "danger");
  }
}

export function checkDisposisiAccessByRole(): void {
  let btnBuatDisposisi = document.getElementById('btnBuatDisposisiBaru') || document.querySelector('.btn-buat-disposisi') as HTMLElement;
  if(!btnBuatDisposisi) return;

  if(store.currentUser && store.currentUser.role === 'Penyidik / Ketua Tim Peneliti') {
    (btnBuatDisposisi as HTMLElement).style.display = 'none';
  } else {
    (btnBuatDisposisi as HTMLElement).style.display = 'inline-flex';
  }
}

export async function cekNotifikasiDisposisiMasuk(): Promise<void> {
  if (!store.currentUser || store.currentUser.role !== 'Penyidik / Ketua Tim Peneliti') {
    let wrapper = document.querySelector('.notification-wrapper') as HTMLElement;
    if(wrapper) wrapper.style.display = 'none';
    return;
  }

  let listDisposisi = await fetchDisposisiList();
  let curNama = (store.currentUser?.namaLengkap || store.currentUser?.nama || store.currentUser?.username || '').toLowerCase();
  
  let myDisposisi = listDisposisi.filter((d: any) => 
    d.targetPenyidik && curNama && d.targetPenyidik.toLowerCase() === curNama
  );

  let unreadCount = myDisposisi.filter((d: any) => !d.isRead).length;
  let badge = document.getElementById('notifBadgeCount');

  if(badge) {
    if(unreadCount > 0) {
      badge.textContent = String(unreadCount);
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  let brandNew = myDisposisi.filter((d: any) => !d.toastShown);
  if(brandNew.length > 0) {
    showToast("DISPOSISI BERKAS BARU!", `Anda menerima ${brandNew.length} berkas disposisi baru untuk ditindaklanjuti.`, "warning");
    brandNew.forEach((d: any) => d.toastShown = true);
    await saveDisposisiListToServer(listDisposisi);
  }
}

export function toggleNotificationDropdown(): void {
  let dropdown = document.getElementById('notificationDropdown') as HTMLElement;
  if(!dropdown) return;
  
  if(dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
    renderNotificationHistoryList();
  } else {
    dropdown.style.display = 'none';
  }
}

export async function renderNotificationHistoryList(): Promise<void> {
  let container = document.getElementById('notificationListContent');
  if(!container || !store.currentUser) return;

  let listDisposisi = await fetchDisposisiList();
  let curNama = (store.currentUser?.namaLengkap || store.currentUser?.nama || store.currentUser?.username || '').toLowerCase();
  let myDisposisi = listDisposisi.filter((d: any) => 
    d.targetPenyidik && curNama && d.targetPenyidik.toLowerCase() === curNama
  );

  myDisposisi.sort((a: any, b: any) => new Date(b.tanggalDisposisi).getTime() - new Date(a.tanggalDisposisi).getTime());

  if(myDisposisi.length === 0) {
    container.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted, #94a3b8); font-size: 12px;">Belum ada riwayat disposisi.</div>`;
    return;
  }

  container.innerHTML = myDisposisi.map((d: any) => {
    let tglFormatted = d.tanggalDisposisi ? new Date(d.tanggalDisposisi).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'}) : '';
    let bgStyle = !d.isRead ? 'background: rgba(59, 130, 246, 0.08);' : '';
    let realIndex = listDisposisi.findIndex((item: any) => item.id === d.id);
    
    return `
      <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-color, #334155); ${bgStyle} cursor: pointer; transition: background 0.2s;" onclick='openDisposisiModal(${realIndex})'>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
          <b style="font-size: 12px; color: var(--text-main, #f8fafc);">LP: ${escText(d.noLp)}</b>
          <span style="font-size: 10px; color: var(--text-muted, #94a3b8);">${tglFormatted}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-main, #cbd5e1); margin-bottom: 2px;">Pelaku: <b>${escText(d.pelaku)}</b></div>
        <div style="font-size: 10px; color: var(--primary, #38bdf8);">Dari: ${escText(d.pengusul)}</div>
      </div>
    `;
  }).join('');
}

export async function klikRiwayatDisposisi(dspData: any): Promise<void> {
  let listDisposisi = await fetchDisposisiList();
  let target = listDisposisi.find((d: any) => d.id === dspData.id);
  if(target) {
    target.isRead = true;
    await saveDisposisiListToServer(listDisposisi);
  }

  let dropdown = document.getElementById('notificationDropdown') as HTMLElement;
  if(dropdown) dropdown.style.display = 'none';

  cekNotifikasiDisposisiMasuk();
  let realIndex = listDisposisi.findIndex((item: any) => item.id === dspData.id);
  openDisposisiModal(realIndex >= 0 ? realIndex : -1);
}

export async function markAllDisposisiAsRead(): Promise<void> {
  let listDisposisi = await fetchDisposisiList();
  let curNama = (store.currentUser?.namaLengkap || store.currentUser?.nama || store.currentUser?.username || '').toLowerCase();
  listDisposisi.forEach((d: any) => {
    if(d.targetPenyidik && curNama && d.targetPenyidik.toLowerCase() === curNama) {
      d.isRead = true;
    }
  });
  await saveDisposisiListToServer(listDisposisi);
  cekNotifikasiDisposisiMasuk();
  renderNotificationHistoryList();
}

export function initDisposisiModule(): void {
  renderDisposisiTable();
  checkDisposisiAccessByRole();
  cekNotifikasiDisposisiMasuk();
}

(window as any).openDisposisiModal = openDisposisiModal;
(window as any).openModalUsulDisposisi = () => openDisposisiModal(-1);
(window as any).closeDisposisiModal = closeDisposisiModal;
(window as any).closeModalUsulDisposisi = closeDisposisiModal;
(window as any).simpanDraftDisposisi = simpanDraftDisposisi;
(window as any).kirimDisposisiBerkat = kirimDisposisiBerkat;
(window as any).renderDisposisiTable = renderDisposisiTable;
(window as any).changeDisposisiPage = changeDisposisiPage;
(window as any).responDisposisi = responDisposisi;
(window as any).terimaDisposisi = terimaDisposisi;
(window as any).closeAlasanTolakModal = closeAlasanTolakModal;
(window as any).submitTolakDisposisi = submitTolakDisposisi;
(window as any).checkDisposisiAccessByRole = checkDisposisiAccessByRole;
(window as any).cekNotifikasiDisposisiMasuk = cekNotifikasiDisposisiMasuk;
(window as any).toggleNotificationDropdown = toggleNotificationDropdown;
(window as any).klikRiwayatDisposisi = klikRiwayatDisposisi;
(window as any).markAllDisposisiAsRead = markAllDisposisiAsRead;
(window as any).syncDspJenisPerkara = syncDspJenisPerkara;
(window as any).toggleDspJenisDokumen = toggleDspJenisDokumen;
(window as any).syncDspDokumenPemberitahuan = syncDspDokumenPemberitahuan;
(window as any).handleDspJenisKoliChange = handleDspJenisKoliChange;
(window as any).handleDspJenisKoliSelectChange = handleDspJenisKoliSelectChange;
(window as any).generateDspUraianBarangOtomatis = generateDspUraianBarangOtomatis;
(window as any).updateDspCodePreviews = updateDspCodePreviews;