/**
 * ============================================================================
 * MODUL         : CONSTANTS.TS
 * DESKRIPSI     : MASTER DATA (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
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
export declare const MASTER_ASAL_PERKARA: readonly ["Seksi Penindakan", "Instansi/Unit Lain", "Lainnya"];
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
export declare const MASTER_JENIS_PERKARA: readonly ["Cukai - HT (Hasil Tembakau)", "Cukai - EA (Etil Alkohol)", "Cukai - MMEA (Minuman Mengandung Etil Alkohol)", "Cukai - Pita Cukai Palsu / Bekas", "Impor - Umum / Kargo", "Impor - Barang Penumpang", "Impor - Barang Kiriman", "Impor - Pesisir / Laut (Penyelundupan)", "Ekspor - Umum / Kargo", "Ekspor - Barang Penumpang", "Ekspor - Barang Kiriman", "Ekspor - Sumber Daya Alam / Tambang", "Fasilitas - FTZ (Free Trade Zone)", "Fasilitas - TPB (Kawasan Berikat / Gudang Berikat)", "Fasilitas - KITE", "Fasilitas - Impor Sementara", "NPP - Narkotika, Psikotropika, dan Prekursor", "Lartas - Pakaian Bekas (Balepressed)", "Lartas - Senjata Api & Bahan Peledak", "Lartas - Flora / Fauna (CITES)", "Pelanggaran Dokumen / Kepabeanan Lainnya"];
/**
 * Master Status Penangkapan
 */
export declare const MASTER_STATUS_PENANGKAPAN: readonly ["Penindakan Biasa", "NHI", "Limpahan Instansi Lain"];
/**
 * Master Pasal dan Modus Operandi
 */
