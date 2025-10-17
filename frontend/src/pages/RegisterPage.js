import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../AuthForm.css'; // Import the new CSS

const RegisterPage = () => {
  // Use React state to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Destructure for easier access
  const { name, email, password } = formData;

  // A single function to handle all input changes
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onFormSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    // For now, we'll just log the data.
    // Later, we will send this data to our backend API.
    console.log('Registering user with:', formData);
    alert('Registration form submitted! Check the console.');
  };

  return (
    <div className="auth-container">
      <div className="wrapper">
        <form onSubmit={onFormSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onInputChange}
              placeholder="Username"
              required
            />
            <i className='bx bxs-user'></i>
          </div>
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
              minLength="6"
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;