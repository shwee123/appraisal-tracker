const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingModel = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    totalAmount: {
      type: Number,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    noOfGuests: {
      type: Number,
    },

    noOfDays: {
      type: Number,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    idProof: {
      type: String,
      enum: ["aadhar", "voter", "pan", "passport"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", bookingModel);
