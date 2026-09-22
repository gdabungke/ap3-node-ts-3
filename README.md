# AP3 - Aplikasi Penyusunan Penelitian Perkara (Versi Node.js & TypeScript)

Aplikasi **AP3** (Aplikasi Penyusunan Penelitian Perkara) untuk Direktorat Jenderal Bea dan Cukai (DJBC) yang telah dimigrasikan dari arsitektur *client-side only* (vanilla JS & localStorage) menjadi aplikasi **Full-Stack terpadu berbasis Node.js, Express, TypeScript, dan basis data SQLite**, dengan **tampilan antarmuka (UI) dan seluruh fungsionalitas asli 100% dipertahankan persis sama**.

---

## Fitur & Peningkatan Utama

1. **Bahasa Pemrograman TypeScript Penuh (`.ts`):**
   * Seluruh kode logika bisnis, form perkara, alur disposisi, editor formulir, formatters, dan template laporan telah dikonversi ke TypeScript murni dengan tipe data yang ketat (*strong typing*).
   * Menghilangkan peringatan/error tipe data (`any`), sehingga kode aman, terstruktur, dan mudah dipelihara.
2. **Komentar & Dokumentasi Lengkap:**
   * **Setiap Fungsi di TypeScript:** Dilengkapi dokumentasi JSDoc/TSDoc berbahasa Indonesia yang menjelaskan fungsi, parameter, serta nilai yang dihasilkan.
   * **Di `index.html`:** Dilengkapi penanda seksi yang jelas (misalnya modal disposisi, modal alasan tolak, form perkara, tabel data, dan area cetak).
3. **Penyimpanan Data Terpusat (SQLite):**
   * Menggantikan ketergantungan rapuh pada `localStorage` peramban dengan basis data relasional SQLite (`data/ap3.sqlite`) yang tersimpan di server.
   * Dilengkapi *fallback* file-based JSON storage yang otomatis aktif jika dependensi native binary belum dikompilasi.
4. **Semua Fitur Asli Tetap Utuh (100% Persis Sama):**
   * Fitur **Alternatif Penyelesaian Perkara** (BDN, SPSA, Serah Terima Instansi Lain, Kembalikan ke Pemilik, Ultimum Remedium) tetap lengkap dan berfungsi aktif.
   * Fitur **Alur Disposisi Berkas Perkara** (pengiriman ke penyidik, penolakan disposisi, riwayat alur, notifikasi) berjalan normal.
   * Format cetak kedinasan presisi (LPP, LPF, SPLIT, SPRIN CACAH, BA, LHP, BAST, dll.) dengan ukuran kertas F4 dan A4 tetap aman tanpa pergeseran tata letak.
5. **Bebas Error 404 pada Jalur Berkas:**
   * Seluruh jalur impor modul (`ui`, `store`, `perkara`, `auth`, dll.) telah diverifikasi oleh compiler TypeScript sehingga tidak ada lagi masalah berkas hilang (*404 Not Found*) seperti pada pengujian lokal sebelumnya.

---

## Struktur Direktori Proyek

```text
ap3-node-ts/
├── package.json              # Konfigurasi npm modern, dependensi Express, SQLite & TypeScript
├── tsconfig.json             # Konfigurasi basis TypeScript
├── tsconfig.server.json      # Konfigurasi kompilasi backend (NodeNext)
├── tsconfig.client.json      # Konfigurasi kompilasi frontend (DOM & ESNext)
├── server.cjs                # Universal server launcher (siap jalan langsung tanpa install)
├── data/                     # Lokasi penyimpanan basis data SQLite (ap3.sqlite / json fallback)
├── dist/                     # Hasil kompilasi JavaScript backend (Node.js)
│   └── server/
└── src/
    ├── server/               # Kode sumber Backend (TypeScript)
    │   ├── index.ts          # Server Express, static asset serving & router
    │   ├── db/
    │   │   └── database.ts   # Layer basis data SQLite & migrasi tabel
    │   ├── routes/
    │   │   ├── auth.ts       # Endpoint autentikasi & sesi pengguna
    │   │   ├── perkara.ts    # Endpoint CRUD perkara & sinkronisasi
    │   │   └── disposisi.ts  # Endpoint alur disposisi berkas
    │   └── types/
    │       └── index.ts      # Type definitions backend (PerkaraRecord, UserAccount, dll.)
    └── client/               # Kode sumber Frontend (TypeScript)
        ├── app.ts            # Entry point client & window binding
        ├── config/
        │   └── constants.ts  # Daftar cluster pasal perundang-undangan & kantor
        ├── state/
        │   └── store.ts      # Store state dengan sinkronisasi REST API & local cache
        ├── types/
        │   └── index.ts      # Type definitions frontend
        ├── utils/
        │   └── formatters.ts # Formatting tanggal, rupiah, kata terbilang
        ├── modules/
        │   ├── auth.ts       # Modul login, registrasi, profil
        │   ├── disposisi.ts  # Modul alur disposisi & notifikasi berkas masuk
        │   ├── editor.ts     # Modul live editor & paginasi cetak
        │   ├── perkara.ts    # Modul CRUD perkara, validasi, ekspor (Excel & PDF)
        │   └── ui.ts         # Toast, dialog konfirmasi, zoom, paper size
        └── templates/
            ├── laporan.ts    # Template dokumen LPP, LPF, SPLIT, SPRIN, BA, LHP
            └── tindaklanjut.ts # Template dokumen tindak lanjut (BAST, KEP BDN, SPSA)
└── public/                   # Aset antarmuka pengguna asli
    ├── index.html            # File HTML utama (dilengkapi komentar seksi lengkap)
    ├── css/                  # Seluruh stylesheet asli (layout, components, print)
    └── js/                   # Hasil kompilasi ES Module client yang dimuat browser
```

---

## Panduan Menjalankan Aplikasi

### Cara 1: Menjalankan Langsung (Instan)
Aplikasi sudah dilengkapi dengan *compiled bundle* dan launcher bawaan Node.js sehingga dapat langsung dijalankan tanpa harus menginstal dependensi terlebih dahulu:

```bash
# Buka terminal di folder proyek, lalu jalankan:
node server.cjs
```
Buka peramban (browser) dan akses:
```
http://localhost:3000
```

### Cara 2: Menjalankan dengan Ekosistem NPM & Kompilasi TypeScript Lengkap

Jika Anda ingin mengembangkan atau mengompilasi ulang kode TypeScript:

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Kompilasi TypeScript:**
   ```bash
   npm run build
   ```

3. **Jalankan Server:**
   ```bash
   npm start
   ```

4. **Mode Development (Hot-reload):**
   ```bash
   npm run dev
   ```

---

## Kredensial Default Sistem
Saat pertama kali dijalankan, sistem secara otomatis menyediakan akun administrator:
* **Email / Username:** `admin`
* **Password:** `admin`
* **Role:** `Admin`

Anda dapat menambahkan akun petugas baru (Peneliti, Penyidik, Kasi, Kasubsi) melalui form registrasi atau panel manajemen pengguna di dalam aplikasi.
