export const store = {
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
export function getStore() {
    return store;
}
export function savePerkaraToStorage() {
    // Simpan ke localStorage untuk akses instan di peramban
    localStorage.setItem('databasePerkara', JSON.stringify(store.databasePerkara));
    // Sinkronisasikan secara persisten ke backend Node.js (SQLite)
    try {
        fetch('/api/perkara/bulk', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ list: store.databasePerkara })
        }).catch(() => { });
    }
    catch (err) { }
}
export function loadPerkaraFromStorage() {
    // Muat dari localStorage terlebih dahulu
    let saved = localStorage.getItem('databasePerkara');
    if (saved) {
        try {
            store.databasePerkara = JSON.parse(saved);
        }
        catch (e) {
            store.databasePerkara = [];
        }
    }
    else {
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
                if (typeof window.renderPerkaraTable === 'function') {
                    window.renderPerkaraTable();
                }
                if (typeof window.updateDashboardStats === 'function') {
                    window.updateDashboardStats();
                }
            }
        })
            .catch(() => { });
    }
    catch (err) { }
    return store.databasePerkara;
}
//# sourceMappingURL=store.js.map