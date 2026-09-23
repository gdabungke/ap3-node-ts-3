import { Router } from 'express';
import { db } from '../db/database.js';
const router = Router();
router.post('/login', (req, res) => {
    try {
        const email = (req.body.email || req.body.username || '').toString().trim();
        const pass = (req.body.pass || req.body.password || '').toString().trim();
        if (!email || !pass) {
            return res.status(400).json({ success: false, error: 'Email/Username dan Password harus diisi.' });
        }
        const user = db.getUserByEmail(email);
        if (!user || user.pass !== pass) {
            return res.status(401).json({ success: false, error: 'Kombinasi email/username dan password tidak valid.' });
        }
        const session = {
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role
        };
        return res.json({ success: true, message: 'Login berhasil.', user: session });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.post('/register', (req, res) => {
    try {
        const nama = (req.body.nama || '').toString().trim();
        const email = (req.body.email || req.body.username || '').toString().trim();
        const pass = (req.body.pass || req.body.password || '').toString().trim();
        const role = (req.body.role || 'Staff Indak').toString().trim();
        if (!nama || !email || !pass) {
            return res.status(400).json({ success: false, error: 'Nama lengkap, email, dan password wajib diisi.' });
        }
        const existing = db.getUserByEmail(email);
        if (existing) {
            return res.status(409).json({ success: false, error: 'Email atau username ini sudah terdaftar.' });
        }
        const newUser = db.createUser({
            nama,
            email,
            pass,
            role
        });
        const session = {
            id: newUser.id,
            nama: newUser.nama,
            email: newUser.email,
            role: newUser.role
        };
        return res.status(201).json({ success: true, message: 'Registrasi berhasil.', user: session });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
router.get('/users', (_req, res) => {
    try {
        const users = db.getUsers().map((u) => ({
            id: u.id,
            nama: u.nama,
            email: u.email,
            pass: u.pass,
            role: u.role,
            createdAt: u.createdAt
        }));
        return res.json({ success: true, data: users });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ success: false, error: message });
    }
});
export default router;
//# sourceMappingURL=auth.js.map