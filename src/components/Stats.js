import '../App.css'
import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import UserStats from './UsersStats'

const Stats = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all users from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>Loading...</h1>
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

  // If no username is selected, show a list of users to pick from
  if (!username) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>Select a User</h1>
        <ul className='stats-list'>
          {users.map((user) => (
            <li key={user.username}>
              <Link className="button" to={`/stats/${user.username}`}>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Show the selected user's stats using UserStats component
  return (
    <div className='stats'>
      <UserStats username={username} />
    </div>
  );
}

export default Stats