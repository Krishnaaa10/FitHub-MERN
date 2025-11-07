import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
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
import BookingPage from './pages/BookingPage';
import './App.css';
import './PerformanceOptimizations.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Landing Page (Entry Point) --- */}
        <Route path="/" element={<LandingPage />} />

        {/* --- Public routes --- */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />

        {/* --- Protected routes --- */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/ekart" element={<ProtectedRoute><EkartPage /></ProtectedRoute>} />

        {/* --- Pages that share a common Navbar (About, Contact, etc.) --- */}
        <Route element={<Layout />}>
          <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/calender" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/video" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;