export declare const defaultPasalClusters: {
    readonly "UU KEPABEANAN": readonly ["Pasal 7A Ayat (1) UU No. 17 Tahun 2006 (Kewajiban RKSP)", "Pasal 7A Ayat (4) UU No. 17 Tahun 2006 (Sanksi RKSP)", "Pasal 7A Ayat (2) UU No. 17 Tahun 2006 (Inward Manifest)", "Pasal 7A Ayat (3) UU No. 17 Tahun 2006 (Batas Waktu)", "Pasal 7A Ayat (5) UU No. 17 Tahun 2006 (Sanksi Manifes)", "Pasal 7A Ayat (7) UU No. 17 Tahun 2006 (Selisih Kurang)", "Pasal 7A Ayat (8) UU No. 17 Tahun 2006 (Selisih Lebih)", "Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)", "Pasal 7A Ayat (11) UU No. 17 Tahun 2006 (Outward Manifest)", "Pasal 7A Ayat (12) UU No. 17 Tahun 2006 (Sanksi Manifes)", "Pasal 104 UU No. 17 Tahun 2006 (Tanpa Manifes)", "Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)", "Pasal 53 Ayat (3) UU No. 17 Tahun 2006 (Penegahan Lartas)", "Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)", "Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)", "Pasal 102A UU No. 17 Tahun 2006 (Penyelundupan Ekspor)", "Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)", "Pasal 108 UU No. 17 Tahun 2006 (Pertanggungjawaban Pidana)"];
    readonly "UU CUKAI": readonly ["Pasal 27 UU No. 39 Tahun 2007 (Pengangkutan BKC)", "Pasal 50 UU No. 39 Tahun 2007 (Tanpa NPPBKC)", "Pasal 52 UU No. 39 Tahun 2007 (Pengeluaran BKC)", "Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)", "Pasal 55 UU No. 39 Tahun 2007 (Pita Palsu)", "Pasal 56 UU No. 39 Tahun 2007 (Cukai Ilegal)", "Pasal 58 UU No. 39 Tahun 2007 (Salah Personalisasi)"];
    readonly "UU INSTANSI LAIN": readonly ["Pasal 34 UU No. 8 Tahun 2010 (Uang Tunai)", "Pasal 35 UU No. 8 Tahun 2010 (Pemeriksaan Tunai)", "Pasal 36 UU No. 8 Tahun 2010 (Sanksi Tunai)", "UU No. 7 Tahun 2011 tentang Mata Uang (Mata Uang)", "Pasal 113 UU No. 35 Tahun 2009 tentang Narkotika (Penyelundupan Narkotika)", "Pasal 114 UU No. 35 Tahun 2009 tentang Narkotika (Peredaran Narkotika)", "UU No. 5 Tahun 1997 tentang Psikotropika (Psikotropika)", "UU No. 17 Tahun 2023 tentang Kesehatan (Kesehatan)", "Pasal 33 jo. Pasal 86 UU No. 21 Tahun 2019 (Karantina)", "Pasal 34 jo. Pasal 87 UU No. 21 Tahun 2019 (Karantina)", "Pasal 47 jo. Pasal 111 UU No. 7 Tahun 2014 tentang Perdagangan (Balepress)", "Pasal 51 jo. Pasal 112 UU No. 7 Tahun 2014 tentang Perdagangan (Perizinan Berusaha)", "UU No. 3 Tahun 2014 tentang Perindustrian (Perindustrian)"];
    readonly "PERATURAN PEMERINTAH": readonly ["Pasal 70 Ayat (1) PP No. 41 Tahun 2021 (RKSP Batam)", "Pasal 70 Ayat (2) huruf a PP No. 41 Tahun 2021 (Inward Batam)", "Pasal 70 Ayat (2) huruf b PP No. 41 Tahun 2021 (Outward Batam)", "Pasal 71 Ayat (1) PP No. 41 Tahun 2021 (Izin BP)", "Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)", "Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)", "Pasal 73 PP No. 41 Tahun 2021 (Pembongkaran Manifes)", "Pasal 74 PP No. 41 Tahun 2021 (Pemuatan Manifes)", "PP No. 49 Tahun 2022 tentang Perlakuan Perpajakan atas Penyerahan BKP/JKP di Kawasan Perdagangan Bebas (Pajak FTZ)", "Pasal 3 & Pasal 4 PP No. 99 Tahun 2016 (Tata Cara)", "Pasal 10 PP No. 99 Tahun 2016 (Sanksi Denda)"];
    readonly "PERATURAN MENTERI KEUANGAN": readonly ["Pasal 2 & Pasal 4 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Ketentuan RKSP)", "Pasal 6 & Pasal 7 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Inward Manifest)", "Pasal 12 s.d. 17 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Selisih Manifes)", "Pasal 21 s.d. 23 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Outward Manifest)", "Pasal 4 PMK No. 34/PMK.04/2021 (RKSP Batam)", "Pasal 5 & Pasal 7 PMK No. 34/PMK.04/2021 (Inward Batam)", "Pasal 6 & Pasal 8 PMK No. 34/PMK.04/2021 (Outward Batam)", "Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)", "Pasal 3 & Pasal 4 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Pemberitahuan Tunai)", "Pasal 19 s.d. 21 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Sanksi Tunai)", "Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)", "Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)", "Pasal 2 & Pasal 3 PMK No. 161/PMK.04/2019 (Dokumen CK-5)", "Pasal 11 & Pasal 14 PMK No. 161/PMK.04/2019 (Penindakan Cukai)", "Pasal 2 & Pasal 8 PMK No. 226/PMK.04/2021 (Pembebasan Cukai)", "Pasal 14 & Pasal 19 PMK No. 226/PMK.04/2021 (Sanksi Pembebasan)"];
    readonly "PERATURAN MENTERI/BADAN LAIN": readonly ["Pasal 2 & Pasal 4 PBI No. 20/2/PBI/2018 (Izin BI)", "Pasal 15 & Pasal 16 PBI No. 20/2/PBI/2018 (Sanksi BI)", "PADG BI No. 20/17/PADG/2018 (Juknis UKA)", "Peraturan BP Batam terkait Perizinan Berusaha Pemasukan Barang Konsumsi / Kuota Barang ke Kawasan Bebas Batam (Kuota Batam)", "Peraturan BP Batam terkait Pemasukan Barang Modal Bukan Baru / Workshop Container ke Kawasan Bebas Batam (Workshop Container)", "Peraturan Menteri Perdagangan tentang Kebijakan dan Pengaturan Impor (Lartas Impor)", "Peraturan Menteri Perdagangan tentang Kebijakan dan Pengaturan Ekspor (Lartas Ekspor)", "Peraturan Menteri Perdagangan tentang Larangan Ekspor Barang Tertentu / Pakaian Bekas (Lartas Ekspor)", "Peraturan BPOM tentang Pemasukan Obat dan Makanan ke Dalam Wilayah Indonesia (SKI BPOM)", "Peraturan Menteri Lingkungan Hidup dan Kehutanan tentang Peredaran Tumbuhan dan Satwa Liar (CITES)"];
};
export declare const MODUS_PASAL_MAP: {
    "Barang Impor Sementara yang Belum Dilakukan Pemenuhan Kewajiban Kepabeanan Melebihi Jangka Waktu": {
        cluster: string;
        pasal: string;
    }[];
    "Belum Adanya Penyelesaian Kewajiban Kepabeanan": {
        cluster: string;
        pasal: string;
    }[];
    "Ditemukan Adanya Selisih Lebih Jumlah Muatan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas Batam": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas dari Luar Daerah Pabean tanpa Perizinan Berusaha dari Badan Pengusahaan": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Lain ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa Kelengkapan Dokumen Perizinan dari Instansi Terkait": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Larangan dan Pembatasan dari Tempat Lain dalam Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Workshop Container dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Luar Daerah Pabean tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Impor yang Diberitahukan Secara Tidak Benar Terkait Jumlah dan/atau Jenis Barang": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Bekas Tertentu yang Dilarang untuk Diimpor ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Kendaraan Bermotor Eks-Impor ke Kawasan Bebas Batam tanpa Memiliki Dokumen Perizinan dan Form Pendaftaran yang Sah": {
        cluster: string;
        pasal: string;
    }[];
    "Penimbunan Barang Impor yang Belum Selesai Kewajiban Pabeannya di Gudang Ilegal di Luar Area Kawasan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyampaian Dokumen Pelindung Impor Berupa Invoice dan Packing List Palsu untuk Menghindari Ketentuan Lartas": {
        cluster: string;
        pasal: string;
    }[];
    "Pembongkaran Barang Impor yang Tidak Diberitahukan di Dokumen Pemberitahuan Kepabeanan": {
        cluster: string;
        pasal: string;
    }[];
    "Pembongkaran Peti Kemas atau Muatan Impor yang Tidak Sesuai dengan Pos Manifest yang Disetujui": {
        cluster: string;
        pasal: string;
    }[];
    "Pembongkaran Barang Impor di Luar Kawasan Pabean atau Tempat Penimbunan Sementara tanpa Izin Kepala Kantor Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang yang Tidak Diberitahukan dalam Outward Manifest": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Impor yang Tidak Tercantum dalam Inward Manifest (Manifes Kedatangan Sarana Pengangkut)": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Ekspor yang Tidak Tercantum dalam Outward Manifest (Manifes Keberangkatan Sarana Pengangkut)": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Ekspor tanpa Dilengkapi Dokumen Pemberitahuan Ekspor Barang (PEB) yang Sah": {
        cluster: string;
        pasal: string;
    }[];
    "Penyampaian Data Manifest yang Tidak Sesuai Terkait Jumlah Kemasan, Jenis Kemasan, dan/atau Nomor Peti Kemas": {
        cluster: string;
        pasal: string;
    }[];
    "Keterlambatan atau Tidak Disampaikannya RKSP dan Inward Manifest oleh Pengangkut Sebelum Kedatangan Sarana Pengangkut": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Impor dari Sarana Pengangkut Sebelum Disampaikannya Inward Manifest kepada Pejabat Bea dan Cukai": {
        cluster: string;
        pasal: string;
    }[];
    "Penyembunyian Barang Impor Larangan dan Pembatasan di dalam Kompartemen Khusus Sarana Pengangkut (False Compartment)": {
        cluster: string;
        pasal: string;
    }[];
    "Pemindahan Barang Impor dari Satu Sarana Pengangkut ke Sarana Pengangkut Lain (Ship to Ship) di Luar Area Labuh Resmi tanpa Izin Bea Cukai": {
        cluster: string;
        pasal: string;
    }[];
    "Penggunaan Barang Impor Sementara Tidak Sesuai dengan Tujuan dan Peruntukan Izin yang Diberikan": {
        cluster: string;
        pasal: string;
    }[];
    "Tidak Diekspornya Kembali Barang Impor Sementara Setelah Melewati Batas Waktu Izin yang Ditetapkan": {
        cluster: string;
        pasal: string;
    }[];
    "Pindah Tangan atau Pemindahtanganan Barang Impor Sementara kepada Pihak Lain tanpa Persetujuan Kepala Kantor Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pengalihan Lokasi Penggunaan Barang Impor Sementara ke Luar Lokasi yang Ditentukan dalam Surat Keputusan Izin": {
        cluster: string;
        pasal: string;
    }[];
    "Pemindahtanganan atau Penjualan Kendaraan Bermotor/Alat Berat Impor Sementara ke Pasar Domestik tanpa Pelunasan Bea Masuk dan PDRI": {
        cluster: string;
        pasal: string;
    }[];
    "Penggantian Komponen atau Perubahan Bentuk Utama atas Barang Impor Sementara tanpa Persetujuan DJBC": {
        cluster: string;
        pasal: string;
    }[];
    "Keterlambatan Pengajuan Perpanjangan Jangka Waktu Izin Impor Sementara Sebelum Masa Izin Berakhir": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang Impor dari Tempat Penimbunan Sementara sebelum Memperoleh Persetujuan Pengeluaran Dokumen (SPPB)": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang Impor Fasilitas Tempat Penimbunan Berikat (TPB) ke Peredaran Bebas tanpa Dokumen Pemberitahuan dan Pelunasan Bea Masuk serta PDRI": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan atau Pengeluaran Barang Fasilitas Kawasan Berikat yang Tidak Sesuai dengan Dokumen BC 2.3, BC 2.5, BC 2.7, atau BC 4.0": {
        cluster: string;
        pasal: string;
    }[];
    "Pengalihan atau Penjualan Bahan Baku Impor Fasilitas Kawasan Berikat ke Tempat Lain dalam Daerah Pabean (TLDDP) tanpa Izin Kepala Kantor Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Fasilitas Gudang Berikat dengan Melakukan Penimbunan Barang yang Melebihi Batas Waktu Maksimal Penimbunan": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang dari Pusat Logistik Berikat (PLB) yang Tidak Dilengkapi Dokumen Persetujuan Pabean dan Pelunasan Pungutan Negara": {
        cluster: string;
        pasal: string;
    }[];
    "Manipulasi Laporan Pertanggungjawaban Mutasi Bahan Baku dan Hasil Produksi (IT Inventory) pada Pengusaha Kawasan Berikat": {
        cluster: string;
        pasal: string;
    }[];
    "Penyimpanan Barang yang Tidak Terdaftar dalam Ruang Lingkup Izin Penyelenggara/Pengusaha Tempat Penimbunan Berikat": {
        cluster: string;
        pasal: string;
    }[];
    "Subkontrak Pekerjaan dari Kawasan Berikat ke Perusahaan di TLDDP tanpa Dilengkapi Dokumen Jaminan dan Persetujuan Bea dan Cukai": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Bahan Baku Fasilitas KITE dengan Menjual Langsung ke Pasar Domestik tanpa Diproses Lebih Lanjut Menjadi Hasil Produksi": {
        cluster: string;
        pasal: string;
    }[];
    "Ketidaksesuaian Konversi Pemakaian Bahan Baku (Konversi Bahan Baku ke Produk Jadi) dalam Laporan Pertanggungjawaban Fasilitas KITE": {
        cluster: string;
        pasal: string;
    }[];
    "Tidak Terealisasinya Ekspor atas Hasil Produksi dari Bahan Baku Fasilitas KITE Melebihi Batas Waktu Periode Pembebasan": {
        cluster: string;
        pasal: string;
    }[];
    "Penyampaian Dokumen Ekspor Palsu atau Manipulatif untuk Mempertanggungjawabkan Pembebasan Bea Masuk Fasilitas KITE": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Barang Modal/Mesin Impor Fasilitas Pembebasan Bea Masuk BKPM yang Dipindahtangankan Sebelum Melewati Jangka Waktu Pembatasan": {
        cluster: string;
        pasal: string;
    }[];
    "Penggunaan Mesin atau Peralatan Fasilitas Pembebasan Bea Masuk di Luar Lokasi Proyek yang Telah Disetujui dalam Surat Keputusan": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Fasilitas Impor Barang Hibah/Bantuan Sosial untuk Kepentingan Komersial tanpa Pelunasan Bea Masuk dan Cukai": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Izin Fasilitas Impor untuk Keperluan Riset, Pendidikan, atau Olahraga yang Digunakan untuk Kegiatan Usaha Lain": {
        cluster: string;
        pasal: string;
    }[];
    "Pengeluaran Barang Impor Fasilitas Bebas Bea Masuk dari Kawasan Bebas Batam ke TLDDP tanpa Pelunasan Bea Masuk, Cukai, dan Pajak (PPN/PPh)": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Konsumsi ke Kawasan Bebas Batam Melebihi Kuota yang Telah Ditetapkan oleh Badan Pengusahaan": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Antarpulau dari Kawasan Bebas Batam tanpa Dilengkapi Dokumen Pemberitahuan Pabean PPFTZ-01 atau PPFTZ-02": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Berfasilitas Pembebasan Pajak Antar-Kawasan Bebas tanpa Dilengkapi Dokumen Pemberitahuan PPFTZ-02": {
        cluster: string;
        pasal: string;
    }[];
    "Pemanfaatan Bahan Baku Asal Luar Daerah Pabean yang Memperoleh Fasilitas FTZ untuk Produksi Barang yang Dikeluarkan ke TLDDP tanpa Pembayaran Bea Masuk Elemen Impor": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan BKC tanpa Dilengkapi Dokumen Pelindung Pengangkutan dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyediaan dan atau Penimbunan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan/atau Salah Etiket dan/atau Tidak Memiliki NPPBKC": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai Hasil Produksi di Tempat Lain dalam Daerah Pabean yang Dimasukkan ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam dan Belum Dilunasi Pita Cukai-nya": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pemasukan Barang Larangan dan Pembatasan dari Tempat Lain dalam Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Kawasan Perdagangan Bebas dan Pelabuhan Lainnya tanpa/salah Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pengangkutan Barang Kena Cukai Hasil Tembakau tanpa Dilekati Pita Cukai Melalui Jalur Laut Menggunakan High Speed Craft (HSC)": {
        cluster: string;
        pasal: string;
    }[];
    "Penyediaan dan/atau Penjualan Minuman Mengandung Etil Alkohol (MMEA) Ilegal tanpa Memiliki Izin NPPBKC": {
        cluster: string;
        pasal: string;
    }[];
    "Pelekatan Pita Cukai Bekas dan/atau Pita Cukai Palsu pada Barang Kena Cukai Hasil Tembakau": {
        cluster: string;
        pasal: string;
    }[];
    "Penggunaan Pita Cukai yang Bukan Haknya atau Tidak Sesuai Personalisasi dan Golongan Tarif Cukai": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Fasilitas Pembebasan Bea Masuk Barang Pribadi Penumpang Melalui Modus Split Baggage atau Pembagian Koper kepada Jastip": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Bawaan Awak Sarana Pengangkut (Crew) yang Melebihi Batas Nilai FOB Pembebasan tanpa Pemberitahuan Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Barang Dagangan Komersial Menggunakan Fasilitas Jalur Hijau Barang Bawaan Pribadi Penumpang": {
        cluster: string;
        pasal: string;
    }[];
    "Penyalahgunaan Fasilitas Pembebasan Bea Masuk dan Cukai atas Barang Bawaan Penumpang Melebihi Batas Nilai Pabean": {
        cluster: string;
        pasal: string;
    }[];
    "Pemasukan Narkotika, Psikotropika, dan Prekursor (NPP) Melalui Barang Kiriman Pos/Ekspedisi dengan Modus False Declaration": {
        cluster: string;
        pasal: string;
    }[];
    "Penyembunyian Narkotika, Psikotropika, dan Prekursor (NPP) pada Badan Penumpang (Body Strapped) Melalui Terminal Kedatangan Internasional": {
        cluster: string;
        pasal: string;
    }[];
    "Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Luar Daerah Pabean ke Kawasan Perdagangan dan Pelabuhan Bebas Batam yang Telah Diberitahukan namun Tidak Memiliki Persetujuan atas Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Bank Indonesia": {
        cluster: string;
        pasal: string;
    }[];
    "Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Luar Daerah Pabean ke Kawasan Perdagangan dan Pelabuhan Bebas Batam yang Tidak Diberitahukan Melebihi Seratus Juta Rupiah atau Setara dengan Itu": {
        cluster: string;
        pasal: string;
    }[];
    "Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Kawasan Perdagangan dan Pelabuhan Bebas Batam ke Luar Daerah Pabean yang Tidak Diberitahukan Melebihi Seratus Juta Rupiah atau Setara dengan Itu": {
        cluster: string;
        pasal: string;
    }[];
};
export declare const MASTER_MODUS_OPERANDI: (keyof typeof MODUS_PASAL_MAP)[];
export type ModusOperandiType = keyof typeof MODUS_PASAL_MAP;
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
export declare const MASTER_PEKERJAAN: readonly ["Karyawan Swasta", "Wiraswasta", "PNS / ASN", "TNI", "POLRI", "Pegawai BUMN / BUMD", "Buruh Harian Lepas", "Petani / Nelayan", "Pedagang", "Nakhoda / Kapten Kapal", "Pelaut / ABK (Anak Buah Kapal)", "Pengemudi / Supir / Kurir", "Pengurus Jasa Kepabeanan (PPJK)", "Buruh Pelabuhan / TKBM", "Pelajar / Mahasiswa", "Ibu Rumah Tangga", "Tidak Bekerja", "LAINNYA"];
/**
 * Master Kondisi Barang Bukti
 */
