import { IoMenu } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    setLoggedIn(!!user);
    setUsername(user || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedIn(false);
    setUsername('');
    window.location.href = '/login';
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className='dropdown'>
      {!loggedIn ? (
        <a href="/login" className='button'>Login</a>
      ) : (
        <button className='button' onClick={handleLogout}>Logout</button>
      )}
      <button className="dropbtn"><IoMenu /></button>
      <nav className="dropdown-content">
        <a href="/" className='button'>Home</a>
        <a href="/servers" className='button'>Servers</a>
        <a href="/projects" className='button'>Projects</a>
        <a href="/videos" className='button'>Videos</a>
        <a href="/gallery" className='button'>Gallery</a>
        <a href="/monetization" className='button'>Monetization</a>
        <a href="/mods" className='button'>The Mods</a>
        <a href="/stats" className='button'>Stats</a>
      </nav>
    </div>
  )
}

export default NavBar;