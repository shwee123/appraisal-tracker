const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyModel = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    location: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "city",
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "state",
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    propertyUrls: [
      {
        type: String,
      },
    ],
    houseType: {
      type: String,
      enum: ["flat", "house", "villa"],
    },
    houseRules: {
      type: String,
    },
    amenities: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("property", propertyModel);
