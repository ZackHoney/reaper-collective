import '../App.css'
import { useParams, Link } from 'react-router-dom'
import UserStats from './UsersStats' // <-- Import the UserStats component

// Example user stats data (replace with real data or API call)
const userStatsData = {
  User123: {
    username: "User123",
    gamesPlayed: 120,
    wins: 45,
    losses: 75,
    rank: "Veteran",
  },
  GamerGal: {
    username: "GamerGal",
    gamesPlayed: 80,
    wins: 50,
    losses: 30,
    rank: "Champion",
  }
  // Add more users as needed
};

const Stats = () => {
  const { username } = useParams();

  // If no username is selected, show a list of users to pick from
  if (!username) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>Select a User</h1>
        <ul className='stats-list'>
          {Object.keys(userStatsData).map((user) => (
            <li key={user}>
              <Link className="button" to={`/stats/${user}`}>
                {userStatsData[user].username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Get stats for the selected user
  const stats = userStatsData[username];

  if (!stats) {
    return (
      <div className='stats'>
        <h1 className='stats-h1'>User not found</h1>
        <Link className="button" to="/stats">Back to user list</Link>
      </div>
    );
  }

  return (
    <div className='stats'>
      <UserStats stats={stats} />
      <Link className="button" to="/stats">Back to user list</Link>
    </div>
  );
}

export default Stats