export declare const MASTER_KONDISI_BARANG: readonly ["Baik", "Baru", "Bukan baru", "Tidak teridentifikasi"];
/**
 * Master Satuan Barang / Jenis Koli
 */
export declare const MASTER_SATUAN_KOLI: readonly ["koli", "karton", "box", "karung", "peti", "pallet", "bag", "bundel", "pack", "bale", "crate", "basket", "kontainer", "drum", "jerigen", "botol", "kaleng", "pail", "tabung", "tangki", "pcs", "unit", "set", "slop", "batang", "lembar", "roll", "sachet", "strip", "blister", "vial", "ampul", "koper", "tas", "lusin", "gross", "rim", "pk", "npr", "kg", "gram", "ton", "liter"];
/**
 * Master Mata Uang
 */
export declare const MASTER_MATA_UANG_OPTIONS: readonly [{
    readonly code: "IDR";
    readonly name: "Rupiah Indonesia (IDR)";
}, {
    readonly code: "SGD";
    readonly name: "Dolar Singapura (SGD)";
}, {
    readonly code: "MYR";
    readonly name: "Ringgit Malaysia (MYR)";
}, {
    readonly code: "USD";
    readonly name: "Dolar Amerika Serikat (USD)";
}, {
    readonly code: "EUR";
    readonly name: "Euro (EUR)";
}, {
    readonly code: "GBP";
    readonly name: "Pound Sterling (GBP)";
}, {
    readonly code: "JPY";
    readonly name: "Yen Jepang (JPY)";
}, {
    readonly code: "CNY";
    readonly name: "Yuan Tiongkok (CNY)";
}, {
    readonly code: "AUD";
    readonly name: "Dolar Australia (AUD)";
}, {
    readonly code: "HKD";
    readonly name: "Dolar Hong Kong (HKD)";
}, {
    readonly code: "SAR";
    readonly name: "Riyal Arab Saudi (SAR)";
}, {
    readonly code: "AED";
    readonly name: "Dirham UEA (AED)";
}, {
    readonly code: "LAINNYA";
    readonly name: "Mata Uang Lainnya";
}];
/**
 * Master Jenis Dokumen Pemberitahuan Pabean
 */
