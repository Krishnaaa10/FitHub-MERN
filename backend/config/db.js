// Handles the connection to the MongoDB database
const mongoose = require('mongoose');

const connectToMongoDatabase = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb_atlas_connection_string_here')) {
      console.error('⚠️  WARNING: MONGO_URI is not configured in .env file!');
      console.error('Please update backend/.env with your MongoDB Atlas connection string.');
      console.error('Server will continue but database operations will fail.');
      return; // Don't exit, let server start but warn user
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    console.log('✅ MongoDB Connected Successfully...');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    if (err.message.includes('authentication failed') || err.code === 8000) {
      console.error('🔐 AUTHENTICATION ERROR:');
      console.error('   - Check if database user exists in MongoDB Atlas');
      console.error('   - Verify username and password are correct');
      console.error('   - Make sure IP address is whitelisted');
      console.error('   - Go to: Database Access → Verify user exists');
      console.error('   - Go to: Network Access → Whitelist your IP');
    }
    console.error('⚠️  Server will continue but database operations will fail.');
    console.error('Please check your MONGO_URI in backend/.env file.');
    // Don't exit - let server start so user can see the error
  }
};

module.exports = connectToMongoDatabase;