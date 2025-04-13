const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['sick', 'paid', 'casual'], // Define leave types as an enum
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;
