/**
 * ============================================================================
 * MODULE        : STORAGE.TS
 * DESCRIPTION   : Pengelolaan Pengaturan Sistem & Konfigurasi via Backend API
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
import { store, savePerkaraToStorage } from '../state/store.js';
import { MASTER_JABATAN_DINAS, MASTER_JABATAN_TIM_PENELITI, MASTER_GOLONGAN_PANGKAT, populateSelectElement } from '../config/constants.js';
export * from '../state/store.js';
// Helper API Konfigurasi Backend
async function fetchConfig(key, fallbackDefault = '') {
    try {
        const res = await fetch(`/api/config/${key}`);
        if (res.ok) {
            const data = await res.json();
            return data?.value ?? fallbackDefault;
        }
    }
    catch (e) {
        console.warn(`Gagal mengambil config ${key} dari database backend, beralih ke local:`, e);
    }
    return localStorage.getItem(key) || fallbackDefault;
}
async function saveConfig(key, val) {
    // Simpan ke localStorage sebagai cadangan offline
    localStorage.setItem(key, val);
    // Simpan ke Database Backend
    try {
        await fetch(`/api/config/${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value: val })
        });
    }
    catch (e) {
        console.error(`Gagal menyimpan config ${key} ke database:`, e);
    }
}
// ========================================================
// 1. INISIALISASI DARI DATABASE BACKEND
// ========================================================
export async function initSettingPejabatDropdowns() {
    const allJabatan = Array.from(new Set([...MASTER_JABATAN_DINAS, ...MASTER_JABATAN_TIM_PENELITI]));
    // Ambil Data Pejabat 1 (Eselon III/IV) dari Database
    const kabid = await fetchConfig('setting_defaultKabid');
    const nipKabid = await fetchConfig('setting_defaultNipKabid');
    const jabKabid = await fetchConfig('setting_defaultJabatanKabid', 'Kepala Bidang Penindakan dan Penyidikan');
    const golKabid = await fetchConfig('setting_defaultGolKabid', 'Pembina (IV/a)');
    // Ambil Data Pejabat 2 (Eselon IV / Fungsional) dari Database
    const kasi = await fetchConfig('setting_defaultKasi');
    const nipKasi = await fetchConfig('setting_defaultNipKasi');
    const jabKasi = await fetchConfig('setting_defaultJabatanKasi', 'Kepala Seksi Penyidikan');
    const golKasi = await fetchConfig('setting_defaultGolKasi', 'Penata (III/c)');
    // Pasang ke Elemen Input Teks
    const elKabid = document.getElementById('setting_defaultKabid');
    if (elKabid)
        elKabid.value = kabid;
    const elNipKabid = document.getElementById('setting_defaultNipKabid');
    if (elNipKabid)
        elNipKabid.value = nipKabid;
    const elKasi = document.getElementById('setting_defaultKasi');
    if (elKasi)
        elKasi.value = kasi;
    const elNipKasi = document.getElementById('setting_defaultNipKasi');
    if (elNipKasi)
        elNipKasi.value = nipKasi;
    // Pasang Dropdown dari Master Data
    populateSelectElement('setting_defaultJabatanKabid', allJabatan, jabKabid, '- Pilih Jabatan -');
    populateSelectElement('setting_defaultGolKabid', MASTER_GOLONGAN_PANGKAT, golKabid, '- Pilih Golongan -');
    populateSelectElement('setting_defaultJabatanKasi', allJabatan, jabKasi, '- Pilih Jabatan -');
    populateSelectElement('setting_defaultGolKasi', MASTER_GOLONGAN_PANGKAT, golKasi, '- Pilih Golongan -');
    // Muat Ukuran Kertas
    const paper = await fetchConfig('setting_paperSize', 'F4');
    const elPaper = document.getElementById('setting_paperSize');
    if (elPaper)
        elPaper.value = paper;
    updatePaperDisplayLabel(paper);
    renderCustomKantorList();
}
// ========================================================
// 2. SIMPAN SEMUA PENGATURAN KE DATABASE BACKEND
// ========================================================
export async function saveData() {
    // Ambil nilai dari layar
    const kabid = document.getElementById('setting_defaultKabid')?.value || '';
    const nipKabid = document.getElementById('setting_defaultNipKabid')?.value || '';
    const jabKabid = document.getElementById('setting_defaultJabatanKabid')?.value || '';
    const golKabid = document.getElementById('setting_defaultGolKabid')?.value || '';
    const kasi = document.getElementById('setting_defaultKasi')?.value || '';
    const nipKasi = document.getElementById('setting_defaultNipKasi')?.value || '';
    const jabKasi = document.getElementById('setting_defaultJabatanKasi')?.value || '';
    const golKasi = document.getElementById('setting_defaultGolKasi')?.value || '';
    const paper = document.getElementById('setting_paperSize')?.value || 'F4';
    // Simpan serentak ke Database Backend
    await Promise.all([
        saveConfig('setting_defaultKabid', kabid),
        saveConfig('setting_defaultNipKabid', nipKabid),
        saveConfig('setting_defaultJabatanKabid', jabKabid),
        saveConfig('setting_defaultGolKabid', golKabid),
        saveConfig('setting_defaultKasi', kasi),
        saveConfig('setting_defaultNipKasi', nipKasi),
        saveConfig('setting_defaultJabatanKasi', jabKasi),
        saveConfig('setting_defaultGolKasi', golKasi),
        saveConfig('setting_paperSize', paper)
    ]);
    savePerkaraToStorage();
    if (typeof window.showToast === 'function') {
        window.showToast('Pengaturan pejabat berhasil disimpan ke database!');
    }
    else {
        alert('Pengaturan pejabat berhasil disimpan ke database!');
    }
}
// ========================================================
// 3. PENGATURAN KERTAS CETAK DOKUMEN
// ========================================================
export function changePaperSize(val) {
    saveConfig('setting_paperSize', val);
    updatePaperDisplayLabel(val);
    const styleEl = document.getElementById('dynamicPaperStyle');
    if (styleEl) {
        if (val === 'A4') {
            styleEl.innerHTML = `@page { size: 210mm 297mm; margin: 15mm; }`;
        }
        else {
            styleEl.innerHTML = `@page { size: 215mm 330mm; margin: 15mm; }`;
        }
    }
}
function updatePaperDisplayLabel(val) {
    const lbl = document.getElementById('currentPaperSizeLabel');
    if (lbl) {
        lbl.textContent = val === 'A4' ? 'A4 (210 x 297 mm)' : 'F4 / FOLIO (215 x 330 mm)';
    }
}
// ========================================================
// 4. DAFTAR KANTOR KUSTOM
// ========================================================
export async function addCustomKantor() {
    const inputEl = document.getElementById('setting_newKantor');
    if (!inputEl)
        return;
    const val = inputEl.value.trim();
    if (!val)
        return;
    let customKantor = [];
    try {
        const raw = await fetchConfig('custom_kantor_list', '[]');
        customKantor = JSON.parse(raw);
    }
    catch (e) {
        customKantor = [];
    }
    if (!customKantor.includes(val)) {
        customKantor.push(val);
        await saveConfig('custom_kantor_list', JSON.stringify(customKantor));
        inputEl.value = '';
        renderCustomKantorList();
    }
}
export async function removeCustomKantor(idx) {
    let customKantor = [];
    try {
        const raw = await fetchConfig('custom_kantor_list', '[]');
        customKantor = JSON.parse(raw);
    }
    catch (e) {
        customKantor = [];
    }
    if (customKantor[idx]) {
        customKantor.splice(idx, 1);
        await saveConfig('custom_kantor_list', JSON.stringify(customKantor));
        renderCustomKantorList();
    }
}
export async function renderCustomKantorList() {
    const ul = document.getElementById('setting_kantorListDisplay');
    if (!ul)
        return;
    let customKantor = [];
    try {
        const raw = await fetchConfig('custom_kantor_list', '[]');
        customKantor = JSON.parse(raw);
    }
    catch (e) {
        customKantor = [];
    }
    if (customKantor.length === 0) {
        ul.innerHTML = '<li style="color:var(--text-muted); list-style:none;">Belum ada kantor kustom tambahan.</li>';
        return;
    }
    ul.innerHTML = customKantor.map((k, i) => `
    <li style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <span>${k}</span>
      <a href="javascript:void(0)" onclick="removeCustomKantor(${i})" style="color:#ef4444; font-size:11px; margin-left:8px;">Hapus</a>
    </li>
  `).join('');
}
// ========================================================
// 5. TINDAKAN DATABASE: LOAD ULANG & RESET DATA
// ========================================================
export async function loadData() {
    try {
        await initSettingPejabatDropdowns();
        if (typeof window.refreshAllTables === 'function') {
            window.refreshAllTables();
        }
        alert('Data pengaturan berhasil disinkronkan dari database.');
    }
    catch (err) {
        alert('Gagal memuat data dari database: ' + err);
    }
}
export function confirmResetAllData() {
    const conf = confirm('PERINGATAN: Apakah Anda yakin ingin menghapus dan mereset SEMUA data perkara, disposisi, dan pengaturan sistem? Tindakan ini tidak dapat dibatalkan!');
    if (!conf)
        return;
    localStorage.clear();
    store.databasePerkara = [];
    store.databaseDisposisi = [];
    store.activeRecordIndex = -1;
    alert('Semua data lokal berhasil dibersihkan. Halaman akan dimuat ulang.');
    window.location.reload();
}
if (typeof window !== 'undefined') {
    window.saveData = saveData;
    window.loadData = loadData;
    window.changePaperSize = changePaperSize;
    window.addCustomKantor = addCustomKantor;
    window.removeCustomKantor = removeCustomKantor;
    window.confirmResetAllData = confirmResetAllData;
    window.initSettingPejabatDropdowns = initSettingPejabatDropdowns;
}
//# sourceMappingURL=storage.js.map