import { Router } from 'express';
import { db } from '../db/database.js';
const router = Router();
router.get('/', (_req, res) => {
  try {
    const list = db.getDisposisi();
    return res.json({
      success: true,
      data: list
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({
      success: false,
      error: message
    });
  }
});
router.post('/', (req, res) => {
  try {
    let rawDisp = req.body.disposisi ?? req.body;
    if (typeof rawDisp === 'string') {
      try {
        rawDisp = JSON.parse(rawDisp);
      } catch {}
    }
    if (!rawDisp || typeof rawDisp !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Data disposisi harus disertakan.'
      });
    }
    const disp = rawDisp;
    const saved = db.saveDisposisi(disp);
    return res.status(201).json({
      success: true,
      message: 'Disposisi berhasil disimpan.',
      data: saved
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({
      success: false,
      error: message
    });
  }
});
export default router;