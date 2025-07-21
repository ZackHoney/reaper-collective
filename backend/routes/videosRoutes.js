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
  const { username, role } = req.body;
  const videoId = req.params.id;

  db.get('SELECT postedBy FROM videos WHERE id = ?', [videoId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'Video not found' });

    // Allow delete if user is poster OR user is admin
    if (row.postedBy !== username && role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    db.run('DELETE FROM videos WHERE id = ?', [videoId], function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ success: true });
    });
  });
});

module.exports = router;