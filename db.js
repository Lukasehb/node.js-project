
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS gebruikers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            naam TEXT,
            email TEXT,
            leeftijd INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS newsposts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titel TEXT,
            inhoud TEXT,
            category TEXT,
            auteur_id INTEGER
        )`);
    }
});

module.exports = db;