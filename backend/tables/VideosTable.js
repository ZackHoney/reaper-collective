const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./videos.db');

// Create the videos table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    postedBy TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;