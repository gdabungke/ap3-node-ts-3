import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS || './google-service-account.json');
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || '';

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface PerkaraData {
  NoLP: string;
  Nomor_SBP: string;
  No_SPRIN_Indak: string;
  Tanggal_SBP: string;
  Nama_Pelaku: string;
  Komoditi: string;
  Status_Penangkapan: string;
  Asal_Perkara: string;
  Jenis_Perkara: string;
  Jenis_Penindakan: string;
  Lokasi_Penindakan: string;
}

/**
 * Menyimpan 1 baris data perkara ke Google Sheets
 */
export async function appendPerkaraToSheet(data: PerkaraData) {
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SPREADSHEET_ID belum dikonfigurasi di file .env');
  }

  const rowValues = [
    new Date().toISOString(), // Timestamp pengujian
    data.NoLP || '-',
    data.Nomor_SBP || '-',
    data.No_SPRIN_Indak || '-',
    data.Tanggal_SBP || '-',
    data.Asal_Perkara || '-',
    data.Jenis_Penindakan || '-',
    data.Jenis_Perkara || '-',
    data.Status_Penangkapan || '-',
    data.Lokasi_Penindakan || '-',
    data.Komoditi || '-',
    data.Nama_Pelaku || '-'
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:L',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues],
    },
  });

  return response.data;
}

/**
 * Mengambil seluruh data perkara dari Google Sheets
 */
export async function getPerkaraFromSheet() {
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SPREADSHEET_ID belum dikonfigurasi di file .env');
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A2:L',
  });

  const rows = response.data.values || [];
  return rows.map((row) => ({
    timestamp: row[0] || '',
    NoLP: row[1] || '',
    Nomor_SBP: row[2] || '',
    No_SPRIN_Indak: row[3] || '',
    Tanggal_SBP: row[4] || '',
    Asal_Perkara: row[5] || '',
    Jenis_Penindakan: row[6] || '',
    Jenis_Perkara: row[7] || '',
    Status_Penangkapan: row[8] || '',
    Lokasi_Penindakan: row[9] || '',
    Komoditi: row[10] || '',
    Nama_Pelaku: row[11] || '',
  }));
}