export declare const MASTER_JENIS_DOKUMEN_PABEAN: readonly ["Tanpa Dokumen", "CN", "PIBK", "PIB", "PEB", "NPPE", "SPPB", "BC 1.0", "BC 1.1", "BC 1.2", "BC 1.6", "BC 1.7", "BC 2.0", "BC 2.1", "BC 2.2", "BC 2.3", "BC 2.5", "BC 3.0", "BC 4.0", "PPFTZ-01", "PPFTZ-02", "PPFTZ-03"];
/**
 * Master Dokumen Pelengkap Pabean
 */
export declare const MASTER_DOKUMEN_PELENGKAP: readonly ["Invoice", "Packing List", "Bill of Lading (B/L)", "Air Way Bill (AWB)", "Delivery Order (DO)", "Polis Asuransi", "Bukti Pembayaran / TT / Letter of Credit (L/C)", "Manifes / BC 1.1", "Pemberitahuan Impor Barang (PIB / BC 2.0)", "Pemberitahuan Ekspor Barang (PEB / BC 3.0)", "Dokumen Pabean FTZ (PPFTZ-01 / PPFTZ-02 / PPFTZ-03)", "Dokumen TPB (BC 2.3 / BC 2.7 / BC 4.0)", "Persetujuan Impor Sementara", "Persetujuan Impor (PI Kementerian Perdagangan)", "Persetujuan Ekspor (PE Kementerian Perdagangan)", "Laporan Surveyor (LS)", "Sertifikat / Izin Karantina (KH / KI / KT)", "Surat Keterangan Impor BPOM (SKI BPOM)", "Persetujuan Pemasukan / Pengeluaran BP Batam", "Surat Persetujuan Pembawaan UKA (Bank Indonesia)", "Izin CITES (Flora & Fauna)", "Izin Angkut / Rekomendasi POLRI (Handak / Senpi)", "Surat Keterangan Asal / Certificate of Origin (SKA / COO)", "Dokumen Pelindung Pengangkutan BKC (CK-5)", "Nomor Pokok Pengusaha Barang Kena Cukai (NPPBKC)", "DOKUMEN LAINNYA"];
/**
 * Master Jenis Identitas Pelaku / Penghadap
 */
