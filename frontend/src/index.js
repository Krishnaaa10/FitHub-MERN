import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initScrollOptimizer } from './utils/scrollOptimizer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize scroll optimizer for smooth 60-120 FPS scrolling
initScrollOptimizer();