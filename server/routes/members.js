const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/members
router.get('/', (req, res) => {
    const members = db.prepare('SELECT * FROM members ORDER BY order_num ASC, id ASC').all();
    res.json(members);
});

// POST /api/members (admin)
router.post('/', authMiddleware, (req, res) => {
    const { name, role, department, year, avatar_url, order_num } = req.body;
    const result = db.prepare(
        'INSERT INTO members (name, role, department, year, avatar_url, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, role || null, department || null, year || null, avatar_url || null, order_num || 0);
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(member);
});

// PUT /api/members/:id (admin)
router.put('/:id', authMiddleware, (req, res) => {
    const { name, role, department, year, avatar_url, order_num } = req.body;
    db.prepare(
        'UPDATE members SET name=COALESCE(?,name), role=COALESCE(?,role), department=COALESCE(?,department), year=COALESCE(?,year), avatar_url=COALESCE(?,avatar_url), order_num=COALESCE(?,order_num) WHERE id=?'
    ).run(name, role, department, year, avatar_url, order_num, req.params.id);
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
    if (!member) return res.status(404).json({ error: '找不到此成員' });
    res.json(member);
});

// DELETE /api/members/:id (admin)
router.delete('/:id', authMiddleware, (req, res) => {
    const result = db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: '找不到此成員' });
    res.json({ message: '已刪除' });
});

module.exports = router;
