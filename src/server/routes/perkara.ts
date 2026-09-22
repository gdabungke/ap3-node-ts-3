import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { PerkaraRecord } from '../types/index.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    const list: PerkaraRecord[] = db.getAllPerkara();
    return res.json({ success: true, data: list });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const item: PerkaraRecord | undefined = db.getPerkaraById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Data perkara tidak ditemukan.' });
    }
    return res.json({ success: true, data: item });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    let rawRecord: unknown = req.body.record ?? req.body;
    if (typeof rawRecord === 'string') {
      try {
        rawRecord = JSON.parse(rawRecord);
      } catch {}
    }

    if (!rawRecord || typeof rawRecord !== 'object') {
      return res.status(400).json({ success: false, error: 'Data perkara (record) harus disertakan.' });
    }

    const record: PerkaraRecord = rawRecord as PerkaraRecord;
    const indexParam: unknown = req.body.index;
    const index: number | undefined = typeof indexParam === 'number'
      ? indexParam
      : (typeof indexParam === 'string' && indexParam.trim() !== '' ? parseInt(indexParam, 10) : undefined);

    const updatedList: PerkaraRecord[] = db.savePerkara(record, index);
    return res.json({ success: true, message: 'Data perkara berhasil disimpan.', data: updatedList });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.put('/bulk', (req: Request, res: Response) => {
  try {
    let list: unknown = req.body.list ?? req.body;
    if (typeof list === 'string') {
      try {
        list = JSON.parse(list);
      } catch {}
    }

    if (!Array.isArray(list)) {
      return res.status(400).json({ success: false, error: 'Daftar perkara (list array) harus disertakan.' });
    }

    db.replacePerkaraList(list as PerkaraRecord[]);
    return res.json({ success: true, message: 'Seluruh data perkara berhasil diperbarui.', data: list });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.delete('/reset', (_req: Request, res: Response) => {
  try {
    db.resetPerkara();
    return res.json({ success: true, message: 'Seluruh database perkara berhasil direset.' });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.delete('/:indexOrId', (req: Request, res: Response) => {
  try {
    const updatedList: PerkaraRecord[] = db.deletePerkara(req.params.indexOrId);
    return res.json({ success: true, message: 'Perkara berhasil dihapus.', data: updatedList });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

export default router;
