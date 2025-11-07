import React from 'react';
import { Link } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-icon">📅</div>
        <h1 className="booking-title">Booking Available Soon</h1>
        <p className="booking-message">
          We're working hard to bring you an amazing class booking experience. 
          Stay tuned for updates!
        </p>
        <div className="booking-actions">
          <Link to="/" className="booking-button primary">
            Back to Home
          </Link>
          <Link to="/register" className="booking-button secondary">
            Join FitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

