import { store, savePerkaraToStorage, loadPerkaraFromStorage } from '../state/store.js';
import { defaultPasalClusters, defaultKantorList, MASTER_ASAL_PERKARA, MASTER_JENIS_PENINDAKAN, MASTER_JENIS_PELANGGARAN, MASTER_JENIS_PERKARA, MASTER_STATUS_PENANGKAPAN, MASTER_MODUS_OPERANDI, MODUS_PASAL_MAP, MASTER_UMUR_PELAKU, MASTER_JENIS_KELAMIN, MASTER_PEKERJAAN, MASTER_KONDISI_BARANG, MASTER_SATUAN_KOLI, MASTER_JENIS_DOKUMEN_PABEAN, MASTER_DOKUMEN_PELENGKAP, MASTER_JENIS_IDENTITAS, MASTER_UKURAN_KONTAINER, MASTER_KOMODITI, MASTER_AKHIRAN_BARANG, MASTER_GOLONGAN_PANGKAT, MASTER_JABATAN_DINAS, MASTER_JABATAN_TIM_PENELITI, populateSelectElement } from '../config/constants.js';
import { escText, getVal, formatDate, formatDateIndo, formatModusVerb, terbilangHuruf } from '../utils/formatters.js';
import { showToast, showToastConfirm } from '../utils/ui.js';
import { refreshReportTableUI, updateReportLive } from './editor.js';
import { validateMasterOperationalData } from '../utils/validators.js';
import { generateNextBookingNumber } from '../utils/generators.js';
import { getFilteredDataForUser } from '../modules/auth.js';
import { updateDashboardStats } from '../modules/dashboard.js';
import { renderPerkaraTable } from '../modules/table.js';
let currentPerkaraPage = 1;
const rowsPerPagePerkara = 5;
// Helper untuk mengambil dan menyimpan data referensi ke server backend
async function fetchServerConfig(key, defaultVal) {
    try {
        let res = await fetch(`/api/config/${key}`);
        let json = await res.json();
        if (json.success && json.data) {
            return json.data;
        }
    }
    catch (e) {
        console.error(`Gagal memuat ${key} dari server:`, e);
    }
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultVal));
}
async function saveServerConfig(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    try {
        await fetch(`/api/config/${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: val })
        });
    }
    catch (e) {
        console.error(`Gagal menyimpan ${key} ke server:`, e);
    }
}
// Inisialisasi dropdown form perkara dari data master terpusat
export function initPerkaraDropdownsFromMaster() {
    populateSelectElement('Asal_Perkara_Select', MASTER_ASAL_PERKARA, '', '-');
    populateSelectElement('Jenis_Penindakan_Select', MASTER_JENIS_PENINDAKAN, '', '-');
    populateSelectElement('Jenis_Pelanggaran_Select', MASTER_JENIS_PELANGGARAN, '', '-');
    populateSelectElement('Jenis_Perkara_Select', MASTER_JENIS_PERKARA, '', '-');
    populateSelectElement('Status_Penangkapan_Select', MASTER_STATUS_PENANGKAPAN, '', '-');
    populateSelectElement('Modus_Operandi_Select', MASTER_MODUS_OPERANDI, '', '-');
    populateSelectElement('Umur_Pelaku', MASTER_UMUR_PELAKU, '', '- Pilih Usia -');
    populateSelectElement('Jenis_Kelamin_Pelaku', MASTER_JENIS_KELAMIN, '', '-');
    populateSelectElement('Jenis_Identitas_Select', MASTER_JENIS_IDENTITAS, 'NIK', '');
    populateSelectElement('Pekerjaan_Select', MASTER_PEKERJAAN, '', '-');
    populateSelectElement('Komoditi_Select', MASTER_KOMODITI, '', '- Pilih Komoditi -');
    populateSelectElement('Ukuran_Kontainer_Select', MASTER_UKURAN_KONTAINER, '', '-');
    populateSelectElement('Jenis_Koli_Select', MASTER_SATUAN_KOLI, '', '- Pilih Jenis Koli -');
    populateSelectElement('Jenis_Dok_Pemberitahuan_Select', MASTER_JENIS_DOKUMEN_PABEAN, 'Tanpa Dokumen', '');
    populateSelectElement('Jenis_Dok_Pelengkap_Select', MASTER_DOKUMEN_PELENGKAP, '-', '- (Tanpa Dokumen Pelengkap)');
    populateSelectElement('auto_akhiran_select', MASTER_AKHIRAN_BARANG, '', '');
    syncKondisiBarang();
    // 1. Kumpulkan seluruh master opsi jabatan
    const allJabatan = Array.from(new Set([...MASTER_JABATAN_DINAS, ...MASTER_JABATAN_TIM_PENELITI]));
    // 2. Populasi Dropdown Jabatan
    populateSelectElement('form_jabatan_kabid', allJabatan, 'Kepala Bidang Penindakan dan Penyidikan', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_seksi', allJabatan, 'Kepala Seksi Penyidikan', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_ketua_tim', allJabatan, 'Ketua Tim Peneliti', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_pembuat_lpp', allJabatan, 'Petugas LPP', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_lpf', allJabatan, 'Petugas LPF', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_indak_1', allJabatan, 'Petugas Penindakan 1', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_indak_2', allJabatan, 'Petugas Penindakan 2', '- Pilih Jabatan -');
    populateSelectElement('form_jabatan_indak_lainnya', allJabatan, 'Petugas Penindakan 3', '- Pilih Jabatan -');
    // 3. Populasi Dropdown Pangkat / Golongan (II/a s.d IV/c)
    populateSelectElement('form_gol_kabid', MASTER_GOLONGAN_PANGKAT, 'Pembina (IV/a)', '- Pilih Golongan -');
    populateSelectElement('form_gol_seksi', MASTER_GOLONGAN_PANGKAT, 'Penata (III/c)', '- Pilih Golongan -');
    populateSelectElement('form_gol_ketua_tim', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
    populateSelectElement('form_gol_pembuat_lpp', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
    populateSelectElement('form_gol_petugas_lpf', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
    populateSelectElement('form_gol_indak_1', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
    populateSelectElement('form_gol_indak_2', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
    populateSelectElement('form_gol_indak_lainnya', MASTER_GOLONGAN_PANGKAT, '', '- Pilih Golongan -');
}
export function populateAgeDropdown() {
    populateSelectElement('Umur_Pelaku', MASTER_UMUR_PELAKU, '', '- Pilih Usia -');
}
export function updateHariSBP(defaultDateVal) {
    const hariEl = document.getElementById('Hari_SBP');
    const tglEl = document.getElementById('Tanggal_SBP');
    if (!hariEl)
        return;
    const listHari = ['-', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    // Jika opsi belum ada atau ter-reset, render ulang daftar hari
    if (hariEl.options.length < 7) {
        hariEl.innerHTML = listHari.map(h => `<option value="${h}">${h}</option>`).join('');
    }
    const tgl = (defaultDateVal || (tglEl ? tglEl.value : '')).trim();
    if (!tgl || tgl === '-') {
        hariEl.value = '-';
        return;
    }
    let d;
    if (tgl.includes('/')) {
        const [day, month, year] = tgl.split('/');
        d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0);
    }
    else if (tgl.includes('-')) {
        const [year, month, day] = tgl.split('-');
        d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0);
    }
    else {
        d = new Date(tgl);
    }
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    if (!isNaN(d.getTime())) {
        hariEl.value = days[d.getDay()];
    }
    else {
        hariEl.value = '-';
    }
    if (typeof window.generateKronologisOtomatis === 'function') {
        window.generateKronologisOtomatis();
    }
}
export function setPratinjauNomor() {
    const elLP = (document.getElementById('NoLP') || document.getElementById('NoLP_LP_1'));
    const elSBP = document.getElementById('Nomor_SBP');
    const elSPRIN = document.getElementById('No_SPRIN_Indak');
    const elStatus = document.getElementById('Status_Penangkapan_Select');
    const statusPenangkapan = elStatus ? elStatus.value : '-';
    const tipeSBP = statusPenangkapan.toUpperCase().includes('LIMPAHAN') ? 'LIMPAH' : 'MANDIRI';
    // 1. Langsung masukkan format lengkap ke dalam kotak input (jika hanya berisi angka)
    if (elLP && /^\d+$/.test(elLP.value.trim())) {
        elLP.value = `LP-${elLP.value.trim()}/KPU.206/2026`;
    }
    if (elSBP && /^\d+$/.test(elSBP.value.trim())) {
        elSBP.value = `SBP-${elSBP.value.trim()}/${tipeSBP}/KPU.2/2026`;
    }
    if (elSPRIN && /^\d+$/.test(elSPRIN.value.trim())) {
        const rawVal = elSPRIN.value.trim();
        const pad = rawVal.length < 2 ? rawVal.padStart(2, '0') : rawVal;
        elSPRIN.value = `SPRIN-${pad}/KPU.206/2026`;
    }
    // 2. Beri warna oranye emas pada kotak isian
    [elLP, elSBP, elSPRIN].forEach((input) => {
        if (input) {
            input.style.color = '#f59e0b';
            input.style.fontWeight = '600';
        }
    });
    // 3. Kosongkan dan sembunyikan teks pratinjau di bawah kotak
    ['preview_LP', 'preview_NoLP', 'preview_SBP', 'preview_SPRIN'].forEach(id => {
        const previewEl = document.getElementById(id);
        if (previewEl) {
            previewEl.textContent = '';
            previewEl.style.display = 'none';
        }
    });
}
export function generateKronologisOtomatis() {
    let hari = getVal('Hari_SBP');
    let tglIndo = formatDate('Tanggal_SBP');
    let rawJam = document.getElementById('Jam_Kejadian') ? document.getElementById('Jam_Kejadian').value.trim() : '';
    let jamFormatted = rawJam ? rawJam.replace(':', '.') + ' WIB' : '-';
    let lokasi = getVal('Lokasi_Penindakan');
    let pelaku = getVal('Nama_Pelaku');
    let rawModus = getVal('Modus_Operandi');
    let modusVerb = formatModusVerb(rawModus);
    let kantor = getVal('Kantor') !== '-' ? getVal('Kantor') : 'Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam';
    let cleanModus = modusVerb.replace(/[;:]+$/, '').trim();
    let text = `Pada hari ${hari}, tanggal ${tglIndo} sekira pukul ${jamFormatted} di ${lokasi} telah dilakukan penindakan oleh Petugas ${kantor} terhadap ${pelaku} yang ${cleanModus}`;
    let el = document.getElementById('Kronologis');
    if (el)
        el.value = text;
}
export function generateKesimpulanOtomatis() {
    let pasal = getVal('Pasal_Pelanggaran');
    let rawModus = getVal('Modus_Operandi');
    let modusVerb = formatModusVerb(rawModus);
    let text = (pasal !== '-' || rawModus !== '-') ? `Diduga melanggar ${pasal} karena ${modusVerb}.` : '-';
    let el = document.getElementById('Jenis_Pelanggaran_Pasal');
    if (el)
        el.value = text;
}
export function handleJenisKoliSelectChange(val) {
    let manualInput = document.getElementById('Jenis_Koli');
    if (!manualInput)
        return;
    if (val === 'LAINNYA') {
        manualInput.style.display = 'block';
        manualInput.value = '';
        manualInput.focus();
    }
    else {
        manualInput.style.display = 'none';
        manualInput.value = (val === '-' ? '' : val);
    }
    generateUraianBarangOtomatis();
}
export function generateUraianBarangOtomatis() {
    const jml = document.getElementById('Jumlah_Koli')?.value.trim() || '';
    const satuan = document.getElementById('Jenis_Koli')?.value.trim() || '';
    const barangInput = document.getElementById('auto_barang')?.value.trim() || '';
    const akhiranTipe = document.getElementById('auto_akhiran_select')?.value || '';
    const kustomText = document.getElementById('auto_kustom_text')?.value.trim() || '';
    const kustomContainer = document.getElementById('auto_kustom_container');
    if (kustomContainer) {
        kustomContainer.style.display = (akhiranTipe === 'manual') ? 'block' : 'none';
    }
    if (!jml && !satuan && !barangInput)
        return;
    const jmlTerbilang = typeof terbilangHuruf === 'function' ? terbilangHuruf(jml) : '';
    const formattedJml = jml ? `${jml} (${jmlTerbilang})` : '';
    const baseParts = [formattedJml, satuan].filter(p => p !== '' && p !== '-');
    let baseText = baseParts.join(' ');
    const cleanBarang = barangInput.replace(/[,.\s]+$/, '').trim();
    if (cleanBarang) {
        baseText += (baseText ? ' ' : '') + cleanBarang;
        const daftarItem = cleanBarang.split(',').map(s => s.trim()).filter(Boolean);
        const jumlahItem = daftarItem.length;
        let suffix = '';
        if (akhiranTipe === 'manual') {
            if (kustomText) {
                const cleanKustom = kustomText.replace(/^[,.\s]+/, '');
                suffix = jumlahItem > 1 ? `, ${cleanKustom}` : ` ${cleanKustom}`;
            }
        }
        else if (akhiranTipe !== '') {
            const found = MASTER_AKHIRAN_BARANG.find(i => i.value === akhiranTipe);
            if (found) {
                const cleanLabel = found.label.replace(/^[,.\s]+/, '');
                suffix = (jumlahItem > 1) ? `, ${cleanLabel}` : ` ${cleanLabel}`;
            }
        }
        baseText += suffix;
    }
    if (baseText) {
        baseText = baseText.charAt(0).toUpperCase() + baseText.slice(1);
    }
    const uraianTarget = document.getElementById('Uraian_Barang');
    if (uraianTarget) {
        uraianTarget.value = baseText;
    }
}
if (typeof window !== 'undefined') {
    window.generateUraianBarangOtomatis = generateUraianBarangOtomatis;
}
export async function autoGenerateAndAddMasterPasal(modusText) {
    if (!modusText || modusText === '-')
        return;
    const cleanModusInput = modusText.trim().toLowerCase();
    let matchedPasalList = [];
    for (const [modusKey, pasalItems] of Object.entries(MODUS_PASAL_MAP)) {
        if (modusKey.toLowerCase() === cleanModusInput) {
            matchedPasalList = pasalItems;
            break;
        }
    }
    if (matchedPasalList.length === 0) {
        for (const [modusKey, pasalItems] of Object.entries(MODUS_PASAL_MAP)) {
            if (cleanModusInput.includes(modusKey.toLowerCase()) || modusKey.toLowerCase().includes(cleanModusInput)) {
                matchedPasalList = pasalItems;
                break;
            }
        }
    }
    if (matchedPasalList.length === 0)
        return;
    setTimeout(() => {
        const allCheckboxes = document.querySelectorAll('#pasal_pelanggaran_checkboxes input[type="checkbox"]');
        allCheckboxes.forEach((cb) => {
            cb.checked = false;
        });
        matchedPasalList.forEach((item) => {
            const escapedVal = CSS.escape(item.pasal);
            const cb = document.querySelector(`#pasal_pelanggaran_checkboxes input[value="${escapedVal}"]`);
            if (cb) {
                cb.checked = true;
            }
        });
        if (typeof window.syncPasalPelanggaran === 'function') {
            window.syncPasalPelanggaran();
        }
        else if (typeof syncPasalPelanggaran === 'function') {
            syncPasalPelanggaran();
        }
    }, 10);
}
export function toggleAsalPerkaraManual(val) {
    let manualInput = document.getElementById('Asal_Perkara');
    if (!manualInput)
        return;
    if (val === 'LAINNYA') {
        manualInput.style.display = 'block';
        manualInput.value = '';
        manualInput.focus();
    }
    else {
        manualInput.style.display = 'none';
        manualInput.value = val;
    }
}
export function togglePekerjaanManual(val) {
    let manualInput = document.getElementById('Pekerjaan');
    if (!manualInput)
        return;
    if (val === 'LAINNYA') {
        manualInput.style.display = 'block';
        manualInput.value = '';
        manualInput.focus();
    }
    else {
        manualInput.style.display = 'none';
        manualInput.value = val;
    }
}
export function toggleUkuranKontainerManual(val) {
    let manualInput = document.getElementById('Ukuran_Kontainer');
    if (!manualInput)
        return;
    if (val === 'LAINNYA') {
        manualInput.style.display = 'block';
        manualInput.value = '';
        manualInput.focus();
    }
    else {
        manualInput.style.display = 'none';
        manualInput.value = val;
    }
}
export function toggleJenisDokumen(val) {
    let manual = document.getElementById('Jenis_Dok_Pemberitahuan_Manual');
    let nomorInput = document.getElementById('Nomor_Dok_Pemberitahuan');
    let dokPab = document.getElementById('Dokumen_Pemberitahuan');
    if (val === 'Tanpa Dokumen') {
        if (manual) {
            manual.style.display = 'none';
            manual.value = '';
        }
        if (nomorInput) {
            nomorInput.value = '';
            nomorInput.disabled = true;
        }
        if (dokPab)
            dokPab.value = 'Tanpa Dokumen';
    }
    else {
        if (nomorInput)
            nomorInput.disabled = false;
        if (manual) {
            if (val === 'LAINNYA') {
                manual.style.display = 'block';
            }
            else {
                manual.style.display = 'none';
                manual.value = val === '-' ? '' : val;
            }
        }
        syncDokumenPemberitahuan();
    }
}
export function syncDokumenPemberitahuan() {
    let selEl = document.getElementById('Jenis_Dok_Pemberitahuan_Select');
    let dokPab = document.getElementById('Dokumen_Pemberitahuan');
    if (!selEl || !dokPab)
        return;
    let sel = selEl.value;
    if (sel === 'Tanpa Dokumen') {
        dokPab.value = 'Tanpa Dokumen';
        return;
    }
    let manualEl = document.getElementById('Jenis_Dok_Pemberitahuan_Manual');
    let jenis = sel === 'LAINNYA' ? (manualEl ? manualEl.value : '') : (sel === '-' ? '' : sel);
    let nomorEl = document.getElementById('Nomor_Dok_Pemberitahuan');
    let nomor = nomorEl ? nomorEl.value : '';
    let res = [];
    if (jenis.trim())
        res.push(jenis.trim());
    if (nomor.trim())
        res.push(nomor.trim());
    dokPab.value = res.length > 0 ? res.join(' ') : 'Tanpa Dokumen';
}
export function handleJenisDokPelengkapChange(val) {
    let manualInput = document.getElementById('Jenis_Dok_Pelengkap_Manual');
    let noInput = document.getElementById('Nomor_Dok_Pelengkap');
    let tglInput = document.getElementById('Tanggal_Dok_Pelengkap');
    let dokPelengkap = document.getElementById('Dokumen_Pelengkap');
    if (val === '-') {
        if (manualInput) {
            manualInput.style.display = 'none';
            manualInput.value = '';
        }
        if (noInput) {
            noInput.value = '';
            noInput.disabled = true;
        }
        if (tglInput) {
            tglInput.value = '';
            tglInput.disabled = true;
        }
        if (dokPelengkap)
            dokPelengkap.value = '-';
    }
    else {
        if (noInput)
            noInput.disabled = false;
        if (tglInput)
            tglInput.disabled = false;
        if (val === 'LAINNYA') {
            if (manualInput) {
                manualInput.style.display = 'block';
                manualInput.value = '';
                manualInput.focus();
            }
        }
        else {
            if (manualInput) {
                manualInput.style.display = 'none';
                manualInput.value = val;
            }
        }
        syncDokumenPelengkap();
    }
}
export function syncDokumenPelengkap() {
    let selEl = document.getElementById('Jenis_Dok_Pelengkap_Select');
    let dokPelengkap = document.getElementById('Dokumen_Pelengkap');
    if (!selEl || !dokPelengkap)
        return;
    let sel = selEl.value;
    if (sel === '-') {
        dokPelengkap.value = '-';
        return;
    }
    let manualEl = document.getElementById('Jenis_Dok_Pelengkap_Manual');
    let jenis = sel === 'LAINNYA'
        ? (manualEl ? manualEl.value.trim() : '')
        : sel;
    let noEl = document.getElementById('Nomor_Dok_Pelengkap');
    let nomor = noEl ? noEl.value.trim() : '';
    let tglEl = document.getElementById('Tanggal_Dok_Pelengkap');
    let tglRaw = tglEl ? tglEl.value : '';
    let tglIndo = tglRaw ? formatDateIndo(tglRaw) : '';
    let parts = [];
    if (jenis)
        parts.push(jenis);
    if (nomor)
        parts.push(`nomor ${nomor}`);
    if (tglIndo && tglIndo !== '-')
        parts.push(`tanggal ${tglIndo}`);
    dokPelengkap.value = parts.length > 0 ? parts.join(' ') : '-';
}
export function syncIdentitasValue() {
    let jenisEl = document.getElementById('Jenis_Identitas_Select');
    let nomorEl = document.getElementById('Nomor_Identitas_Input');
    let hidden = document.getElementById('Nomor_Identitas');
    if (!hidden)
        return;
    let jenis = jenisEl ? jenisEl.value : 'NIK';
    let nomor = nomorEl ? nomorEl.value.trim() : '';
    if (nomor) {
        hidden.value = `${jenis} : ${nomor}`;
    }
    else {
        hidden.value = '';
    }
}
export function syncKondisiBarang() {
    const containerKondisi = document.getElementById('kondisi_checkboxes');
    if (containerKondisi) {
        const existingCheckboxes = containerKondisi.querySelectorAll('input[type="checkbox"]');
        if (existingCheckboxes.length === 0) {
            containerKondisi.innerHTML = MASTER_KONDISI_BARANG.map(item => `
        <label class="checkbox-item" style="margin-right: 14px; display: inline-flex; align-items: center; cursor: pointer; color: inherit; font-size: 13px;">
          <input type="checkbox" value="${item}" onchange="syncKondisiBarang()" style="margin-right: 6px; cursor: pointer;"> 
          ${item}
        </label>
      `).join('');
        }
    }
    const checkboxes = document.querySelectorAll('#kondisi_checkboxes input[type="checkbox"]:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    const el = document.getElementById('Kondisi');
    if (el) {
        el.value = selected.length > 0 ? selected.join(', ') : '-';
    }
}
if (typeof window !== 'undefined') {
    window.syncKondisiBarang = syncKondisiBarang;
}
export function syncPasalPelanggaran() {
    let checkboxes = document.querySelectorAll('#pasal_pelanggaran_checkboxes input[type="checkbox"]:checked');
    let selected = Array.from(checkboxes).map((cb) => cb.value);
    let result = '-';
    let n = selected.length;
    if (n === 1) {
        result = selected[0];
    }
    else if (n === 2) {
        result = selected[0] + ' dan ' + selected[1];
    }
    else if (n === 3) {
        result = selected[0] + ', ' + selected[1] + ' dan ' + selected[2];
    }
    else if (n > 3) {
        result = selected.slice(0, n - 2).join(', ') + ' dan ' + selected[n - 2] + ' serta ' + selected[n - 1];
    }
    let el = document.getElementById('Pasal_Pelanggaran');
    if (el)
        el.value = result;
    generateKesimpulanOtomatis();
}
export function syncStatusPenangkapan(val) {
    let el = document.getElementById('Status_Penangkapan');
    if (el)
        el.value = val;
    setPratinjauNomor();
    refreshReportTableUI();
    updateReportLive();
}
export function syncJenisPelanggaran(val) {
    let el = document.getElementById('Jenis_Pelanggaran');
    if (el)
        el.value = val;
}
export function syncJenisPenindakan(val) {
    let el = document.getElementById('Jenis_Penindakan');
    if (el)
        el.value = val;
}
export function syncJenisPerkara(val) {
    let el = document.getElementById('Jenis_Perkara');
    if (el)
        el.value = val;
}
export function syncModusOperandi(val) {
    let el = document.getElementById('Modus_Operandi');
    if (el)
        el.value = val;
}
export function syncKomoditi(val) {
    let el = document.getElementById('Komoditi');
    if (el)
        el.value = val;
}
export function syncKantor(val) {
    let el = document.getElementById('Kantor');
    if (el)
        el.value = val;
}
export async function addCustomKantor() {
    let input = document.getElementById('setting_newKantor');
    if (!input)
        return;
    let val = input.value.trim();
    if (!val)
        return;
    let customKantor = await fetchServerConfig('customKantorList', []);
    if (!customKantor.includes(val)) {
        customKantor.push(val);
        await saveServerConfig('customKantorList', customKantor);
        await renderKantorDropdown();
        input.value = '';
        showToast('KANTOR BERHASIL DITAMBAHKAN', 'Unit kantor baru ditambahkan ke opsi.', 'success');
    }
    else {
        showToast('PERINGATAN KANTOR', 'Kantor tersebut sudah terdaftar!', 'warning');
    }
}
export async function renderPasalCheckboxes() {
    let container = document.getElementById('pasal_pelanggaran_checkboxes');
    if (!container)
        return;
    let customMap = await fetchServerConfig('customPasalMap', {});
    let html = '';
    Object.keys(defaultPasalClusters).forEach(cluster => {
        html += `<div style="grid-column: span 2; font-weight:bold; color:var(--primary); margin-top:6px; border-bottom:1px solid #334155; display:flex; align-items:center; gap:6px;"><i class="fi fi-rr-bookmark"></i> ${cluster}</div>`;
        let items = [...defaultPasalClusters[cluster], ...(customMap[cluster] || [])];
        items.forEach((p) => {
            html += `<label class="checkbox-item"><input type="checkbox" value="${escText(p)}" onchange="syncPasalPelanggaran()"> ${escText(p)}</label>`;
        });
    });
    container.innerHTML = html;
}
export async function renderCustomKomoditiOptions() {
    let customKomoditi = await fetchServerConfig('customKomoditiList', []);
    let komoditiGroup = document.getElementById('optgroup_custom_komoditi');
    if (komoditiGroup) {
        komoditiGroup.innerHTML = customKomoditi.map((k) => `<option value="${escText(k)}">${escText(k)}</option>`).join('');
    }
}
export async function renderKantorDropdown() {
    let customKantor = await fetchServerConfig('customKantorList', []);
    let allKantor = [...defaultKantorList, ...customKantor];
    let select = document.getElementById('Kantor_Select');
    let kantorInput = document.getElementById('Kantor');
    if (select) {
        select.innerHTML = `<option value="-">-</option>` + allKantor.map((k) => `<option value="${escText(k)}">${escText(k)}</option>`).join('');
        if (kantorInput && !kantorInput.value) {
            select.value = defaultKantorList[0];
            kantorInput.value = defaultKantorList[0];
        }
    }
    let listDisplay = document.getElementById('setting_kantorListDisplay');
    if (listDisplay) {
        listDisplay.innerHTML = allKantor.map((k) => `<li>${escText(k)}</li>`).join('');
    }
}
export function loadRecordToCurrentView(rec) {
    if (!rec)
        return;
    const setSafe = (id, val) => {
        let el = document.getElementById(id);
        if (el)
            el.value = (val !== undefined && val !== null) ? String(val) : '';
    };
    let lpVal = rec.NoLP || rec.NoLP_LP_1 || '';
    setSafe('NoLP', lpVal);
    setSafe('Tanggal_LP', rec.Tanggal_LP || rec.Tanggal_LP_LP_1);
    setSafe('Nomor_SBP', rec.Nomor_SBP);
    setSafe('Tanggal_SBP', rec.Tanggal_SBP);
    setSafe('Jam_Kejadian', rec.Jam_Kejadian);
    let calcHari = rec.Hari_SBP;
    if (!calcHari || calcHari === '-') {
        let tgl = rec.Tanggal_SBP;
        if (tgl) {
            let d = new Date(tgl);
            if (isNaN(d.getTime()) && String(tgl).includes('/')) {
                let p = tgl.split('/');
                d = new Date(`${p[2]}-${p[1]}-${p[0]}`);
            }
            if (!isNaN(d.getTime())) {
                const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                calcHari = days[d.getDay()];
            }
        }
    }
    setSafe('Hari_SBP', calcHari || '-');
    setSafe('No_SPRIN_Indak', rec.No_SPRIN_Indak);
    setSafe('Tanggal_SPRIN_Indak', rec.Tanggal_SPRIN_Indak);
    setSafe('Asal_Perkara', rec.Asal_Perkara);
    setSafe('Jenis_Penindakan', rec.Jenis_Penindakan);
    let jpVal = rec.Jenis_Perkara || rec.jenis_perkara || '';
    setSafe('Jenis_Perkara', jpVal);
    let elJP = document.getElementById('Jenis_Perkara_Select');
    if (elJP && jpVal) {
        populateSelectElement('Jenis_Perkara_Select', MASTER_JENIS_PERKARA, jpVal, '-');
    }
    setSafe('Status_Penangkapan', rec.Status_Penangkapan);
    let elStatusP = document.getElementById('Status_Penangkapan_Select');
    if (elStatusP && rec.Status_Penangkapan) {
        populateSelectElement('Status_Penangkapan_Select', MASTER_STATUS_PENANGKAPAN, rec.Status_Penangkapan, '-');
    }
    setSafe('Jenis_Pelanggaran', rec.Jenis_Pelanggaran);
    let elJenisPel = document.getElementById('Jenis_Pelanggaran_Select');
    if (elJenisPel && rec.Jenis_Pelanggaran) {
        populateSelectElement('Jenis_Pelanggaran_Select', MASTER_JENIS_PELANGGARAN, rec.Jenis_Pelanggaran, '-');
    }
    setSafe('Pasal_Pelanggaran', rec.Pasal_Pelanggaran);
    setSafe('Modus_Operandi', rec.Modus_Operandi);
    let selModus = document.getElementById('Modus_Operandi_Select');
    if (selModus && rec.Modus_Operandi) {
        populateSelectElement('Modus_Operandi_Select', MASTER_MODUS_OPERANDI, rec.Modus_Operandi, '-');
    }
    setSafe('Kronologis', rec.Kronologis);
    setSafe('Jenis_Pelanggaran_Pasal', rec.Jenis_Pelanggaran_Pasal);
    setSafe('Lokasi_Penindakan', rec.Lokasi_Penindakan);
    setSafe('Nama_Pelaku', rec.Nama_Pelaku);
    setSafe('Umur_Pelaku', rec.Umur_Pelaku || '-');
    let selUmur = document.getElementById('Umur_Pelaku');
    if (selUmur) {
        populateSelectElement('Umur_Pelaku', MASTER_UMUR_PELAKU, rec.Umur_Pelaku || '', '- Pilih Usia -');
    }
    setSafe('Jenis_Kelamin_Pelaku', rec.Jenis_Kelamin_Pelaku || '-');
    let selJK = document.getElementById('Jenis_Kelamin_Pelaku');
    if (selJK) {
        populateSelectElement('Jenis_Kelamin_Pelaku', MASTER_JENIS_KELAMIN, rec.Jenis_Kelamin_Pelaku || '', '-');
    }
    setSafe('TTL', rec.TTL);
    let rawIdentitas = String(rec.Nomor_Identitas || '');
    if (rawIdentitas.includes(' : ')) {
        let parts = rawIdentitas.split(' : ');
        let jenisIdentitasSelect = document.getElementById('Jenis_Identitas_Select');
        if (jenisIdentitasSelect) {
            populateSelectElement('Jenis_Identitas_Select', MASTER_JENIS_IDENTITAS, parts[0], '');
        }
        setSafe('Nomor_Identitas_Input', parts[1]);
    }
    else {
        let jenisIdentitasSelect = document.getElementById('Jenis_Identitas_Select');
        if (jenisIdentitasSelect) {
            populateSelectElement('Jenis_Identitas_Select', MASTER_JENIS_IDENTITAS, 'NIK', '');
        }
        setSafe('Nomor_Identitas_Input', rawIdentitas);
    }
    setSafe('Nomor_Identitas', rawIdentitas);
    setSafe('Pekerjaan', rec.Pekerjaan);
    let selPekerjaan = document.getElementById('Pekerjaan_Select');
    let inputPekerjaan = document.getElementById('Pekerjaan');
    if (selPekerjaan) {
        populateSelectElement('Pekerjaan_Select', MASTER_PEKERJAAN, rec.Pekerjaan || '', '-');
        if (rec.Pekerjaan && !MASTER_PEKERJAAN.includes(rec.Pekerjaan)) {
            selPekerjaan.value = 'LAINNYA';
            if (inputPekerjaan) {
                inputPekerjaan.style.display = 'block';
                inputPekerjaan.value = rec.Pekerjaan;
            }
        }
        else if (inputPekerjaan) {
            inputPekerjaan.style.display = 'none';
        }
    }
    setSafe('Alamat_Pelaku', rec.Alamat_Pelaku);
    setSafe('Nomor_Telepon', rec.Nomor_Telepon);
    setSafe('Nomor_Rekening', rec.Nomor_Rekening);
    setSafe('Pengulangan_Pelanggaran', rec.Pengulangan_Pelanggaran);
    setSafe('Komoditi', rec.Komoditi);
    let selKomoditi = document.getElementById('Komoditi_Select');
    if (selKomoditi) {
        populateSelectElement('Komoditi_Select', MASTER_KOMODITI, rec.Komoditi || '', '- Pilih Komoditi -');
    }
    setSafe('Kerugian_Negara', rec.Kerugian_Negara);
    setSafe('Jumlah_Koli', rec.Jumlah_Koli);
    let jenisVal = String(rec.Jenis_Koli || '');
    let selectKoli = document.getElementById('Jenis_Koli_Select');
    let inputKoli = document.getElementById('Jenis_Koli');
    if (selectKoli && inputKoli) {
        populateSelectElement('Jenis_Koli_Select', MASTER_SATUAN_KOLI, jenisVal, '- Pilih Jenis Koli -');
        inputKoli.value = jenisVal;
        if (jenisVal && !MASTER_SATUAN_KOLI.includes(jenisVal.toLowerCase()) && jenisVal !== '-') {
            selectKoli.value = 'LAINNYA';
            inputKoli.style.display = 'block';
        }
        else {
            inputKoli.style.display = 'none';
        }
    }
    let finalNamaBarang = rec.Nama_Barang || rec.Uraian_Barang || rec.Detail_Barang_LPP || rec.Komoditi || '';
    setSafe('Nama_Barang', finalNamaBarang);
    setSafe('nama_barang', finalNamaBarang);
    setSafe('Uraian_Barang', finalNamaBarang);
    setSafe('Detail_Barang_LPP', finalNamaBarang);
    setSafe('Merek', rec.Merek);
    setSafe('Tipe', rec.Tipe);
    setSafe('Kondisi', rec.Kondisi);
    setSafe('Spesifikasi_Lain', rec.Spesifikasi_Lain);
    setSafe('Pengangkut', rec.Pengangkut);
    setSafe('No_Kontainer', rec.No_Kontainer);
    setSafe('Ukuran_Kontainer', rec.Ukuran_Kontainer);
    let selUkuranK = document.getElementById('Ukuran_Kontainer_Select');
    let inputUkuranK = document.getElementById('Ukuran_Kontainer');
    if (selUkuranK) {
        populateSelectElement('Ukuran_Kontainer_Select', MASTER_UKURAN_KONTAINER, rec.Ukuran_Kontainer || '', '-');
        if (rec.Ukuran_Kontainer && !MASTER_UKURAN_KONTAINER.includes(rec.Ukuran_Kontainer)) {
            selUkuranK.value = 'LAINNYA';
            if (inputUkuranK) {
                inputUkuranK.style.display = 'block';
                inputUkuranK.value = rec.Ukuran_Kontainer;
            }
        }
        else if (inputUkuranK) {
            inputUkuranK.style.display = 'none';
        }
    }
    setSafe('Kantor', rec.Kantor);
    let dokPabVal = String(rec.Dokumen_Pemberitahuan || rec.Dokumen_Yang_Ada || '');
    let jenisDokSelect = document.getElementById('Jenis_Dok_Pemberitahuan_Select');
    let nomorDokInput = document.getElementById('Nomor_Dok_Pemberitahuan');
    if (dokPabVal.toLowerCase().includes('tanpa dokumen') || !dokPabVal || dokPabVal === '-') {
        if (jenisDokSelect) {
            populateSelectElement('Jenis_Dok_Pemberitahuan_Select', MASTER_JENIS_DOKUMEN_PABEAN, 'Tanpa Dokumen', '');
        }
        if (nomorDokInput) {
            nomorDokInput.value = '';
            nomorDokInput.disabled = true;
        }
        setSafe('Dokumen_Pemberitahuan', 'Tanpa Dokumen');
    }
    else {
        let match = dokPabVal.match(/^(BC\s*[\d\.]+|SPPBMCP|PIBK|CN|PPFTZ-\d{2})/i);
        let extractedJenis = match ? match[0].trim() : '';
        let extractedNomor = dokPabVal;
        if (extractedJenis) {
            let sisa = dokPabVal.replace(match[0], '');
            extractedNomor = sisa.replace(/^[\s\-–—:]*/, '').replace(/^nomor\s*/i, '').replace(/^no\.?\s*/i, '').trim();
        }
        if (jenisDokSelect) {
            populateSelectElement('Jenis_Dok_Pemberitahuan_Select', MASTER_JENIS_DOKUMEN_PABEAN, extractedJenis || dokPabVal, '');
        }
        if (nomorDokInput) {
            nomorDokInput.disabled = false;
            nomorDokInput.value = extractedNomor;
        }
        setSafe('Dokumen_Pemberitahuan', dokPabVal);
    }
    setSafe('Tanggal_Dokumen_Pemberitahuan', rec.Tanggal_Dokumen_Pemberitahuan);
    let dokPelengkapVal = rec.Dokumen_Pelengkap || '-';
    setSafe('Dokumen_Pelengkap', dokPelengkapVal);
    setSafe('Jenis_Dok_Pelengkap_Manual', rec.Jenis_Dok_Pelengkap_Manual || '');
    setSafe('Nomor_Dok_Pelengkap', rec.Nomor_Dok_Pelengkap || '');
    setSafe('Tanggal_Dok_Pelengkap', rec.Tanggal_Dok_Pelengkap || '');
    let selPelengkap = document.getElementById('Jenis_Dok_Pelengkap_Select');
    let manualPelengkap = document.getElementById('Jenis_Dok_Pelengkap_Manual');
    let noPelengkap = document.getElementById('Nomor_Dok_Pelengkap');
    let tglPelengkap = document.getElementById('Tanggal_Dok_Pelengkap');
    if (selPelengkap) {
        populateSelectElement('Jenis_Dok_Pelengkap_Select', MASTER_DOKUMEN_PELENGKAP, rec.Jenis_Dok_Pelengkap_Select || '-', '- (Tanpa Dokumen Pelengkap)');
        if (selPelengkap.value === '-') {
            if (manualPelengkap)
                manualPelengkap.style.display = 'none';
            if (noPelengkap)
                noPelengkap.disabled = true;
            if (tglPelengkap)
                tglPelengkap.disabled = true;
        }
        else if (selPelengkap.value === 'LAINNYA') {
            if (manualPelengkap)
                manualPelengkap.style.display = 'block';
            if (noPelengkap)
                noPelengkap.disabled = false;
            if (tglPelengkap)
                tglPelengkap.disabled = false;
        }
        else {
            if (manualPelengkap)
                manualPelengkap.style.display = 'none';
            if (noPelengkap)
                noPelengkap.disabled = false;
            if (tglPelengkap)
                tglPelengkap.disabled = false;
        }
    }
    setSafe('No_LPP', rec.No_LPP);
    setSafe('No_LPF', rec.No_LPF);
    setSafe('Nomor_SPLIT', rec.Nomor_SPLIT);
    setSafe('No_SPRIN_CACAH', rec.No_SPRIN_CACAH);
    setSafe('Nomor_BA', rec.Nomor_BA);
    setSafe('Nomor_LHP', rec.Nomor_LHP);
    setSafe('Tanggal_LPP', rec.Tanggal_LPP);
    setSafe('Catatan_LPP', rec.Catatan_LPP);
    setSafe('Detail_Barang_LPP', rec.Detail_Barang_LPP || finalNamaBarang);
    setSafe('Tanggal_LPF', rec.Tanggal_LPF);
    setSafe('Catatan_LPF', rec.Catatan_LPF);
    setSafe('Tanggal_SPLIT', rec.Tanggal_SPLIT);
    setSafe('Dasar_SPLIT', rec.Dasar_SPLIT);
    setSafe('Tanggal_Sprin_Cacah', rec.Tanggal_Sprin_Cacah);
    setSafe('Tanggal_BA', rec.Tanggal_BA);
    setSafe('Hari_Cacah', String(rec.Hari_Cacah || '').toLowerCase());
    setSafe('TeksTanggal', String(rec.TeksTanggal || '').toLowerCase());
    setSafe('Tanggal_LHP', rec.Tanggal_LHP);
    const allJabatan = Array.from(new Set([...MASTER_JABATAN_DINAS, ...MASTER_JABATAN_TIM_PENELITI]));
    setSafe('form_kabid', rec.kabid);
    setSafe('form_nip_kabid', rec.nip_kabid);
    populateSelectElement('form_jabatan_kabid', allJabatan, rec.jabatan_kabid || 'Kepala Bidang Penindakan dan Penyidikan', '- Pilih Jabatan -');
    populateSelectElement('form_gol_kabid', MASTER_GOLONGAN_PANGKAT, rec.gol_kabid || '', '- Pilih Golongan -');
    setSafe('form_nama_seksi', rec.nama_seksi);
    setSafe('form_nip_seksi', rec.nip_seksi);
    populateSelectElement('form_jabatan_seksi', allJabatan, rec.jabatan_seksi || 'Kepala Seksi Penyidikan', '- Pilih Jabatan -');
    populateSelectElement('form_gol_seksi', MASTER_GOLONGAN_PANGKAT, rec.gol_seksi || '', '- Pilih Golongan -');
    setSafe('form_ketua_tim', rec.ketua_tim);
    setSafe('form_nip_ketua_tim', rec.nip_ketua_tim);
    populateSelectElement('form_jabatan_ketua_tim', allJabatan, rec.jabatan_ketua_tim || 'Ketua Tim Peneliti', '- Pilih Jabatan -');
    populateSelectElement('form_gol_ketua_tim', MASTER_GOLONGAN_PANGKAT, rec.gol_ketua_tim || '', '- Pilih Golongan -');
    setSafe('form_pembuat_lpp', rec.pembuat_lpp);
    setSafe('form_nip_pembuat_lpp', rec.nip_pembuat_lpp);
    populateSelectElement('form_jabatan_pembuat_lpp', allJabatan, rec.jabatan_pembuat_lpp || 'Petugas LPP', '- Pilih Jabatan -');
    populateSelectElement('form_gol_pembuat_lpp', MASTER_GOLONGAN_PANGKAT, rec.gol_pembuat_lpp || '', '- Pilih Golongan -');
    setSafe('form_petugas_lpf', rec.petugas_lpf);
    setSafe('form_nip_petugas_lpf', rec.nip_petugas_lpf);
    populateSelectElement('form_jabatan_lpf', allJabatan, rec.jabatan_petugas_lpf || 'Petugas LPF', '- Pilih Jabatan -');
    populateSelectElement('form_gol_petugas_lpf', MASTER_GOLONGAN_PANGKAT, rec.gol_petugas_lpf || '', '- Pilih Golongan -');
    setSafe('form_indak_1', rec.indak_1);
    setSafe('form_nip_indak_1', rec.nip_indak_1);
    populateSelectElement('form_jabatan_indak_1', allJabatan, rec.jabatan_indak_1 || 'Petugas Penindakan 1', '- Pilih Jabatan -');
    populateSelectElement('form_gol_indak_1', MASTER_GOLONGAN_PANGKAT, rec.gol_indak_1 || '', '- Pilih Golongan -');
    setSafe('form_indak_2', rec.indak_2);
    setSafe('form_nip_indak_2', rec.nip_indak_2);
    populateSelectElement('form_jabatan_indak_2', allJabatan, rec.jabatan_indak_2 || 'Petugas Penindakan 2', '- Pilih Jabatan -');
    populateSelectElement('form_gol_indak_2', MASTER_GOLONGAN_PANGKAT, rec.gol_indak_2 || '', '- Pilih Golongan -');
    setSafe('form_indak_lainnya', rec.indak_lainnya);
    setSafe('form_nip_indak_lainnya', rec.nip_indak_lainnya);
    populateSelectElement('form_jabatan_indak_lainnya', allJabatan, rec.jabatan_indak_lainnya || 'Petugas Penindakan 3', '- Pilih Jabatan -');
    populateSelectElement('form_gol_indak_lainnya', MASTER_GOLONGAN_PANGKAT, rec.gol_indak_lainnya || '', '- Pilih Golongan -');
    let defaultCatatanLPP = "Laporan penerimaan perkara diterima, segera lanjutkan dengan penelitian formal dan pengumpulan bahan keterangan lebih lanjut.";
    let defaultCatatanLPF = "Setuju dengan usulan tim peneliti, segera tindak lanjuti proses administrasi penanganan perkara sesuai ketentuan yang berlaku.";
    setSafe('Catatan_LPP', (rec.Catatan_LPP && rec.Catatan_LPP !== '-') ? rec.Catatan_LPP : defaultCatatanLPP);
    setSafe('Catatan_LPF', (rec.Catatan_LPF && rec.Catatan_LPF !== '-') ? rec.Catatan_LPF : defaultCatatanLPF);
    if (typeof refreshReportTableUI === 'function')
        refreshReportTableUI();
    if (typeof updateReportLive === 'function')
        updateReportLive();
}
export function addNewPerkaraModal() {
    let title = document.getElementById('modalTitle');
    if (title)
        title.textContent = "Input Data Perkara";
    let editIdx = document.getElementById('editingRecordIndex');
    if (editIdx)
        editIdx.value = "-1";
    initPerkaraDropdownsFromMaster();
    let inputs = document.querySelectorAll('#perkaraModal input:not([readonly]), #perkaraModal textarea');
    inputs.forEach((el) => {
        if (el.type === 'checkbox')
            el.checked = false;
        else
            el.value = '';
    });
    syncKondisiBarang();
    if (document.getElementById('Jenis_Koli'))
        document.getElementById('Jenis_Koli').style.display = 'none';
    if (document.getElementById('auto_kustom_container'))
        document.getElementById('auto_kustom_container').style.display = 'none';
    if (document.getElementById('Asal_Perkara'))
        document.getElementById('Asal_Perkara').style.display = 'none';
    if (document.getElementById('Pekerjaan'))
        document.getElementById('Pekerjaan').style.display = 'none';
    if (document.getElementById('Ukuran_Kontainer'))
        document.getElementById('Ukuran_Kontainer').style.display = 'none';
    if (document.getElementById('Jenis_Dok_Pemberitahuan_Manual'))
        document.getElementById('Jenis_Dok_Pemberitahuan_Manual').style.display = 'none';
    if (document.getElementById('Nomor_Dok_Pemberitahuan'))
        document.getElementById('Nomor_Dok_Pemberitahuan').disabled = true;
    if (document.getElementById('No_SPRIN_Indak'))
        document.getElementById('No_SPRIN_Indak').value = '';
    if (document.getElementById('Tanggal_SPRIN_Indak'))
        document.getElementById('Tanggal_SPRIN_Indak').value = '';
    if (document.getElementById('Jenis_Dok_Pelengkap_Select'))
        document.getElementById('Jenis_Dok_Pelengkap_Select').value = '-';
    if (document.getElementById('Jenis_Dok_Pelengkap_Manual')) {
        document.getElementById('Jenis_Dok_Pelengkap_Manual').value = '';
        document.getElementById('Jenis_Dok_Pelengkap_Manual').style.display = 'none';
    }
    if (document.getElementById('Nomor_Dok_Pelengkap')) {
        document.getElementById('Nomor_Dok_Pelengkap').value = '';
        document.getElementById('Nomor_Dok_Pelengkap').disabled = true;
    }
    if (document.getElementById('Tanggal_Dok_Pelengkap')) {
        document.getElementById('Tanggal_Dok_Pelengkap').value = '';
        document.getElementById('Tanggal_Dok_Pelengkap').disabled = true;
    }
    if (document.getElementById('Dokumen_Pelengkap'))
        document.getElementById('Dokumen_Pelengkap').value = '-';
    if (document.getElementById('Kantor_Select') && defaultKantorList.length > 0) {
        document.getElementById('Kantor_Select').value = defaultKantorList[0];
        document.getElementById('Kantor').value = defaultKantorList[0];
    }
    let catLpfEl = document.getElementById('Catatan_LPF');
    if (catLpfEl && !catLpfEl.value) {
        catLpfEl.value = "Setuju dengan usulan tim peneliti, segera tindak lanjuti proses penyusunan administrasi penanganan perkara sesuai ketentuan yang berlaku.";
    }
    // Elemen input dokumen memakai NoLP secara konsisten
    let inputNoLp = (document.getElementById('NoLP') || document.getElementById('NoLP_LP_1'));
    let inputTglLp = (document.getElementById('Tanggal_LP') || document.getElementById('Tanggal_LP_LP_1'));
    let inputNoSbp = document.getElementById('Nomor_SBP');
    let inputTglSbp = document.getElementById('Tanggal_SBP');
    let inputNoSprin = document.getElementById('No_SPRIN_Indak');
    let inputTglSprin = document.getElementById('Tanggal_SPRIN_Indak');
    let currentPerkaraId = null;
    let editRecordIdxInput = document.getElementById('editingRecordIndex');
    if (editRecordIdxInput && editRecordIdxInput.value !== '-1') {
        currentPerkaraId = editRecordIdxInput.value;
    }
    const setupPerkaraBlur = (numInput, dateInput, labelName, numKey, dateKey) => {
        if (numInput && !numInput.dataset.validationAttached) {
            numInput.dataset.validationAttached = 'true';
            numInput.style.color = '#eca223';
            numInput.style.fontWeight = '400';
            // Kembalikan ke angka murni saat diklik lagi agar mudah diedit
            numInput.addEventListener('focus', () => {
                if (numInput.value.includes('/')) {
                    const m = numInput.value.match(/^(?:LP|SBP|SPRIN)-0*(\d+)/i);
                    if (m && m[1]) {
                        numInput.value = m[1];
                    }
                }
            });
            // Saat kursor keluar, langsung ubah isi kotak menjadi format lengkap
            numInput.addEventListener('blur', () => {
                setPratinjauNomor();
                const noVal = numInput.value.trim();
                const tglVal = dateInput ? dateInput.value : '';
                if (noVal) {
                    const docItems = [{ num: noVal, date: tglVal, numKey: numKey, dateKey: dateKey, label: labelName }];
                    const validation = validateMasterOperationalData(docItems, {}, currentPerkaraId);
                    if (!validation.isValid) {
                        showToast(validation.message, 'error');
                        numInput.focus();
                    }
                }
            });
        }
    };
    // Pasang listener format & validasi
    setupPerkaraBlur(inputNoLp, inputTglLp, 'Nomor LP', 'NoLP', 'Tanggal_LP');
    setupPerkaraBlur(inputNoSbp, inputTglSbp, 'SBP', 'noSbp', 'Tanggal_SBP');
    setupPerkaraBlur(inputNoSprin, inputTglSprin, 'SPRIN INDAK', 'noSprin', 'Tanggal_SPRIN_Indak');
    ['preview_LP', 'preview_NoLP', 'preview_SBP', 'preview_SPRIN'].forEach(id => {
        let el = document.getElementById(id);
        if (el)
            el.innerHTML = '';
    });
    if (inputTglSbp && !inputTglSbp.dataset.hariAttached) {
        inputTglSbp.dataset.hariAttached = 'true';
        inputTglSbp.addEventListener('change', () => updateHariSBP());
        inputTglSbp.addEventListener('input', () => updateHariSBP());
    }
    updateHariSBP();
    let modal = document.getElementById('perkaraModal');
    if (modal)
        modal.classList.add('active');
}
export function editPerkara(idx) {
    let filtered = getFilteredDataForUser();
    let rec = filtered[idx] || store.databasePerkara[idx];
    if (!rec)
        return;
    let realIdx = store.databasePerkara.indexOf(rec);
    let editIdx = document.getElementById('editingRecordIndex');
    if (editIdx)
        editIdx.value = String(realIdx >= 0 ? realIdx : idx);
    let currentNoLp = rec.NoLP || rec.NoLP_LP_1 || '';
    let title = document.getElementById('modalTitle');
    if (title)
        title.textContent = `Edit Data Perkara LP-${currentNoLp}`;
    initPerkaraDropdownsFromMaster();
    loadRecordToCurrentView(rec);
    const inputTglSbp = document.getElementById('Tanggal_SBP');
    if (inputTglSbp && !inputTglSbp.dataset.hariAttached) {
        inputTglSbp.dataset.hariAttached = 'true';
        inputTglSbp.addEventListener('change', () => updateHariSBP());
        inputTglSbp.addEventListener('input', () => updateHariSBP());
    }
    setTimeout(() => {
        updateHariSBP(rec.Tanggal_SBP);
        if (rec.Modus_Operandi) {
            autoGenerateAndAddMasterPasal(rec.Modus_Operandi);
        }
    }, 50);
    setPratinjauNomor();
    let modal = document.getElementById('perkaraModal');
    if (modal)
        modal.classList.add('active');
}
export function deletePerkara(idx) {
    showToastConfirm("KONFIRMASI HAPUS", "Apakah Anda yakin ingin menghapus data perkara ini?", () => {
        store.databasePerkara.splice(idx, 1);
        savePerkaraToStorage();
        renderPerkaraTable();
        updateDashboardStats();
        showToast("TERHAPUS", "Data perkara berhasil dihapus.", "danger");
    });
}
export function closeModal() {
    let modal = document.getElementById('perkaraModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
export function confirmAndSubmitPerkara() {
    let idxEl = document.getElementById('editingRecordIndex');
    let idx = idxEl ? parseInt(idxEl.value) : -1;
    if (idx >= 0 && store.databasePerkara[idx] && store.databasePerkara[idx].No_LPP) {
        executePerkaraSubmission();
        return;
    }
    let modalOverlay = document.getElementById('customConfirmModal');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'customConfirmModal';
        modalOverlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 10000; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;";
        modalOverlay.innerHTML = `
      <div style="background: #ffffff; padding: 24px; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: translateY(-20px); transition: transform 0.3s ease;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #0f172a; font-weight: 600;">Konfirmasi Auto-Booking</h3>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">Nomor administrasi awal (LPP, LPF, SPLIT) akan di-booking berurutan. Dokumen cacah & tindak lanjut situasional tetap fleksibel. Lanjutkan?</p>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" id="cancelConfirmBtn" style="padding: 8px 16px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Batal</button>
          <button type="button" id="okConfirmBtn" style="padding: 8px 16px; background: #0f172a; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Ya, Lanjutkan</button>
        </div>
      </div>
    `;
        document.body.appendChild(modalOverlay);
    }
    modalOverlay.style.pointerEvents = 'auto';
    modalOverlay.style.opacity = '1';
    let innerCard = modalOverlay.querySelector('div');
    if (innerCard)
        innerCard.style.transform = 'translateY(0)';
    let cancelBtn = document.getElementById('cancelConfirmBtn');
    if (cancelBtn) {
        cancelBtn.onclick = function () {
            modalOverlay.style.opacity = '0';
            modalOverlay.style.pointerEvents = 'none';
            if (innerCard)
                innerCard.style.transform = 'translateY(-20px)';
        };
    }
    let okBtn = document.getElementById('okConfirmBtn');
    if (okBtn) {
        okBtn.onclick = function () {
            modalOverlay.style.opacity = '0';
            modalOverlay.style.pointerEvents = 'none';
            if (innerCard)
                innerCard.style.transform = 'translateY(-20px)';
            executePerkaraSubmission();
        };
    }
}
export function executePerkaraSubmission() {
    try {
        let idxEl = document.getElementById('editingRecordIndex');
        let idx = idxEl ? parseInt(idxEl.value) : -1;
        let existingRec = (idx >= 0 && store.databasePerkara[idx]) ? store.databasePerkara[idx] : null;
        let currentRecordId = existingRec ? (existingRec.id || existingRec.recordId || null) : null;
        let linkedParentId = existingRec ? (existingRec.disposisiId || null) : null;
        let noSprinVal = (document.getElementById('No_SPRIN_Indak')?.value || '').trim();
        let tglSprinVal = document.getElementById('Tanggal_SPRIN_Indak')?.value || '';
        let noSbpVal = (document.getElementById('Nomor_SBP')?.value || '').trim();
        let tglSbpVal = document.getElementById('Tanggal_SBP')?.value || '';
        let noLpVal = ((document.getElementById('NoLP') || document.getElementById('NoLP_LP_1'))?.value || '').trim() || '1';
        let tglLpVal = (document.getElementById('Tanggal_LP') || document.getElementById('Tanggal_LP_LP_1'))?.value || '';
        let noLppVal = (existingRec && existingRec.No_LPP) ? existingRec.No_LPP : generateNextBookingNumber('', 'No_LPP', '', 3);
        let tglLppVal = (existingRec && existingRec.Tanggal_LPP) ? existingRec.Tanggal_LPP : tglLpVal;
        let noLpfVal = (existingRec && existingRec.No_LPF) ? existingRec.No_LPF : generateNextBookingNumber('', 'No_LPF', '', 3);
        let tglLpfVal = (existingRec && existingRec.Tanggal_LPF) ? existingRec.Tanggal_LPF : tglLpVal;
        let noSplitVal = (existingRec && existingRec.Nomor_SPLIT) ? existingRec.Nomor_SPLIT : generateNextBookingNumber('', 'Nomor_SPLIT', '', 3);
        let tglSplitVal = (existingRec && existingRec.Tanggal_SPLIT) ? existingRec.Tanggal_SPLIT : tglLpVal;
        let noSprinCacah = (document.getElementById('No_SPRIN_CACAH')?.value || '').trim();
        let tglSprinCacah = document.getElementById('Tanggal_SPRIN_CACAH')?.value || '';
        let noBa = (document.getElementById('Nomor_BA')?.value || '').trim();
        let tglBa = document.getElementById('Tanggal_BA')?.value || '';
        let noLhp = (document.getElementById('Nomor_LHP')?.value || '').trim();
        let tglLhp = document.getElementById('Tanggal_LHP')?.value || '';
        let docsToValidate = [
            { num: noSprinVal, date: tglSprinVal, numKey: 'No_SPRIN_Indak', dateKey: 'Tanggal_SPRIN_Indak', label: 'Nomor SPRIN INDAK' },
            { num: noSbpVal, date: tglSbpVal, numKey: 'Nomor_SBP', dateKey: 'Tanggal_SBP', label: 'Nomor SBP' },
            { num: noLpVal, date: tglLpVal, numKey: 'NoLP', dateKey: 'Tanggal_LP', label: 'Nomor LP' },
            { num: noLppVal, date: tglLppVal, numKey: 'No_LPP', dateKey: 'Tanggal_LPP', label: 'Nomor LPP' },
            { num: noLpfVal, date: tglLpfVal, numKey: 'No_LPF', dateKey: 'Tanggal_LPF', label: 'Nomor LPF' },
            { num: noSplitVal, date: tglSplitVal, numKey: 'Nomor_SPLIT', dateKey: 'Tanggal_SPLIT', label: 'Nomor SPLIT' },
            { num: noSprinCacah, date: tglSprinCacah, numKey: 'No_SPRIN_CACAH', dateKey: 'Tanggal_Sprin_Cacah', label: 'Nomor SPRIN Cacah' },
            { num: noBa, date: tglBa, numKey: 'Nomor_BA', dateKey: 'Tanggal_BA', label: 'Nomor BA' },
            { num: noLhp, date: tglLhp, numKey: 'Nomor_LHP', dateKey: 'Tanggal_LHP', label: 'Nomor LHP' }
        ];
        let datesObj = {
            tglSprin: tglSprinVal,
            tglSbp: tglSbpVal,
            tglLp: tglLpVal,
            tglLpp: tglLppVal,
            tglLpf: tglLpfVal,
            tglSplit: tglSplitVal,
            tglSprinCacah: tglSprinCacah,
            tglBa: tglBa,
            tglLhp: tglLhp
        };
        let validationResult = validateMasterOperationalData(docsToValidate, datesObj, currentRecordId);
        if (!validationResult.isValid) {
            showToast("VALIDASI DITOLAK", validationResult.message, "danger");
            return;
        }
        const valSafe = (id) => {
            let el = document.getElementById(id);
            return el ? el.value.trim() : '';
        };
        let uraian = valSafe('Uraian_Barang');
        let rec = {
            id: currentRecordId || Date.now(),
            disposisiId: linkedParentId,
            No_SPRIN_Indak: noSprinVal,
            Tanggal_SPRIN_Indak: tglSprinVal,
            Nomor_SBP: noSbpVal,
            Tanggal_SBP: tglSbpVal,
            NoLP: noLpVal,
            NoLP_LP_1: noLpVal,
            Tanggal_LP: tglLpVal,
            Tanggal_LP_LP_1: tglLpVal,
            Jam_Kejadian: valSafe('Jam_Kejadian'),
            Hari_SBP: valSafe('Hari_SBP'),
            Asal_Perkara: valSafe('Asal_Perkara'),
            Jenis_Penindakan: valSafe('Jenis_Penindakan'),
            Jenis_Perkara: valSafe('Jenis_Perkara'),
            Status_Penangkapan: valSafe('Status_Penangkapan'),
            Jenis_Pelanggaran: valSafe('Jenis_Pelanggaran'),
            Pasal_Pelanggaran: valSafe('Pasal_Pelanggaran'),
            Modus_Operandi: valSafe('Modus_Operandi'),
            Kronologis: valSafe('Kronologis'),
            Jenis_Pelanggaran_Pasal: valSafe('Jenis_Pelanggaran_Pasal'),
            Lokasi_Penindakan: valSafe('Lokasi_Penindakan'),
            Nama_Pelaku: valSafe('Nama_Pelaku'),
            Umur_Pelaku: valSafe('Umur_Pelaku'),
            Jenis_Kelamin_Pelaku: valSafe('Jenis_Kelamin_Pelaku'),
            TTL: valSafe('TTL'),
            Nomor_Identitas: valSafe('Nomor_Identitas'),
            Pekerjaan: valSafe('Pekerjaan'),
            Alamat_Pelaku: valSafe('Alamat_Pelaku'),
            Nomor_Telepon: valSafe('Nomor_Telepon'),
            Nomor_Rekening: valSafe('Nomor_Rekening'),
            Pengulangan_Pelanggaran: valSafe('Pengulangan_Pelanggaran'),
            Komoditi: valSafe('Komoditi'),
            Kerugian_Negara: valSafe('Kerugian_Negara'),
            Uraian_Barang: uraian,
            Detail_Barang_LPP: uraian,
            Merek: valSafe('Merek'),
            Tipe: valSafe('Tipe'),
            Kondisi: valSafe('Kondisi'),
            Spesifikasi_Lain: valSafe('Spesifikasi_Lain'),
            Jumlah_Koli: valSafe('Jumlah_Koli'),
            Jenis_Koli: valSafe('Jenis_Koli'),
            Pengangkut: valSafe('Pengangkut'),
            No_Kontainer: valSafe('No_Kontainer'),
            Ukuran_Kontainer: valSafe('Ukuran_Kontainer'),
            Kantor: valSafe('Kantor'),
            Dokumen_Pemberitahuan: valSafe('Dokumen_Pemberitahuan'),
            Tanggal_Dokumen_Pemberitahuan: valSafe('Tanggal_Dokumen_Pemberitahuan'),
            Dokumen_Pelengkap: valSafe('Dokumen_Pelengkap'),
            Jenis_Dok_Pelengkap_Select: valSafe('Jenis_Dok_Pelengkap_Select'),
            Jenis_Dok_Pelengkap_Manual: valSafe('Jenis_Dok_Pelengkap_Manual'),
            Nomor_Dok_Pelengkap: valSafe('Nomor_Dok_Pelengkap'),
            Tanggal_Dok_Pelengkap: valSafe('Tanggal_Dok_Pelengkap'),
            Penyelesaian_Perkara: (existingRec && existingRec.Penyelesaian_Perkara) ? existingRec.Penyelesaian_Perkara : '',
            No_LPP: noLppVal,
            Tanggal_LPP: tglLppVal,
            No_LPF: noLpfVal,
            Tanggal_LPF: tglLpfVal,
            Nomor_SPLIT: noSplitVal,
            Tanggal_SPLIT: tglSplitVal,
            No_SPRIN_CACAH: noSprinCacah,
            Tanggal_Sprin_Cacah: tglSprinCacah,
            Nomor_BA: noBa,
            Tanggal_BA: tglBa,
            Nomor_LHP: noLhp,
            Tanggal_LHP: tglLhp,
            kabid: valSafe('form_kabid'),
            nip_kabid: valSafe('form_nip_kabid'),
            jabatan_kabid: valSafe('form_jabatan_kabid'),
            gol_kabid: valSafe('form_gol_kabid'),
            nama_seksi: valSafe('form_nama_seksi'),
            nip_seksi: valSafe('form_nip_seksi'),
            jabatan_seksi: valSafe('form_jabatan_seksi'),
            gol_seksi: valSafe('form_gol_seksi'),
            ketua_tim: valSafe('form_ketua_tim'),
            nip_ketua_tim: valSafe('form_nip_ketua_tim'),
            jabatan_ketua_tim: valSafe('form_jabatan_ketua_tim'),
            gol_ketua_tim: valSafe('form_gol_ketua_tim'),
            pembuat_lpp: valSafe('form_pembuat_lpp'),
            nip_pembuat_lpp: valSafe('form_nip_pembuat_lpp'),
            jabatan_pembuat_lpp: valSafe('form_jabatan_pembuat_lpp'),
            gol_pembuat_lpp: valSafe('form_gol_pembuat_lpp'),
            petugas_lpf: valSafe('form_petugas_lpf'),
            nip_petugas_lpf: valSafe('form_nip_petugas_lpf'),
            jabatan_petugas_lpf: valSafe('form_jabatan_lpf'),
            gol_petugas_lpf: valSafe('form_gol_petugas_lpf'),
            indak_1: valSafe('form_indak_1'),
            nip_indak_1: valSafe('form_nip_indak_1'),
            jabatan_indak_1: valSafe('form_jabatan_indak_1'),
            gol_indak_1: valSafe('form_gol_indak_1'),
            indak_2: valSafe('form_indak_2'),
            nip_indak_2: valSafe('form_nip_indak_2'),
            jabatan_indak_2: valSafe('form_jabatan_indak_2'),
            gol_indak_2: valSafe('form_gol_indak_2'),
            indak_lainnya: valSafe('form_indak_lainnya'),
            nip_indak_lainnya: valSafe('form_nip_indak_lainnya'),
            jabatan_indak_lainnya: valSafe('form_jabatan_indak_lainnya'),
            gol_indak_lainnya: valSafe('form_gol_indak_lainnya'),
            statusAlur: "TERHUBUNG / OTOMATIS",
            disposisiPetugas: store.currentUser ? (store.currentUser.namaLengkap || store.currentUser.nama) : "Admin"
        };
        if (idx >= 0 && store.databasePerkara[idx]) {
            rec.statusAlur = store.databasePerkara[idx].statusAlur || "DRAFT";
            rec.disposisiPetugas = store.databasePerkara[idx].disposisiPetugas || "";
            store.databasePerkara[idx] = rec;
        }
        else {
            store.databasePerkara.push(rec);
            store.activeRecordIndex = store.databasePerkara.length - 1;
        }
        savePerkaraToStorage();
        currentPerkaraPage = 1;
        renderPerkaraTable();
        closeModal();
        updateDashboardStats();
        showToast("BERHASIL DISIMPAN", "Data perkara & dokumen berhasil diproses.", "success");
    }
    catch (err) {
        console.error("Error saat menyimpan perkara:", err);
        showToast("KESALAHAN SISTEM", "Gagal memproses penyimpanan data form.", "danger");
    }
}
export function submitPerkaraForm() {
    confirmAndSubmitPerkara();
}
export function saveData() {
    savePerkaraToStorage();
    showToast("DATA TERSIMPAN", "Seluruh data AP3 berhasil dicadangkan.", "success");
}
export async function loadData() {
    loadPerkaraFromStorage();
    await renderKantorDropdown();
    await renderCustomKomoditiOptions();
    await renderPasalCheckboxes();
}
window.addNewPerkaraModal = addNewPerkaraModal;
window.editPerkara = editPerkara;
window.deletePerkara = deletePerkara;
window.closeModal = closeModal;
window.confirmAndSubmitPerkara = confirmAndSubmitPerkara;
window.executePerkaraSubmission = executePerkaraSubmission;
window.submitPerkaraForm = submitPerkaraForm;
window.syncStatusPenangkapan = syncStatusPenangkapan;
window.syncJenisPelanggaran = syncJenisPelanggaran;
window.syncJenisPenindakan = syncJenisPenindakan;
window.syncJenisPerkara = syncJenisPerkara;
window.syncModusOperandi = syncModusOperandi;
window.syncKomoditi = syncKomoditi;
window.syncKantor = syncKantor;
window.updateHariSBP = updateHariSBP;
window.generateKronologisOtomatis = generateKronologisOtomatis;
window.generateKesimpulanOtomatis = generateKesimpulanOtomatis;
window.setPratinjauNomor = setPratinjauNomor;
window.toggleAsalPerkaraManual = toggleAsalPerkaraManual;
window.togglePekerjaanManual = togglePekerjaanManual;
window.toggleUkuranKontainerManual = toggleUkuranKontainerManual;
window.toggleJenisDokumen = toggleJenisDokumen;
window.syncDokumenPemberitahuan = syncDokumenPemberitahuan;
window.handleJenisDokPelengkapChange = handleJenisDokPelengkapChange;
window.syncDokumenPelengkap = syncDokumenPelengkap;
window.syncIdentitasValue = syncIdentitasValue;
window.handleJenisKoliSelectChange = handleJenisKoliSelectChange;
window.generateUraianBarangOtomatis = generateUraianBarangOtomatis;
window.autoGenerateAndAddMasterPasal = autoGenerateAndAddMasterPasal;
window.syncKondisiBarang = syncKondisiBarang;
window.syncPasalPelanggaran = syncPasalPelanggaran;
window.addCustomKantor = addCustomKantor;
window.initPerkaraDropdownsFromMaster = initPerkaraDropdownsFromMaster;
//# sourceMappingURL=perkara.js.map