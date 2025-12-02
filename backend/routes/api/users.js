// API endpoints for user authentication (register, login, google login)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// ---------------------------------------------
// ✔ This import was missing — now added
// ---------------------------------------------
const { googleLogin } = require('../../controllers/authController');

// ---------------------------------------------
// ✔ GOOGLE LOGIN ROUTE (THE CRITICAL FIX)
// ---------------------------------------------
router.post('/google-login', googleLogin);

// ---------------------------------------------
// REGISTER USER
// ---------------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = newUser.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// ---------------------------------------------
// LOGIN USER
// ---------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, msg: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// ---------------------------------------------
// GET CURRENT USER
// ---------------------------------------------
router.get('/me', auth.protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

module.exports = router;