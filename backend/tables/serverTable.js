const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./servers.db');

// Create the servers table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS servers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    invite TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    postedBy INTEGER NOT NULL
  )
`);

module.exports = db;