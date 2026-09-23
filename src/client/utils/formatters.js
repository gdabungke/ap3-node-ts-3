import { store } from '../state/store.js';
export function formatProperCase(str) {
    if (!str || str === '-')
        return '-';
    let cleanStr = str.toString().trim();
    let connectors = ['dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'pada', 'dengan', 'dalam', 'atas', 'oleh', 'sebagai', 'atau', 'serta'];
    let uppercaseWords = [
        'WIB', 'FTZ', 'PP', 'UU', 'PMK', 'NIK', 'NIB', 'NPWP', 'SIM', 'SBP', 'LP', 'LPP', 'LPF',
        'SPLIT', 'LHP', 'BAP', 'BA', 'KPU', 'BC', 'TMP', 'B', 'C', 'DKI', 'NO', 'NO.', 'NOMOR',
        'PBI', 'BPOM', 'BKC', 'NPPBKC', 'EA', 'MMEA', 'HT', 'BDN', 'SPSA', 'BAST', 'CN', 'PIBK'
    ];
    let words = cleanStr.split(/\s+/);
    let formattedWords = words.map((w, index) => {
        let lowerW = w.toLowerCase();
        let upperW = w.toUpperCase();
        if (/[0-9]/.test(w) && /[a-zA-Z]/.test(w)) {
            return upperW;
        }
        if (w.includes('/') || (w.includes('.') && /[a-zA-Z]/.test(w) && w.length > 4)) {
            return upperW;
        }
        if (uppercaseWords.includes(upperW) || uppercaseWords.includes(upperW.replace(/[^A-Z]/g, ''))) {
            return upperW;
        }
        if (connectors.includes(lowerW) && index > 0) {
            return lowerW;
        }
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
    return formattedWords.join(' ');
}
export function getVal(id) {
    let el = document.getElementById(id);
    if (!el)
        return '-';
    let val = String(el.value || '').trim();
    return val !== '' ? formatProperCase(val) : '-';
}
export function escText(s) {
    return String(s ?? '-').replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m] || m));
}
export function formatModusVerb(modus) {
    if (!modus || modus === '-')
        return '-';
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
export function terbilangHuruf(angka) {
    let bilangan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
    let n = parseInt(angka, 10);
    if (isNaN(n))
        return String(angka);
    if (n < 12)
        return bilangan[n];
    if (n < 20)
        return terbilangHuruf(n - 10) + " belas";
    if (n < 100)
        return terbilangHuruf(Math.floor(n / 10)) + " puluh " + terbilangHuruf(n % 10);
    if (n < 200)
        return "seratus " + terbilangHuruf(n - 100);
    if (n < 1000)
        return terbilangHuruf(Math.floor(n / 100)) + " ratus " + terbilangHuruf(n % 100);
    if (n < 2000)
        return "seribu " + terbilangHuruf(n - 1000);
    if (n < 1000000)
        return terbilangHuruf(Math.floor(n / 1000)) + " ribu " + terbilangHuruf(n % 1000);
    return n.toString();
}
export function terbilang(angka) {
    return terbilangHuruf(angka);
}
export function tanggalKeTeks(dateString) {
    if (!dateString)
        return '';
    let d = new Date(dateString + 'T12:00:00');
    let bulan = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];
    return `${terbilang(d.getDate())} bulan ${bulan[d.getMonth()]} tahun ${terbilang(d.getFullYear())}`.replace(/\s+/g, ' ').trim();
}
export function formatJam24(el) {
    let val = el.value.replace(/[^0-9]/g, '');
    if (val.length >= 3) {
        el.value = val.slice(0, 2) + '.' + val.slice(2, 4);
    }
    else {
        el.value = val;
    }
}
export function validateJam24(el) {
    let val = el.value.trim().replace(':', '.');
    if (!val)
        return;
    let parts = val.split('.');
    if (parts.length === 2) {
        let hh = parseInt(parts[0], 10);
        let mm = parseInt(parts[1], 10);
        if (isNaN(hh) || hh < 0 || hh > 23)
            hh = 0;
        if (isNaN(mm) || mm < 0 || mm > 59)
            mm = 0;
        let padHH = String(hh).padStart(2, '0');
        let padMM = String(mm).padStart(2, '0');
        el.value = `${padHH}.${padMM}`;
    }
    else if (parts.length === 1 && parts[0].length >= 2) {
        let hh = parseInt(parts[0].slice(0, 2), 10);
        if (isNaN(hh) || hh < 0 || hh > 23)
            hh = 0;
        el.value = `${String(hh).padStart(2, '0')}.00`;
    }
}
export function formatRupiahInput(el) {
    let raw = el.value.replace(/[^0-9]/g, '');
    if (!raw) {
        el.value = '';
        return;
    }
    let formatted = parseInt(raw, 10).toLocaleString('id-ID');
    el.value = `Rp ${formatted}`;
}
export function formatRupiahFinal(el) {
    let raw = el.value.replace(/[^0-9]/g, '');
    if (!raw) {
        el.value = '';
        return;
    }
    let formatted = parseInt(raw, 10).toLocaleString('id-ID');
    el.value = `Rp ${formatted},00`;
}
export function formatDateIndo(dateStr) {
    if (!dateStr || dateStr === '-')
        return '-';
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
export function formatDate(id) {
    let el = document.getElementById(id);
    let val = el ? el.value : '';
    if (!val) {
        let v = getVal(id);
        return v !== '-' ? formatDateIndo(v) : '-';
    }
    return formatDateIndo(val);
}
export function autoGenerateTeksTanggalBA(dateStr) {
    if (!dateStr)
        return { hari: '', teksLengkap: '' };
    const hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanArr = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const angkaTeks = [
        '', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan',
        'sepuluh', 'sebelas'
    ];
    function terbilangCustom(n) {
        if (n < 12)
            return angkaTeks[n];
        if (n < 20)
            return terbilangCustom(n - 10) + ' belas';
        if (n < 100)
            return terbilangCustom(Math.floor(n / 10)) + ' puluh' + (n % 10 !== 0 ? ' ' + terbilangCustom(n % 10) : '');
        if (n < 200)
            return 'seratus' + (n % 100 !== 0 ? ' ' + terbilangCustom(n % 100) : '');
        if (n < 1000)
            return terbilangCustom(Math.floor(n / 100)) + ' ratus' + (n % 100 !== 0 ? ' ' + terbilangCustom(n % 100) : '');
        if (n < 2000)
            return 'seribu' + (n % 1000 !== 0 ? ' ' + terbilangCustom(n % 1000) : '');
        if (n < 1000000)
            return terbilangCustom(Math.floor(n / 1000)) + ' ribu' + (n % 1000 !== 0 ? ' ' + terbilangCustom(n % 1000) : '');
        return n.toString();
    }
    const parts = dateStr.split('-');
    if (parts.length !== 3)
        return { hari: '', teksLengkap: '' };
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dt = new Date(y, m, d);
    const hari = hariArr[dt.getDay()];
    const namaBulan = bulanArr[m];
    const teksLengkap = `${terbilangCustom(d)} bulan ${namaBulan.toLowerCase()} tahun ${terbilangCustom(y)}`;
    return {
        hari: hari,
        teksLengkap: teksLengkap
    };
}
export function formatTrailingDashes(text, prefix = '') {
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
export function formatRowTrailingDashes(label, value, labelWidth = '271px') {
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
export function formatRowTrailingDots(label, value, labelWidth = '271px') {
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
export function extractDocSequenceNumber(docString) {
    if (!docString)
        return null;
    let match = String(docString).match(/\b(\d+)\b/);
    return match ? parseInt(match[1], 10) : null;
}
export function getAllGlobalRecords() {
    let perkaraList = [];
    if (typeof store !== 'undefined' && Array.isArray(store.databasePerkara)) {
        perkaraList = store.databasePerkara;
    }
    else {
        try {
            perkaraList = JSON.parse(localStorage.getItem('databasePerkara') || '[]');
        }
        catch (e) {
            perkaraList = [];
        }
    }
    let disposisiList = [];
    try {
        disposisiList = JSON.parse(localStorage.getItem('databaseDisposisi') || '[]');
    }
    catch (e) {
        disposisiList = [];
    }
    return [...perkaraList, ...disposisiList];
}
export function generateNextBookingNumber(prefix, fieldKey, suffixPattern = '', padLength = 3) {
    let allRecords = getAllGlobalRecords();
    let maxSeq = 0;
    allRecords.forEach(item => {
        let val = item[fieldKey];
        if (val && String(val).toUpperCase().includes(prefix.toUpperCase())) {
            let seq = extractDocSequenceNumber(val);
            if (seq !== null && seq > maxSeq) {
                maxSeq = seq;
            }
        }
    });
    let storageKey = `last_seq_${fieldKey}`;
    let storedSeq = parseInt(localStorage.getItem(storageKey) || '0', 10);
    if (storedSeq > maxSeq)
        maxSeq = storedSeq;
    let nextSeq = maxSeq + 1;
    localStorage.setItem(storageKey, String(nextSeq));
    let formattedSeq = String(nextSeq).padStart(padLength, '0');
    return `${prefix}${formattedSeq}${suffixPattern}`;
}
export function validateGlobalDocSequence(newDocNum, newDocDate, fieldNumKey, fieldDateKey, currentRecordId = null, linkedParentId = null) {
    if (!newDocNum || !newDocDate) {
        return { isValid: true };
    }
    let cleanNum = String(newDocNum).trim().toLowerCase();
    let targetSeq = extractDocSequenceNumber(cleanNum);
    let targetTime = new Date(newDocDate).getTime();
    let allRecords = getAllGlobalRecords();
    for (let item of allRecords) {
        let itemId = item.id || item.recordId;
        if (currentRecordId && String(itemId) === String(currentRecordId)) {
            continue;
        }
        if (linkedParentId && String(itemId) === String(linkedParentId)) {
            continue;
        }
        if (linkedParentId && item.disposisiId && String(item.disposisiId) === String(linkedParentId)) {
            continue;
        }
        let existNum = item[fieldNumKey] ? String(item[fieldNumKey]).trim() : '';
        let existDate = item[fieldDateKey] ? String(item[fieldDateKey]).trim() : '';
        if (!existNum || !existDate)
            continue;
        if (existNum.toLowerCase() === cleanNum) {
            return {
                isValid: false,
                message: `Nomor "${newDocNum}" sudah digunakan pada berkas lain! Tidak boleh ada nomor ganda.`
            };
        }
        if (targetSeq !== null) {
            let existSeq = extractDocSequenceNumber(existNum);
            if (existSeq !== null) {
                let existTime = new Date(existDate).getTime();
                if (targetSeq > existSeq && targetTime < existTime) {
                    return {
                        isValid: false,
                        message: `Anomali Tanggal: Nomor (${newDocNum}) lebih tinggi dari (${existNum}), tetapi tanggalnya (${newDocDate}) mendahului dokumen sebelumnya (${existDate}).`
                    };
                }
                if (targetSeq < existSeq && targetTime > existTime) {
                    return {
                        isValid: false,
                        message: `Anomali Tanggal: Nomor (${newDocNum}) lebih kecil dari (${existNum}), tetapi tanggalnya (${newDocDate}) melewati berkas yang bernomor lebih besar (${existDate}).`
                    };
                }
            }
        }
    }
    return { isValid: true };
}
export function validateFormDocumentNumbers(docItems = [], currentRecordId = null, linkedParentId = null) {
    for (let item of docItems) {
        if (item.num && item.date) {
            let result = validateGlobalDocSequence(item.num, item.date, item.numKey, item.dateKey, currentRecordId, linkedParentId);
            if (!result.isValid) {
                return {
                    isValid: false,
                    message: `[${item.label || item.numKey}] ${result.message}`
                };
            }
        }
    }
    return { isValid: true, message: '' };
}
export function validateOperationalChronology(dates = {}) {
    let { tglSprin, tglSbp, tglLp, tglLpp, tglLpf, tglSplit, tglSprinCacah, tglBa, tglLhp } = dates;
    let parse = (d) => (d ? new Date(d).getTime() : null);
    let dSprin = parse(tglSprin);
    let dSbp = parse(tglSbp);
    let dLp = parse(tglLp);
    let dLpp = parse(tglLpp);
    let dLpf = parse(tglLpf);
    let dSplit = parse(tglSplit);
    let dSprinCacah = parse(tglSprinCacah);
    let dBa = parse(tglBa);
    let dLhp = parse(tglLhp);
    if (dSprin && dSbp && dSprin > dSbp) {
        return { isValid: false, message: "Tanggal SPRIN INDAK tidak boleh melebihi Tanggal SBP!" };
    }
    if (dSbp && dLp && dSbp > dLp) {
        return { isValid: false, message: "Tanggal SBP tidak boleh mendahului/melewati Tanggal LP!" };
    }
    if (dLp && dLpp && dLp > dLpp) {
        return { isValid: false, message: "Tanggal Laporan Pelanggaran (LP) tidak boleh lebih baru dari LPP!" };
    }
    if (dLpp && dLpf && dLpp > dLpf) {
        return { isValid: false, message: "Tanggal LPP tidak boleh melebihi Tanggal LPF!" };
    }
    if (dLpf && dSplit && dLpf > dSplit) {
        return { isValid: false, message: "Tanggal LPF tidak boleh melebihi Tanggal SPLIT!" };
    }
    if (dSbp && dSprinCacah && dSprinCacah < dSbp) {
        return { isValid: false, message: "Tanggal SPRIN CACAH tidak boleh mendahului Tanggal SBP!" };
    }
    if (dSprinCacah && dBa && dBa < dSprinCacah) {
        return { isValid: false, message: "Tanggal BA CACAH tidak boleh mendahului Tanggal SPRIN CACAH!" };
    }
    if (dBa && dLhp && dLhp < dBa) {
        return { isValid: false, message: "Tanggal LHP tidak boleh mendahului Tanggal BA CACAH!" };
    }
    return { isValid: true };
}
if (typeof window !== 'undefined') {
    window.extractDocSequenceNumber = extractDocSequenceNumber;
    window.getAllGlobalRecords = getAllGlobalRecords;
    window.generateNextBookingNumber = generateNextBookingNumber;
    window.validateGlobalDocSequence = validateGlobalDocSequence;
    window.validateFormDocumentNumbers = validateFormDocumentNumbers;
    window.validateOperationalChronology = validateOperationalChronology;
}
//# sourceMappingURL=formatters.js.map