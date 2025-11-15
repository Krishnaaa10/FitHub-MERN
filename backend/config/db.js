// Handles the connection to the MongoDB database
const mongoose = require('mongoose');

let isConnected = false;
let connectionAttempts = 0;
let handlersSetup = false;
let reconnectTimeout = null;
const MAX_RECONNECT_ATTEMPTS = 5;

const connectToMongoDatabase = async () => {
  // Set up connection event handlers first (only once)
  setupConnectionHandlers();
  
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb_atlas_connection_string_here')) {
      console.error('⚠️  WARNING: MONGO_URI is not configured in .env file!');
      console.error('Please update backend/.env with your MongoDB Atlas connection string.');
      console.error('Server will continue but database operations will fail.');
      return false;
    }

    // If already connected, return true
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return true;
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    
    // Enhanced connection options for production stability
    const connectionOptions = {
      serverSelectionTimeoutMS: 30000, // 30 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
      connectTimeoutMS: 30000, // 30 second connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain at least 2 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
      retryWrites: true, // Retry write operations
      retryReads: true, // Retry read operations
    };

    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    
    isConnected = true;
    connectionAttempts = 0;
    
    console.log('✅ MongoDB Connected Successfully...');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    return true;
  } catch (err) {
    isConnected = false;
    connectionAttempts++;
    
    console.error('❌ Failed to connect to MongoDB:', err.message);
    
    if (err.message.includes('authentication failed') || err.code === 8000 || err.message.includes('bad auth')) {
      console.error('🔐 AUTHENTICATION ERROR:');
      console.error('═══════════════════════════════════════════════════════════');
      console.error('Your MONGO_URI has incorrect credentials!');
      console.error('');
      console.error('🔧 HOW TO FIX:');
      console.error('');
      console.error('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
      console.error('2. Click on your cluster → "Connect" button');
      console.error('3. Choose "Connect your application"');
      console.error('4. Copy the connection string (looks like:)');
      console.error('   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/');
      console.error('');
      console.error('5. In Render Dashboard → Your Backend Service → Environment:');
      console.error('   - Replace <username> with your MongoDB username');
      console.error('   - Replace <password> with your MongoDB password');
      console.error('   - Add your database name at the end: /fithub?retryWrites=true&w=majority');
      console.error('');
      console.error('6. Make sure:');
      console.error('   ✓ Database user exists (Database Access → Users)');
      console.error('   ✓ Password is correct (reset if needed)');
      console.error('   ✓ Network Access allows 0.0.0.0/0 (for Render)');
      console.error('');
      console.error('📝 Example MONGO_URI format:');
      console.error('   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/fithub?retryWrites=true&w=majority');
      console.error('═══════════════════════════════════════════════════════════');
      
      // Try to extract username from MONGO_URI for debugging (without password)
      try {
        const uri = process.env.MONGO_URI || '';
        if (uri.includes('@')) {
          const match = uri.match(/mongodb\+srv:\/\/([^:]+):/);
          if (match) {
            console.error(`💡 Detected username in URI: ${match[1]}`);
            console.error('   Verify this username exists in MongoDB Atlas → Database Access');
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    
    // Retry connection if attempts haven't exceeded max
    if (connectionAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`🔄 Retrying connection (${connectionAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
      setTimeout(() => {
        connectToMongoDatabase();
      }, 5000 * connectionAttempts); // Exponential backoff
    } else {
      console.error('⚠️  Max reconnection attempts reached. Server will continue but database operations will fail.');
      console.error('Please check your MONGO_URI in backend/.env file.');
    }
    
    return false;
  }
};

// Set up connection event handlers for automatic reconnection (only once)
const setupConnectionHandlers = () => {
  if (handlersSetup) {
    return; // Handlers already set up, don't register again
  }
  
  handlersSetup = true;
  
  mongoose.connection.on('connected', () => {
    isConnected = true;
    connectionAttempts = 0;
    console.log('✅ MongoDB connection established');
  });

  mongoose.connection.on('error', (err) => {
    isConnected = false;
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    
    // Clear any existing reconnect timeout
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
    
    // Attempt to reconnect
    const currentAttempts = connectionAttempts;
    if (currentAttempts < MAX_RECONNECT_ATTEMPTS) {
      connectionAttempts = currentAttempts + 1;
      reconnectTimeout = setTimeout(async () => {
        try {
          if (!process.env.MONGO_URI) {
            console.error('❌ Cannot reconnect: MONGO_URI not configured');
            return;
          }
          // Only reconnect if not already connected
          if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
            await mongoose.connect(process.env.MONGO_URI, {
              serverSelectionTimeoutMS: 30000,
              socketTimeoutMS: 45000,
              connectTimeoutMS: 30000,
              maxPoolSize: 10,
              minPoolSize: 2,
              maxIdleTimeMS: 30000,
              heartbeatFrequencyMS: 10000,
              retryWrites: true,
              retryReads: true,
            });
            console.log('✅ MongoDB reconnected successfully');
            connectionAttempts = 0; // Reset on success
          }
        } catch (reconnectErr) {
          console.error('❌ Reconnection failed:', reconnectErr.message);
        }
        reconnectTimeout = null;
      }, 5000 * connectionAttempts);
    } else {
      console.error('⚠️  Max reconnection attempts reached. Manual intervention may be required.');
    }
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    connectionAttempts = 0;
    console.log('✅ MongoDB reconnected');
  });
};

// Helper function to check and ensure connection
const ensureConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    console.log('🔄 Database not connected, attempting to reconnect...');
    return await connectToMongoDatabase();
  }
  
  return false;
};

// Graceful shutdown
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully');
    isConnected = false;
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:', err.message);
  }
};

module.exports = {
  connectToMongoDatabase,
  ensureConnection,
  closeConnection,
  isConnected: () => mongoose.connection.readyState === 1,
};