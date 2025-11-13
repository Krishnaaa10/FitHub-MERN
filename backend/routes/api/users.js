// API endpoints for user authentication (register, login)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ensureConnection } = require('../../config/db');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;