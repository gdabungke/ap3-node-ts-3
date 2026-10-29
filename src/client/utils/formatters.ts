// ========================================================
// FORMATTERS.TS - PURE STRING, NUMBER & DATE UTILITIES
// ========================================================

export function formatProperCase(str: string): string {
  if (!str || str === '-') return '-';

  // 1. Kata hubung dan preposisi yang wajib huruf kecil
  const connectors = [
    'dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'pada', 'dengan', 
    'dalam', 'atas', 'oleh', 'sebagai', 'atau', 'serta', 
    'terkait', 'karena', 'tanpa', 'salah'
  ];

  // 2. Akronim resmi instansi/regulasi/badan usaha (Wajib Huruf Besar Semua)
  const uppercaseWords = [
    'PT', 'CV', 'UD', 'PO', 'NV', 'FIRMA', 'TBK', 'BUMN', 'BUMD',
    'UU', 'PP', 'PMK', 'PER', 'KEP', 'SE', 'SOP', 'UUD', 'KUHP', 'KUHAP',
    'FTZ', 'TLDDP', 'KPBPB', 'PLB', 'TPB', 'KPU', 'BC', 'TMP', 'KPPBC', 'DJBC',
    'BPOM', 'PBI', 'WIB', 'WITA', 'WIT',
    'SBP', 'LP', 'LPP', 'LPF', 'SPLIT', 'LHP', 'BAP', 'BA', 'BDN', 'SPSA', 'BAST',
    'EA', 'MMEA', 'HT', 'REL', 'HPTL', 'BKC', 'NPPBKC', 'NPP',
    'CN', 'PIBK', 'PIB', 'PEB', 'SPBL', 'SPJM', 'SPJK', 'SPPB', 'NHI'
  ];

  // Format satu kata inti tanpa tanda baca
  const formatWord = (core: string, isFirst: boolean): string => {
    const lower = core.toLowerCase();
    const upper = core.toUpperCase();

    // Standar penulisan nomor regulasi (Kembalikan 'No' murni tanpa titik tambahan)
    if (lower === 'no' || lower === 'no.') return 'No';
    if (lower === 'nomor') return 'Nomor';

    // Standar penulisan istilah khusus
    if (lower === 'lartas') return 'Lartas';

    // Singkatan resmi regulasi & institusi
    if (uppercaseWords.includes(upper)) {
      return upper;
    }

    // Angka tahun atau nomor urut murni (misal: 17, 2006, 41, 2021)
    if (/^[0-9]+$/.test(core)) {
      return core;
    }

    // Nomor berkode garis miring dinas (misal: 34/PMK.04/2021)
    if (core.includes('/') && /[0-9]/.test(core)) {
      return upper;
    }

    // Kata sambung di tengah kalimat (dan, atau, dari, dalam, dll)
    if (connectors.includes(lower) && !isFirst) {
      return lower;
    }

    // Khusus kata "Tentang" pada judul undang-undang tetap diawali huruf kapital
    if (lower === 'tentang') {
      return 'Tentang';
    }

    // Default Title Case (Kapital huruf pertama saja)
    return core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
  };

  // Tangani pembungkus tanda baca seperti koma, titik, atau tanda kurung
  const processWordWithPunctuation = (rawWord: string, isFirst: boolean): string => {
    const match = rawWord.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
    if (!match) return rawWord;

    const prefix = match[1];
    const core = match[2];
    const suffix = match[3];

    if (!core) return rawWord;

    // Kata majemuk bergaris miring (misal: "tanpa/salah", "dan/atau")
    if (core.includes('/') && !/[0-9]/.test(core)) {
      const parts = core.split('/');
      const formattedParts = parts.map(p => formatWord(p, isFirst)).join('/');
      return `${prefix}${formattedParts}${suffix}`;
    }

    return `${prefix}${formatWord(core, isFirst)}${suffix}`;
  };

  const words = str.toString().trim().split(/\s+/);
  return words.map((w, index) => processWordWithPunctuation(w, index === 0)).join(' ');
}

