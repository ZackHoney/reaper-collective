// backend/routes/serverRoutes.js
const express = require('express');
const db = require('../tables/serverTable');
const router = express.Router();

router.get('/servers', (req, res) => {
  db.all('SELECT * FROM servers', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

router.post('/servers', (req, res) => {
  const { name, invite, description, icon } = req.body;
  if (!name || !invite || !description || !icon) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  db.run(
    'INSERT INTO servers (name, invite, description, icon) VALUES (?, ?, ?, ?)',
    [name, invite, description, icon],
    function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ id: this.lastID, name, invite, description, icon });
    }
  );
});

// DELETE /servers/:id (only creator can delete)
router.delete('/servers/:id', (req, res) => {
  const serverId = req.params.id;
  const { username } = req.body; // username of the user attempting to delete

  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  // Check if the server exists and was created by this user
  db.get('SELECT postedBy FROM servers WHERE id = ?', [serverId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'Server not found' });
    if (row.postedBy !== username) {
      return res.status(403).json({ message: 'Not authorized to delete this server' });
    }

    // Delete the server
    db.run('DELETE FROM servers WHERE id = ?', [serverId], function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ success: true });
    });
  });
});

module.exports = router;