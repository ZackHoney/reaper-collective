import '../App.css'
import React, { useState, useEffect } from 'react'

const Servers = () => {
  const [servers, setServers] = useState([]);
  const [name, setName] = useState('');
  const [invite, setInvite] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId'); // <-- moved here for use in render

  // Fetch servers from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/servers')
      .then(res => res.json())
      .then(data => setServers(data))
      .catch(() => setError('Error fetching servers'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('You must be signed in to add a server.');
      return;
    }
    if (!name || !invite || !description || !icon) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }
      const res = await fetch('http://localhost:5000/api/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, invite, description, icon, postedBy: userId })
      });
      const data = await res.json();
      if (res.ok) {
        setServers([...servers, data]);
        setName('');
        setInvite('');
        setDescription('');
        setIcon('');
      } else {
        setError(data.message || 'Failed to add server');
      }
    } catch {
      setError('Error adding server');
    }
  };



  return (
    <div className="servers-container">
      <h1 className='servers-h1'>Discord Servers</h1>

      {username && (
        <form className="server-upload-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <h2 className='servers-h1'>Add a Server</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Server Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Invite Link"
            value={invite}
            onChange={e => setInvite(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Icon URL"
            value={icon}
            onChange={e => setIcon(e.target.value)}
          />
          <button className="login-button" type="submit">Add Server</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}

      {!username && (
        <p className='servers-h1'>
          Please sign in to add a server.
        </p>
      )}

      <div className="servers-list">
        {servers.map((server, idx) => (
          <div className="server-card" key={server.id || idx}>
            <img src={server.icon} alt={server.name} className="server-icon" />
            <h2>{server.name}</h2>
            <p>{server.description}</p>
            <a href={server.invite} target="_blank" rel="noopener noreferrer" className="button">
              Join Server
            </a>
            {userId && server.postedBy && String(server.postedBy) === String(userId) && (
              <button
                className="login-button"
                style={{ marginTop: '1rem', background: '#a00', borderColor: '#a00' }}
                onClick={async () => {
                  try {
                    const res = await fetch(`http://localhost:5000/api/servers/${server.id}`, {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId })
                    });
                    if (res.ok) {
                      setServers(servers.filter(s => s.id !== server.id));
                    }
                  } catch {
                    setError('Error deleting server');
                  }
                }}
              >
                Delete Server
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servers;

