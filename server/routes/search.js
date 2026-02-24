const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/search?q=keyword
router.get('/', (req, res) => {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
        return res.json({ results: [] });
    }

    const keyword = `%${q.trim()}%`;

    const sections = db.prepare(
        "SELECT 'section' as type, key as id, title, content as snippet FROM sections WHERE title LIKE ? OR content LIKE ?"
    ).all(keyword, keyword);

    const achievements = db.prepare(
        "SELECT 'achievement' as type, id, title, description as snippet FROM achievements WHERE title LIKE ? OR description LIKE ? OR category LIKE ?"
    ).all(keyword, keyword, keyword);

    const activities = db.prepare(
        "SELECT 'activity' as type, id, title, description as snippet FROM activities WHERE title LIKE ? OR description LIKE ?"
    ).all(keyword, keyword);

    const experiences = db.prepare(
        "SELECT 'experience' as type, id, title, content as snippet FROM experiences WHERE title LIKE ? OR content LIKE ? OR author LIKE ?"
    ).all(keyword, keyword, keyword);

    const members = db.prepare(
        "SELECT 'member' as type, id, name as title, role as snippet FROM members WHERE name LIKE ? OR role LIKE ? OR department LIKE ?"
    ).all(keyword, keyword, keyword);

    res.json({
        results: [...sections, ...achievements, ...activities, ...experiences, ...members]
    });
});

module.exports = router;
