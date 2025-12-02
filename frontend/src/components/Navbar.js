import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../features/auth/authSlice';
import { logout as clearLocalAuth, getUser } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Prefer Redux user, fall back to localStorage helper for compatibility
  const authUser = useSelector((state) => state.auth.user);
  const storedUser = getUser();
  const user = authUser || storedUser;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    clearLocalAuth();
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleProfileNavigate = () => {
    setIsProfileOpen(false);
    navigate('/profile');
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

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
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </div>

          {/* Profile menu */}
          {user && (
            <div className="profile-wrapper" ref={profileRef}>
              <button
                type="button"
                className="profile-trigger"
                onClick={handleProfileClick}
              >
                <span className="profile-initial">{userInitial}</span>
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-name">{user.name}</div>
                    {user.email && (
                      <div className="profile-email">{user.email}</div>
                    )}
                  </div>
                  <div className="profile-divider" />
                  <button
                    type="button"
                    className="profile-item"
                    onClick={handleProfileNavigate}
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    className="profile-item profile-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;