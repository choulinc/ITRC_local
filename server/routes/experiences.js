const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/experiences
router.get('/', (req, res) => {
    const experiences = db.prepare('SELECT * FROM experiences ORDER BY created_at DESC').all();
    res.json(experiences);
});

// POST /api/experiences (admin)
router.post('/', authMiddleware, (req, res) => {
    const { author, title, content } = req.body;
    if (!author || !title || !content) {
        return res.status(400).json({ error: '作者、標題、內容為必填' });
    }
    const result = db.prepare(
        'INSERT INTO experiences (author, title, content) VALUES (?, ?, ?)'
    ).run(author, title, content);
    const experience = db.prepare('SELECT * FROM experiences WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(experience);
});

// PUT /api/experiences/:id (admin)
router.put('/:id', authMiddleware, (req, res) => {
    const { author, title, content } = req.body;
    db.prepare(
        'UPDATE experiences SET author=COALESCE(?,author), title=COALESCE(?,title), content=COALESCE(?,content) WHERE id=?'
    ).run(author, title, content, req.params.id);
    const experience = db.prepare('SELECT * FROM experiences WHERE id = ?').get(req.params.id);
    if (!experience) return res.status(404).json({ error: '找不到此心得' });
    res.json(experience);
});

// DELETE /api/experiences/:id (admin)
router.delete('/:id', authMiddleware, (req, res) => {
    const result = db.prepare('DELETE FROM experiences WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: '找不到此心得' });
    res.json({ message: '已刪除' });
});

module.exports = router;
