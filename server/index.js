const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database (creates tables)
require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sections', require('./routes/sections'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/members', require('./routes/members'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/search', require('./routes/search'));

// Upload route
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`);
    }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
const { authMiddleware } = require('./middleware/auth');

app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: '未選擇檔案' });
    res.json({ url: `/uploads/${req.file.filename}` });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`ITRC Server running on http://localhost:${PORT}`);
});
