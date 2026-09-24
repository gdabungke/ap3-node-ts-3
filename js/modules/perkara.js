import { store, savePerkaraToStorage, loadPerkaraFromStorage } from '../state/store.js';
import { defaultPasalClusters, defaultKantorList } from '../config/constants.js';
import { escText, getVal, formatDate, formatDateIndo, formatModusVerb, terbilangHuruf, generateNextBookingNumber, validateMasterOperationalData } from '../utils/formatters.js';
import { showToast, showToastConfirm } from './ui.js';
import { refreshReportTableUI, updateReportLive } from './editor.js';
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
export function populateAgeDropdown() {
    let select = document.getElementById('Umur_Pelaku');
    if (!select)
        return;
    let optionsHtml = `<option value="-">- Pilih Usia -</option>`;
    for (let i = 17; i <= 90; i++) {
        optionsHtml += `<option value="${i}">${i} Tahun</option>`;
    }
    select.innerHTML = optionsHtml;
}
export function updateHariSBP() {
    let tgl = document.getElementById('Tanggal_SBP') ? document.getElementById('Tanggal_SBP').value : '';
    let hariEl = document.getElementById('Hari_SBP');
    if (tgl && hariEl) {
        let d = new Date(tgl + 'T12:00:00');
        let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        hariEl.value = days[d.getDay()];
    }
}
export function updateLiveCodePreviews() {
    let valLP = document.getElementById('NoLP_LP_1') ? document.getElementById('NoLP_LP_1').value.trim() : '';
    let valSBP = document.getElementById('Nomor_SBP') ? document.getElementById('Nomor_SBP').value.trim() : '';
    let valSPRIN = document.getElementById('No_SPRIN_Indak') ? document.getElementById('No_SPRIN_Indak').value.trim() : '';
    let statusPenangkapan = document.getElementById('Status_Penangkapan_Select') ? document.getElementById('Status_Penangkapan_Select').value : '-';
    let tipeSBP = statusPenangkapan.toUpperCase().includes('LIMPAHAN') ? 'LIMPAH' : 'MANDIRI';
    let previewLP = document.getElementById('preview_NoLP');
    let previewSBP = document.getElementById('preview_SBP');
    let previewSPRIN = document.getElementById('preview_SPRIN');
    if (previewLP) {
        previewLP.textContent = valLP !== '' ? `LP-${valLP}/KPU.206/2026` : 'LP-/KPU.206/2026';
    }
    if (previewSBP) {
        previewSBP.textContent = valSBP !== '' ? `SBP-${valSBP}/${tipeSBP}/KPU.2/2026` : `SBP-/${tipeSBP}/KPU.2/2026`;
    }
    if (previewSPRIN) {
        let sprinPad = valSPRIN !== '' ? (valSPRIN.length < 2 ? String(valSPRIN).padStart(2, '0') : valSPRIN) : '01';
        previewSPRIN.textContent = valSPRIN !== '' ? `SPRIN-${sprinPad}/KPU.206/2026` : 'SPRIN-/KPU.206/2026';
    }
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
    let jml = document.getElementById('Jumlah_Koli') ? document.getElementById('Jumlah_Koli').value.trim() : '';
    let satuan = document.getElementById('Jenis_Koli') ? document.getElementById('Jenis_Koli').value.trim() : '';
    let barang = document.getElementById('auto_barang') ? document.getElementById('auto_barang').value.trim() : '';
    let akhiranTipe = document.getElementById('auto_akhiran_select') ? document.getElementById('auto_akhiran_select').value : '';
    let kustomText = document.getElementById('auto_kustom_text') ? document.getElementById('auto_kustom_text').value.trim() : '';
    let kustomContainer = document.getElementById('auto_kustom_container');
    if (kustomContainer) {
        kustomContainer.style.display = (akhiranTipe === 'manual') ? 'block' : 'none';
    }
    if (!jml && !satuan && !barang)
        return;
    let cleanBarang = barang.replace(/[,.\s]+$/, '').trim();
    let jmlTerbilang = terbilangHuruf(jml);
    let formattedJml = jml ? `${jml} (${jmlTerbilang})` : '';
    let parts = [formattedJml, satuan, cleanBarang].filter(p => p !== '' && p !== '-');
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
        else if (akhiranTipe === 'manual' && kustomText) {
            baseText += `, ${kustomText.replace(/^,\s*/, '')}`;
        }
    }
    else if (baseText && akhiranTipe) {
        if (akhiranTipe === 'dll') {
            baseText += ' dll.';
        }
        else if (akhiranTipe === 'etc') {
            baseText += ' etc.';
        }
        else if (akhiranTipe === 'barang_lainnya') {
            baseText += ' dan barang lainnya';
        }
        else if (akhiranTipe === 'manual' && kustomText) {
            baseText += ` ${kustomText.replace(/^,\s*/, '')}`;
        }
    }
    let uraianTarget = document.getElementById('Uraian_Barang');
    if (uraianTarget) {
        uraianTarget.value = baseText;
    }
}
export async function autoGenerateAndAddMasterPasal(modusText) {
    if (!modusText || modusText === '-')
        return;
    let newPasalList = [];
    if (/cukai|pita cukai|bkc|etiket|nppbkc/i.test(modusText)) {
        if (/penyediaan|penimbunan/i.test(modusText)) {
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 54 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 56 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
        }
        else if (/penyerahan/i.test(modusText)) {
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 54 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 55 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
        }
        else if (/pengangkutan/i.test(modusText)) {
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 52 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
            newPasalList.push({ cluster: "PERATURAN MENTERI KEUANGAN", pasal: "PMK NO. 161/PMK.04/2019 TENTANG TATA CARA PENGANGKUT BARANG KENA CUKAI" });
        }
        else {
            newPasalList.push({ cluster: "UU CUKAI", pasal: "Pasal 54 UU NO. 39 TAHUN 2007 TENTANG CUKAI" });
        }
    }
    if (/luar daerah pabean|pembongkaran|workshop container|impor sementara/i.test(modusText)) {
        if (/tanpa\/salah pemberitahuan|tidak diberitahukan/i.test(modusText)) {
            newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 102 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        }
        if (/impor sementara/i.test(modusText)) {
            newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 108 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        }
        if (/pembongkaran/i.test(modusText)) {
            newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 103 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        }
    }
    if (/ke luar daerah pabean|outward manifest|ekspor/i.test(modusText)) {
        newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 102A UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        if (/outward manifest/i.test(modusText)) {
            newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 103 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        }
    }
    if (/larangan dan pembatasan|perizinan|badan pengusahaan|instansi terkait/i.test(modusText)) {
        newPasalList.push({ cluster: "UU KEPABEANAN", pasal: "Pasal 53 Ayat (4) UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN" });
        newPasalList.push({ cluster: "PERATURAN MENTERI/BADAN LAIN", pasal: "Peraturan Menteri Perdagangan Terkait Larangan Dan Pembatasan (Lartas)" });
    }
    if (/kawasan perdagangan bebas|pelabuhan bebas|batam|ftz|tempat lain dalam daerah pabean/i.test(modusText)) {
        newPasalList.push({ cluster: "PERATURAN PEMERINTAH", pasal: "Pasal 71 Ayat (1) PP NO. 41 TAHUN 2021 TENTANG KAWASAN BEBAS BATAM" });
        newPasalList.push({ cluster: "PERATURAN MENTERI KEUANGAN", pasal: "PMK NO. 34/PMK.04/2021 TENTANG PEMASUKAN DAN PENGELUARAN BARANG FTZ" });
    }
    if (/uang kertas asing|uang tunai|bank indonesia|seratus juta/i.test(modusText)) {
        newPasalList.push({ cluster: "UU INSTANSI LAIN", pasal: "UU NO. 7 TAHUN 2011 TENTANG MATA UANG" });
        newPasalList.push({ cluster: "PERATURAN MENTERI KEUANGAN", pasal: "PMK NO. 100/PMK.04/2018 TENTANG PEMBAWAAN UANG TUNAI" });
        newPasalList.push({ cluster: "PERATURAN MENTERI/BADAN LAIN", pasal: "Peraturan Bank Indonesia NO. 20/2/PBI/2018 TENTANG PEMBAWAAN UKA" });
    }
    if (newPasalList.length === 0)
        return;
    let customMap = await fetchServerConfig('customPasalMap', {});
    let isNewAdded = false;
    newPasalList.forEach((item) => {
        if (!customMap[item.cluster])
            customMap[item.cluster] = [];
        let defaultList = defaultPasalClusters[item.cluster] || [];
        if (!defaultList.includes(item.pasal) && !customMap[item.cluster].includes(item.pasal)) {
            customMap[item.cluster].push(item.pasal);
            isNewAdded = true;
        }
    });
    if (isNewAdded) {
        await saveServerConfig('customPasalMap', customMap);
        await renderPasalCheckboxes();
    }
    setTimeout(() => {
        document.querySelectorAll('#pasal_pelanggaran_checkboxes input[type="checkbox"]').forEach((cb) => cb.checked = false);
        newPasalList.forEach((item) => {
            let cb = document.querySelector(`#pasal_pelanggaran_checkboxes input[value="${item.pasal}"]`);
            if (cb)
                cb.checked = true;
        });
        syncPasalPelanggaran();
    }, 50);
}
export function toggleAsalPerkaraManual(val) {
    let manualInput = document.getElementById('Asal_Perkara');
    if (!manualInput)
        return;
    if (val === 'LAINNYA') {
        manualInput.style.display = 'block';
        manualInput.value = '';
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
    let checkboxes = document.querySelectorAll('#kondisi_checkboxes input[type="checkbox"]:checked');
    let selected = Array.from(checkboxes).map((cb) => cb.value);
    let el = document.getElementById('Kondisi');
    if (el)
        el.value = selected.length > 0 ? selected.join(', ') : '-';
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
    updateLiveCodePreviews();
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
export function getFilteredDataForUser() {
    if (!store.currentUser)
        return store.databasePerkara;
    if (store.currentUser.role === 'Admin' || store.currentUser.role === 'Kepala Seksi Penyidikan') {
        return store.databasePerkara;
    }
    else {
        return store.databasePerkara.filter((rec) => rec.disposisiPetugas && rec.disposisiPetugas.toLowerCase() === store.currentUser?.nama.toLowerCase());
    }
}
export function updateDashboardStats() {
    let filteredData = getFilteredDataForUser();
    let stLP = document.getElementById('statLP');
    let stK = document.getElementById('statKerugian');
    let cntLpEl = document.getElementById('dash_cnt_lp');
    let cntSbpEl = document.getElementById('dash_cnt_sbp');
    let cntMandiriEl = document.getElementById('dash_cnt_mandiri');
    let cntNhiEl = document.getElementById('dash_cnt_nhi');
    let cntLimpahanEl = document.getElementById('dash_cnt_limpahan');
    if (stLP)
        stLP.textContent = String(filteredData.length);
    if (cntLpEl)
        cntLpEl.textContent = `${filteredData.filter((d) => d.NoLP_LP_1 && d.NoLP_LP_1 !== '-').length} Dokumen`;
    if (cntSbpEl)
        cntSbpEl.textContent = `${filteredData.filter((d) => d.Nomor_SBP && d.Nomor_SBP !== '-').length} Dokumen`;
    let totalKerugian = 0;
    let cntBDN = 0;
    let cntSPSA = 0;
    let cntBAST = 0;
    let cntLimpah = 0;
    let cntOther = 0;
    let cntMandiri = 0;
    let cntNHI = 0;
    let cntLimpahan = 0;
    filteredData.forEach((rec) => {
        let rawK = String(rec.Kerugian_Negara || '').replace(/[^0-9]/g, '');
        let k = parseFloat(rawK || '0');
        if (!isNaN(k))
            totalKerugian += k;
        let peny = rec.Penyelesaian_Perkara || '';
        if (/dikuasai negara|bdn/i.test(peny))
            cntBDN++;
        else if (/spsa|denda/i.test(peny))
            cntSPSA++;
        else if (/kembalikan ke pemilik|pemilik/i.test(peny))
            cntBAST++;
        else if (/serah terima.*instansi|limpah/i.test(peny))
            cntLimpah++;
        else if (peny.trim() !== '' && peny !== '-')
            cntOther++;
        let asal = (rec.Asal_Perkara || '').toUpperCase();
        let statusTangkap = (rec.Status_Penangkapan || '').toUpperCase();
        let sprin = (rec.No_SPRIN_Indak || '').toUpperCase();
        if (asal.includes('LIMPAHAN') || statusTangkap.includes('LIMPAHAN')) {
            cntLimpahan++;
        }
        else if (asal.includes('NHI') || sprin.includes('NHI') || statusTangkap.includes('NHI')) {
            cntNHI++;
        }
        else {
            cntMandiri++;
        }
    });
    if (stK)
        stK.textContent = 'Rp ' + totalKerugian.toLocaleString('id-ID');
    let elBdn = document.getElementById('tl_bdn_cnt');
    if (elBdn)
        elBdn.textContent = String(cntBDN);
    let elSpsa = document.getElementById('tl_spsa_cnt');
    if (elSpsa)
        elSpsa.textContent = String(cntSPSA);
    let elBast = document.getElementById('tl_bast_cnt');
    if (elBast)
        elBast.textContent = String(cntBAST);
    let elLimpah = document.getElementById('tl_limpah_cnt');
    if (elLimpah)
        elLimpah.textContent = String(cntLimpah);
    let elOther = document.getElementById('tl_other_cnt');
    if (elOther)
        elOther.textContent = String(cntOther);
    if (cntMandiriEl)
        cntMandiriEl.textContent = String(cntMandiri);
    if (cntNhiEl)
        cntNhiEl.textContent = String(cntNHI);
    if (cntLimpahanEl)
        cntLimpahanEl.textContent = String(cntLimpahan);
    let recentTbody = document.getElementById('dashboardRecentCasesBody');
    if (recentTbody) {
        if (filteredData.length === 0) {
            recentTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:14px; color:var(--text-muted, #94a3b8);">Belum ada perkara yang terdaftar.</td></tr>`;
        }
        else {
            let recentItems = filteredData.slice(-3).reverse();
            recentTbody.innerHTML = recentItems.map((rec) => {
                let realIndex = store.databasePerkara.indexOf(rec);
                let statusBadgeHtml = '';
                let hasReport = (rec.No_LPP && rec.No_LPP !== '-') || (rec.Nomor_LHP && rec.Nomor_LHP !== '-');
                if (hasReport || (rec.statusAlur && rec.statusAlur.includes('DIVALIDASI'))) {
                    statusBadgeHtml = `
            <span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); font-size:10px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fi fi-rr-document-signed"></i> PENYUSUNAN LAPORAN
            </span>
          `;
                }
                else {
                    statusBadgeHtml = `
            <span class="badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b; border:1px solid rgba(245, 158, 11, 0.3); font-size:10px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fi fi-rr-spinner"></i> MASIH PROSES
            </span>
          `;
                }
                let cleanLP = String(rec.NoLP_LP_1 || '-').replace(/^LP-?/i, '');
                let cleanSBP = String(rec.Nomor_SBP || '-').replace(/^SBP-?/i, '');
                return `
          <tr class="recent-row-hover" style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <td style="padding:8px 6px;">
              <b>LP-${escText(cleanLP)}</b> / <small style="color:var(--text-muted, #94a3b8);">SBP-${escText(cleanSBP)}</small>
            </td>
            <td style="padding:8px 6px;">
              <span style="font-weight:600; color:var(--text-main, #f8fafc);">${escText(rec.Nama_Pelaku || '-')}</span>
            </td>
            <td style="padding:8px 6px;">
              <span style="color:var(--primary, #38bdf8); font-size:11px;">${escText(rec.Komoditi || '-')}</span>
            </td>
            <td style="padding:8px 6px;">
              ${statusBadgeHtml}
            </td>
            <td style="padding:8px 6px; text-align:right;">
              <button type="button" class="btn secondary" style="font-size:10px; padding:3px 8px;" onclick="bukaPerkaraDariDashboard(${realIndex})">
                <i class="fi fi-rr-arrow-right"></i> Buka
              </button>
            </td>
          </tr>
        `;
            }).join('');
        }
    }
}
export function bukaPerkaraDariDashboard(realIndex) {
    if (realIndex >= 0 && store.databasePerkara[realIndex]) {
        store.activeRecordIndex = realIndex;
        if (window.loadRecordToCurrentView) {
            window.loadRecordToCurrentView(store.databasePerkara[realIndex]);
        }
        let navBtn = document.querySelector('[data-target="#laporan"]');
        if (navBtn)
            navBtn.click();
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
    setSafe('NoLP_LP_1', rec.NoLP_LP_1);
    setSafe('Tanggal_LP_LP_1', rec.Tanggal_LP_LP_1);
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
    let elJP = document.getElementById('Jenis_Perkara') || document.getElementById('Jenis_Perkara_Select') || document.getElementById('dsp_jenis_perkara_select');
    if (elJP) {
        if (elJP.tagName === 'SELECT') {
            let optMatch = Array.from(elJP.options).find((opt) => opt.value.trim().toLowerCase() === jpVal.trim().toLowerCase() ||
                opt.textContent.trim().toLowerCase() === jpVal.trim().toLowerCase());
            if (optMatch)
                elJP.value = optMatch.value;
        }
        else {
            elJP.value = jpVal;
        }
        elJP.dispatchEvent(new Event('change'));
    }
    setSafe('Status_Penangkapan', rec.Status_Penangkapan);
    setSafe('Jenis_Pelanggaran', rec.Jenis_Pelanggaran);
    setSafe('Pasal_Pelanggaran', rec.Pasal_Pelanggaran);
    setSafe('Modus_Operandi', rec.Modus_Operandi);
    let selModus = document.getElementById('Modus_Operandi_Select');
    if (selModus && rec.Modus_Operandi) {
        selModus.value = rec.Modus_Operandi;
    }
    setSafe('Kronologis', rec.Kronologis);
    setSafe('Jenis_Pelanggaran_Pasal', rec.Jenis_Pelanggaran_Pasal);
    setSafe('Lokasi_Penindakan', rec.Lokasi_Penindakan);
    setSafe('Nama_Pelaku', rec.Nama_Pelaku);
    setSafe('Umur_Pelaku', rec.Umur_Pelaku || '-');
    setSafe('Jenis_Kelamin_Pelaku', rec.Jenis_Kelamin_Pelaku || '-');
    setSafe('TTL', rec.TTL);
    let rawIdentitas = String(rec.Nomor_Identitas || '');
    if (rawIdentitas.includes(' : ')) {
        let parts = rawIdentitas.split(' : ');
        let jenisIdentitasSelect = document.getElementById('Jenis_Identitas_Select');
        if (jenisIdentitasSelect)
            jenisIdentitasSelect.value = parts[0];
        setSafe('Nomor_Identitas_Input', parts[1]);
    }
    else {
        let jenisIdentitasSelect = document.getElementById('Jenis_Identitas_Select');
        if (jenisIdentitasSelect)
            jenisIdentitasSelect.value = 'NIK';
        setSafe('Nomor_Identitas_Input', rawIdentitas);
    }
    setSafe('Nomor_Identitas', rawIdentitas);
    setSafe('Pekerjaan', rec.Pekerjaan);
    setSafe('Alamat_Pelaku', rec.Alamat_Pelaku);
    setSafe('Nomor_Telepon', rec.Nomor_Telepon);
    setSafe('Nomor_Rekening', rec.Nomor_Rekening);
    setSafe('Pengulangan_Pelanggaran', rec.Pengulangan_Pelanggaran);
    setSafe('Komoditi', rec.Komoditi);
    let selKomoditi = document.getElementById('Komoditi_Select');
    if (selKomoditi && rec.Komoditi) {
        selKomoditi.value = rec.Komoditi;
    }
    setSafe('Kerugian_Negara', rec.Kerugian_Negara);
    setSafe('Jumlah_Koli', rec.Jumlah_Koli);
    let jenisVal = String(rec.Jenis_Koli || '');
    let selectKoli = document.getElementById('Jenis_Koli_Select');
    let inputKoli = document.getElementById('Jenis_Koli');
    if (selectKoli && inputKoli) {
        inputKoli.value = jenisVal;
        let matchOpt = Array.from(selectKoli.options).some(opt => opt.value.toLowerCase() === jenisVal.toLowerCase());
        if (matchOpt && jenisVal) {
            selectKoli.value = jenisVal.toLowerCase();
            inputKoli.style.display = 'none';
        }
        else if (jenisVal && jenisVal !== '-') {
            selectKoli.value = 'LAINNYA';
            inputKoli.style.display = 'block';
        }
        else {
            selectKoli.value = '-';
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
    setSafe('Kantor', rec.Kantor);
    let dokPabVal = String(rec.Dokumen_Pemberitahuan || rec.Dokumen_Yang_Ada || '');
    let jenisDokSelect = document.getElementById('Jenis_Dok_Pemberitahuan_Select');
    let nomorDokInput = document.getElementById('Nomor_Dok_Pemberitahuan');
    if (dokPabVal.toLowerCase().includes('tanpa dokumen') || !dokPabVal || dokPabVal === '-') {
        if (jenisDokSelect)
            jenisDokSelect.value = 'Tanpa Dokumen';
        if (nomorDokInput) {
            nomorDokInput.value = '';
            nomorDokInput.disabled = true;
        }
        setSafe('Dokumen_Pemberitahuan', 'Tanpa Dokumen');
    }
    else {
        let match = dokPabVal.match(/^(BC\s*[\d\.]+|SPPBMCP|PIB|PEB)/i);
        let extractedJenis = match ? match[0].trim() : '';
        let extractedNomor = dokPabVal;
        if (extractedJenis) {
            let sisa = dokPabVal.replace(match[0], '');
            extractedNomor = sisa.replace(/^[\s\-–—:]*/, '').replace(/^nomor\s*/i, '').replace(/^no\.?\s*/i, '').trim();
        }
        if (jenisDokSelect) {
            let matchedOpt = Array.from(jenisDokSelect.options).find(opt => opt.value.toLowerCase() === (extractedJenis || dokPabVal).toLowerCase());
            jenisDokSelect.value = matchedOpt ? matchedOpt.value : (extractedJenis || 'LAINNYA');
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
        selPelengkap.value = rec.Jenis_Dok_Pelengkap_Select || '-';
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
    setSafe('form_kabid', rec.kabid);
    setSafe('form_nip_kabid', rec.nip_kabid);
    setSafe('form_gol_kabid', rec.gol_kabid);
    setSafe('form_nama_seksi', rec.nama_seksi);
    setSafe('form_nip_seksi', rec.nip_seksi);
    setSafe('form_jabatan_seksi', rec.jabatan_seksi || 'Kepala Seksi Penyidikan');
    setSafe('form_gol_seksi', rec.gol_seksi);
    setSafe('form_ketua_tim', rec.ketua_tim);
    setSafe('form_nip_ketua_tim', rec.nip_ketua_tim);
    setSafe('form_jabatan_ketua_tim', rec.jabatan_ketua_tim || 'Ketua Tim Peneliti');
    setSafe('form_gol_ketua_tim', rec.gol_gol_ketua_tim);
    setSafe('form_pembuat_lpp', rec.pembuat_lpp);
    setSafe('form_nip_pembuat_lpp', rec.nip_pembuat_lpp);
    setSafe('form_jabatan_pembuat_lpp', rec.jabatan_pembuat_lpp || 'Petugas LPP');
    setSafe('form_gol_pembuat_lpp', rec.gol_pembuat_lpp);
    setSafe('form_petugas_lpf', rec.petugas_lpf);
    setSafe('form_nip_petugas_lpf', rec.nip_petugas_lpf);
    setSafe('form_jabatan_petugas_lpf', rec.jabatan_petugas_lpf || 'Petugas LPF');
    setSafe('form_gol_petugas_lpf', rec.gol_petugas_lpf);
    setSafe('form_indak_1', rec.indak_1);
    setSafe('form_nip_indak_1', rec.nip_indak_1);
    setSafe('form_jabatan_indak_1', rec.jabatan_indak_1 || 'Petugas Penindakan 1');
    setSafe('form_gol_indak_1', rec.gol_indak_1);
    setSafe('form_indak_2', rec.indak_2);
    setSafe('form_nip_indak_2', rec.nip_indak_2);
    setSafe('form_jabatan_indak_2', rec.jabatan_indak_2 || 'Petugas Penindakan 2');
    setSafe('form_gol_indak_2', rec.gol_gol_indak_2);
    setSafe('form_indak_lainnya', rec.indak_lainnya);
    setSafe('form_nip_indak_lainnya', rec.nip_indak_lainnya);
    setSafe('form_jabatan_indak_lainnya', rec.jabatan_indak_lainnya || 'Petugas Penindakan 3');
    setSafe('form_gol_indak_lainnya', rec.gol_indak_lainnya);
    let defaultCatatanLPP = "Laporan penerimaan perkara diterima, segera lanjutkan dengan penelitian formal dan pengumpulan bahan keterangan lebih lanjut.";
    let defaultCatatanLPF = "Setuju dengan usulan tim peneliti, segera tindak lanjuti proses administrasi penanganan perkara sesuai ketentuan yang berlaku.";
    setSafe('Catatan_LPP', (rec.Catatan_LPP && rec.Catatan_LPP !== '-') ? rec.Catatan_LPP : defaultCatatanLPP);
    setSafe('Catatan_LPF', (rec.Catatan_LPF && rec.Catatan_LPF !== '-') ? rec.Catatan_LPF : defaultCatatanLPF);
    if (typeof refreshReportTableUI === 'function')
        refreshReportTableUI();
    if (typeof updateReportLive === 'function')
        updateReportLive();
}
export function renderPerkaraTable() {
    let tbody = document.getElementById('perkaraTableBody');
    if (!tbody)
        return;
    let filtered = getFilteredDataForUser();
    let totalPages = Math.ceil(filtered.length / rowsPerPagePerkara) || 1;
    if (currentPerkaraPage > totalPages)
        currentPerkaraPage = totalPages;
    if (currentPerkaraPage < 1)
        currentPerkaraPage = 1;
    let startIdx = (currentPerkaraPage - 1) * rowsPerPagePerkara;
    let paginatedData = filtered.slice(startIdx, startIdx + rowsPerPagePerkara);
    if (paginatedData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:16px; color:var(--text-muted);">Belum ada data perkara tersimpan.</td></tr>`;
        renderPerkaraPagination(totalPages, filtered.length);
        return;
    }
    // Cek apakah user yang login memiliki hak akses Admin / Kasi
    let isAdmin = store.currentUser && (store.currentUser.role === 'Admin' || store.currentUser.role === 'Kepala Seksi Penyidikan');
    tbody.innerHTML = paginatedData.map((rec, index) => {
        let i = startIdx + index;
        let originalIndex = filtered.indexOf(rec);
        let statusBadge = `<span class="badge-status badge-draft">${escText(rec.statusAlur || 'DRAFT')}</span>`;
        if (rec.statusAlur === 'DIUSULKAN')
            statusBadge = `<span class="badge-status badge-proposed">DIUSULKAN</span>`;
        if (rec.statusAlur && rec.statusAlur.includes('DIVALIDASI'))
            statusBadge = `<span class="badge-status badge-ready">DIVALIDASI</span>`;
        let isBooked = (rec.No_LPP && rec.No_LPP !== '-') || (rec.No_LPF && rec.No_LPF !== '-') || (rec.Nomor_SPLIT && rec.Nomor_SPLIT !== '-');
        let bookingHtml = isBooked
            ? `<span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); font-size:11px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
           <i class="fi fi-rr-check" style="font-size:10px;"></i> Ter-booking
         </span>`
            : `<span style="font-size:11px; color:var(--text-muted, #94a3b8);">-</span>`;
        let cleanLP = String(rec.NoLP_LP_1 || '-').replace(/^LP-?/i, '');
        let cleanSBP = String(rec.Nomor_SBP || '-').replace(/^SBP-?/i, '');
        // Tombol Edit selalu muncul untuk semua user
        let actionButtons = `
      <button type="button" class="btn warning" style="padding:4px 8px; font-size:10px;" onclick="editPerkara(${originalIndex})">
        <i class="fi fi-rr-edit"></i> Edit
      </button>
    `;
        // Tombol Hapus HANYA ditambahkan jika yang login adalah Admin / Kasi
        if (isAdmin) {
            actionButtons += `
        <button type="button" class="btn danger" style="padding:4px 8px; font-size:10px;" onclick="deletePerkara(${originalIndex})">
          <i class="fi fi-rr-trash"></i> Hapus
        </button>
      `;
        }
        return `
      <tr>
        <td><b>${i + 1}</b></td>
        <td>
          <b>LP-${escText(cleanLP)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${escText(rec.Tanggal_LP_LP_1 || '-')}</small>
        </td>
        <td>
          <b>SBP-${escText(cleanSBP)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${escText(rec.Tanggal_SBP || '-')}</small>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-weight:600; font-size:12px; color:var(--text-main, #f8fafc);">${escText(rec.Nama_Pelaku || '-')}</span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px;">
              <i class="fi fi-rr-document" style="font-size:10px; margin-right:3px;"></i>${escText(rec.Jenis_Perkara || rec.Dokumen_Pemberitahuan || 'Kepabeanan & Cukai')}
            </small>
          </div>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
            <span class="badge" style="background:rgba(14, 165, 233, 0.15); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.3); font-size:11px; padding:2px 7px; border-radius:4px; white-space:normal; line-height:1.3; text-align:left;">
              ${escText(rec.Komoditi || '-')}
            </span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px; line-height:1.35; word-break:break-word;">
              <i class="fi fi-rr-box-alt" style="font-size:10px; margin-right:3px;"></i>${escText(rec.Uraian_Barang || rec.Detail_Barang_LPP || '-')}
            </small>
          </div>
        </td>
        <td>
          ${statusBadge}<br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">
            PJ: ${escText(rec.disposisiPetugas || rec.Petugas_Disposisi || '-')}
          </small>
        </td>
        <td>
          ${bookingHtml}
        </td>
        <td style="text-align:right;">
          <div style="display:flex; gap:4px; justify-content:flex-end; flex-wrap:wrap;">
            ${actionButtons}
          </div>
        </td>
      </tr>
    `;
    }).join('');
    renderPerkaraPagination(totalPages, filtered.length);
}
function renderPerkaraPagination(totalPages, totalItems = 0) {
    let paginationContainer = document.getElementById('perkaraPaginationContainer');
    if (!paginationContainer) {
        let cardBodyEl = document.querySelector('#data .panel-body, #data .data-table-container, #data');
        if (cardBodyEl) {
            let div = document.createElement('div');
            div.id = 'perkaraPaginationContainer';
            div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 4px 8px; font-size: 12px;';
            cardBodyEl.appendChild(div);
            paginationContainer = div;
        }
        else {
            return;
        }
    }
    const maxPage = totalPages > 0 ? totalPages : 1;
    if (currentPerkaraPage > maxPage)
        currentPerkaraPage = maxPage;
    paginationContainer.innerHTML = `
    <span style="color: var(--text-muted);">Halaman ${currentPerkaraPage} dari ${maxPage} <b style="margin-left: 8px; color: var(--text-main);">Total: ${totalItems} Data</b></span>
    <div style="display: flex; gap: 4px;">
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentPerkaraPage === 1 ? 'disabled' : ''} onclick="window.changePerkaraPage(-1)">Sebelumnya</button>
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentPerkaraPage >= maxPage ? 'disabled' : ''} onclick="window.changePerkaraPage(1)">Selanjutnya</button>
    </div>
  `;
}
export function addNewPerkaraModal() {
    let title = document.getElementById('modalTitle');
    if (title)
        title.textContent = "Input Data Perkara";
    let editIdx = document.getElementById('editingRecordIndex');
    if (editIdx)
        editIdx.value = "-1";
    let inputs = document.querySelectorAll('#perkaraModal input:not([readonly]), #perkaraModal textarea');
    inputs.forEach((el) => {
        if (el.type === 'checkbox')
            el.checked = false;
        else
            el.value = '';
    });
    let selects = document.querySelectorAll('#perkaraModal select');
    selects.forEach((el) => {
        el.selectedIndex = 0;
    });
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
    // ==========================================
    // SISIPKAN VALIDASI BLUR REAL-TIME DI SINI
    // ==========================================
    let inputNoSprin = document.getElementById('No_SPRIN_Indak');
    let inputTglSprin = document.getElementById('Tanggal_SPRIN_Indak');
    let inputNoSbp = document.getElementById('Nomor_SBP');
    let inputTglSbp = document.getElementById('Tanggal_SBP');
    let currentPerkaraId = null;
    let editRecordIdxInput = document.getElementById('editingRecordIndex');
    if (editRecordIdxInput && editRecordIdxInput.value !== '-1') {
        currentPerkaraId = editRecordIdxInput.value;
    }
    const setupPerkaraBlur = (numInput, dateInput, labelName, numKey, dateKey) => {
        if (numInput && !numInput.dataset.validationAttached) {
            numInput.dataset.validationAttached = 'true';
            numInput.addEventListener('blur', () => {
                let noVal = numInput.value;
                let tglVal = dateInput ? dateInput.value : '';
                if (noVal) {
                    let docItems = [{ num: noVal, date: tglVal, numKey: numKey, dateKey: dateKey, label: labelName }];
                    let validation = validateMasterOperationalData(docItems, {}, currentPerkaraId);
                    if (!validation.isValid) {
                        showToast(validation.message, 'error');
                        numInput.focus();
                    }
                }
            });
        }
    };
    setupPerkaraBlur(inputNoSprin, inputTglSprin, 'SPRIN INDAK', 'noSprin', 'tglSprin');
    setupPerkaraBlur(inputNoSbp, inputTglSbp, 'SBP', 'noSbp', 'tglSbp');
    // ==========================================
    updateLiveCodePreviews();
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
    let title = document.getElementById('modalTitle');
    if (title)
        title.textContent = `Edit Data Perkara LP-${rec.NoLP_LP_1 || ''}`;
    loadRecordToCurrentView(rec);
    updateLiveCodePreviews();
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
        let noLpVal = (document.getElementById('NoLP_LP_1')?.value || '').trim() || '1';
        let tglLpVal = document.getElementById('Tanggal_LP_LP_1')?.value || '';
        let year = new Date().getFullYear();
        let noLppVal = (existingRec && existingRec.No_LPP) ? existingRec.No_LPP : generateNextBookingNumber('LPP-', 'No_LPP', `/KBC.04/${year}`, 3);
        let tglLppVal = (existingRec && existingRec.Tanggal_LPP) ? existingRec.Tanggal_LPP : tglLpVal;
        let noLpfVal = (existingRec && existingRec.No_LPF) ? existingRec.No_LPF : generateNextBookingNumber('LPF-', 'No_LPF', `/KBC.04/${year}`, 3);
        let tglLpfVal = (existingRec && existingRec.Tanggal_LPF) ? existingRec.Tanggal_LPF : tglLpVal;
        let noSplitVal = (existingRec && existingRec.Nomor_SPLIT) ? existingRec.Nomor_SPLIT : generateNextBookingNumber('SPLI-', 'Nomor_SPLIT', `/KBC.04/${year}`, 3);
        let tglSplitVal = (existingRec && existingRec.Tanggal_SPLIT) ? existingRec.Tanggal_SPLIT : tglLpVal;
        let noSprinCacah = (document.getElementById('No_SPRIN_CACAH')?.value || '').trim();
        let tglSprinCacah = document.getElementById('Tanggal_SPRIN_CACAH')?.value || '';
        let noBa = (document.getElementById('Nomor_BA')?.value || '').trim();
        let tglBa = document.getElementById('Tanggal_BA')?.value || '';
        let noLhp = (document.getElementById('Nomor_LHP')?.value || '').trim();
        let tglLhp = document.getElementById('Tanggal_LHP')?.value || '';
        // ==========================================
        // VALIDASI MENGGUNAKAN MASTER TERPUSAT
        // ==========================================
        let docsToValidate = [
            { num: noSprinVal, date: tglSprinVal, numKey: 'No_SPRIN_Indak', dateKey: 'Tanggal_SPRIN_Indak', label: 'Nomor SPRIN INDAK' },
            { num: noSbpVal, date: tglSbpVal, numKey: 'Nomor_SBP', dateKey: 'Tanggal_SBP', label: 'Nomor SBP' },
            { num: noLpVal, date: tglLpVal, numKey: 'NoLP_LP_1', dateKey: 'Tanggal_LP_LP_1', label: 'Nomor LP' },
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
        // ==========================================
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
            NoLP_LP_1: noLpVal,
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
            jabatan_petugas_lpf: valSafe('form_jabatan_petugas_lpf'),
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
export function exportDataToExcel() {
    let data = getFilteredDataForUser();
    if (!data || data.length === 0) {
        showToast("DATA KOSONG", "Tidak ada data perkara untuk diekspor.", "warning");
        return;
    }
    let headers = [
        "No", "No LP", "Tanggal LP", "No SBP", "Tanggal SBP",
        "Nama Pelaku", "Identitas", "Komoditi", "Uraian Barang",
        "Kerugian Negara", "Status Workflow", "Disposisi Peneliti"
    ];
    let csvRows = [headers.join(";")];
    data.forEach((rec, idx) => {
        let row = [
            idx + 1,
            `"LP-${rec.NoLP_LP_1 || '-'}"`,
            `"${rec.Tanggal_LP_LP_1 || '-'}"`,
            `"SBP-${rec.Nomor_SBP || '-'}"`,
            `"${rec.Tanggal_SBP || '-'}"`,
            `"${(rec.Nama_Pelaku || '-').replace(/"/g, '""')}"`,
            `"${(rec.Nomor_Identitas || '-').replace(/"/g, '""')}"`,
            `"${(rec.Komoditi || '-').replace(/"/g, '""')}"`,
            `"${(rec.Uraian_Barang || '-').replace(/"/g, '""')}"`,
            `"${(rec.Kerugian_Negara || 'Rp 0').replace(/"/g, '""')}"`,
            `"${rec.statusAlur || 'DRAFT'}"`,
            `"${(rec.disposisiPetugas || '-').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(";"));
    });
    let csvContent = "\uFEFF" + csvRows.join("\r\n");
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Perkara_AP3_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("EKSPOR BERHASIL", "File Excel (.csv) berhasil diunduh.", "success");
}
export function exportDataToPDF() {
    let data = getFilteredDataForUser();
    if (!data || data.length === 0) {
        showToast("DATA KOSONG", "Tidak ada data perkara untuk dicetak ke PDF.", "warning");
        return;
    }
    let tableRows = data.map((rec, i) => `
    <tr>
      <td style="text-align:center; padding:6px; border:1px solid #333;">${i + 1}</td>
      <td style="padding:6px; border:1px solid #333; font-weight:bold;">LP-${escText(rec.NoLP_LP_1 || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.Tanggal_LP_LP_1 || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">SBP-${escText(rec.Nomor_SBP || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.Nama_Pelaku || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.Komoditi || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.Kerugian_Negara || '-')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.statusAlur || 'DRAFT')}</td>
      <td style="padding:6px; border:1px solid #333;">${escText(rec.disposisiPetugas || '-')}</td>
    </tr>
  `).join('');
    let printWindow = window.open('', '_blank');
    if (!printWindow)
        return;
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Laporan Data Perkara AP3</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 10pt; margin: 20px; color: #000; }
        h2 { text-align: center; margin-bottom: 4px; text-transform: uppercase; }
        p { text-align: center; font-size: 9pt; margin-top: 0; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 9pt; }
        th { background: #f0f0f0; border: 1px solid #333; padding: 6px; text-align: left; }
      </style>
    </head>
    <body>
      <h2>Daftar Data Perkara AP3</h2>
      <p>Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}</p>
      <table>
        <thead>
          <tr>
            <th style="width:30px; text-align:center;">No</th>
            <th>No. LP</th>
            <th>Tgl LP</th>
            <th>No. SBP</th>
            <th>Nama Pelaku</th>
            <th>Komoditi</th>
            <th>Kerugian Negara</th>
            <th>Status</th>
            <th>Disposisi</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
    }, 300);
}
export function changePerkaraPage(direction) {
    currentPerkaraPage += direction;
    renderPerkaraTable();
}
window.addNewPerkaraModal = addNewPerkaraModal;
window.changePerkaraPage = changePerkaraPage;
window.editPerkara = editPerkara;
window.deletePerkara = deletePerkara;
window.closeModal = closeModal;
window.confirmAndSubmitPerkara = confirmAndSubmitPerkara;
window.executePerkaraSubmission = executePerkaraSubmission;
window.submitPerkaraForm = submitPerkaraForm;
window.changePerkaraPage = changePerkaraPage;
window.exportDataToExcel = exportDataToExcel;
window.exportDataToPDF = exportDataToPDF;
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
window.updateLiveCodePreviews = updateLiveCodePreviews;
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
//# sourceMappingURL=perkara.js.map