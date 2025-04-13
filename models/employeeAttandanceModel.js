const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the Employee model
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
