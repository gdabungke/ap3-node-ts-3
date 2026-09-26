// ========================================================
// 1. DATA REFERENSI ATURAN & KANTOR (BAWAAN APLIKASI)
// ========================================================
export const defaultPasalClusters = {
    "UU KEPABEANAN": [
        "Pasal 53 Ayat (3) UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 53 Ayat (4) UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 102 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 102A UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 103 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 104 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN",
        "Pasal 108 UU NO. 17 TAHUN 2006 TENTANG KEPABEANAN"
    ],
    "UU CUKAI": [
        "Pasal 50 UU NO. 39 TAHUN 2007 TENTANG CUKAI",
        "Pasal 52 UU NO. 39 TAHUN 2007 TENTANG CUKAI",
        "Pasal 54 UU NO. 39 TAHUN 2007 TENTANG CUKAI",
        "Pasal 55 UU NO. 39 TAHUN 2007 TENTANG CUKAI",
        "Pasal 56 UU NO. 39 TAHUN 2007 TENTANG CUKAI",
        "Pasal 58 UU NO. 39 TAHUN 2007 TENTANG CUKAI"
    ],
    "UU INSTANSI LAIN": [
        "UU NO. 21 TAHUN 2019 TENTANG KARANTINA HEWAN, IKAN, DAN TUMBUHAN",
        "UU NO. 35 TAHUN 2009 TENTANG NARKOTIKA",
        "UU NO. 17 TAHUN 2023 TENTANG KESEHATAN",
        "UU NO. 7 TAHUN 2014 TENTANG PERDAGANGAN",
        "UU NO. 3 TAHUN 2014 TENTANG PERINDUSTRIAN",
        "UU NO. 7 TAHUN 2011 TENTANG MATA UANG"
    ],
    "PERATURAN PEMERINTAH": [
        "Pasal 71 Ayat (1) PP NO. 41 TAHUN 2021 TENTANG KAWASAN BEBAS BATAM",
        "Pasal 71 Ayat (2) PP NO. 41 TAHUN 2021 TENTANG KAWASAN BEBAS BATAM",
        "PP NO. 49 TAHUN 2022 TENTANG PERLAKUAN PERPAJAKAN FTZ"
    ],
    "PERATURAN MENTERI KEUANGAN": [
        "PMK NO. 34/PMK.04/2021 TENTANG PEMASUKAN DAN PENGELUARAN BARANG FTZ",
        "PMK NO. 100/PMK.04/2018 TENTANG PEMBAWAAN UANG TUNAI",
        "PMK NO. 161/PMK.04/2019 TENTANG TATA CARA PENGANGKUT BARANG KENA CUKAI"
    ],
    "PERATURAN MENTERI/BADAN LAIN": [
        "Peraturan Menteri Perdagangan Terkait Larangan Dan Pembatasan (Lartas)",
        "Peraturan Badan Pengawas Obat Dan Makanan (BPOM)",
        "Peraturan Bank Indonesia NO. 20/2/PBI/2018 TENTANG PEMBAWAAN UKA"
    ]
};
export const defaultKantorList = [
    "Kantor Pelayanan Utama Bea Dan Cukai Tipe B Batam",
    "KPPBC TMP B Tanjungpinang",
    "KPPBC TMP C Tiban",
    "Kantor Wilayah DJBC Khusus Kepulauan Riau"
];
export const MAX_PAGE_HEIGHT_PX = 1200;
// ========================================================
// 2. MASTER DATA PEGAWAI, JABATAN & PANGKAT/GOLONGAN
// ========================================================
/**
 * Master Pangkat dan Golongan Ruang ASN (II/a s.d. IV/c)
 */
export const MASTER_GOLONGAN_PANGKAT = [
    "Pengatur Muda (II/a)",
    "Pengatur Muda Tk. I (II/b)",
    "Pengatur (II/c)",
    "Pengatur Tk. I (II/d)",
    "Penata Muda (III/a)",
    "Penata Muda Tk. I (III/b)",
    "Penata (III/c)",
    "Penata Tk. I (III/d)",
    "Pembina (IV/a)",
    "Pembina Tk. I (IV/b)",
    "Pembina Utama Muda (IV/c)"
];
/**
 * Master Jabatan Kedinasan / Struktural / Fungsional
 */
