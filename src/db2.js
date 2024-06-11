const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'predictions.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS predictions (
        id TEXT PRIMARY KEY,
        result TEXT,
        explanation TEXT,
        timestamp TEXT
    )`);
});

module.exports = db;