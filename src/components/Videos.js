import '../App.css'

const userVideos = [
  {
    title: "Epic PvP Battle",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    postedBy: "User123"
  },
  {
    title: "Base Building Tips",
    url: "https://www.youtube.com/embed/9bZkp7q19f0",
    postedBy: "BuilderBob"
  }
  // Add more videos as needed
];

const Videos = () => {
  return (
    <div className="videos-container">
      <h1 className='videos-h1'>Videos</h1>
      <div className="videos-list">
        {userVideos.map((video, idx) => (
          <div className="video-card" key={idx}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;