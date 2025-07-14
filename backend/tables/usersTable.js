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

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (!row) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      res.status(200).json({ message: 'Login successful', user: row });
    }
  );
});

// User statistics route
router.get('/userstats/:username', (req, res) => {
  const { username } = req.params;
  db.get(
    `SELECT username, gamesPlayed, wins, losses, rank FROM users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (!row) return res.status(404).json({ message: 'User not found' });
      res.json(row);
    }
  );
});

// Returns all users (usernames only)
router.get('/users', (req, res) => {
  db.all(`SELECT username FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});



module.exports = router;