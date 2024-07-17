const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      enum: ["TO_AIRPORT", "TO_NEW_DELHI"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