export function getVal(id: string): string {
  let el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (!el) return '-';
  let val = String(el.value || '').trim();
  return val !== '' ? formatProperCase(val) : '-';
}

export function escText(s: any): string {
  return String(s ?? '-').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m] || m));
}

export function formatModusVerb(modus: string): string {
  if (!modus || modus === '-') return '-';
  let str = modus.trim();

  const verbMap = [
    { from: /^Pemasukan/i, to: 'memasukkan' },
    { from: /^Pengeluaran/i, to: 'mengeluarkan' },
    { from: /^Penyediaan/i, to: 'menyediakan' },
    { from: /^Penyerahan/i, to: 'menyerahkan' },
    { from: /^Pengangkutan/i, to: 'mengangkut' },
    { from: /^Pembawaan/i, to: 'membawa' },
    { from: /^Pembongkaran/i, to: 'membongkar' },
    { from: /^Penimbunan/i, to: 'menimbun' }
  ];

  for (let rule of verbMap) {
    if (rule.from.test(str)) {
      str = str.replace(rule.from, rule.to);
      break;
    }
  }

  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function terbilangHuruf(angka: any): string {
  let bilangan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  let n = parseInt(angka, 10);
  if (isNaN(n)) return String(angka);
  if (n < 12) return bilangan[n];
  if (n < 20) return terbilangHuruf(n - 10) + " belas";
  if (n < 100) return terbilangHuruf(Math.floor(n / 10)) + " puluh " + terbilangHuruf(n % 10);
  if (n < 200) return "seratus " + terbilangHuruf(n - 100);
  if (n < 1000) return terbilangHuruf(Math.floor(n / 100)) + " ratus " + terbilangHuruf(n % 100);
  if (n < 2000) return "seribu " + terbilangHuruf(n - 1000);
  if (n < 1000000) return terbilangHuruf(Math.floor(n / 1000)) + " ribu " + terbilangHuruf(n % 1000);
  return n.toString();
}

export function terbilang(angka: any): string {
  return terbilangHuruf(angka);
}

export function formatJam24(el: HTMLInputElement): void {
  let val = el.value.replace(/[^0-9]/g, '');
  if (val.length >= 3) {
    el.value = val.slice(0, 2) + '.' + val.slice(2, 4);
  } else {
    el.value = val;
  }
}

export function validateJam24(el: HTMLInputElement): void {
  let val = el.value.trim().replace(':', '.');
  if (!val) return;

  let parts = val.split('.');
  if (parts.length === 2) {
    let hh = parseInt(parts[0], 10);
    let mm = parseInt(parts[1], 10);

    if (isNaN(hh) || hh < 0 || hh > 23) hh = 0;
    if (isNaN(mm) || mm < 0 || mm > 59) mm = 0;

    let padHH = String(hh).padStart(2, '0');
    let padMM = String(mm).padStart(2, '0');
    el.value = `${padHH}.${padMM}`;
  } else if (parts.length === 1 && parts[0].length >= 2) {
    let hh = parseInt(parts[0].slice(0, 2), 10);
    if (isNaN(hh) || hh < 0 || hh > 23) hh = 0;
    el.value = `${String(hh).padStart(2, '0')}.00`;
  }
}

export function formatRupiahInput(el: HTMLInputElement): void {
  let raw = el.value.replace(/[^0-9]/g, '');
  if (!raw) {
    el.value = '';
    return;
  }
  let formatted = parseInt(raw, 10).toLocaleString('id-ID');
  el.value = `Rp ${formatted}`;
}

export function formatRupiahFinal(el: HTMLInputElement): void {
  let raw = el.value.replace(/[^0-9]/g, '');
  if (!raw) {
    el.value = '';
    return;
  }
  let formatted = parseInt(raw, 10).toLocaleString('id-ID');
  el.value = `Rp ${formatted},00`;
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr || dateStr === '-') return '-';
  let cleanStr = String(dateStr).trim();
  let bulanList = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanStr)) {
    let [y, m, d] = cleanStr.split('-');
    let mIdx = parseInt(m, 10) - 1;
    let day = String(parseInt(d, 10)).padStart(2, '0');
    return `${day} ${bulanList[mIdx]} ${y}`;
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(cleanStr)) {
    let [d, m, y] = cleanStr.split('-');
    let mIdx = parseInt(m, 10) - 1;
    let day = String(parseInt(d, 10)).padStart(2, '0');
    return `${day} ${bulanList[mIdx]} ${y}`;
  }

  return cleanStr;
}

