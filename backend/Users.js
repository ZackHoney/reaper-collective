const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Connect to SQLite database (creates file if not exists)
const db = new sqlite3.Database('./users.db');

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Signup route
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'User already exists or error occurred' });
      }
      res.status(201).json({ message: 'User created', userId: this.lastID });
    }
  );
});

module.exports = router;