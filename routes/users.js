const express = require('express');
const router = express.Router();
const db = require('../db');

// Validatie functie
function validategebruiker(req, res, next) {
    const { naam, email, leeftijd, charactername } = req.body;

    // Requirement: Velden mogen niet leeg zijn
    if (!naam || !email) {
        return res.status(400).json({ error: 'Naam en email zijn verplicht' });
    }

    if (/\d/.test(naam)) {
        return res.status(400).json({ error: 'Naam mag geen cijfers bevatten' });
    }

    if (leeftijd && isNaN(leeftijd)) {
        return res.status(400).json({ error: 'Leeftijd moet een getal zijn' });
    }

    if (/\d/.test(charactername)) {
        return res.status(400).json({ error: 'Naam mag geen cijfers bevatten' });
    }

    next();
}

// 1. LIJST OPHALEN + ZOEKEN + PAGINATIE
router.get('/', (req, res) => {
    const { limit = 10, offset = 0, search } = req.query;
    let sql = "SELECT * FROM gebruikers";
    let params = [];

    // Zoekfunctionaliteit
    if (search) {
        sql += " WHERE naam LIKE ?";
        params.push(`%${search}%`);
    }

    // Paginatie
    sql += " LIMIT ? OFFSET ?";
    // Zorg dat limit en offset integers zijn voor de query
    params.push(parseInt(limit), parseInt(offset));

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. DETAILS OPHALEN
router.get('/:id', (req, res) => {
    db.get("SELECT * FROM gebruikers WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Niet gevonden' });
        res.json(row);
    });
});

// 3. TOEVOEGEN (CREATE)
router.post('/', validategebruiker, (req, res) => {
    const { naam, email, leeftijd, charactername } = req.body;
    const sql = "INSERT INTO gebruikers (naam, email, leeftijd, charactername) VALUES (?, ?, ?,?)";

    db.run(sql, [naam, email, leeftijd, charactername], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, naam, email, leeftijd, charactername });
    });
});

// 4. UPDATEN (UPDATE)
router.put('/:id', validategebruiker, (req, res) => {
    const { naam, email, leeftijd, charactername } = req.body;
    const sql = "UPDATE gebruikers SET naam = ?, email = ?, leeftijd = ?, charactername = ?  WHERE id = ?";

    db.run(sql, [naam, email, leeftijd, charactername, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'Gebruiker geüpdatet' });
    });
});

// 5. VERWIJDEREN (DELETE)
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM gebruikers WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Niet gevonden' });
        res.json({ message: 'Gebruiker verwijderd' });
    });
});

module.exports = router;