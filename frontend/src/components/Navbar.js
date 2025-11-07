import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="icon">
            <h2 className="logo">Fithub</h2>
          </div>
          <div className="menu">
            <ul>
              <li><Link to="/home">HOME</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-right">
          {user && (
            <div className="user-info" style={{ marginRight: '20px', color: 'white' }}>
              Welcome, {user.name}
            </div>
          )}
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </div>
          {user && (
            <button 
              onClick={handleLogout} 
              style={{ 
                marginLeft: '10px', 
                padding: '8px 16px', 
                background: '#ff4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;