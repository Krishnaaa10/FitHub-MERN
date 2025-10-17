import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../AuthForm.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const { email, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // --- THIS IS THE NEW LOGIC ---
    // Later, we will send this to the backend to verify.
    // For now, we assume the login is always successful.
    console.log('Login successful with:', formData);

    // Redirect the user to the homepage after successful login
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="wrapper">
        <form onSubmit={onFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="Email"
              required
            />
            <i className='bx bx-mail-send'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Password"
              required
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;