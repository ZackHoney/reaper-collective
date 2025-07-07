import React from 'react';

const UserStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>User not found</h1>
      </div>
    );
  }

  return (
    <div className='stats'>
      <h1 className='stats-h1'>{stats.username}'s Stats</h1>
      <ul className='stats-list'>
        <li>Games Played: {stats.gamesPlayed}</li>
        <li>Wins: {stats.wins}</li>
        <li>Losses: {stats.losses}</li>
        <li>Rank: {stats.rank}</li>
      </ul>
      <a href="/stats" className="button">Back to Stats</a>
    </div>
  );
};

export default UserStats;