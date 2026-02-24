const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/sections — get all sections
router.get('/', (req, res) => {
    const sections = db.prepare('SELECT * FROM sections ORDER BY id').all();
    res.json(sections);
});

// GET /api/sections/:key — get one section by key
router.get('/:key', (req, res) => {
    const section = db.prepare('SELECT * FROM sections WHERE key = ?').get(req.params.key);
    if (!section) return res.status(404).json({ error: '找不到此區塊' });
    res.json(section);
});

// PUT /api/sections/:key — update section (admin)
router.put('/:key', authMiddleware, (req, res) => {
    const { title, content } = req.body;
    const existing = db.prepare('SELECT * FROM sections WHERE key = ?').get(req.params.key);

    if (!existing) {
        // Create new section
        db.prepare('INSERT INTO sections (key, title, content) VALUES (?, ?, ?)').run(
            req.params.key, title || '', content || ''
        );
    } else {
        db.prepare('UPDATE sections SET title = COALESCE(?, title), content = COALESCE(?, content), updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(
            title, content, req.params.key
        );
    }

    const section = db.prepare('SELECT * FROM sections WHERE key = ?').get(req.params.key);
    res.json(section);
});

module.exports = router;
