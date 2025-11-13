// API endpoints for workout calendar/logs
const express = require('express');
const router = express.Router();
const { ensureConnection } = require('../../config/db');
const auth = require('../../middleware/auth');
const WorkoutLog = require('../../models/WorkoutLog');

// @route   GET api/workouts
// @desc    Get all workout logs for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    const workoutLogs = await WorkoutLog.find({ user: req.user.id }).sort({ date: -1 });
    
    // Convert to object format for easier frontend consumption
    const logsObject = {};
    workoutLogs.forEach(log => {
      logsObject[log.date] = log.logs;
    });
    
    res.json(logsObject);
  } catch (err) {
    console.error('Get workouts error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/workouts
// @desc    Create or update workout log for a specific date
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    const { date, logs } = req.body;

    if (!date || !Array.isArray(logs)) {
      return res.status(400).json({ msg: 'Please provide date and logs array' });
    }

    // Find existing log or create new one
    let workoutLog = await WorkoutLog.findOne({ user: req.user.id, date });

    if (workoutLog) {
      // Update existing log
      workoutLog.logs = logs;
      await workoutLog.save();
    } else {
      // Create new log
      workoutLog = new WorkoutLog({
        user: req.user.id,
        date,
        logs,
      });
      await workoutLog.save();
    }

    res.json(workoutLog);
  } catch (err) {
    console.error('Post workout error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Workout log already exists for this date' });
    }
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/workouts/:date
// @desc    Delete workout log for a specific date
// @access  Private
router.delete('/:date', auth, async (req, res) => {
  try {
    // Ensure MongoDB connection
    const dbConnected = await ensureConnection();
    if (!dbConnected) {
      return res.status(503).json({ 
        msg: 'Database connection unavailable. Please try again in a moment.' 
      });
    }
    
    const workoutLog = await WorkoutLog.findOneAndDelete({
      user: req.user.id,
      date: req.params.date,
    });

    if (!workoutLog) {
      return res.status(404).json({ msg: 'Workout log not found' });
    }

    res.json({ msg: 'Workout log deleted' });
  } catch (err) {
    console.error('Delete workout error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      return res.status(503).json({ 
        msg: 'Database connection error. Please try again in a moment.' 
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

