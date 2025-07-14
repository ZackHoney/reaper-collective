import React, { useEffect, useState } from 'react';

const UserStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      setError('Please Sign in to view stats');
      return;
    }
    fetch(`http://localhost:5000/api/userstats/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.username) {
          setStats(data);
        } else {
          setError('User not found');
        }
      })
      .catch(() => setError('Error fetching stats'));
  }, []);

  if (error === 'Please Sign in to view stats') {
    return (
      <div className='stats'>
        <button
          className='button'
          onClick={() => window.location.href = '/login'}
        >
          {error}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>{error}</h1>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='user-stats'>
      <h1 className='stats-h1'>{stats.username}'s Stats</h1>
      <ul className='stats-list'>
        <li>Games Played: {stats.gamesPlayed}</li>
        <li>Wins: {stats.wins}</li>
        <li>Losses: {stats.losses}</li>
        <li>Rank: {stats.rank}</li>
      </ul>
      <a href="/stats" className="stats-button">Back to Stats</a>
    </div>
  );
};

export default UserStats;