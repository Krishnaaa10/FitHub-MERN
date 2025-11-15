// Simple Express server to serve React app with SPA routing support
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// API proxy - forward API requests to backend (optional, if needed)
// Uncomment if you want to proxy API requests through frontend server
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({
//   target: process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000',
//   changeOrigin: true,
// }));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// This allows React Router to handle client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running on port ${PORT}`);
  console.log(`📦 Serving static files from: ${path.join(__dirname, 'build')}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
});

