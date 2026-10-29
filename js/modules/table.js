import { store } from '../state/store.js';
import { escText } from '../utils/formatters.js';
import { showToast } from '../utils/ui.js';
import { getFilteredDataForUser } from './auth.js';
import { fetchDisposisiList } from './disposisi.js';
let currentPerkaraPage = 1;
const rowsPerPagePerkara = 5;
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
        let actionButtons = `
      <button type="button" class="btn warning" style="padding:4px 8px; font-size:10px;" onclick="editPerkara(${originalIndex})">
        <i class="fi fi-rr-edit"></i> Edit
      </button>
    `;
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
export function changePerkaraPage(direction) {
    currentPerkaraPage += direction;
    renderPerkaraTable();
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
            `"${rec.Nomor_SBP || '-'}"`,
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
let currentDisposisiPage = 1;
const rowsPerPage = 5;
export async function renderDisposisiTable() {
    let tbody = document.getElementById('disposisiTableBody');
    if (!tbody)
        return;
    let listDisposisi = await fetchDisposisiList();
    let filtered = listDisposisi;
    let isPenyidik = store.currentUser && (store.currentUser.role === 'Penyidik / Ketua Tim Peneliti' ||
        store.currentUser.role === 'Penyidik');
    if (isPenyidik) {
        let curNama = (store.currentUser?.namaLengkap || store.currentUser?.nama || store.currentUser?.username || '').toLowerCase();
        filtered = listDisposisi.filter((d) => d.targetPenyidik && curNama && d.targetPenyidik.trim().toLowerCase() === curNama);
    }
    let totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
    if (currentDisposisiPage > totalPages)
        currentDisposisiPage = totalPages;
    if (currentDisposisiPage < 1)
        currentDisposisiPage = 1;
    let startIdx = (currentDisposisiPage - 1) * rowsPerPage;
    let paginatedData = filtered.slice(startIdx, startIdx + rowsPerPage);
    if (paginatedData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:20px; color:var(--text-muted, #94a3b8);">Belum ada data disposisi berkas.</td></tr>`;
        renderDisposisiPagination(totalPages, filtered.length);
        return;
    }
    tbody.innerHTML = paginatedData.map((d, index) => {
        let realIndex = listDisposisi.findIndex((item) => item.id === d.id);
        let i = startIdx + index;
        let actionBtn = '';
        let rawStatus = String(d.status || d.statusDisposisi || 'DRAF');
        let isDraft = rawStatus.toUpperCase() === 'DRAF' ||
            rawStatus.toUpperCase().includes('BELUM DITUNJUK') ||
            rawStatus.toLowerCase().includes('ditolak');
        let statusText = '';
        let statusBadgeClass = 'badge-warning';
        if (rawStatus.includes('Ditolak')) {
            statusText = 'DITOLAK';
            statusBadgeClass = 'badge-danger';
        }
        else if (rawStatus.toLowerCase().includes('diterima') || rawStatus.toLowerCase().includes('ditindaklanjuti')) {
            statusText = 'DISPOSISI DITERIMA';
            statusBadgeClass = 'badge-success';
        }
        else if (rawStatus.toLowerCase().includes('terkirim') || rawStatus.toLowerCase().includes('didisposisikan')) {
            if (isPenyidik) {
                statusText = 'DISPOSISI MASUK';
                statusBadgeClass = 'badge-warning';
            }
            else {
                statusText = 'DISPOSISI TERKIRIM';
                statusBadgeClass = 'badge-proposed';
            }
        }
        else {
            statusText = 'DRAF';
            statusBadgeClass = 'badge-draft';
        }
        let tglFormatted = d.tanggalDisposisi ? new Date(d.tanggalDisposisi).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
        if (isPenyidik) {
            if (!rawStatus.toLowerCase().includes('diterima') && !rawStatus.toLowerCase().includes('ditindaklanjuti') && !rawStatus.toLowerCase().includes('ditolak')) {
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
            }
            else {
                actionBtn = `<button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${realIndex})'><i class="fi fi-rr-eye"></i> Detail</button>`;
            }
        }
        else {
            if (isDraft) {
                actionBtn = `
          <div style="display:flex; gap:4px; justify-content:flex-end;">
            <button type="button" class="btn warning" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${realIndex})'>
              <i class="fi fi-rr-edit"></i> Edit
            </button>
            <button type="button" class="btn danger" style="padding:4px 8px; font-size:10px;" onclick='hapusDisposisi("${d.id}")'>
              <i class="fi fi-rr-trash"></i> Hapus
            </button>
          </div>
        `;
            }
            else {
                actionBtn = `
          <button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${realIndex})'>
            <i class="fi fi-rr-eye"></i> Detail
          </button>
        `;
            }
        }
        let cleanSBP = String(d.noSbp || '').replace(/^SBP-?/i, '');
        let cleanLP = String(d.noLp || '').replace(/^LP-?/i, '');
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
function renderDisposisiPagination(totalPages, totalItems = 0) {
    let paginationContainer = document.getElementById('disposisiPaginationContainer') || document.getElementById('perkaraPageInfo')?.parentElement;
    if (!paginationContainer) {
        let cardBodyEl = document.querySelector('#disposisi .panel-body, #disposisi .data-table-container, #disposisi');
        if (cardBodyEl) {
            let div = document.createElement('div');
            div.id = 'disposisiPaginationContainer';
            div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 4px 8px; font-size: 12px;';
            cardBodyEl.appendChild(div);
            paginationContainer = div;
        }
        else {
            return;
        }
    }
    const maxPage = totalPages > 0 ? totalPages : 1;
    if (currentDisposisiPage > maxPage)
        currentDisposisiPage = maxPage;
    if (currentDisposisiPage < 1)
        currentDisposisiPage = 1;
    paginationContainer.innerHTML = `
    <span style="color: var(--text-muted);">Halaman ${currentDisposisiPage} dari ${maxPage} <b style="margin-left: 8px; color: var(--text-main);">Total: ${totalItems} Data</b></span>
    <div style="display: flex; gap: 4px;">
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentDisposisiPage === 1 ? 'disabled' : ''} onclick="window.changeDisposisiPage(-1)">Sebelumnya</button>
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${currentDisposisiPage >= maxPage ? 'disabled' : ''} onclick="window.changeDisposisiPage(1)">Selanjutnya</button>
    </div>
  `;
}
export function changeDisposisiPage(direction) {
    currentDisposisiPage += direction;
    renderDisposisiTable();
}
window.changeDisposisiPage = changeDisposisiPage;
window.renderDisposisiTable = renderDisposisiTable;
window.changePerkaraPage = changePerkaraPage;
window.exportDataToExcel = exportDataToExcel;
window.exportDataToPDF = exportDataToPDF;
//# sourceMappingURL=table.js.map