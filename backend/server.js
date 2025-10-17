// Main server entry point for the backend
const express = require('express');
const cors = require('cors');
const connectToMongoDatabase = require('./config/db');
require('dotenv').config();

// Initialize express app
const shreeApp = express();

// Connect to MongoDB
connectToMongoDatabase();

// --- Middlewares ---
// Enable Cross-Origin Resource Sharing
shreeApp.use(cors());
// Enable express to parse JSON in request bodies
shreeApp.use(express.json({ extended: false }));

// backend/server.js

// ... (keep all the existing code at the top)

// --- API Routes ---
shreeApp.get('/', (req, res) => res.send('FitHub API is up and running!'));
shreeApp.use('/api/users', require('./routes/api/users'));
shreeApp.use('/api/exercises', require('./routes/api/exercises'));

// --- ADD THIS NEW LINE ---
shreeApp.use('/api/contact', require('./routes/api/contact'));

// ... (keep all the existing code at the bottom)

// --- API Routes ---
shreeApp.get('/', (req, res) => res.send('FitHub API is up and running!'));
shreeApp.use('/api/users', require('./routes/api/users'));
shreeApp.use('/api/exercises', require('./routes/api/exercises'));


// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
shreeApp.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));