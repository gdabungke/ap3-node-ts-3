export declare const defaultPasalClusters: {
    "UU KEPABEANAN": string[];
    "UU CUKAI": string[];
    "UU INSTANSI LAIN": string[];
    "PERATURAN PEMERINTAH": string[];
    "PERATURAN MENTERI KEUANGAN": string[];
    "PERATURAN MENTERI/BADAN LAIN": string[];
};
export declare const defaultKantorList: string[];
export declare const MAX_PAGE_HEIGHT_PX = 1200;
/**
 * Master Pangkat dan Golongan Ruang ASN (II/a s.d. IV/c)
 */
export declare const MASTER_GOLONGAN_PANGKAT: readonly ["Pengatur Muda (II/a)", "Pengatur Muda Tk. I (II/b)", "Pengatur (II/c)", "Pengatur Tk. I (II/d)", "Penata Muda (III/a)", "Penata Muda Tk. I (III/b)", "Penata (III/c)", "Penata Tk. I (III/d)", "Pembina (IV/a)", "Pembina Tk. I (IV/b)", "Pembina Utama Muda (IV/c)"];
/**
 * Master Jabatan Kedinasan / Struktural / Fungsional
 */
export declare const MASTER_JABATAN_DINAS: readonly ["Kepala Kantor", "Kepala Bidang Penindakan dan Penyidikan", "Kepala Seksi Penindakan dan Penyidikan", "Kepala Seksi Penyidikan", "Kepala Seksi Intelijen", "Pemeriksa Bea dan Cukai Ahli Pertama", "Pemeriksa Bea dan Cukai Ahli Muda", "Pemeriksa Bea dan Cukai Ahli Madya", "Pemeriksa Bea dan Cukai Terampil", "Pemeriksa Bea dan Cukai Mahir", "Pemeriksa Bea dan Cukai Penyelia", "Fungsional Pemeriksa Bea dan Cukai", "Penyidik Pegawai Negeri Sipil (PPNS)", "Pelaksana"];
/**
 * Master Jabatan Operasional Tim Peneliti & Penanganan Perkara (SPLIT / Form)
 */
export declare const MASTER_JABATAN_TIM_PENELITI: readonly ["Ketua Tim Peneliti", "Penyidik", "Anggota Tim Peneliti", "Petugas LPP", "Petugas LPF", "Petugas Penindakan 1", "Petugas Penindakan 2", "Petugas Penindakan 3", "Petugas Pencacah", "Petugas Pembuka Segel", "Petugas Penyerah"];
/**
 * Master Asal Perkara
 */
export declare const MASTER_ASAL_PERKARA: readonly ["Seksi Penindakan", "Instansi/Unit Lain", "LAINNYA"];
/**
 * Master Jenis Penindakan
 */
export declare const MASTER_JENIS_PENINDAKAN: readonly ["Pemeriksaan, penegahan, dan penyegelan barang", "Penegahan dan penyegelan barang"];
/**
 * Master Jenis Pelanggaran
 */
export declare const MASTER_JENIS_PELANGGARAN: readonly ["Kepabeanan", "Cukai"];
/**
 * Master Jenis Perkara
 */
export declare const MASTER_JENIS_PERKARA: readonly ["Cukai - HT", "Cukai - EA", "Cukai - MMEA", "Impor - Umum", "Impor - Barang Penumpang", "Impor - Barang Kiriman", "Ekspor - Umum", "Ekspor - Barang Penumpang", "Ekspor - Barang Kiriman", "Fasilitas - FTZ", "Fasilitas - Impor Sementara"];
/**
 * Master Status Penangkapan
 */
export declare const MASTER_STATUS_PENANGKAPAN: readonly ["Penindakan Biasa", "NHI", "Limpahan Instansi Lain"];
/**
 * Master Modus Operandi
 */
