import { Router } from 'express';
import { db } from '../db/database.js';
const router = Router();
router.get('/', (_req, res) => {
    try {
        const list = db.getAllPerkara();
        return res.json({ success: true, data: list });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.get('/:id', (req, res) => {
    try {
        const item = db.getPerkaraById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Data perkara tidak ditemukan.' });
        }
        return res.json({ success: true, data: item });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.post('/', (req, res) => {
    try {
        let rawRecord = req.body.record ?? req.body;
        if (typeof rawRecord === 'string') {
            try {
                rawRecord = JSON.parse(rawRecord);
            }
            catch { }
        }
        if (!rawRecord || typeof rawRecord !== 'object') {
            return res.status(400).json({ success: false, error: 'Data perkara (record) harus disertakan.' });
        }
        const record = rawRecord;
        const indexParam = req.body.index;
        const index = typeof indexParam === 'number'
            ? indexParam
            : (typeof indexParam === 'string' && indexParam.trim() !== '' ? parseInt(indexParam, 10) : undefined);
        const updatedList = db.savePerkara(record, index);
        return res.json({ success: true, message: 'Data perkara berhasil disimpan.', data: updatedList });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.put('/bulk', (req, res) => {
    try {
        let list = req.body.list ?? req.body;
        if (typeof list === 'string') {
            try {
                list = JSON.parse(list);
            }
            catch { }
        }
        if (!Array.isArray(list)) {
            return res.status(400).json({ success: false, error: 'Daftar perkara (list array) harus disertakan.' });
        }
        db.replacePerkaraList(list);
        return res.json({ success: true, message: 'Seluruh data perkara berhasil diperbarui.', data: list });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.delete('/reset', (_req, res) => {
    try {
        db.resetPerkara();
        return res.json({ success: true, message: 'Seluruh database perkara berhasil direset.' });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.delete('/:indexOrId', (req, res) => {
    try {
        const updatedList = db.deletePerkara(req.params.indexOrId);
        return res.json({ success: true, message: 'Perkara berhasil dihapus.', data: updatedList });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
export default router;
//# sourceMappingURL=perkara.js.map