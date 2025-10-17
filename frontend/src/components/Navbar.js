import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    // This is the new outer container for the full-width background
    <div className="navbar-container">
      {/* This inner container holds the centered content */}
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
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;