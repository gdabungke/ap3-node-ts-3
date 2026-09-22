import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { DisposisiRecord } from '../types/index.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    const list: DisposisiRecord[] = db.getDisposisi();
    return res.json({ success: true, data: list });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    let rawDisp: unknown = req.body.disposisi ?? req.body;
    if (typeof rawDisp === 'string') {
      try {
        rawDisp = JSON.parse(rawDisp);
      } catch {}
    }

    if (!rawDisp || typeof rawDisp !== 'object') {
      return res.status(400).json({ success: false, error: 'Data disposisi harus disertakan.' });
    }

    const disp: DisposisiRecord = rawDisp as DisposisiRecord;
    const saved: DisposisiRecord = db.saveDisposisi(disp);
    return res.status(201).json({ success: true, message: 'Disposisi berhasil disimpan.', data: saved });
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: message });
  }
});

export default router;
