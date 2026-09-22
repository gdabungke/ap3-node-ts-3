import { StoreState, PerkaraRecord } from '../types/index.js';

export const store: StoreState = {
  currentUser: null,
  userAccounts: [],
  currentDoc: 'LPP',
  currentTLDoc: 'BAST_PEMILIK',
  selectedPaperSize: 'F4',
  databasePerkara: [],
  activeRecordIndex: -1,
  visiblePasswordIndex: -1,
  selectedViewPage: 'ALL',
  currentActivePageIdx: 0
};

export function getStore(): StoreState {
  return store;
}

export function savePerkaraToStorage(): void {
  // Simpan ke localStorage untuk akses instan di peramban
  localStorage.setItem('databasePerkara', JSON.stringify(store.databasePerkara));

  // Sinkronisasikan secara persisten ke backend Node.js (SQLite)
  try {
    fetch('/api/perkara/bulk', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: store.databasePerkara })
    }).catch(() => {});
  } catch (err) {}
}

export function loadPerkaraFromStorage(): PerkaraRecord[] {
  // Muat dari localStorage terlebih dahulu
  let saved = localStorage.getItem('databasePerkara');
  if (saved) {
    try {
      store.databasePerkara = JSON.parse(saved);
    } catch(e) {
      store.databasePerkara = [];
    }
  } else {
    store.databasePerkara = [];
  }

  // Tarik data terbaru dari backend server (SQLite)
  try {
    fetch('/api/perkara')
      .then(res => res.json())
      .then(json => {
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          store.databasePerkara = json.data;
          localStorage.setItem('databasePerkara', JSON.stringify(store.databasePerkara));
          if (typeof (window as any).renderPerkaraTable === 'function') {
            (window as any).renderPerkaraTable();
          }
          if (typeof (window as any).updateDashboardStats === 'function') {
            (window as any).updateDashboardStats();
          }
        }
      })
      .catch(() => {});
  } catch (err) {}

  return store.databasePerkara;
}