export declare const MASTER_JENIS_IDENTITAS: readonly ["NIK", "Paspor", "NIB", "NPWP", "SIM", "Identitas Lain"];
/**
 * Master Jenis Kemasan Kontainer
 */
export declare const MASTER_JENIS_KEMASAN: readonly ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Part Container / Empty Container", "Loose Cargo / Break Bulk", "Bulk Cargo - Dry (Curah Kering)", "Bulk Cargo - Liquid (Curah Cair)", "Ro-Ro / Kendaraan Bermotor", "Over Dimension / Heavy Lift", "Lainnya"];
/**
 * Master Ukuran Kontainer
 */
export declare const MASTER_UKURAN_KONTAINER: readonly ["20 feet", "40 feet", "40 feet High Cube (HC)", "45 feet", "45 feet High Cube (HC)", "20 feet High Cube (HC)", "10 feet", "Ukuran Lainnya"];
/**
 * Master Komoditi Pelanggaran
 */
export declare const MASTER_KOMODITI: readonly ["Hasil Tembakau - Sigaret Kretek Mesin (SKM)", "Hasil Tembakau - Sigaret Putih Mesin (SPM)", "Hasil Tembakau - Sigaret Kretek Tangan (SKT)", "Hasil Tembakau - Tembakau Iris (TIS)", "Hasil Tembakau - Cerutu (CRT) / Rokok Daun", "Hasil Tembakau - Rokok Elektrik (REL / Liquid / Vapors)", "Hasil Pengolahan Tembakau Lainnya (HPTL / Shisha / Molasses)", "Pita Cukai Palsu / Bekas / Pelanggaran Desain Cukai", "Minuman Mengandung Etil Alkohol (MMEA) Golongan A", "Minuman Mengandung Etil Alkohol (MMEA) Golongan B", "Minuman Mengandung Etil Alkohol (MMEA) Golongan C", "Etil Alkohol (EA)", "Narkotika, Psikotropika, dan Prekursor (NPP)", "Obat-obatan, Suplemen, dan Bahan Baku Obat Ilegal", "Kosmetik, Skincare, dan Produk Perawatan Diri Tanpa Izin", "Alat Kesehatan (Alkes) & Sediaan Farmasi Tanpa Izin Edar", "Telepon Seluler, Komputer Genggam, dan Tablet (HKT)", "Elektronik Rumah Tangga, Konsol Game, Kamera, & Komponen PC", "Perangkat Telekomunikasi / Radio / Drone Tanpa Sertifikasi", "Tekstil dan Produk Tekstil (TPT) / Kain / Benang Roll", "Pakaian Bekas / Ballpressed / Karpet Bekas", "Tas, Sepatu, Aksesoris, & Produk Fashion Branded / Mewah", "Jam Tangan Mewah, Logam Mulia, Perhiasan, & Permata", "Kendaraan Bermotor CBU (Mobil / Sepeda Motor Utuh / Moge)", "Sarana Pengangkut Laut (Speedboat, Yacht, Jet Ski, Mesin Tempel)", "Suku Cadang / Spare Part Kendaraan Bermotor (Automotive Parts)", "Suku Cadang / Spare Part Mesin Industri & Pabrik", "Barang Modal Bukan Baru / Mesin Bekas / Alat Berat", "Workshop Container / Offshore Container", "Besi, Baja, Besi Tua (Scrap Metal), dan Produk Metalurgi", "Minyak Bumi, BBM (Solar / MFO / Bensin), dan Gas", "Hasil Tambang & Mineral (Pasir Timah, Nikel, Bauksit, Batubara)", "Bahan Kimia Berbahaya dan Bahan Beracun (B3)", "Limbah B3 / Sampah Plastik & Elektronik Ilegal", "Tumbuhan dan Satwa Liar Dilindungi (TSL / CITES)", "Produk Hasil Perikanan, Pertanian, Peternakan, dan Hewan (Karantina)", "Senjata Api, Senjata Angin / Airsoft Gun, dan Amunisi", "Bahan Peledak, Amonium Nitrat, dan Kembang Api / Petasan", "Valuta Asing / Uang Kertas Asing (UKA) / Tunai / Instrumen Pembayaran", "Produk Makanan, Minuman Olahan, dan Bahan Pangan", "Barang Kiriman Pos / E-Commerce Umum", "Barang Campuran / Kargo Lepas Lainnya"];
/**
 * Master Pilihan Tambahan Akhiran Generator Uraian
 */