export const MASTER_JABATAN_DINAS = [
    "Kepala Kantor",
    "Kepala Bidang Penindakan dan Penyidikan",
    "Kepala Seksi Penindakan dan Penyidikan",
    "Kepala Seksi Penyidikan",
    "Kepala Seksi Intelijen",
    "Pemeriksa Bea dan Cukai Ahli Pertama",
    "Pemeriksa Bea dan Cukai Ahli Muda",
    "Pemeriksa Bea dan Cukai Ahli Madya",
    "Pemeriksa Bea dan Cukai Terampil",
    "Pemeriksa Bea dan Cukai Mahir",
    "Pemeriksa Bea dan Cukai Penyelia",
    "Fungsional Pemeriksa Bea dan Cukai",
    "Penyidik Pegawai Negeri Sipil (PPNS)",
    "Pelaksana"
];
/**
 * Master Jabatan Operasional Tim Peneliti & Penanganan Perkara (SPLIT / Form)
 */
export const MASTER_JABATAN_TIM_PENELITI = [
    "Ketua Tim Peneliti",
    "Penyidik",
    "Anggota Tim Peneliti",
    "Petugas LPP",
    "Petugas LPF",
    "Petugas Penindakan 1",
    "Petugas Penindakan 2",
    "Petugas Penindakan 3",
    "Petugas Pencacah",
    "Petugas Pembuka Segel",
    "Petugas Penyerah"
];
// ========================================================
// 3. MASTER DATA REFERENSI PERKARA
// ========================================================
/**
 * Master Asal Perkara
 */
export const MASTER_ASAL_PERKARA = [
    "Seksi Penindakan",
    "Instansi/Unit Lain",
    "LAINNYA"
];
/**
 * Master Jenis Penindakan
 */
export const MASTER_JENIS_PENINDAKAN = [
    "Pemeriksaan, penegahan, dan penyegelan barang",
    "Penegahan dan penyegelan barang"
];
/**
 * Master Jenis Pelanggaran
 */
export const MASTER_JENIS_PELANGGARAN = [
    "Kepabeanan",
    "Cukai"
];
/**
 * Master Jenis Perkara
 */
export const MASTER_JENIS_PERKARA = [
    "Cukai - HT",
    "Cukai - EA",
    "Cukai - MMEA",
    "Impor - Umum",
    "Impor - Barang Penumpang",
    "Impor - Barang Kiriman",
    "Ekspor - Umum",
    "Ekspor - Barang Penumpang",
    "Ekspor - Barang Kiriman",
    "Fasilitas - FTZ",
    "Fasilitas - Impor Sementara"
];
/**
 * Master Status Penangkapan
 */
export const MASTER_STATUS_PENANGKAPAN = [
    "Penindakan Biasa",
    "NHI",
    "Limpahan Instansi Lain"
];
/**
 * Master Modus Operandi
 */
