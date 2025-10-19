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
shreeApp.use(cors({
  origin: "https://fithub-mern-3.onrender.com" // <-- IMPORTANT: Your FRONTEND URL goes here
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
// (Add any other routes like ekart, subscriptions, etc., here)

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
shreeApp.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));