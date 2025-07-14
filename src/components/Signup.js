import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Signup</h1>
        <label>
          <p className='label'>Username</p>
          <input
            className="input-field"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className='label'>Email</p>
          <input
            className="input-field"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className='label'>Password</p>
          <input
            className="input-field"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className='label'>Confirm Password</p>
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;