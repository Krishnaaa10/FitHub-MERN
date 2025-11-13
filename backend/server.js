// Main server entry point for the backend
const express = require('express');
const cors = require('cors'); // Import cors at the top
const { connectToMongoDatabase, closeConnection, isConnected } = require('./config/db');
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
shreeApp.use(express.json({ extended: false, limit: '10mb' }));

// 3. Request timeout middleware (30 seconds)
shreeApp.use((req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).json({ msg: 'Request timeout' });
    }
  });
  next();
});

// --- API Routes ---
// Health check endpoint for deployment verification
shreeApp.get('/health', async (req, res) => {
  const dbStatus = isConnected();
  const healthStatus = {
    status: dbStatus ? 'ok' : 'degraded',
    message: dbStatus ? 'FitHub API is up and running!' : 'API is running but database connection is unavailable',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbStatus,
      readyState: dbStatus ? 'connected' : 'disconnected'
    }
  };
  
  const statusCode = dbStatus ? 200 : 503;
  res.status(statusCode).json(healthStatus);
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
const server = shreeApp.listen(PORT, () => {
  console.log(`🚀 Backend server started on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  server.close(async () => {
    console.log('✅ HTTP server closed');
    
    try {
      await closeConnection();
      console.log('✅ Graceful shutdown completed');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during shutdown:', err);
      process.exit(1);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // Don't exit on unhandled rejection, just log it
});