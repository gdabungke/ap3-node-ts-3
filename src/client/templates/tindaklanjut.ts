import { store, savePerkaraToStorage } from '../state/store.js';
import { escText, getVal, tanggalKeTeks, formatDateIndo, autoGenerateTeksTanggalBA, formatTrailingDashes, formatRowTrailingDashes } from '../utils/formatters.js';
import { showToast } from '../modules/ui.js';
import { tteBadge, buildTableKv, generateKopSurat } from './laporan.js';

export function handleSingleValidationTL(): void {
  if ((typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0) && store.databasePerkara.length > 0) {
    store.activeRecordIndex = 0;
  }

  if (typeof store.activeRecordIndex === 'undefined' || store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    showToast("INFORMASI", "Belum ada data perkara/LHP yang tersedia untuk divalidasi.", "warning");
    return;
  }

  let activeRecord = store.databasePerkara[store.activeRecordIndex];
  let noLhp = activeRecord.Nomor_LHP || activeRecord.NoLP_LP_1 || '1';
  let tglLhp = activeRecord.Tanggal_LHP || activeRecord.Tanggal_LP_LP_1 || '';

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

  let bannerBox = document.getElementById('tlValidatorBanner');
  if (bannerBox) bannerBox.style.display = 'flex';
  
  let statusLabel = document.getElementById('tlActiveStatusLabel');
  if (statusLabel) {
    let lhpLabel = activeRecord.Nomor_LHP ? `LHP-${activeRecord.Nomor_LHP}` : `LP-${activeRecord.NoLP_LP_1}`;
    statusLabel.textContent = `TERVALIDASI: ${lhpLabel} (Pelaku: ${escText(activeRecord.Nama_Pelaku)})`;
  }

  let existingToast = document.getElementById('customToastNotification');
  if (!existingToast) {
    let toastDiv = document.createElement('div');
    toastDiv.id = 'customToastNotification';
    toastDiv.innerHTML = `<i class="fi fi-rr-check-circle" style="color: #22c55e; margin-right: 8px;"></i><span id="toastMessage">Data Tindak Lanjut berhasil divalidasi & disinkronkan dari LHP!</span>`;
    toastDiv.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); display: flex; align-items: center; z-index: 9999; font-size: 14px; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; transform: translateY(20px); border-left: 4px solid #10b981;";
    document.body.appendChild(toastDiv);
    existingToast = toastDiv;
  } else {
    let msgEl = document.getElementById('toastMessage');
    if (msgEl) msgEl.innerText = "Data Tindak Lanjut berhasil divalidasi & disinkronkan dari LHP!";
  }

  setTimeout(() => {
    if (existingToast) {
      existingToast.style.opacity = '1';
      existingToast.style.transform = 'translateY(0)';
    }
  }, 10);

  setTimeout(() => {
    if (existingToast) {
      existingToast.style.opacity = '0';
      existingToast.style.transform = 'translateY(20px)';
    }
  }, 3000);

  if (typeof (window as any).refreshTLTableUI === 'function') {
    (window as any).refreshTLTableUI();
  }
}

export function getTLNumFormat(type: string): string {
  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) return '-';
  let rec = store.databasePerkara[store.activeRecordIndex];
  let fallbackNum = rec.Nomor_LHP || rec.NoLP_LP_1 || '338';
  
  if (type === 'BAST_PEMILIK') {
    let num = rec.TL_BAST_Num || fallbackNum;
    return `BAST-${num}/KPU.2064/2026`;
  }
  if (type === 'BAST_LIMPAH') return `BAST-${rec.TL_Limpah_Num || fallbackNum}/LIMPAH/KPU.2064/2026`;
  if (type === 'BA_SEGEL') {
    let numSegel = rec.TL_Segel_Num || fallbackNum;
    return `BA-${numSegel}/BUKASEGEL/KPU.2064/2026`;
  }
  if (type === 'SPSA') return `SPSA-${rec.TL_SPSA_Num || fallbackNum}/KPU.2/2026`;
  if (type === 'KEP_BDN') return `KEP-${rec.TL_KEP_Num || fallbackNum}/KPU.2064/2026`;
  return '-';
}

export function closeTLReportTag(customSignHTML: string, tglStr: string): string {
  let t = tglStr || '28 September 2026';
  return `<div style="page-break-inside: avoid !important; margin-top:16px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="text-align:right; margin-bottom:8px;">Batam, ${t}</div>
    ${customSignHTML}
  </div></div>`;
}

