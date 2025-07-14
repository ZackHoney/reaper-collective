import '../App.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          password: password
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('username', name); // Save username
        navigate(`/`);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  }

  return (
    <div className='login-container'>
      <form className='login' onSubmit={handleSubmit}>
        <label>
          <p className='label'>Username</p>
          <input
            className='input-field'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          <p className='label'>Password</p>
          <input
            className='input-field'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className='login-button'>Log In</button>
        <a href="/signup" className='signup-btn'>Sign Up</a>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login