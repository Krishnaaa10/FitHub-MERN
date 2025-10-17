// Handles the connection to the MongoDB database
const mongoose = require('mongoose');

const connectToMongoDatabase = async () => {
  try {
    // We will put the connection string in the .env file later
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectToMongoDatabase;