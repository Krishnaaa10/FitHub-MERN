import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // We will use the main Navbar here

const Layout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      {/* The Outlet will render the specific page component (About, Contact, etc.) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;