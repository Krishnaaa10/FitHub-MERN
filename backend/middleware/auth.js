// Authentication middleware to verify JWT tokens
const jwt = require('jsonwebtoken');
const { ensureConnection } = require('../config/db');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    } catch (jwtErr) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
    
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;

