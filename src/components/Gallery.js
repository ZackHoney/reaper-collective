import '../App.css'
import React, { useState, useEffect } from 'react'

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  // Fetch gallery images from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(() => setError('Error fetching gallery images'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('You must be signed in to upload an image.');
      return;
    }
    if (!url || !caption) {
      setError('Please provide both an image URL and a caption.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, caption, postedBy: username })
      });
      const data = await res.json();
      if (res.ok) {
        setPhotos([...photos, data]);
        setUrl('');
        setCaption('');
      } else {
        setError(data.message || 'Failed to upload image');
      }
    } catch {
      setError('Error uploading image');
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-h1">Gallery</h1>

      {username && (
        <form className="gallery-upload-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <h2 className='gallery-h1'>Upload an Image</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Image URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button className="login-button" type="submit">Upload</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}

      {!username && (
        <p className='gallery-h1'>
          Please sign in to upload an image.
        </p>
      )}

      <div className="gallery-list">
        {photos.map((photo) => (
          <div className="gallery-card" key={photo.id}>
            <img src={photo.url} alt={''} className="gallery-img" />
            <p>{photo.caption}</p>
            <p className="gallery-user">Posted by: {photo.postedBy}</p>
            {username && photo.postedBy === username && (
              <button
                className="login-button"
                style={{ marginTop: '1rem', background: '#a00', borderColor: '#a00' }}
                onClick={async () => {
                  try {
                    const res = await fetch(`http://localhost:5000/api/gallery/${photo.id}`, {
                      method: 'DELETE'
                    });
                    if (res.ok) {
                      setPhotos(photos.filter(p => p.id !== photo.id));
                    }
                  } catch {
                    setError('Error deleting image');
                  }
                }}
              >
                Delete Image
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;