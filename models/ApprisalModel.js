const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appraisalSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Assuming you have an Employee model
    required: true,
  },
  attendanceRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  goalCompletionRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  disciplineRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  communicationRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  teamworkRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  initiativeRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  overallRemarks: {
    type: String,
    maxlength: 1000,
  },
  finalScore: {
    type: Number,
    min: 1,
    max: 10,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // HR or Manager creating the appraisal
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Appraisal', appraisalSchema);
