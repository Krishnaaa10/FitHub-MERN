import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../utils/auth';
import './AuthPages.css';
import '../ProfilePage.css';

const ProfilePage = () => {
  const authUser = useSelector((state) => state.auth.user);
  const storedUser = getUser();
  const user = authUser || storedUser;

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card profile-card-error">
          <h2 className="profile-title">Your Profile</h2>
          <p className="profile-subtitle">
            Unable to load profile information. Please log in again.
          </p>
        </div>
      </div>
    );
  }

  const initial =
    user.name?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    'U';

  const signInLabel =
    user.authProvider === 'google' ? 'Google' : 'Email & Password';

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-avatar">{initial}</div>
          <div>
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-subtitle">View your account details</p>
          </div>
        </div>

        <div className="profile-grid">
          <section className="profile-section">
            <h2 className="profile-section-title">Basic information</h2>
            <div className="profile-field">
              <span className="profile-field-label">Name</span>
              <span className="profile-field-value">{user.name}</span>
            </div>
            {user.email && (
              <div className="profile-field">
                <span className="profile-field-label">Email</span>
                <span className="profile-field-value profile-field-email">
                  {user.email}
                </span>
              </div>
            )}
            {user.authProvider && (
              <div className="profile-field">
                <span className="profile-field-label">Sign-in method</span>
                <span className="profile-field-value">{signInLabel}</span>
              </div>
            )}
          </section>

          <section className="profile-section profile-section-secondary">
            <h2 className="profile-section-title">Account overview</h2>
            <div className="profile-tag-row">
              <span className="profile-tag profile-tag-status">Active</span>
              <span className="profile-tag profile-tag-plan">Free plan</span>
            </div>
            <p className="profile-helper-text">
              Profile editing and additional settings will be available in a
              future update.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


