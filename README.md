<div align="center">
  <img src="assets/logo.png" alt="Logo Aplikasi" width="120" height="auto" />
  
  # AP3 (Aplikasi Pelaporan & Penanganan Perkara)
  
  <p align="center">
    Sistem manajemen berkas perkara, administrasi penindakan, alur disposisi, dan pelaporan operasional kepabeanan & cukai terintegrasi.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Status-Active%20Development-blue?style=flat-square" alt="Status" />
  </p>
</div>

---

## 📌 Tentang Aplikasi

**AP3 (Aplikasi Pelaporan & Penanganan Perkara)** dirancang untuk mempermudah, mengotomatisasi, serta menstandardisasi alur penatausahaan administrasi penindakan dan penyidikan. Aplikasi ini menangani pencatatan surat penindakan, disposisi berkas, verifikasi alur operasional, hingga pencetakan laporan resmi dengan format kode surat instansi yang konsisten dan akurat.

---

## ✨ Fitur Utama

- **Pencatatan & Otomasi Penomoran Dokumen**
  - Konversi otomatis input angka menjadi format baku instansi untuk dokumen **LP**, **SBP**, dan **SPRIN**.
  - Deteksi otomatis status penangkapan (Mandiri / Limpahan) pada struktur nomor surat.
  - Skema *focus-to-edit* dan *blur-to-format* untuk kemudahan pengisian data.

- **Alur Kerja & Disposisi Berkas (Workflow)**
  - Pengusulan berkas dari unit operasional/penindakan ke seksi penyidikan.
  - Mekanisme telaah, persetujuan (*Terima*), atau penolakan (*Tolak*) disposisi oleh ketua tim peneliti / penyidik.
  - Notifikasi dan riwayat disposisi berkas secara terpusat.

- **Auto-Booking Administrasi Lanjutan**
  - Penomoran otomatis berurutan (*auto-booking*) untuk dokumen awal: **LPP**, **LPF**, dan **SPLIT**.
  - Penyesuaian fleksibel untuk administrasi situasional seperti pencacahan (**SPRIN Cacah**, **BA**, **LHP**).

- **Sinkronisasi Otomatis Data Penindakan**
  - Kalkulasi otomatis hari kejadian berdasarkan input tanggal penindakan.
  - Pencocokan pasal pelanggaran secara dinamis berbasis **Modus Operandi**.
  - Generator otomatis kalimat kronologis kejadian dan uraian barang bukti.

- **Manajemen Data & Ekspor Laporan**
  - Ekspor daftar perkara ke format **CSV / Excel** dan **PDF**.
  - Filter pencarian cepat serta navigasi tabel berbasis paginasi modular.

---

## 🛠️ Arsitektur & Teknologi

- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) (ESNext / Strict Type Checking)
- **Runtime & Modul:** Node.js, Native ES Modules (`.js` output)
- **Penyimpanan State:** Local Client State & REST API Backend
- **Tampilan:** Vanilla HTML5 / Modern CSS (Custom Design System dengan skema warna gelap & aksen keemasan)

---

## 📁 Struktur Direktori

```text
├── assets/
│   └── logo.png                  # Aset logo resmi aplikasi
├── src/
│   ├── client/
│   │   ├── config/
│   │   │   └── constants.ts      # Data master (komoditi, pasal, kantor, jabatan)
│   │   ├── modules/
│   │   │   ├── auth.ts           # Manajemen akses dan peran pengguna
│   │   │   ├── dashboard.ts      # Statistik ringkasan perkara
│   │   │   ├── disposisi.ts      # Logika pergerakan dan respon disposisi
│   │   │   ├── editor.ts         # Editor laporan dan pratinjau dinamis
│   │   │   ├── perkara.ts        # Logika form data perkara dan validasi input
│   │   │   └── table.ts          # Rendering tabel, paginasi, dan ekspor
│   │   ├── state/
│   │   │   └── store.ts          # Penyimpanan state perkara terpusat
│   │   └── utils/
│   │       ├── formatters.ts     # Pemformat tanggal, mata uang, dan teks
│   │       ├── generators.ts     # Generator nomor booking berkas
│   │       ├── ui.ts             # Notifikasi toast dan dialog konfirmasi
│   │       └── validators.ts     # Validasi konsistensi dokumen operasional
│   └── server/                   # Endpoint API dan persistensi konfigurasi
├── tsconfig.json                 # Konfigurasi TypeScript compiler
└── package.json                  # Dependensi dan skrip proyek