export const MASTER_MODUS_OPERANDI = [
    "barang impor sementara yang belum dilakukan pemenuhan kewajiban kepabeanan melebihi jangka waktu",
    "belum adanya penyelesaian kewajiban kepabeanan",
    "ditemukan adanya selisih lebih jumlah muatan dari luar daerah pabean ke kawasan perdagangan bebas batam",
    "pemasukan barang ke kawasan perdagangan bebas dan pelabuhan bebas dari luar daerah pabean tanpa perizinan berusaha dari badan pengusahaan",
    "pemasukan barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas lain ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa kelengkapan dokumen perizinan dari instansi terkait",
    "pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "pemasukan barang larangan dan pembatasan dari tempat lain dalam daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "pemasukan workshop container dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "pembawaan uang tunai berupa uang kertas asing dari luar daerah pabean ke kawasan perdagangan dan pelabuhan bebas batam yang telah diberitahukan namun tidak memiliki persetujuan atas pembawaan uang tunai berupa uang kertas asing dari bank indonesia",
    "pembawaan uang tunai berupa uang kertas asing dari luar daerah pabean ke kawasan perdagangan dan pelabuhan bebas batam yang tidak diberitahukan melebihi seratus juta rupiah atau setara dengan itu",
    "pembawaan uang tunai berupa uang kertas asing dari kawasan perdagangan dan pelabuhan bebas batam ke luar daerah pabean yang tidak diberitahukan melebihi seratus juta rupiah atau setara dengan itu",
    "pembongkaran barang impor yang tidak diberitahukan di dokumen pemberitahuan kepabeanan",
    "pengangkutan barang yang tidak diberitahukan dalam outward manifest",
    "pengangkutan bkc tanpa dilengkapi dokumen pelindung pengangkutan dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa pemberitahuan pabean",
    "pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke luar daerah pabean tanpa/salah pemberitahuan pabean",
    "pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa/salah pemberitahuan pabean",
    "penyediaan dan atau penimbunan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan/atau salah etiket dan/atau tidak memiliki nppbkc",
    "penyerahan barang kena cukai hasil produksi di tempat lain dalam daerah pabean yang dimasukkan ke kawasan perdagangan bebas dan pelabuhan bebas batam dan belum dilunasi pita cukai-nya",
    "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya",
    "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pemasukan barang larangan dan pembatasan dari tempat lain dalam daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean",
    "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa/salah pemberitahuan pabean",
    "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke kawasan perdagangan bebas dan pelabuhan lainnya tanpa/salah pemberitahuan pabean"
];
/**
 * Master Umur Pelaku (Rentang 15 sampai 85 tahun)
 */
export const MASTER_UMUR_PELAKU = Array.from({ length: 71 }, (_, i) => `${i + 15} Tahun`);
/**
 * Master Jenis Kelamin
 */
export const MASTER_JENIS_KELAMIN = [
    "Laki-Laki",
    "Perempuan"
];
/**
 * Master Pekerjaan Pelaku
 */
export const MASTER_PEKERJAAN = [
    "Wiraswasta",
    "Pelajar",
    "Ibu Rumah Tangga",
    "PNS",
    "Tidak Bekerja",
    "LAINNYA"
];
/**
 * Master Kondisi Barang Bukti
 */
export const MASTER_KONDISI_BARANG = [
    "Baik",
    "Baru",
    "Bukan baru",
    "Tidak teridentifikasi"
];
/**
 * Master Satuan Barang / Jenis Koli
 */
export const MASTER_SATUAN_KOLI = [
    "koli",
    "karton",
    "box",
    "karung",
    "peti",
    "pallet",
    "bag",
    "bundel",
    "pcs",
    "pack",
    "roll",
    "drum",
    "jerigen",
    "botol",
    "kaleng",
    "lembar",
    "batang",
    "slop",
    "unit",
    "set",
    "pk",
    "npr",
    "kg",
    "liter"
];
/**
 * Master Jenis Dokumen Pemberitahuan Pabean
 */
export const MASTER_JENIS_DOKUMEN_PABEAN = [
    "Tanpa Dokumen",
    "CN",
    "PIBK",
    "BC 1.0",
    "BC 1.1",
    "BC 2.0",
    "BC 2.1",
    "BC 2.2",
    "BC 2.3",
    "BC 2.5",
    "BC 3.0",
    "BC 4.0",
    "PPFTZ-01",
    "PPFTZ-02",
    "PPFTZ-03"
];
/**
 * Master Dokumen Pelengkap Pabean
 */
export const MASTER_DOKUMEN_PELENGKAP = [
    "Invoice",
    "Packing List",
    "Bill of Lading",
    "Persetujuan Impor",
    "Persetujuan Ekspor",
    "Izin Karantina"
];
/**
 * Master Jenis Identitas Pelaku / Penghadap
 */
export const MASTER_JENIS_IDENTITAS = [
    "NIK",
    "Paspor",
    "NIB",
    "NPWP",
    "SIM",
    "Identitas Lain"
];
/**
 * Master Jenis Kemasan Kontainer
 */
export const MASTER_JENIS_KEMASAN = [
    "LCL",
    "FCL",
    "Loss Cargo",
    "Ukuran Lain"
];
/**
 * Master Ukuran Kontainer
 */
export const MASTER_UKURAN_KONTAINER = [
    "20 feet",
    "40 feet"
];
/**
 * Master Komoditi Pelanggaran
 */
