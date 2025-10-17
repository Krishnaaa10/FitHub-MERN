// API endpoints for fetching exercise data
const express = require('express');
const router = express.Router();
const Exercise = require('../../models/Exercise');

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Public
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;