import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EkartPage from './pages/EkartPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentPage from './pages/PaymentPage';
import CalendarPage from './pages/CalendarPage';
import VideoPage from './pages/VideoPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Standalone pages WITHOUT the main navbar --- */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ekart" element={<EkartPage />} />
        {/* --- THIS IS THE CRITICAL FIX: HomePage is now standalone --- */}
        <Route path="/home" element={<HomePage />} />


        {/* --- Pages that share a common Navbar (About, Contact, etc.) --- */}
        <Route element={<Layout />}>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;