export const MASTER_KOMODITI = [
    "Hasil Tembakau - Sigaret Kretek Mesin (SKM)",
    "Hasil Tembakau - Sigaret Putih Mesin (SPM)",
    "Hasil Tembakau - Sigaret Kretek Tangan (SKT)",
    "Hasil Tembakau - Tembakau Iris (TIS)",
    "Hasil Tembakau - Rokok Elektrik (REL / Vapors)",
    "Minuman Mengandung Etil Alkohol (MMEA) Golongan A",
    "Minuman Mengandung Etil Alkohol (MMEA) Golongan B",
    "Minuman Mengandung Etil Alkohol (MMEA) Golongan C",
    "Etil Alkohol (EA)",
    "Telepon Seluler, Komputer, dan Tablet (HKT)",
    "Barang Kiriman Pos / E-Commerce Umum",
    "Tekstil dan Produk Tekstil (TPT) / Kain / Garmen",
    "Pakaian Bekas / Ballpress / Textile Impor Ilegal",
    "Suku Cadang / Spare Part Mesin Industri & Pabrik",
    "Suku Cadang / Spare Part Kendaraan Bermotor (Automotive Parts)",
    "Narkotika, Psikotropika, dan Prekursor (NPP)",
    "Kosmetik, Skincare, dan Produk Kecantikan Tanpa Izin",
    "Obat-obatan, Suplemen, dan Alat Kesehatan",
    "Produk Makanan, Minuman, dan Suplemen Olahan",
    "Besi, Baja, Besi Tua (Scrap), dan Produk Metalurgi",
    "Valuta Asing / Uang Kertas Asing (UKA) / Tunai",
    "Bahan Kimia Berbahaya dan Bahan Beracun (B3)",
    "Produk Hasil Perikanan, Pertanian, dan Hewan (Karantina)",
    "Tumbuhan dan Satwa Liar (TSL) Dilindungi",
    "Barang Campuran / Lainnya"
];
/**
 * Master Pilihan Tambahan Akhiran Generator Uraian
 */
export const MASTER_AKHIRAN_BARANG = [
    { value: "", label: "- Tanpa Tambahan Akhiran -" },
    { value: "dll", label: ", dll." },
    { value: "etc", label: ", etc." },
    { value: "barang_lainnya", label: ", dan barang lainnya" }
];
/**
 * Master Alasan Rangka Penyerahan BAST Pemilik
 */
export const MASTER_RANGKA_PENYERAHAN = [
    "Penyelesaian kewajiban pabean dalam bentuk berupa SPSA",
    "Tidak ditemukan pelanggaran",
    "Penyelesaian kewajiban pabean dalam bentuk pembuatan dokumen pemberitahuan pabean",
    "Penyelesaian pemenuhan larangan dan/atau pembatasan",
    "Pengeluaran barang sebagian atas barang yang tidak terkena larangan dan/atau pembatasan",
    "Penyelesaian lainnya"
];
// ========================================================
// 4. FUNGSI PEMANGGIL OPTION DROPDOWN TERPUSAT
// ========================================================
/**
 * Menghasilkan string HTML <option> dari master data array.
 * Otomatis mempertahankan nilai DB yang belum ada di daftar master agar data tidak hilang.
 */
export function renderMasterOptions(dataList, selectedValue = '', placeholder = '- Pilih -') {
    let html = placeholder ? `<option value="">${placeholder}</option>` : '';
    const selectedNorm = (selectedValue || '').trim().toLowerCase();
    dataList.forEach(item => {
        const isSelected = item.trim().toLowerCase() === selectedNorm ? 'selected' : '';
        html += `<option value="${item}" ${isSelected}>${item}</option>`;
    });
    if (selectedNorm && selectedNorm !== '-' && !dataList.some(item => item.trim().toLowerCase() === selectedNorm)) {
        html += `<option value="${selectedValue}" selected>${selectedValue}</option>`;
    }
    return html;
}
/**
 * Mengisi langsung elemen <select> di DOM dengan master data.
 */
export function populateSelectElement(selectId, dataList, selectedValue = '', placeholder = '- Pilih -') {
    const el = document.getElementById(selectId);
    if (!el)
        return;
    el.innerHTML = renderMasterOptions(dataList, selectedValue, placeholder);
}
//# sourceMappingURL=constants.js.map