export function formatDate(id: string): string {
  let el = document.getElementById(id) as HTMLInputElement;
  let val = el ? el.value : '';
  if (!val) {
    let v = getVal(id);
    return v !== '-' ? formatDateIndo(v) : '-';
  }
  return formatDateIndo(val);
}

export function autoGenerateTeksTanggalBA(dateStr: string): { hari: string; teksLengkap: string } {
  if (!dateStr) return { hari: '', teksLengkap: '' };

  const hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulanArr = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const parts = dateStr.split('-');
  if (parts.length !== 3) return { hari: '', teksLengkap: '' };

  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);

  const dt = new Date(y, m, d);
  const hari = hariArr[dt.getDay()];
  const namaBulan = bulanArr[m];

  const teksLengkap = `${terbilangHuruf(d)} bulan ${namaBulan.toLowerCase()} tahun ${terbilangHuruf(y)}`;

  return {
    hari: hari,
    teksLengkap: teksLengkap
  };
}

export function tanggalKeTeks(dateString: string): string {
  const res = autoGenerateTeksTanggalBA(dateString);
  return res.teksLengkap;
}

export function formatTrailingDashes(text: string, prefix: string = ''): string {
  const clean = (text || '').trim();
  const pre = prefix ? `${prefix}` : '';
  const filler = '----------------------------------------------------------------------------------------------------------------------------------------------------------------';
  
  return `
    <div style="position: relative; overflow: hidden; text-align: justify; margin: 4px 0; font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; line-height: 1.35; color: #000 !important; white-space: normal;">
      <span>${pre}${clean}</span>
      <span aria-hidden="true" style="position: absolute; padding-left: 4px; white-space: nowrap; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 0;">${filler}</span>
    </div>
  `.trim();
}

export function formatRowTrailingDashes(label: string, value: string, labelWidth: string = '271px'): string {
  let val = (value || '-').trim();
  if (val !== '-' && !val.endsWith('.')) {
    val += '.';
  }
  const filler = '----------------------------------------------------------------------------------------------------------------------------------------------------------------';
  
  return `
    <tr style="font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; color: #000 !important;">
      <td style="width: ${labelWidth}; border: none !important; padding: 1px 0; vertical-align: top;">${label}</td>
      <td style="width: 18px; border: none !important; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
      <td style="border: none !important; padding: 1px 4px; vertical-align: top;">
        <div style="position: relative; overflow: hidden; white-space: nowrap; width: 100%;">
          <span>${val}</span>
          <span aria-hidden="true" style="position: absolute; padding-left: 4px; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 0;">${filler}</span>
        </div>
      </td>
    </tr>
  `.trim();
}

export function formatRowTrailingDots(label: string, value: string, labelWidth: string = '271px'): string {
  let val = (value || '-').trim();
  const dotFiller = '................................................................................................................................................................';
  
  return `
    <tr style="font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; color: #000 !important;">
      <td style="width: ${labelWidth}; border: none !important; padding: 1px 0; vertical-align: top;">${label}</td>
      <td style="width: 18px; border: none !important; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
      <td style="border: none !important; padding: 1px 4px; vertical-align: top;">
        <div style="position: relative; overflow: hidden; white-space: nowrap; width: 100%;">
          <span>${val}</span>
          <span aria-hidden="true" style="position: absolute; padding-left: 4px; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 1px;">${dotFiller}</span>
        </div>
      </td>
    </tr>
  `.trim();
}