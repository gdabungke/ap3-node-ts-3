import { appendPerkaraToSheet, getPerkaraFromSheet, PerkaraData } from '../googleSheets.js';
import pg from 'pg';

const { Pool } = pg;

// Konfigurasi pool PostgreSQL (untuk produksi kedinasan)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const dbAdapter = {
  // Simpan data perkara
  async savePerkara(data: PerkaraData) {
    const isGoogleTestMode = process.env.STORAGE_MODE === 'google';

    if (isGoogleTestMode) {
      // Masuk ke Google Sheets (Pengujian)
      return await appendPerkaraToSheet(data);
    } else {
      // Masuk ke PostgreSQL (Produksi / Database Profesional)
      const query = `
        INSERT INTO perkara (
          no_lp, no_sbp, no_sprin, tanggal_sbp, asal_perkara, 
          jenis_penindakan, jenis_perkara, status_penangkapan, 
          lokasi_penindakan, komoditi, nama_pelaku
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;
      const values = [
        data.NoLP, data.Nomor_SBP, data.No_SPRIN_Indak, data.Tanggal_SBP,
        data.Asal_Perkara, data.Jenis_Penindakan, data.Jenis_Perkara,
        data.Status_Penangkapan, data.Lokasi_Penindakan, data.Komoditi, data.Nama_Pelaku
      ];
      const res = await pool.query(query, values);
      return res.rows[0];
    }
  },

  // Ambil daftar perkara
  async listPerkara() {
    const isGoogleTestMode = process.env.STORAGE_MODE === 'google';

    if (isGoogleTestMode) {
      return await getPerkaraFromSheet();
    } else {
      const res = await pool.query('SELECT * FROM perkara ORDER BY created_at DESC');
      return res.rows;
    }
  }
};