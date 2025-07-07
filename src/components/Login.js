import '../App.css'
import React, { useState } from 'react';



const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Name:', name);
    console.log('Submitted Password:', password);
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
      </form>

    </div>
  )
}

export default Login