const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./gallery.db');

// Create the gallery table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caption TEXT NOT NULL,
    url TEXT NOT NULL,
    postedBy TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;