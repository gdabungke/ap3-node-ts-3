import { store } from '../state/store.js';
import { escText } from '../utils/formatters.js';
import { getFilteredDataForUser } from '../modules/auth.js';

export function updateDashboardStats(): void {
  let filteredData = getFilteredDataForUser();

  let stLP = document.getElementById('statLP');
  let stK = document.getElementById('statKerugian');
  let cntLpEl = document.getElementById('dash_cnt_lp');
  let cntSbpEl = document.getElementById('dash_cnt_sbp');
  let cntMandiriEl = document.getElementById('dash_cnt_mandiri');
  let cntNhiEl = document.getElementById('dash_cnt_nhi');
  let cntLimpahanEl = document.getElementById('dash_cnt_limpahan');

  if (stLP) stLP.textContent = String(filteredData.length);
  if (cntLpEl) cntLpEl.textContent = `${filteredData.filter((d: any) => d.NoLP_LP_1 && d.NoLP_LP_1 !== '-').length} Dokumen`;
  if (cntSbpEl) cntSbpEl.textContent = `${filteredData.filter((d: any) => d.Nomor_SBP && d.Nomor_SBP !== '-').length} Dokumen`;

  let totalKerugian = 0;
  let cntBDN = 0;
  let cntSPSA = 0;
  let cntBAST = 0;
  let cntLimpah = 0;
  let cntOther = 0;

  let cntMandiri = 0;
  let cntNHI = 0;
  let cntLimpahan = 0;

  filteredData.forEach((rec: any) => {
    let rawK = String(rec.Kerugian_Negara || '').replace(/[^0-9]/g, '');
    let k = parseFloat(rawK || '0');
    if (!isNaN(k)) totalKerugian += k;

    let peny = rec.Penyelesaian_Perkara || '';
    if (/dikuasai negara|bdn/i.test(peny)) cntBDN++;
    else if (/spsa|denda/i.test(peny)) cntSPSA++;
    else if (/kembalikan ke pemilik|pemilik/i.test(peny)) cntBAST++;
    else if (/serah terima.*instansi|limpah/i.test(peny)) cntLimpah++;
    else if (peny.trim() !== '' && peny !== '-') cntOther++;

    let asal = (rec.Asal_Perkara || '').toUpperCase();
    let statusTangkap = (rec.Status_Penangkapan || '').toUpperCase();
    let sprin = (rec.No_SPRIN_Indak || '').toUpperCase();

    if (asal.includes('LIMPAHAN') || statusTangkap.includes('LIMPAHAN')) {
      cntLimpahan++;
    } else if (asal.includes('NHI') || sprin.includes('NHI') || statusTangkap.includes('NHI')) {
      cntNHI++;
    } else {
      cntMandiri++;
    }
  });

  if (stK) stK.textContent = 'Rp ' + totalKerugian.toLocaleString('id-ID');

  let elBdn = document.getElementById('tl_bdn_cnt');
  if (elBdn) elBdn.textContent = String(cntBDN);
  let elSpsa = document.getElementById('tl_spsa_cnt');
  if (elSpsa) elSpsa.textContent = String(cntSPSA);
  let elBast = document.getElementById('tl_bast_cnt');
  if (elBast) elBast.textContent = String(cntBAST);
  let elLimpah = document.getElementById('tl_limpah_cnt');
  if (elLimpah) elLimpah.textContent = String(cntLimpah);
  let elOther = document.getElementById('tl_other_cnt');
  if (elOther) elOther.textContent = String(cntOther);

  if (cntMandiriEl) cntMandiriEl.textContent = String(cntMandiri);
  if (cntNhiEl) cntNhiEl.textContent = String(cntNHI);
  if (cntLimpahanEl) cntLimpahanEl.textContent = String(cntLimpahan);

  let recentTbody = document.getElementById('dashboardRecentCasesBody');
  if (recentTbody) {
    if (filteredData.length === 0) {
      recentTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:14px; color:var(--text-muted, #94a3b8);">Belum ada perkara yang terdaftar.</td></tr>`;
    } else {
      let recentItems = filteredData.slice(-3).reverse();

      recentTbody.innerHTML = recentItems.map((rec: any) => {
        let statusBadgeHtml = '';
        let hasReport = (rec.No_LPP && rec.No_LPP !== '-') || (rec.Nomor_LHP && rec.Nomor_LHP !== '-');

        if (hasReport || (rec.statusAlur && rec.statusAlur.includes('DIVALIDASI'))) {
          statusBadgeHtml = `
            <span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); font-size:10px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fi fi-rr-document-signed"></i> PENYUSUNAN LAPORAN
            </span>
          `;
        } else {
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
              <button type="button" class="btn secondary" style="font-size:10px; padding:3px 8px;" onclick="bukaPerkaraDariDashboard(${store.databasePerkara.indexOf(rec)})">
                <i class="fi fi-rr-arrow-right"></i> Buka
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

export function bukaPerkaraDariDashboard(realIndex: number): void {
  if (realIndex >= 0 && store.databasePerkara[realIndex]) {
    store.activeRecordIndex = realIndex;
    if ((window as any).loadRecordToCurrentView) {
      (window as any).loadRecordToCurrentView(store.databasePerkara[realIndex]);
    }
    let navBtn = document.querySelector('[data-target="#laporan"]') as HTMLElement;
    if (navBtn) navBtn.click();
  }
}

(window as any).updateDashboardStats = updateDashboardStats;