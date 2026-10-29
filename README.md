<div align="center">
  <img src="assets/logo.svg" alt="Logo AP3" width="140" height="auto" />
  
  # AP3 (Aplikasi Pelaporan & Penanganan Perkara)
  
  <p align="center">
    Sistem penatausahaan berkas perkara, administrasi penindakan, alur disposisi, dan pelaporan operasional terintegrasi.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Lisensi-Internal%20Proprietary-amber?style=flat-square" alt="Lisensi" />
  </p>
</div>

---

## 📌 Tentang Aplikasi

**AP3 (Aplikasi Pelaporan & Penanganan Perkara)** dirancang untuk mempermudah, mengotomatisasi, serta menstandardisasi alur penatausahaan administrasi penindakan dan penyidikan. Aplikasi ini menangani pencatatan surat penindakan, disposisi berkas perkara, validasi alur operasional, hingga pembuatan laporan resmi dengan format penomoran surat instansi yang konsisten dan akurat.

---

## ✨ Fitur Utama

- **Pencatatan & Otomasi Penomoran Dokumen**
  - Konversi otomatis input angka menjadi format baku instansi untuk dokumen **LP**, **SBP**, dan **SPRIN**.
  - Deteksi otomatis status penangkapan (*Mandiri* / *Limpahan*) pada struktur nomor surat SBP.
  - Skema *focus-to-edit* (ekstrak angka murni saat diedit) dan *blur-to-format* (format otomatis ke kode resmi saat selesai) langsung pada kotak isian.
  - Pewarnaan teks nomor dokumen selaras dengan tema tombol utama (`#f59e0b`).

- **Alur Kerja & Disposisi Berkas (Workflow)**
  - Pengusulan berkas dari unit operasional/penindakan ke seksi penyidikan.
  - Mekanisme telaah, persetujuan (*Terima*), atau penolakan (*Tolak*) disposisi oleh ketua tim peneliti / penyidik.
  - Riwayat audit disposisi dan notifikasi berkas terintegrasi.

- **Auto-Booking Administrasi Lanjutan**
  - Penomoran otomatis berurutan (*auto-booking*) untuk dokumen administrasi awal: **LPP**, **LPF**, dan **SPLIT**.
  - Penyesuaian fleksibel untuk administrasi situasional pencacahan (**SPRIN Cacah**, **BA**, **LHP**).

- **Sinkronisasi Otomatis Data Penindakan**
  - Kalkulasi otomatis hari kejadian berdasarkan input tanggal penindakan SBP.
  - Pencocokan dan penandaan pasal pelanggaran secara dinamis berbasis **Modus Operandi**.
  - Generator otomatis narasi kronologis kejadian dan uraian barang bukti.

- **Manajemen Data & Ekspor Laporan**
  - Ekspor daftar perkara ke format **CSV / Excel** dan **PDF**.
  - Pencarian multi-kriteria serta paginasi tabel modular.

---

## 🛠️ Arsitektur & Teknologi

- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) (ESNext / Strict Type Checking)
- **Runtime & Modul:** Node.js, Native ES Modules (`.js` output)
- **Penyimpanan State:** Local Client State & REST API Backend
- **Tampilan:** Vanilla HTML5 / Modern CSS (Custom Dark UI Theme dengan aksen warna keemasan `#f59e0b`)

---

## 📁 Struktur Direktori

```text
├── assets/
│   └── logo.svg                  # Berkas logo vektor resmi aplikasi
├── src/
│   ├── client/
│   │   ├── config/
│   │   │   └── constants.ts      # Data master (komoditi, pasal, kantor, jabatan)
│   │   ├── modules/
│   │   │   ├── auth.ts           # Manajemen akses dan peran pengguna
│   │   │   ├── dashboard.ts      # Statistik ringkasan perkara
│   │   │   ├── disposisi.ts      # Logika pergerakan dan respon disposisi
│   │   │   ├── editor.ts         # Editor laporan dan pratinjau dinamis
│   │   │   ├── perkara.ts        # Form data perkara, validasi, dan penomoran otomatis
│   │   │   └── table.ts          # Rendering tabel, paginasi, dan ekspor
│   │   ├── state/
│   │   │   └── store.ts          # Penyimpanan state perkara terpusat
│   │   └── utils/
│   │       ├── formatters.ts     # Pemformat tanggal, mata uang, dan teks
│   │       ├── generators.ts     # Generator nomor booking berkas
│   │       ├── ui.ts             # Notifikasi toast dan dialog konfirmasi
│   │       └── validators.ts     # Validasi konsistensi dokumen operasional
│   └── server/                   # Endpoint API dan persistensi data
├── tsconfig.json                 # Konfigurasi TypeScript compiler
├── package.json                  # Dependensi dan skrip proyek
└── LICENSE                       # Lisensi hak cipta internal
```

---

## 🚀 Memulai Proyek

### Prasyarat

Pastikan perangkat telah terinstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- Paket manajer `npm` atau `yarn`

### Instalasi & Menjalankan

1. **Klon Repositori**
   ```bash
   git clone https://github.com/username/ap3-penindakan.git
   cd ap3-penindakan
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Kompilasi TypeScript**
   ```bash
   npm run build
   ```
   *Atau jalankan mode pantau (watch mode) saat pengembangan:*
   ```bash
   npm run watch
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm start
   ```
   Buka peramban dan akses alamat `http://localhost:3000` (atau port yang dikonfigurasikan).

---

## 📋 Aturan Format Penomoran Dokumen

| Dokumen | Input Pengguna | Format Tersimpan & Ditampilkan |
| :--- | :---: | :--- |
| **Laporan Pelanggaran (LP)** | `1` | `LP-1/KPU.206/2026` |
| **Surat Bukti Penindakan (SBP)** | `1` | `SBP-1/MANDIRI/KPU.2/2026` *(atau `SBP-1/LIMPAH/KPU.2/2026`)* |
| **Surat Perintah Penindakan (SPRIN)** | `1` | `SPRIN-01/KPU.206/2026` *(padding 2 digit)* |

---

## 🔒 Hak Akses & Peran Pengguna

1. **Admin / Kepala Seksi:** Memiliki akses penuh terhadap pembuatan data perkara, monitoring seluruh alur berkas, penghapusan data, serta pengelolaan pengaturan data referensi kantor/komoditi.
2. **Penyidik / Ketua Tim Peneliti:** Menerima disposisi berkas masuk, melakukan telaah awal, menindaklanjuti proses penelitian berkas, atau mengembalikan berkas dengan catatan alasan penolakan.

---

## 📄 Lisensi

Distribusi internal untuk kebutuhan operasional penanganan perkara kedinasan. Hak cipta dilindungi undang-undang. Rincian pembatasan dan hak penggunaan tercantum dalam berkas [LICENSE](./LICENSE).