export declare const MASTER_AKHIRAN_BARANG: readonly [{
    readonly value: "";
    readonly label: "- Tanpa Tambahan Akhiran -";
}, {
    readonly value: "dll";
    readonly label: "dll.";
}, {
    readonly value: "etc";
    readonly label: "etc.";
}, {
    readonly value: "dan sebagainya";
    readonly label: "dan sebagainya.";
}, {
    readonly value: "dan barang lainnya";
    readonly label: "dan barang lainnya.";
}, {
    readonly value: "manual";
    readonly label: "Kustom / Ketik Sendiri";
}];
/**
 * Master Alasan Rangka Penyerahan BAST Pemilik
 */
export declare const MASTER_RANGKA_PENYERAHAN: readonly ["Tidak ditemukan pelanggaran kepabeanan dan/atau cukai", "Penyelesaian kewajiban pabean dengan pembuatan dokumen pemberitahuan pabean", "Penyelesaian kewajiban pabean berupa pembayaran Bea Masuk/Pajak Dalam Rangka Impor dan/atau Denda SPSA", "Penyelesaian kewajiban pabean dengan pemenuhan izin larangan dan/atau pembatasan (Lartas)", "Pengeluaran sebagian barang yang tidak terkena larangan dan/atau pembatasan", "Penyelesaian sanksi administrasi cukai / asas ultimum remedium (Pasal 64B UU Cukai)", "Penyelesaian dengan re-ekspor barang ke luar Daerah Pabean", "Pemusnahan barang di bawah pengawasan pabean", "Pelimpahan perkara dan tersangka/BB ke Kepolisian Republik Indonesia", "Pelimpahan perkara dan tersangka/BB ke Badan Narkotika Nasional (BNN)", "Pelimpahan berkas perkara, tersangka, dan barang bukti ke Kejaksaan Negeri (Tahap II)", "Pelimpahan barang dan penanganan ke Badan Karantina Indonesia", "Pelimpahan perkara dan barang bukti ke Balai Konservasi Sumber Daya Alam (BKSDA) / Gakkum KLHK", "Pelimpahan perkara pembawaan UKA ke Bank Indonesia", "Penyelesaian / Pelimpahan lainnya"];
/**
 * Menghasilkan string HTML <option> dari master data array.
 * Otomatis mempertahankan nilai DB yang belum ada di daftar master agar data tidak hilang.
 */
type SelectOption = string | {
    readonly value: string;
    readonly label: string;
} | {
    value: string;
    label: string;
};
export declare function renderMasterOptions(dataList: readonly SelectOption[] | SelectOption[], selectedValue?: string, placeholder?: string): string;
/**
 * Mengisi langsung elemen <select> di DOM dengan master data.
 */
export declare function populateSelectElement(selectId: string, dataList: readonly SelectOption[] | SelectOption[], selectedValue?: string, placeholder?: string): void;
export {};
