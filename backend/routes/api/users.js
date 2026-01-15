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
const {
  register,
  login,
  googleLogin
} = require('../../controllers/authController');

// ---------------------------------------------
// ✔ GOOGLE LOGIN ROUTE
// ---------------------------------------------
router.post('/google-login', googleLogin);

// ---------------------------------------------
// REGISTER USER
// ---------------------------------------------
router.post('/register', register);

// ---------------------------------------------
// LOGIN USER
// ---------------------------------------------
router.post('/login', login);

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