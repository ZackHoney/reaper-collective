import '../App.css'

const userPhotos = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    caption: "Epic Base Build",
    postedBy: "User123"
  },
  {
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    caption: "Victory Screenshot",
    postedBy: "GamerGal"
  }
  // Add more photos as needed
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-h1">Gallery</h1>
      <div className="gallery-list">
        {userPhotos.map((photo, idx) => (
          <div className="gallery-card" key={idx}>
            <img src={photo.url} alt={photo.caption} className="gallery-img" />
            <p className="gallery-caption">{photo.caption}</p>
            <p className="gallery-user">Posted by: {photo.postedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;