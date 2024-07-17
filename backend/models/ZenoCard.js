const mongoose = require("mongoose");

const zeroCardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      unique: true,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["KID", "ADULT", "SENIOR"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ZeroCard", zeroCardSchema);
