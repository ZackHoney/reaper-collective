const express = require('express');
const db = require('../tables/VideosTable'); // Import the db instance
const router = express.Router();

// Get all videos
router.get('/videos', (req, res) => {
  db.all('SELECT * FROM videos', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

// Add a new video
router.post('/videos', (req, res) => {
  const { title, url, postedBy } = req.body;
  if (!title || !url || !postedBy) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  db.run(
    'INSERT INTO videos (title, url, postedBy) VALUES (?, ?, ?)',
    [title, url, postedBy],
    function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ id: this.lastID, title, url, postedBy });
    }
  );
});

// Delete a video by id
router.delete('/videos/:id', (req, res) => {
  db.run('DELETE FROM videos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ success: true });
  });
});

module.exports = router;