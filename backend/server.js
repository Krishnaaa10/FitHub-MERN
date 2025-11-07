// Main server entry point for the backend
const express = require('express');
const cors = require('cors'); // Import cors at the top
const connectToMongoDatabase = require('./config/db');
require('dotenv').config();

// Initialize express app
const shreeApp = express();

// Connect to MongoDB
connectToMongoDatabase();

// --- Middlewares ---

// 1. Enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend to make requests to your backend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  // Add your Render frontend URL here or set FRONTEND_URL env variable
].filter(Boolean); // Remove undefined values

// CORS configuration - Allow requests from frontend
// For Render deployments, we allow all origins by default to avoid CORS issues
// You can restrict this by setting FRONTEND_URL environment variable
shreeApp.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // If FRONTEND_URL is set, use it to validate origins
    if (process.env.FRONTEND_URL) {
      const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, ''); // Remove trailing slash
      if (origin === frontendUrl || origin.startsWith(frontendUrl)) {
        return callback(null, true);
      }
      // Also check allowedOrigins array
      if (allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed))) {
        return callback(null, true);
      }
    }
    
    // For Render deployments, allow all origins to avoid CORS issues
    // In production without FRONTEND_URL set, allow all (Render-friendly)
    // In development, always allow all
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Enable express to parse JSON in request bodies
shreeApp.use(express.json({ extended: false }));

// --- API Routes ---
// Health check endpoint for deployment verification
shreeApp.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'FitHub API is up and running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple test route
shreeApp.get('/', (req, res) => res.send('FitHub API is up and running!'));

// Main API routes
shreeApp.use('/api/users', require('./routes/api/users'));
shreeApp.use('/api/exercises', require('./routes/api/exercises'));
shreeApp.use('/api/contact', require('./routes/api/contact'));
shreeApp.use('/api/workouts', require('./routes/api/workouts'));
// (Add any other routes like ekart, subscriptions, etc., here)

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
shreeApp.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));