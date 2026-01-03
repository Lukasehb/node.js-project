const express = require('express');
const router = express.Router();
const db = require('../db');

// Validatie
function validatePost(req, res, next) {
    const { title, content } = req.body;
    if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Titel is verplicht' });
    if (!content) return res.status(400).json({ error: 'Content is verplicht' });
    next();
}

// 1. GET ALL
router.get('/', (req, res) => {
    db.all("SELECT * FROM newsposts", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. GET ONE
router.get('/:id', (req, res) => {
    db.get("SELECT * FROM newsposts WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Niet gevonden' });
        res.json(row);
    });
});

// 3. CREATE
router.post('/', validatePost, (req, res) => {
    const { title, content, category } = req.body;
    db.run("INSERT INTO newsposts (title, content, category) VALUES (?, ?, ?)", [title, content, category], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, content, category });
    });
});

// 4. UPDATE
router.put('/:id', validatePost, (req, res) => {
    const { title, content, category } = req.body;
    db.run("UPDATE newsposts SET title = ?, content = ?, category = ? WHERE id = ?", [title, content, category, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'Post geüpdatet' });
    });
});

// 5. DELETE
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM newsposts WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'Post verwijderd' });
    });
});

module.exports = router;