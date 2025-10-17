// API endpoints for user authentication (register, login)
const express = require('express');
const router = express.Router();

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('User registration route');
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
    res.send('User login route');
});

module.exports = router;