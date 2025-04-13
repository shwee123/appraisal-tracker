const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeAppriciationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user", // The employee being appreciated
    
  },
  hr: {
    type: Schema.Types.ObjectId,
    ref: "user", // The HR or person giving the appreciation
    
  },
  reason: {
    type: String,
    
  },
  message: {
    type: String,
    
  },
  appreciationType: {
    type: String,
    enum: ["Performance", "Teamwork", "Innovation", "Leadership", "Punctuality", "Milestone"],
    default: "Performance"
  },
  appreciationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("employeeAppriciation", employeeAppriciationSchema);
