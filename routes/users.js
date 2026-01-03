const express = require('express');
const router = express.Router();
const db = require('../db');

// Validatie functie
function validategebruiker(req, res, next) {
    const { naam, email } = req.body;
    if (!naam || !email) return res.status(400).json({ error: 'Naam en email zijn verplicht' });
    if (/\d/.test(naam)) return res.status(400).json({ error: 'Naam mag geen cijfers bevatten' });
    next();
}


router.get('/', (req, res) => {
    const { limit = 10, offset = 0, search } = req.query;
    let sql = "SELECT * FROM gebruikers";
    let params = [];

    if (search) {
        sql += " WHERE naam LIKE ?";
        params.push(`%${search}%`);
    }

    sql += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


router.get('/:id', (req, res) => {
    db.get("SELECT * FROM gebruikers WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Niet gevonden' });
        res.json(row);
    });
});


router.post('/', validategebruiker, (req, res) => {
    const { naam, email } = req.body;
    db.run("INSERT INTO gebruikers (naam, email) VALUES (?, ?)", [naam, email], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, naam, email });
    });
});


router.put('/:id', validategebruiker, (req, res) => {
    const { naam, email } = req.body;
    db.run("UPDATE gebruikers SET naam = ?, email = ? WHERE id = ?", [naam, email, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'gebruiker geüpdatet' });
    });
});


router.delete('/:id', (req, res) => {
    db.run("DELETE FROM gebruikers WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'gebruiker verwijderd' });
    });
});

module.exports = router;