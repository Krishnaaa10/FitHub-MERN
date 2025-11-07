// API endpoints for workout calendar/logs
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const WorkoutLog = require('../../models/WorkoutLog');

// @route   GET api/workouts
// @desc    Get all workout logs for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workoutLogs = await WorkoutLog.find({ user: req.user.id }).sort({ date: -1 });
    
    // Convert to object format for easier frontend consumption
    const logsObject = {};
    workoutLogs.forEach(log => {
      logsObject[log.date] = log.logs;
    });
    
    res.json(logsObject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/workouts
// @desc    Create or update workout log for a specific date
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
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
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Workout log already exists for this date' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/workouts/:date
// @desc    Delete workout log for a specific date
// @access  Private
router.delete('/:date', auth, async (req, res) => {
  try {
    const workoutLog = await WorkoutLog.findOneAndDelete({
      user: req.user.id,
      date: req.params.date,
    });

    if (!workoutLog) {
      return res.status(404).json({ msg: 'Workout log not found' });
    }

    res.json({ msg: 'Workout log deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