export declare const MASTER_MODUS_OPERANDI: readonly ["barang impor sementara yang belum dilakukan pemenuhan kewajiban kepabeanan melebihi jangka waktu", "belum adanya penyelesaian kewajiban kepabeanan", "ditemukan adanya selisih lebih jumlah muatan dari luar daerah pabean ke kawasan perdagangan bebas batam", "pemasukan barang ke kawasan perdagangan bebas dan pelabuhan bebas dari luar daerah pabean tanpa perizinan berusaha dari badan pengusahaan", "pemasukan barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas lain ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa kelengkapan dokumen perizinan dari instansi terkait", "pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "pemasukan barang larangan dan pembatasan dari tempat lain dalam daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "pemasukan workshop container dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "pembawaan uang tunai berupa uang kertas asing dari luar daerah pabean ke kawasan perdagangan dan pelabuhan bebas batam yang telah diberitahukan namun tidak memiliki persetujuan atas pembawaan uang tunai berupa uang kertas asing dari bank indonesia", "pembawaan uang tunai berupa uang kertas asing dari luar daerah pabean ke kawasan perdagangan dan pelabuhan bebas batam yang tidak diberitahukan melebihi seratus juta rupiah atau setara dengan itu", "pembawaan uang tunai berupa uang kertas asing dari kawasan perdagangan dan pelabuhan bebas batam ke luar daerah pabean yang tidak diberitahukan melebihi seratus juta rupiah atau setara dengan itu", "pembongkaran barang impor yang tidak diberitahukan di dokumen pemberitahuan kepabeanan", "pengangkutan barang yang tidak diberitahukan dalam outward manifest", "pengangkutan bkc tanpa dilengkapi dokumen pelindung pengangkutan dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa pemberitahuan pabean", "pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke luar daerah pabean tanpa/salah pemberitahuan pabean", "pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa/salah pemberitahuan pabean", "penyediaan dan atau penimbunan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan/atau salah etiket dan/atau tidak memiliki nppbkc", "penyerahan barang kena cukai hasil produksi di tempat lain dalam daerah pabean yang dimasukkan ke kawasan perdagangan bebas dan pelabuhan bebas batam dan belum dilunasi pita cukai-nya", "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya", "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pemasukan barang larangan dan pembatasan dari luar daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pemasukan barang larangan dan pembatasan dari tempat lain dalam daerah pabean ke kawasan perdagangan bebas dan pelabuhan bebas batam tanpa/salah pemberitahuan pabean", "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke tempat lain dalam daerah pabean tanpa/salah pemberitahuan pabean", "penyerahan barang kena cukai yang tidak dilekati pita cukai atau tidak dibubuhi tanda pelunasan cukai lainnya dan pengeluaran barang larangan dan pembatasan dari kawasan perdagangan bebas dan pelabuhan bebas batam ke kawasan perdagangan bebas dan pelabuhan lainnya tanpa/salah pemberitahuan pabean"];
/**
 * Master Umur Pelaku (Rentang 15 sampai 85 tahun)
 */
export declare const MASTER_UMUR_PELAKU: string[];
/**
 * Master Jenis Kelamin
 */
export declare const MASTER_JENIS_KELAMIN: readonly ["Laki-Laki", "Perempuan"];
/**
 * Master Pekerjaan Pelaku
 */
export declare const MASTER_PEKERJAAN: readonly ["Wiraswasta", "Pelajar", "Ibu Rumah Tangga", "PNS", "Tidak Bekerja", "LAINNYA"];
/**
 * Master Kondisi Barang Bukti
 */
export declare const MASTER_KONDISI_BARANG: readonly ["Baik", "Baru", "Bukan baru", "Tidak teridentifikasi"];
/**
 * Master Satuan Barang / Jenis Koli
 */
export declare const MASTER_SATUAN_KOLI: readonly ["koli", "karton", "box", "karung", "peti", "pallet", "bag", "bundel", "pcs", "pack", "roll", "drum", "jerigen", "botol", "kaleng", "lembar", "batang", "slop", "unit", "set", "pk", "npr", "kg", "liter"];
/**
 * Master Jenis Dokumen Pemberitahuan Pabean
 */
export declare const MASTER_JENIS_DOKUMEN_PABEAN: readonly ["Tanpa Dokumen", "CN", "PIBK", "BC 1.0", "BC 1.1", "BC 2.0", "BC 2.1", "BC 2.2", "BC 2.3", "BC 2.5", "BC 3.0", "BC 4.0", "PPFTZ-01", "PPFTZ-02", "PPFTZ-03"];
/**
 * Master Dokumen Pelengkap Pabean
 */
export declare const MASTER_DOKUMEN_PELENGKAP: readonly ["Invoice", "Packing List", "Bill of Lading", "Persetujuan Impor", "Persetujuan Ekspor", "Izin Karantina"];
/**
 * Master Jenis Identitas Pelaku / Penghadap
 */
export declare const MASTER_JENIS_IDENTITAS: readonly ["NIK", "Paspor", "NIB", "NPWP", "SIM", "Identitas Lain"];
/**
 * Master Jenis Kemasan Kontainer
 */
export declare const MASTER_JENIS_KEMASAN: readonly ["LCL", "FCL", "Loss Cargo", "Ukuran Lain"];
/**
 * Master Ukuran Kontainer
 */
export declare const MASTER_UKURAN_KONTAINER: readonly ["20 feet", "40 feet"];
/**
 * Master Komoditi Pelanggaran
 */
export declare const MASTER_KOMODITI: readonly ["Hasil Tembakau - Sigaret Kretek Mesin (SKM)", "Hasil Tembakau - Sigaret Putih Mesin (SPM)", "Hasil Tembakau - Sigaret Kretek Tangan (SKT)", "Hasil Tembakau - Tembakau Iris (TIS)", "Hasil Tembakau - Rokok Elektrik (REL / Vapors)", "Minuman Mengandung Etil Alkohol (MMEA) Golongan A", "Minuman Mengandung Etil Alkohol (MMEA) Golongan B", "Minuman Mengandung Etil Alkohol (MMEA) Golongan C", "Etil Alkohol (EA)", "Telepon Seluler, Komputer, dan Tablet (HKT)", "Barang Kiriman Pos / E-Commerce Umum", "Tekstil dan Produk Tekstil (TPT) / Kain / Garmen", "Pakaian Bekas / Ballpress / Textile Impor Ilegal", "Suku Cadang / Spare Part Mesin Industri & Pabrik", "Suku Cadang / Spare Part Kendaraan Bermotor (Automotive Parts)", "Narkotika, Psikotropika, dan Prekursor (NPP)", "Kosmetik, Skincare, dan Produk Kecantikan Tanpa Izin", "Obat-obatan, Suplemen, dan Alat Kesehatan", "Produk Makanan, Minuman, dan Suplemen Olahan", "Besi, Baja, Besi Tua (Scrap), dan Produk Metalurgi", "Valuta Asing / Uang Kertas Asing (UKA) / Tunai", "Bahan Kimia Berbahaya dan Bahan Beracun (B3)", "Produk Hasil Perikanan, Pertanian, dan Hewan (Karantina)", "Tumbuhan dan Satwa Liar (TSL) Dilindungi", "Barang Campuran / Lainnya"];
/**
 * Master Pilihan Tambahan Akhiran Generator Uraian
 */
export declare const MASTER_AKHIRAN_BARANG: readonly [{
    readonly value: "";
    readonly label: "- Tanpa Tambahan Akhiran -";
}, {
    readonly value: "dll";
    readonly label: ", dll.";
}, {
    readonly value: "etc";
    readonly label: ", etc.";
}, {
    readonly value: "barang_lainnya";
    readonly label: ", dan barang lainnya";
}];
/**
 * Master Alasan Rangka Penyerahan BAST Pemilik
 */
export declare const MASTER_RANGKA_PENYERAHAN: readonly ["Penyelesaian kewajiban pabean dalam bentuk berupa SPSA", "Tidak ditemukan pelanggaran", "Penyelesaian kewajiban pabean dalam bentuk pembuatan dokumen pemberitahuan pabean", "Penyelesaian pemenuhan larangan dan/atau pembatasan", "Pengeluaran barang sebagian atas barang yang tidak terkena larangan dan/atau pembatasan", "Penyelesaian lainnya"];
/**
 * Menghasilkan string HTML <option> dari master data array.
 * Otomatis mempertahankan nilai DB yang belum ada di daftar master agar data tidak hilang.
 */
export declare function renderMasterOptions(dataList: readonly string[] | string[], selectedValue?: string, placeholder?: string): string;
/**
 * Mengisi langsung elemen <select> di DOM dengan master data.
 */
export declare function populateSelectElement(selectId: string, dataList: readonly string[] | string[], selectedValue?: string, placeholder?: string): void;
