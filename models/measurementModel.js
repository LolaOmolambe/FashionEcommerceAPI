const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
  {
    bust: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    hips: {
      type: Number,
    },
    toparm: {
      type: Number,
    },
    sleeveLength: {
      type: Number,
    },
    _customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    _userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Measurement = mongoose.model("Measurement", measurementSchema);

module.exports = Measurement;
