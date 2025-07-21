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
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// Signup route (default role is 'user')
router.post('/signup', (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  // Only allow valid roles
  const allowedRoles = ['user', 'admin'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  db.run(
    `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role],
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
      // Return user data to frontend; frontend will set localStorage
      res.status(200).json({ message: 'Login successful', user: { id: row.id, username: row.username, email: row.email, role: row.role } });
    }
  );
});

// Admin route to change user role (admin only)
router.post('/setrole', (req, res) => {
  const { adminUsername, targetUsername, newRole } = req.body;
  if (!adminUsername || !targetUsername || !newRole) {
    return res.status(400).json({ message: 'All fields required' });
  }
  // Check if the requester is an admin
  db.get(`SELECT role FROM users WHERE username = ?`, [adminUsername], (err, adminRow) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!adminRow || adminRow.role !== 'admin') {
      return res.status(403).json({ message: 'Only administrators can assign roles.' });
    }
    // Update the target user's role
    db.run(
      `UPDATE users SET role = ? WHERE username = ?`,
      [newRole, targetUsername],
      function (err) {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (this.changes === 0) return res.status(404).json({ message: 'Target user not found' });
        res.json({ message: `Role updated to ${newRole} for ${targetUsername}` });
      }
    );
  });
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

// Returns all users (usernames and roles)
router.get('/users', (req, res) => {
  db.all(`SELECT username, role FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

module.exports = router;