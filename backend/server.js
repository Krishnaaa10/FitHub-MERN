// Main server entry point for the backend
const express = require('express');
const cors = require('cors'); // Import cors at the top
const { connectToMongoDatabase, closeConnection, isConnected } = require('./config/db');
require('dotenv').config();

// Initialize express app
const shreeApp = express();

// Store server reference for delayed start
let server = null;

// --- Middlewares ---

// 1. Enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend to make requests to your backend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://fithub-frontend-2hiw.onrender.com',
  'http://fithub-frontend-2hiw.onrender.com',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.startsWith('http') ? 
    process.env.FRONTEND_URL : 
    `https://${process.env.FRONTEND_URL}`
].filter(Boolean);

// Simple CORS configuration for development
shreeApp.use((req, res, next) => {
  // Allow all origins in development
  if (process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', '*');
  } else {
    // In production, only allow specific origins
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

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

// 404 handler for undefined routes
shreeApp.use('/api', (req, res) => {
  res.status(404).json({ 
    success: false,
    msg: `API endpoint not found: ${req.method} ${req.path}`,
    path: req.path,
    method: req.method
  });
});

// Global error handler middleware (must be last)
shreeApp.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    msg: err.message || 'Internal server error',
    ...(isDevelopment && { stack: err.stack, error: err })
  });
});

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start server after database connection attempt
const startServer = async () => {
  try {
    // Attempt to connect to database first
    console.log('🔄 Initializing database connection...');
    const dbConnected = await connectToMongoDatabase();
    
    if (!dbConnected) {
      console.warn('⚠️  Database connection failed, but starting server anyway...');
      console.warn('⚠️  API will return 503 errors for database operations until connection is established.');
    }
    
    // Start the server
    server = shreeApp.listen(PORT, () => {
      console.log(`🚀 Backend server started on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      if (dbConnected) {
        console.log(`✅ Database: Connected`);
      } else {
        console.log(`⚠️  Database: Not connected (will retry automatically)`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  if (server) {
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
  } else {
    // Server not started yet, just close DB and exit
    try {
      await closeConnection();
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during shutdown:', err);
      process.exit(1);
    }
  }
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