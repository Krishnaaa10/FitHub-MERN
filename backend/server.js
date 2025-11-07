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
  'https://fithub-mern-3.onrender.com'
].filter(Boolean); // Remove undefined values

shreeApp.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development, restrict in production
    }
  },
  credentials: true
}));

// 2. Enable express to parse JSON in request bodies
shreeApp.use(express.json({ extended: false }));

// --- API Routes ---
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