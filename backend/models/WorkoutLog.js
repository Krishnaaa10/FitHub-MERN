// Workout Log model for calendar persistence
const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  logs: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure one log per user per date
WorkoutLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);

