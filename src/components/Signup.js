import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // default role
  });
  const [roleError, setRoleError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
    setRoleError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRoleError('');
    // Only allow selecting admin if no admin exists
    if (form.role === 'admin') {
      const res = await fetch('http://localhost:5000/api/users');
      const users = await res.json();
      const adminExists = users.some(u => u.role === 'admin');
      if (adminExists) {
        setRoleError('An admin already exists. Please select another role.');
        return;
      }
    }
    // Moderators must be approved by admin, so signup as user first
    if (form.role === 'moderator') {
      setRoleError('Moderator role must be approved by an admin. Please sign up as user.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'user'
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
        <label>
          <p className='label'>Role</p>
          <select
            className="input-field"
            name="role"
            value={form.role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="moderator">Moderator (admin approval required)</option>
            <option value="admin">Admin (only one allowed)</option>
          </select>
        </label>
        {roleError && <p style={{ color: 'red' }}>{roleError}</p>}
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;