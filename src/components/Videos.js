import '../App.css'
import React, { useState, useEffect } from 'react'

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  // Helper to convert a YouTube URL to embed format
  const getEmbedUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl);
      if (urlObj.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
      if (urlObj.hostname.includes('youtube.com')) {
        const v = urlObj.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}`;
        // Already embed
        if (urlObj.pathname.startsWith('/embed/')) return inputUrl;
      }
      return inputUrl;
    } catch {
      return inputUrl;
    }
  };

  // Fetch videos from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(() => setError('Error fetching videos'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('You must be signed in to upload a video.');
      return;
    }
    if (!title || !url) {
      setError('Please provide both a title and a YouTube URL.');
      return;
    }
    const embedUrl = getEmbedUrl(url);

    // Send to backend
    try {
      const res = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url: embedUrl, postedBy: username })
      });
      const data = await res.json();
      if (res.ok) {
        setVideos([...videos, data]);
        setTitle('');
        setUrl('');
      } else {
        setError(data.message || 'Failed to upload video');
      }
    } catch {
      setError('Error uploading video');
    }
  };

  // Delete video by id (only from database)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setVideos(videos.filter((video) => video.id !== id));
      }
    } catch {
      setError('Error deleting video');
    }
  };

  return (
    <div className="videos-container">
      <h1 className='videos-h1'>Videos</h1>

      {username && (
        <form className="video-upload-form" onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
          <h2 className='videos-h1'>Upload a Video</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="YouTube URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button className="login-button" type="submit">Upload</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}

      {!username && (
        <p className='videos-h1'>
          Please sign in to upload a video.
        </p>
      )}

      <div className="videos-list">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <iframe
              className="video-frame"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>{video.title}</h3>
            <p>Posted by: {video.postedBy}</p>
            {username && video.postedBy === username && (
              <button
                className="login-button"
                style={{ marginTop: '1rem', background: '#a00', borderColor: '#a00' }}
                onClick={() => handleDelete(video.id)}
              >
                Delete Video
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;