export function BAST_PEMILIK(): string {
  if (store.activeRecordIndex < 0 || !store.databasePerkara[store.activeRecordIndex]) {
    return `<div class="report"><p>Data belum dipilih.</p></div>`;
  }
  let rec = store.databasePerkara[store.activeRecordIndex];
  let num = getTLNumFormat('BAST_PEMILIK');

  const angkaKeTeks = (n: any): string => {
    let numVal = parseInt(n, 10);
    if (isNaN(numVal)) return '';
    const satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
    if (numVal < 12) return satuan[numVal];
    if (numVal < 20) return angkaKeTeks(numVal - 10) + ' belas';
    if (numVal < 100) return angkaKeTeks(Math.floor(numVal / 10)) + ' puluh' + (numVal % 10 !== 0 ? ' ' + satuan[numVal % 10] : '');
    if (numVal < 200) return 'seratus' + (numVal - 100 !== 0 ? ' ' + angkaKeTeks(numVal - 100) : '');
    if (numVal < 1000) return angkaKeTeks(Math.floor(numVal / 100)) + ' ratus' + (numVal % 100 !== 0 ? ' ' + angkaKeTeks(numVal % 100) : '');
    return String(numVal);
  };

  let rawDate = rec.TL_Tanggal_Surat || rec.Tanggal_LHP || rec.Tanggal_LP_LP_1 || '';
  let dateInfo = autoGenerateTeksTanggalBA(rawDate);
  let hari = escText(rec.TL_Hari_BAST || dateInfo.hari || 'Kamis');
  let tglHuruf = escText(rec.TL_Tgl_Huruf_BAST || dateInfo.teksLengkap || '-');
  let tglCetakTTD = rawDate ? formatDateIndo(rawDate) : '17 September 2026';

  let sarkutList = rec.TL_BAST_SarkutList || [
    { jenis: rec.TL_Nama_Sarkut || rec.Pengangkut || '-', nopol: rec.TL_No_Reg_Sarkut || '-' }
  ];

  let rawJml = rec.Jumlah_Koli || '12';
  let txtTerbilang = angkaKeTeks(rawJml) || 'dua belas';
  let jnsKoli = rec.Jenis_Koli || 'koli';
  let komoditas = rec.Komoditi || rec.Uraian_Barang || 'Sepatu';
  komoditas = komoditas.replace(/^(\d+\s*\([^)]*\)\s*[a-zA-Z]+\s*)+/i, '').trim() || 'Sepatu';

  let defaultKemasanOtomatis = (rec.No_Kontainer && rec.No_Kontainer !== '-') 
    ? `${rec.No_Kontainer} / ${rec.Ukuran_Kontainer || ''}` 
    : `${rawJml} ${jnsKoli}`;
  let defaultBarangOtomatis = `${rawJml} (${txtTerbilang}) ${jnsKoli} ${komoditas}`;

  let barangList = rec.TL_BAST_BarangList;
  if (!barangList || barangList.length === 0 || (barangList[0].uraian && barangList[0].uraian.split(jnsKoli).length > 2)) {
    barangList = [{ kemasan: defaultKemasanOtomatis, uraian: defaultBarangOtomatis }];
    rec.TL_BAST_BarangList = barangList;
  }

  let dokDefault = '-';
  if (rec.TL_Dokumen_Bast) {
    dokDefault = rec.TL_Dokumen_Bast;
  } else {
    let jns = rec.Dokumen_Pemberitahuan || 'BC 2.0';
    let no = rec.Nomor_Dok_Pemberitahuan || '12345';
    let tgl = rec.Tanggal_Dokumen_Pemberitahuan ? formatDateIndo(rec.Tanggal_Dokumen_Pemberitahuan) : '01 September 2026';
    dokDefault = `Eks. ${jns} nomor ${no} tanggal ${tgl}`;
  }
  let dokumenList = rec.TL_BAST_DokumenList || [{ uraian: dokDefault }];

  let orangList = rec.TL_BAST_OrangList || [{ nama: '-', identitas: '-' }];

  const toLetter = (i: number) => String.fromCharCode(97 + i) + '.';

  let sarkutRows = sarkutList.map((s: any, idx: number) => `
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${toLetter(idx)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jenis Sarana Pengangkut</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(s.jenis || '-')}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">No. Reg/No. Polisi</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(s.nopol || '-')}</td>
    </tr>
  `).join('');

  if (sarkutList.length === 1) {
    sarkutRows += `
      <tr>
        <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
        <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">…………………………………………</td>
        <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
        <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
      </tr>
    `;
  }

  let barangRows = barangList.map((b: any, idx: number) => `
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${toLetter(idx)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jml/No. Peti Kemas/Kemasan</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(b.kemasan || '-')}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jumlah/Jenis Barang</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(b.uraian || '-')}</td>
    </tr>
  `).join('');

  if (barangList.length === 1) {
    barangRows += `
      <tr>
        <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
        <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">…………………………………………</td>
        <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
        <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
      </tr>
    `;
  }

  let dokumenRows = dokumenList.map((d: any, idx: number) => `
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${toLetter(idx)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jenis/No. dan Tgl. Dokumen</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(d.uraian || '-')}</td>
    </tr>
  `).join('');

  if (dokumenList.length === 1) {
    dokumenRows += `
      <tr>
        <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
        <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">…………………………………………</td>
        <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
        <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
      </tr>
    `;
  }

  let orangRows = orangList.map((o: any, idx: number) => `
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${toLetter(idx)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Nama</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(o.nama || '-')}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">No. Identitas</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${escText(o.identitas || '-')}</td>
    </tr>
  `).join('');

  if (orangList.length === 1) {
    orangRows += `
      <tr>
        <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
        <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">…………………………………………</td>
        <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
        <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
      </tr>
    `;
  }

  let rawNamaPenerima = (rec.TL_Nama_Pemilik || rec.Nama_Pemilik || rec.Nama_Perusahaan || rec.Nama_Pelaku || '-').trim();
  let namaPenerimaTTD = rawNamaPenerima.replace(/\.+$/, '');

  let rawNik = rec.TL_NIK_Pemilik || rec.Nomor_Identitas || '-';
  let nikPenerima = rawNik.trim();

  let rawAlamat = rec.TL_Alamat_Pemilik || rec.Alamat_Pemilik || rec.Alamat_Pelaku || '-';
  let alamatPenerima = rawAlamat.trim();

  let rawAtasNama = (rec.TL_Atas_Nama_Pt || rawNamaPenerima).trim();
  let atasNamaTeks = (rawAtasNama !== '-' && !rawAtasNama.endsWith('.')) ? rawAtasNama + '.' : rawAtasNama;

  let rawRangka = (rec.TL_Rangka_Penyerahan || 'Pengeluaran barang sebagian atas barang yang tidak terkena larangan dan/atau pembatasan').trim();
  let rangkaClean = (rawRangka !== '-' && !rawRangka.endsWith('.')) ? rawRangka + '.' : rawRangka;

  let pet1Nama = rec.TL_Petugas_Bast_1 && rec.TL_Petugas_Bast_1 !== 'Petugas BAST 1' ? escText(rec.TL_Petugas_Bast_1) : '-';
  let pet1Nip = rec.TL_NIP_Bast_1 || rec.nip_ketua_tim || '-';
  let pet2Nama = rec.TL_Petugas_Bast_2 && rec.TL_Petugas_Bast_2 !== 'Petugas BAST 2' ? escText(rec.TL_Petugas_Bast_2) : '-';
  let pet2Nip = rec.TL_NIP_Bast_2 || '-';

  return `
  <div class="report" style="font-family:Arial, Helvetica, sans-serif !important; font-size:11pt !important; line-height:1.35; color:#000 !important; width:100%; box-sizing:border-box;">
    ${generateKopSurat('BAST')}

    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:14px 0 2px 0;">BERITA ACARA SERAH TERIMA</div>
    <div style="text-align:center; font-size:11pt; margin-bottom:14px;">Nomor : ${num}</div>

    ${formatTrailingDashes(`Pada hari ini, ${hari} tanggal${tglHuruf}. Kami yang bertanda tangan di bawah ini bertindak untuk/atas nama Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam, telah menyerahkan:`, '----------')}

    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:36px;">
        <col style="width:235px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 289px);">
      </colgroup>

      <tr>
        <td colspan="4" style="border:none !important; font-weight:bold; padding:4px 0 2px 0; font-size:11pt;">1. Sarana Pengangkut</td>
      </tr>
      ${sarkutRows}

      <tr>
        <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">2. Barang</td>
      </tr>
      ${barangRows}

      <tr>
        <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">3. Dokumen</td>
      </tr>
      ${dokumenRows}

      <tr>
        <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">4. Orang</td>
      </tr>
      ${orangRows}
    </table>

    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-top:8px; margin-bottom:8px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:271px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 289px);">
      </colgroup>
      <tr>
        <td style="border:none !important; font-weight:bold; padding:2px 0; font-size:11pt;">Diserahkan kepada</td>
        <td style="border:none !important; padding:2px 0; text-align:center; vertical-align:top; font-size:11pt; font-weight:bold;">:</td>
        <td style="border:none !important; padding:2px 4px;"></td>
      </tr>
      ${formatRowTrailingDashes('Nama', rawNamaPenerima, '271px')}
      ${formatRowTrailingDashes('No. Identitas', nikPenerima, '271px')}
      ${formatRowTrailingDashes('Alamat', alamatPenerima, '271px')}
    </table>

    ${formatTrailingDashes(`Menerima penyerahan untuk/atas nama: ${atasNamaTeks}`)}
    ${formatTrailingDashes(`Penyerahan dilaksanakan dalam rangka: ${rangkaClean}`)}
    ${formatTrailingDashes('Demikian Berita Acara ini dibuat dengan sebenarnya.')}

    <div style="page-break-inside:avoid !important; margin-top:16px; font-family:Arial, Helvetica, sans-serif; font-size:11pt;">
      <table style="width:100% !important; border-collapse:collapse !important; border:none !important; table-layout:fixed; font-size:11pt;">
        <colgroup>
          <col style="width:52%;">
          <col style="width:48%;">
        </colgroup>
        <tr>
          <td style="border:none !important; padding:0; vertical-align:top;"></td>
          <td style="border:none !important; padding:0 0 10px 0; vertical-align:top; text-align:left;">
            <div style="width:85%; margin-left:auto;">Batam, ${tglCetakTTD}</div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:0 10px 0 0; vertical-align:top;">
            Yang menerima,
            <div style="height:55px;"></div>
            <b>${namaPenerimaTTD}</b>
          </td>
          <td style="border:none !important; padding:0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              Yang menyerahkan,
              <div style="height:55px;"></div>
              <b>${pet1Nama}</b><br>
              NIP. ${pet1Nip}
            </div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:20px 10px 0 0; vertical-align:top;">
            <div style="height:55px;"></div>
            <b>---------------------------</b>
          </td>
          <td style="border:none !important; padding:20px 0 0 0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              <div style="height:20px;"></div>
              <div style="height:55px;"></div>
              <b>${pet2Nama}</b><br>
              NIP. ${pet2Nip}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>`;
}

