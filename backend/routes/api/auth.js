const express = require('express');
const router = express.Router();
const {
    register,
    login,
    googleLogin,
    getMe,
    forgotPassword,
    resetPassword
} = require('../../controllers/authController');
const { protect } = require('../../middleware/auth');

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected Routes
router.get('/me', protect, getMe);

module.exports = router;
