const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/activities?type=record|plan
router.get('/', (req, res) => {
    const { type } = req.query;
    let activities;
    if (type) {
        activities = db.prepare('SELECT * FROM activities WHERE type = ? ORDER BY date ASC, created_at DESC').all(type);
    } else {
        activities = db.prepare('SELECT * FROM activities ORDER BY date ASC, created_at DESC').all();
    }
    res.json(activities);
});

// POST /api/activities (admin)
router.post('/', authMiddleware, (req, res) => {
    const { type, title, date, description, speaker, image_url } = req.body;
    if (!type || !['record', 'plan'].includes(type)) {
        return res.status(400).json({ error: 'type 必須為 record 或 plan' });
    }
    const result = db.prepare(
        'INSERT INTO activities (type, title, date, description, speaker, image_url) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(type, title, date || null, description || null, speaker || null, image_url || null);
    const activity = db.prepare('SELECT * FROM activities WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(activity);
});

// PUT /api/activities/:id (admin)
router.put('/:id', authMiddleware, (req, res) => {
    const { type, title, date, description, speaker, image_url } = req.body;
    db.prepare(
        'UPDATE activities SET type=COALESCE(?,type), title=COALESCE(?,title), date=COALESCE(?,date), description=COALESCE(?,description), speaker=COALESCE(?,speaker), image_url=COALESCE(?,image_url) WHERE id=?'
    ).run(type, title, date, description, speaker, image_url, req.params.id);
    const activity = db.prepare('SELECT * FROM activities WHERE id = ?').get(req.params.id);
    if (!activity) return res.status(404).json({ error: '找不到此活動' });
    res.json(activity);
});

// DELETE /api/activities/:id (admin)
router.delete('/:id', authMiddleware, (req, res) => {
    const result = db.prepare('DELETE FROM activities WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: '找不到此活動' });
    res.json({ message: '已刪除' });
});

module.exports = router;
