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
  const { name, invite, description, icon, postedBy } = req.body;
  if (!name || !invite || !description || !icon || !postedBy) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  db.run(
    'INSERT INTO servers (name, invite, description, icon, postedBy) VALUES (?, ?, ?, ?, ?)',
    [name, invite, description, icon, postedBy],
    function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ id: this.lastID, name, invite, description, icon, postedBy });
    }
  );
});

// DELETE /servers/:id (only creator can delete)
router.delete('/servers/:id', (req, res) => {
  const serverId = req.params.id;
  let { userId } = req.body; // userId of the user attempting to delete

  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }
  userId = parseInt(userId, 10); // Ensure userId is an integer

  db.get('SELECT postedBy FROM servers WHERE id = ?', [serverId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'Server not found' });
    if (row.postedBy !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this server' });
    }

    db.run('DELETE FROM servers WHERE id = ?', [serverId], function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ success: true });
    });
  });
});

module.exports = router;