// backend/galleryRoutes.js
const express = require('express');
const db = require('../tables/galleryTable');
const router = express.Router();

router.get('/gallery', (req, res) => {
  db.all('SELECT * FROM gallery', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

router.post('/gallery', (req, res) => {
  const { url, caption, postedBy } = req.body;
  if (!url || !caption || !postedBy) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  db.run(
    'INSERT INTO gallery (url, caption, postedBy) VALUES (?, ?, ?)',
    [url, caption, postedBy],
    function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ id: this.lastID, url, caption, postedBy });
    }
  );
});

// DELETE /api/gallery/:id
router.delete('/gallery/:id', (req, res) => {
  db.run('DELETE FROM gallery WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ success: true });
  });
});

module.exports = router;