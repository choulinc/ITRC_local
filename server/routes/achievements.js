const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/achievements
router.get('/', (req, res) => {
    const achievements = db.prepare('SELECT * FROM achievements ORDER BY semester DESC, order_num ASC').all();
    // Group by semester
    const grouped = {};
    achievements.forEach(a => {
        if (!grouped[a.semester]) grouped[a.semester] = [];
        grouped[a.semester].push(a);
    });
    res.json({ all: achievements, grouped });
});

// POST /api/achievements (admin)
router.post('/', authMiddleware, (req, res) => {
    const { semester, title, category, description, link, order_num } = req.body;
    const result = db.prepare(
        'INSERT INTO achievements (semester, title, category, description, link, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(semester, title, category || null, description || null, link || null, order_num || 0);
    const achievement = db.prepare('SELECT * FROM achievements WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(achievement);
});

// PUT /api/achievements/:id (admin)
router.put('/:id', authMiddleware, (req, res) => {
    const { semester, title, category, description, link, order_num } = req.body;
    db.prepare(
        'UPDATE achievements SET semester=COALESCE(?,semester), title=COALESCE(?,title), category=COALESCE(?,category), description=COALESCE(?,description), link=COALESCE(?,link), order_num=COALESCE(?,order_num) WHERE id=?'
    ).run(semester, title, category, description, link, order_num, req.params.id);
    const achievement = db.prepare('SELECT * FROM achievements WHERE id = ?').get(req.params.id);
    if (!achievement) return res.status(404).json({ error: '找不到此成果' });
    res.json(achievement);
});

// DELETE /api/achievements/:id (admin)
router.delete('/:id', authMiddleware, (req, res) => {
    const result = db.prepare('DELETE FROM achievements WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: '找不到此成果' });
    res.json({ message: '已刪除' });
});

module.exports = router;
