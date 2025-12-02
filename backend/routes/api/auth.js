const express = require('express');
const router = express.Router();
const { register, login, googleLogin, getMe } = require('../../controllers/authController');
const auth = require('../../middleware/auth');

// Google Login Route
// Matches frontend call to POST /api/auth/google
router.post('/google', googleLogin);

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth.protect, getMe);

module.exports = router;
