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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here (e.g., API call)
    console.log(form)
    alert('Signup submitted!');
    setForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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