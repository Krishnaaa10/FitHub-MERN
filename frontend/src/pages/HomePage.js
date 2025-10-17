import React from 'react';
import { Link } from 'react-router-dom';
// --- THIS IS THE CRITICAL FIX (Step 1): Re-import the Navbar ---
import Navbar from '../components/Navbar';
import '../HomePage.css';

const HomePage = () => {
  return (
    <div className="home-main">
      {/* --- THIS IS THE CRITICAL FIX (Step 2): Add the Navbar back --- */}
      <Navbar />
      <div className="home-content">
        <p className="description">
          Welcome to Fithub - your ultimate fitness oasis. Transform your body and
          elevate your spirit with our comprehensive programs tailored to every fitness level.
          Join us and embark on a journey to wellness.
        </p>
        <div className="buttons-container">
          <button className="button"><Link to="/ekart" style={{ color: 'white', textDecoration: 'none' }}>Ekart</Link></button>
          <button className="button"><Link to="/subscription" style={{ color: 'white', textDecoration: 'none' }}>Subscription</Link></button>
          <button className="button"><Link to="/calender" style={{ color: 'white', textDecoration: 'none' }}>Calender</Link></button>
          <button className="button"><Link to="/video" style={{ color: 'white', textDecoration: 'none' }}>Videos</Link></button>
        </div>
        <div className="quote">
          <h1>"HUSTLE FOR THE MUSCLE"</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;