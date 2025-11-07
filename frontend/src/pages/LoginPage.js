import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setAuthToken, setUser } from '../utils/auth';
import '../AuthForm.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/users/login', formData);
      
      // Save token and user data
      setAuthToken(res.data.token);
      setUser(res.data.user);
      
      // Redirect to home page
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'ECONNREFUSED' || err.message === 'Network Error') {
        setError('Cannot connect to server. Please make sure the backend server is running.');
      } else if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="wrapper">
        <form onSubmit={onFormSubmit}>
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}
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
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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
