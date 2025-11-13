// API endpoints for fetching exercise data
const express = require('express');
const router = express.Router();
const { ensureConnection } = require('../../config/db');
const Exercise = require('../../models/Exercise');

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error('Exercises error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;