export function BA_SEGEL(): string {
  if (store.activeRecordIndex < 0) return `<div class="report"><p>Data belum dipilih.</p></div>`;
  let rec = store.databasePerkara[store.activeRecordIndex];
  let num = getTLNumFormat('BA_SEGEL');
  
  let rawDate = rec.TL_Tanggal_Surat || rec.Tanggal_LHP || rec.Tanggal_LP_LP_1 || '';
  let dateInfo = autoGenerateTeksTanggalBA(rawDate);
  let hari = escText(rec.TL_Segel_Hari || dateInfo.hari || '');
  let tglHuruf = escText(rec.TL_Segel_Tgl_Huruf || dateInfo.teksLengkap || '');
  let tglCetakTTD = rawDate ? formatDateIndo(rawDate) : '';

  let noSpli = escText(rec.TL_Segel_No_SPLI || rec.Nomor_SPLIT || '-');
  let tglSpliRaw = rec.TL_Segel_Tgl_SPLI || rec.Tanggal_SPLIT || '';
  let tglSpli = tglSpliRaw ? formatDateIndo(tglSpliRaw) : '-';
  
  let namaSarkut = escText(rec.TL_Segel_Nama_Sarkut || '-');
  let regSarkut = escText(rec.TL_Segel_Reg_Sarkut || '-');
  let bendera = escText(rec.TL_Segel_Bendera || '-');
  let nahkoda = escText(rec.TL_Segel_Nahkoda || '-');
  let nikNahkoda = escText(rec.TL_Segel_Nik_Nahkoda || '-');

  let jmlBarang = escText(rec.TL_Segel_Jml_Barang || '-');
  let jenisBarang = escText(rec.TL_Segel_Jenis_Barang || '-');
  let dokBarang = escText(rec.TL_Segel_Dok_Barang || '-');
  let pemilikBarang = escText(rec.TL_Segel_Pemilik_Barang || '-');
  let npwpBarang = escText(rec.TL_Segel_NPWP_Barang || '-');

  let alamatBangunan = escText(rec.TL_Segel_Alamat_Bangunan || '-');
  let regBangunan = escText(rec.TL_Segel_Reg_Bangunan || '-');
  let namaPemilikTempat = escText(rec.TL_Segel_Nama_Pemilik_Tempat || '-');
  let nikPemilikTempat = escText(rec.TL_Segel_Nik_Pemilik_Tempat || '-');

  let rawNamaSaksi = escText(rec.TL_Nama_Pemilik || rec.Nama_Pelaku || '');
  let rawAlamatSaksi = escText(rec.TL_Alamat_Pemilik || '');
  let rawPkrSaksi = escText(rec.TL_Segel_Pekerjaan || '');
  let rawNikSaksi = escText(rec.TL_NIK_Pemilik || '');

  let namaSaksi = rawNamaSaksi ? rawNamaSaksi : '-';
  let alamatSaksi = rawAlamatSaksi ? rawAlamatSaksi : '-';
  let pkrSaksi = rawPkrSaksi ? rawPkrSaksi : '-';
  let nikSaksi = rawNikSaksi ? rawNikSaksi : '-';
  let namaSaksiTTD = rawNamaSaksi || '-';

  let p1 = escText(rec.TL_Segel_P1 || rec.ketua_tim || '-');
  let p2 = escText(rec.TL_Segel_P2 || '-');
  let p1Nip = escText(rec.TL_NIP_Segel_1 || rec.nip_ketua_tim || '-');
  let p2Nip = escText(rec.TL_NIP_Segel_2 || '-');

  let ttdSegel = `
    <div style="page-break-inside:avoid !important; margin-top:16px; font-family:Arial, Helvetica, sans-serif; font-size:11pt;">
      <table style="width:100% !important; border-collapse:collapse !important; border:none !important; table-layout:fixed; font-size:11pt;">
        <colgroup>
          <col style="width:52%;">
          <col style="width:48%;">
        </colgroup>
        <tr>
          <td style="border:none !important; padding:0; vertical-align:top;"></td>
          <td style="border:none !important; padding:0 0 10px 0; vertical-align:top; text-align:left;">
            <div style="width:85%; margin-left:auto;">Batam, ${tglCetakTTD}</div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:0 10px 0 0; vertical-align:top;">
            Yang menerima,
            <div style="height:35px;"></div>
            <b>${namaSaksiTTD}</b>
          </td>
          <td style="border:none !important; padding:0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              Yang menyerahkan,
              <div style="height:35px;"></div>
              ${tteBadge()}
              <b>${p1}</b><br>
              NIP. ${p1Nip}
            </div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:35px 10px 0 0; vertical-align:top;">
            <b>----------------------------------------</b>
          </td>
          <td style="border:none !important; padding:20px 0 0 0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              <div style="height:25px;"></div>
              ${tteBadge()}
              <b>${p2}</b><br>
              NIP. ${p2Nip}
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;

  return `<div class="report" style="font-family:Arial, sans-serif; font-size:11pt; line-height:1.35;">
    ${generateKopSurat('BA_SEGEL')}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 3px 0;">BERITA ACARA PEMBUKAAN SEGEL</div>
    <div style="text-align:center; margin-bottom:12px; font-size:11pt;">Nomor : ${num}</div>
    
    ${formatTrailingDashes(`Pada hari ini, ${hari} tanggal${tglHuruf}. Berdasarkan Surat Perintah Penelitian Kepala Bidang Penindakan dan Penyidikan KPU BC Tipe B Batam Nomor ${noSpli} tanggal${tglSpli}. Kami yang bertanda tangan di bawah ini telah melakukan pembukaan segel atas:`, '----------')}
    
    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:24px;">
        <col style="width:245px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 287px);">
      </colgroup>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:6px 0 2px 0;">a.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:6px 0 2px 0;">Sarana Pengangkut</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nama dan Jenis Sarkut</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${namaSarkut}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">No. Register</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${regSarkut}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Bendera</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${bendera}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nahkoda/Pilot/Pengemudi*</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${nahkoda}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nomor Identitas</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${nikNahkoda}</td>
      </tr>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:8px 0 2px 0;">b.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:8px 0 2px 0;">Barang</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Jumlah/Jenis/Nomor Peti Kemas/Kemasan</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${jmlBarang}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Jumlah/Jenis Barang</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${jenisBarang}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Jenis/Nomor dan Tgl Dokumen</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${dokBarang}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Pemilik/Importir/Eksportir/Kuasa*</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${pemilikBarang}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nomor Identitas (NPWP)</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${npwpBarang}</td>
      </tr>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:8px 0 2px 0;">c.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:8px 0 2px 0;">Bangunan atau Tempat</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Alamat Bangunan/Tempat</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${alamatBangunan}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">No. Reg Bangunan/NPPBKC/NPWP</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${regBangunan}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nama Pemilik/Yang Menguasai*</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${namaPemilikTempat}</td>
      </tr>
      <tr>
        <td style="border:none !important;"></td>
        <td style="border:none !important; padding:1px 4px;">Nomor Identitas</td>
        <td style="border:none !important; padding:1px 0; text-align:center;">:</td>
        <td style="border:none !important; padding:1px 4px;">${nikPemilikTempat}</td>
      </tr>
    </table>

    ${formatTrailingDashes(`Berupa segel/tanda pengaman Kertas sebanyak 1 (satu) segel Nomor ${num} tanggal${tglCetakTTD}.`, '----------')}
    
    <p style="margin-bottom:4px; text-align:justify;"><b>Pembukaan segel disaksikan oleh pengangkut/pemilik/atau kuasanya/ketua lingkungan/dll*:</b></p>
    
    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:235px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 253px);">
      </colgroup>
      ${formatRowTrailingDashes('Nama', namaSaksi, '235px')}
      ${formatRowTrailingDashes('Alamat', alamatSaksi, '235px')}
      ${formatRowTrailingDashes('Pekerjaan', pkrSaksi, '235px')}
      ${formatRowTrailingDashes('Identitas (KTP/SIM/Paspor*)', nikSaksi, '235px')}
    </table>

    ${formatTrailingDashes('Demikian Berita Acara ini dibuat dengan sebenarnya.', '----------')}
    ${closeTLReportTag(ttdSegel, tglCetakTTD)}
  </div>`;
}

export function renderEditorBA_SEGEL(rec: any, container: HTMLElement): void {
  let rawDate = rec.TL_Tanggal_Surat || '';
  let autoDateInfo = autoGenerateTeksTanggalBA(rawDate);
  let displayHari = rec.TL_Segel_Hari || autoDateInfo.hari || '';
  let displayTglHuruf = rec.TL_Segel_Tgl_Huruf || autoDateInfo.teksLengkap || '';

  container.innerHTML = `
    <div class="grid" style="margin-bottom:10px;">
      <div><label>Nomor BA Segel (Cukup Angka)</label><input value="${escText(rec.TL_Segel_Num || '')}" oninput="saveDynamicValTL('TL_Segel_Num', this.value)" placeholder="Contoh: 01"></div>
      <div>
        <label>Tanggal Surat / BA Segel</label>
        <input type="date" id="editorTglSegelInput" value="${escText(rawDate)}" oninput="
          let val = this.value;
          saveDynamicValTL('TL_Tanggal_Surat', val);
          let gen = autoGenerateTeksTanggalBA(val);
          let hariEl = document.getElementById('editorHariSegelInput') as HTMLInputElement;
          let hurufEl = document.getElementById('editorHurufSegelInput') as HTMLInputElement;
          if (hariEl) { hariEl.value = gen.hari; saveDynamicValTL('TL_Segel_Hari', gen.hari); }
          if (hurufEl) { hurufEl.value = gen.teksLengkap; saveDynamicValTL('TL_Segel_Tgl_Huruf', gen.teksLengkap); }
        ">
      </div>
      <div><label>Hari Pembukaan Segel</label><input id="editorHariSegelInput" value="${escText(displayHari)}" oninput="saveDynamicValTL('TL_Segel_Hari', this.value)"></div>
      <div><label>Ejaan Huruf Tanggal</label><input id="editorHurufSegelInput" value="${escText(displayTglHuruf)}" oninput="saveDynamicValTL('TL_Segel_Tgl_Huruf', this.value)"></div>
      
      <div><label>Nomor SPLI</label><input value="${escText(rec.TL_Segel_No_SPLI || '')}" oninput="saveDynamicValTL('TL_Segel_No_SPLI', this.value)"></div>
      <div><label>Tanggal SPLI</label><input value="${escText(rec.TL_Segel_Tgl_SPLI || '')}" oninput="saveDynamicValTL('TL_Segel_Tgl_SPLI', this.value)"></div>
      
      <!-- Sarana Pengangkut -->
      <div style="grid-column: span 2; font-weight: bold; margin-top: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">A. Sarana Pengangkut</div>
      <div><label>Nama & Jenis Sarkut</label><input value="${escText(rec.TL_Segel_Nama_Sarkut || '')}" oninput="saveDynamicValTL('TL_Segel_Nama_Sarkut', this.value)"></div>
      <div><label>No. Register Sarkut</label><input value="${escText(rec.TL_Segel_Reg_Sarkut || '')}" oninput="saveDynamicValTL('TL_Segel_Reg_Sarkut', this.value)"></div>
      <div><label>Bendera</label><input value="${escText(rec.TL_Segel_Bendera || '')}" oninput="saveDynamicValTL('TL_Segel_Bendera', this.value)"></div>
      <div><label>Nahkoda / Pilot / Pengemudi</label><input value="${escText(rec.TL_Segel_Nahkoda || '')}" oninput="saveDynamicValTL('TL_Segel_Nahkoda', this.value)"></div>
      <div><label>Nomor Identitas Nahkoda</label><input value="${escText(rec.TL_Segel_Nik_Nahkoda || '')}" oninput="saveDynamicValTL('TL_Segel_Nik_Nahkoda', this.value)"></div>

      <!-- Barang -->
      <div style="grid-column: span 2; font-weight: bold; margin-top: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">B. Barang</div>
      <div><label>Jml/Jenis/No Peti Kemas/Kemasan</label><input value="${escText(rec.TL_Segel_Jml_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Jml_Barang', this.value)"></div>
      <div><label>Jumlah/Jenis Barang</label><input value="${escText(rec.TL_Segel_Jenis_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Jenis_Barang', this.value)"></div>
      <div><label>Jenis/No & Tgl Dokumen</label><input value="${escText(rec.TL_Segel_Dok_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Dok_Barang', this.value)"></div>
      <div><label>Pemilik/Importir/Eksportir/Kuasa</label><input value="${escText(rec.TL_Segel_Pemilik_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_Pemilik_Barang', this.value)"></div>
      <div><label>Nomor Identitas (NPWP) Barang</label><input value="${escText(rec.TL_Segel_NPWP_Barang || '')}" oninput="saveDynamicValTL('TL_Segel_NPWP_Barang', this.value)"></div>

      <!-- Bangunan atau Tempat -->
      <div style="grid-column: span 2; font-weight: bold; margin-top: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">C. Bangunan atau Tempat</div>
      <div><label>Alamat Bangunan/Tempat</label><input value="${escText(rec.TL_Segel_Alamat_Bangunan || '')}" oninput="saveDynamicValTL('TL_Segel_Alamat_Bangunan', this.value)"></div>
      <div><label>No. Reg Bangunan/NPPBKC/NPWP</label><input value="${escText(rec.TL_Segel_Reg_Bangunan || '')}" oninput="saveDynamicValTL('TL_Segel_Reg_Bangunan', this.value)"></div>
      <div><label>Nama Pemilik/Yang Menguasai</label><input value="${escText(rec.TL_Segel_Nama_Pemilik_Tempat || '')}" oninput="saveDynamicValTL('TL_Segel_Nama_Pemilik_Tempat', this.value)"></div>
      <div><label>Nomor Identitas Pemilik Tempat</label><input value="${escText(rec.TL_Segel_Nik_Pemilik_Tempat || '')}" oninput="saveDynamicValTL('TL_Segel_Nik_Pemilik_Tempat', this.value)"></div>

      <!-- Saksi / Penghadap -->
      <div style="grid-column: span 2; font-weight: bold; margin-top: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">Data Saksi / Penghadap</div>
      <div><label>Nama Saksi / Penghadap</label><input value="${escText(rec.TL_Nama_Pemilik || '')}" oninput="saveDynamicValTL('TL_Nama_Pemilik', this.value)"></div>
      <div><label>NIK Saksi</label><input value="${escText(rec.TL_NIK_Pemilik || '')}" oninput="saveDynamicValTL('TL_NIK_Pemilik', this.value)"></div>
      <div><label>Pekerjaan Saksi</label><input value="${escText(rec.TL_Segel_Pekerjaan || '')}" oninput="saveDynamicValTL('TL_Segel_Pekerjaan', this.value)"></div>
      <div style="grid-column: span 2;"><label>Alamat Saksi</label><textarea oninput="saveDynamicValTL('TL_Alamat_Pemilik', this.value)">${escText(rec.TL_Alamat_Pemilik || '')}</textarea></div>

      <!-- Petugas Penandatangan -->
      <div style="grid-column: span 2; font-weight: bold; margin-top: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">Petugas Penandatangan</div>
      <div><label>Petugas Pembuka Segel 1 (Penerima 1)</label><input value="${escText(rec.TL_Segel_P1 || '')}" oninput="saveDynamicValTL('TL_Segel_P1', this.value)"></div>
      <div><label>NIP Petugas 1</label><input value="${escText(rec.TL_NIP_Segel_1 || '')}" oninput="saveDynamicValTL('TL_NIP_Segel_1', this.value)"></div>
      <div><label>Petugas Pembuka Segel 2 (Saksi Penerima 1)</label><input value="${escText(rec.TL_Segel_P2 || '')}" oninput="saveDynamicValTL('TL_Segel_P2', this.value)"></div>
      <div><label>NIP Petugas 2</label><input value="${escText(rec.TL_NIP_Segel_2 || '')}" oninput="saveDynamicValTL('TL_NIP_Segel_2', this.value)"></div>
    </div>
  `;
}

export function KEP_BDN(): string {
  if (store.activeRecordIndex < 0) return `<div class="report"><p>Data belum dipilih.</p></div>`;
  let rec = store.databasePerkara[store.activeRecordIndex];
  let num = getTLNumFormat('KEP_BDN');
  let noSBP = rec.Nomor_SBP ? `SBP-${rec.Nomor_SBP}/MANDIRI/PATLA/KPU.2/2026` : 'SBP-338/MANDIRI/PATLA/KPU.2/2026';
  let noLP = rec.NoLP_LP_1 ? `LP-${rec.NoLP_LP_1}/PATLA/KPU.206/2026` : 'LP-338/PATLA/KPU.206/2026';

  let listBarang = rec.KEP_List_Barang || [
    { jumlah: '98 (sembilan puluh delapan) koli', uraian: 'Tepung Terigu merk “Segitiga Biru” 25 Kg', kondisi: 'Kurang Baik', asal: 'Tidak Teridentifikasi', ket: '-' },
    { jumlah: '189 (seratus delapan puluh sembilan) koli', uraian: 'Beras merek “Harumas” 25 Kg', kondisi: 'Kurang Baik', asal: 'Tidak Teridentifikasi', ket: '-' }
  ];

  let rowsLampiranHtml = listBarang.map((item: any, idx: number) => `
    <tr>
      <td style="border:1px solid #000; padding:5px; text-align:center;">${idx + 1}.</td>
      <td style="border:1px solid #000; padding:5px; text-align:center;">${escText(item.jumlah)}</td>
      <td style="border:1px solid #000; padding:5px; text-align:left;">${escText(item.uraian)}</td>
      <td style="border:1px solid #000; padding:5px; text-align:center;">${escText(item.kondisi)}</td>
      <td style="border:1px solid #000; padding:5px; text-align:center;">${escText(item.asal)}</td>
      <td style="border:1px solid #000; padding:5px; text-align:center;">${escText(item.ket)}</td>
    </tr>
  `).join('');

  let ttdKepalaKantor = `
    <div style="page-break-inside: avoid !important; display:flex; justify-content:flex-end; margin-top:16px;">
      <div style="text-align:left; width:45%; font-size:10pt;">
        KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM,
        <div class="signature" style="height:55px;"></div>
        ${tteBadge()}
        <b>${escText(getVal('form_kabid') || 'ZAKY FIRMANSYAH')}</b>
      </div>
    </div>
  `;

  let lampiranTabelBDN = `
    <div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
      <div style="font-weight:bold; font-size:9.5pt; text-align:left; line-height:1.3;">
        LAMPIRAN<br>
        KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM<br>
        NOMOR : ${rec.KEP_Nomor_ND || num}<br>
        TENTANG PENETAPAN BARANG IMPOR SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${noSBP} TANGGAL ${rec.Tanggal_SBP || '28 September 2026'}
      </div>
      <div style="font-weight:bold; margin-top:14px; text-align:center; font-size:10.5pt;">DAFTAR BARANG YANG DIKUASAI NEGARA</div>
      <table class="rtable" style="width:100%; border-collapse:collapse; margin-top:10px; border:1px solid #000; font-size:9.5pt;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="border:1px solid #000; padding:5px; text-align:center; width:5%;">No</th>
            <th style="border:1px solid #000; padding:5px; text-align:center; width:22%;">Jumlah Barang</th>
            <th style="border:1px solid #000; padding:5px; text-align:left; width:35%;">Uraian Barang</th>
            <th style="border:1px solid #000; padding:5px; text-align:center; width:13%;">Kondisi</th>
            <th style="border:1px solid #000; padding:5px; text-align:center; width:15%;">Negara Asal</th>
            <th style="border:1px solid #000; padding:5px; text-align:center; width:10%;">Ket</th>
          </tr>
        </thead>
        <tbody>
          ${rowsLampiranHtml}
        </tbody>
      </table>
      ${ttdKepalaKantor}
    </div>
  `;

  let lembarSatu = `<div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
    <div style="text-align:center; font-weight:bold; font-size:10.5pt; line-height:1.3;">
      KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM<br>
      NOMOR ${rec.KEP_Nomor_ND || num}<br><br>
      TENTANG<br><br>
      PENETAPAN BARANG IMPOR SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${noSBP} TANGGAL ${rec.KEP_Tanggal_ND || '28 September 2026'}<br><br>
      KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM,
    </div>
    
    <p style="margin-top:12px; margin-bottom:4px; text-align:justify;"><b>Menimbang :</b></p>
    <table style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3; margin-bottom:8px;">
      <tr><td style="width:25px; vertical-align:top;">a.</td><td style="text-align:justify; vertical-align:top;">bahwa pada Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam terdapat barang hasil penegahan oleh Pejabat Bea dan Cukai di ${escText(rec.Lokasi_Penindakan || 'lokasi penindakan')} atas modus operandi yang dilakukan oleh ${escText(rec.Nama_Pelaku || 'pelaku')} sesuai dengan Surat Bukti Penindakan nomor ${noSBP} dan Laporan Pelanggaran nomor ${noLP};</td></tr>
      <tr><td style="vertical-align:top;">b.</td><td style="text-align:justify; vertical-align:top;">bahwa berdasarkan ketentuan Pasal 68 ayat (1) huruf a dan b Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006;</td></tr>
      <tr><td style="vertical-align:top;">c.</td><td style="text-align:justify; vertical-align:top;">bahwa berdasarkan ketentuan Pasal 71 ayat (2) Peraturan Pemerintah Nomor 41 Tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas;</td></tr>
      <tr><td style="vertical-align:top;">d.</td><td style="text-align:justify; vertical-align:top;">bahwa berdasarkan pertimbangan tersebut, dipandang perlu menetapkan barang sebagai Barang Dikuasai Negara.</td></tr>
    </table>

    <p style="margin-bottom:4px; text-align:justify;"><b>Mengingat :</b></p>
    <table style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3; margin-bottom:8px;">
      <tr><td style="width:25px; vertical-align:top;">1.</td><td style="text-align:justify; vertical-align:top;">Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006;</td></tr>
      <tr><td style="vertical-align:top;">2.</td><td style="text-align:justify; vertical-align:top;">Peraturan Pemerintah Nomor 41 Tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas;</td></tr>
      <tr><td style="vertical-align:top;">3.</td><td style="text-align:justify; vertical-align:top;">Peraturan Menteri Keuangan Nomor 178/PMK.04/2019;</td></tr>
      <tr><td style="vertical-align:top;">4.</td><td style="text-align:justify; vertical-align:top;">Peraturan Direktur Jenderal Bea dan Cukai nomor PER-8/BC/2024.</td></tr>
    </table>

    <div style="text-align:center; font-weight:bold; margin:10px 0;">MEMUTUSKAN:</div>
    <table style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3; margin-bottom:8px;">
      <tr><td style="width:100px; vertical-align:top;"><b>Menetapkan</b></td><td style="width:15px; vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM TENTANG PENETAPAN BARANG SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${noSBP} TANGGAL ${rec.Tanggal_SBP || '-'}.</td></tr>
      <tr><td style="vertical-align:top;"><b>KESATU</b></td><td style="vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">Barang-barang sebagaimana terlampir merupakan hasil penegahan oleh Pejabat Bea dan Cukai di ${escText(rec.Lokasi_Penindakan || '-')} atas modus operandi yang dilakukan oleh ${escText(rec.Nama_Pelaku || '-')} sesuai dengan Surat Bukti Penindakan nomor ${noSBP} dan Laporan Pelanggaran nomor ${noLP}.</td></tr>
      <tr><td style="vertical-align:top;"><b>KEDUA</b></td><td style="vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">Sesuai dengan ketentuan Pasal 68 ayat (1) huruf a dan b Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006, barang-barang sebagaimana dimaksud dalam Diktum KESATU ditetapkan sebagai Barang yang Dikuasai Negara.</td></tr>
      <tr><td style="vertical-align:top;"><b>KETIGA</b></td><td style="vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">Barang yang Dikuasai Negara sebagaimana dimaksud dalam Diktum KESATU disimpan di Gudang Penindakan dan Penyidikan Batu Ampar dan/atau Tanjung Uncang di bawah pengawasan Kantor Pelayanan Utama Bea Dan Cukai Tipe B Batam.</td></tr>
      <tr><td style="vertical-align:top;"><b>KEEMPAT</b></td><td style="vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila dikemudian hari terdapat kekeliruan akan diadakan pembetulan seperlunya.</td></tr>
    </table>

    <div style="font-size:8.5pt; line-height:1.2; margin-top:8px;">
      Salinan disampaikan kepada:<br>
      1. Menteri Keuangan;<br>
      2. Direktur Jenderal Bea dan Cukai;<br>
      3. Inspektorat Jenderal;<br>
      4. Direktur Teknis Kepabeanan, Direktorat Jenderal Bea dan Cukai;<br>
      5. Direktur Penindakan dan Penyidikan;<br>
      6. Pemilik/Kuasa a.n ${escText(rec.Nama_Pelaku || '-')}
    </div>
    ${closeTLReportTag(ttdKepalaKantor, rec.KEP_Tanggal_ND || '28 September 2026')}
  `;

  return `${lembarSatu}<div class="pagebreak"></div>${lampiranTabelBDN}`;
}

export function SPSA(): string {
  if (store.activeRecordIndex < 0) return `<div class="report"><p>Data belum dipilih.</p></div>`;
  let rec = store.databasePerkara[store.activeRecordIndex];

  let ttdSPSA = `
    <div style="page-break-inside: avoid !important; display:flex; justify-content:flex-end; margin-top:16px;">
      <div style="text-align:left; width:45%; font-size:10pt;">
        Kepala Kantor,
        <div class="signature" style="height:55px;"></div>
        ${tteBadge()}
        <b>${escText(getVal('form_kabid') || 'Zaky Firmansyah')}</b>
      </div>
    </div>
  `;

  return `<div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
    ${generateKopSurat('SPSA')}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 8px 0;">SURAT PENETAPAN SANKSI ADMINISTRASI (SPSA)</div>
    <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10pt;">
      <tr><td style="width:80px;">Nomor</td><td style="width:15px; text-align:center;">:</td><td>SPSA-${escText(rec.SPSA_Nomor || '01')}</td></tr>
      <tr><td>Tanggal</td><td style="text-align:center;">:</td><td>${escText(rec.SPSA_Tanggal || '09 September 2026')}</td></tr>
    </table>
    
    <div style="margin-bottom:10px; font-size:10pt; line-height:1.3;">
      <b>Kepada Yth.</b><br>
      Nama : ${escText(rec.TL_Nama_Pemilik || rec.Nama_Pelaku || '-')}<br>
      No KTP : ${escText(rec.TL_NIK_Pemilik || rec.Nomor_Identitas || '-')}<br>
      Alamat : ${escText(rec.TL_Alamat_Pemilik || rec.Alamat_Pelaku || '-')}
    </div>
    
    <p style="text-align:justify; margin-bottom:8px;">Berdasarkan ketentuan pada pasal pelanggaran spsa (${escText(rec.SPSA_Pasal_Pelanggaran || '9A ayat (1) Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006 dan pasal 34 ayat (5) Peraturan Pemerintah nomor 41 tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas')}), dengan ini ditetapkan sanksi administrasi berupa denda sebesar <b>${escText(rec.SPSA_Denda || 'Rp 10.000.000,- (sepuluh juta rupiah)')}</b> dengan alasan penetapan (${escText(rec.SPSA_Alasan || 'tidak menyerahkan pemberitahuan pabean atas barang yang diangkutnya sebelum keberangkatan sarana pengangkut')}) sebagaimana dimaksud pada pasal dasar denda (${escText(rec.SPSA_Pasal_Denda || '9A ayat (3) Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006')}).</p>
    
    <p style="text-align:justify; margin-bottom:8px;">Saudara wajib melunasi sanksi administrasi berupa denda tersebut paling lambat tanggal ${escText(rec.SPSA_Jatuh_Tempo || '18 Januari 2026')} dan bukti pelunasan agar disampaikan kepada Kepala Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam.</p>
    <p style="text-align:justify; margin-bottom:8px;">Apabila tagihan tidak dilunasi atau tidak diajukan keberatan sampai dengan tanggal ${escText(rec.SPSA_Jatuh_Tempo || '18 Januari 2026')}, dikenakan bunga yang terutang sebesar 2% (dua persen) setiap bulan untuk paling lama 24 (dua puluh empat) bulan dari jumlah yang terutang, bagian bulan dihitung satu bulan penuh.</p>
    <p style="text-align:justify; margin-bottom:8px;">Keberatan atas penetapan ini hanya dapat diajukan secara tertulis kepada Direktur Jenderal Bea dan Cukai melalui Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam sesuai dengan ketentuan tentang keberatan, paling lambat pada tanggal ${escText(rec.SPSA_Jatuh_Tempo || '18 Januari 2026')}.</p>
    
    ${closeTLReportTag(ttdSPSA, escText(rec.SPSA_Tanggal || '09 September 2026'))}
    <div style="font-size:8.5pt; margin-top:12px; line-height:1.2;">
      SPSA ini dibuat rangkap 2 (dua):<br>
      - Rangkap ke-1 untuk ${escText(rec.TL_Nama_Pemilik || rec.Nama_Pelaku || '-')}<br>
      - Rangkap ke-2 untuk Kepala KPU Bea dan Cukai Tipe B Batam
    </div>
  </div>`;
}

export function BAST_LIMPAH(): string {
  if (store.activeRecordIndex < 0) return `<div class="report"><p>Data belum dipilih.</p></div>`;
  let rec = store.databasePerkara[store.activeRecordIndex];
  let num = getTLNumFormat('BAST_LIMPAH');
  let hari = escText(rec.Limpah_Hari || 'Kamis');
  let tglHuruf = escText(rec.Limpah_Tgl_Huruf || 'dua belas Desember tahun dua ribu dua puluh enam');
  let tglSurat = escText(rec.Limpah_Tanggal || '12 Desember 2026');
  let sarkut = escText(rec.Limpah_Sarkut || rec.Pengangkut || '-');
  let barang = escText(rec.Limpah_Barang || rec.Uraian_Barang || '±1250 batang balok kayu');
  let dokumen = escText(rec.Limpah_Dokumen || 'Dokumen Kapal, KTP, dan dokumen lainnya');
  let namaOrang = escText(rec.TL_Nama_Pemilik || rec.Nama_Pelaku || 'RAJA DOLI SIREGAR');
  let nikOrang = escText(rec.TL_NIK_Pemilik || rec.Nomor_Identitas || '2102081511890006');
  let pejabatPenerima = escText(rec.Limpah_Pejabat_Penerima || 'Pejabat Instansi');
  let nipPenerima = escText(rec.Limpah_NIP_Penerima || '-');
  let instansi = escText(rec.Instansi_Penerima || 'Dinas Lingkungan Hidup dan Kehutanan (DLHK) Provinsi Kepri');
  let petugas1 = escText(rec.Limpah_Petugas_1 || rec.ketua_tim || 'Petugas Pelimpah 1');
  let nip1 = escText(rec.Limpah_NIP_1 || '-');

  let ttdLimpah = `
    <div class="sign" style="display:flex; justify-content:space-between; margin-top:14px;">
      <div style="width:45%; text-align:left; font-size:10pt;">
        Yang menerima,<br>Instansi Penerima (${instansi})
        <div class="signature" style="height:55px;"></div>
        ${tteBadge()}
        <b>${pejabatPenerima}</b><br>NIP. ${nipPenerima}
      </div>
      <div style="width:45%; text-align:left; font-size:10pt;">
        Yang menyerahkan,<br>Petugas Pelimpah
        <div class="signature" style="height:55px;"></div>
        ${tteBadge()}
        <b>${petugas1}</b><br>NIP. ${nip1}
      </div>
    </div>
  `;

  return `<div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
    ${generateKopSurat('BAST_LIMPAH')}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 3px 0;">BERITA ACARA SERAH TERIMA</div>
    <div style="text-align:center; margin-bottom:12px; font-size:10pt;">Nomor : ${num}</div>
    <p style="text-align:justify; margin-bottom:6px;">Pada hari ini, ${hari} tanggal ${tglHuruf}. Kami yang bertanda tangan di bawah ini bertindak untuk/atas nama Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam, telah menyerahkan:</p>
    
    ${buildTableKv([
      ['Sarana Pengangkut', 'Jenis Sarana Pengangkut', sarkut],
      ['Barang', 'Jml/No. Peti Kemas/Kemasan/ Jumlah/Jenis Barang', barang],
      ['Dokumen', 'Jenis/No. dan Tgl. Dokumen', dokumen],
      ['Orang', 'Nama & No. Identitas', `${namaOrang} (No. Identitas: ${nikOrang})`],
      ['Diserahkan kepada', 'Nama / NIP / Alamat', `${pejabatPenerima} (NIP:${nipPenerima})`],
      ['Instansi Penerima', 'Menerima atas nama', instansi],
      ['Maksud Penyerahan', 'Rangka Kegiatan', 'Pelimpahan Penanganan Perkara Penindakan oleh KPU Bea dan Cukai Tipe B Batam agar ditindaklanjuti oleh pihak berwenang.']
    ])}
    <p style="margin-top:10px; margin-bottom:0; text-align:justify;">Demikian Berita Acara ini dibuat dengan sebenarnya.</p>
    ${closeTLReportTag(ttdLimpah, tglSurat)}
  </div>`;
}

(window as any).handleSingleValidationTL = handleSingleValidationTL;
(window as any).getTLNumFormat = getTLNumFormat;
(window as any).closeTLReportTag = closeTLReportTag;
(window as any).BAST_PEMILIK = BAST_PEMILIK;
(window as any).BA_SEGEL = BA_SEGEL;
(window as any).KEP_BDN = KEP_BDN;
(window as any).SPSA = SPSA;
(window as any).BAST_LIMPAH = BAST_LIMPAH;