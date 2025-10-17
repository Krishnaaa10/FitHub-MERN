// Mongoose schema for Exercise documents
const mongoose = require('mongoose');

const ExerciseSchemaPatel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    enum: ['abs', 'back', 'bicep', 'chest', 'shoulder', 'legs'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner'
  }
});

module.exports = mongoose.model('exercise', ExerciseSchemaPatel);