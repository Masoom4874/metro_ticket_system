const express = require("express");
const router = express.Router();
const ZeroCard = require("../models/ZenoCard");

// Add a new ZeroCard
router.post("/add", async (req, res) => {
  const { cardNumber, balance, type } = req.body;

  // Check if all required fields are provided
  if (!cardNumber || !balance || !type) {
    return res.status(400).send({
      status: false,
      message: "Please provide all fields",
    });
  }

  try {
    // Check if the card already exists
    const existingCard = await ZeroCard.findOne({ cardNumber });

    if (existingCard) {
      return res.status(409).send({
        status: false,
        message: "Card already exists with this number.",
      });
    }

    // Create and save the new card
    const newCard = new ZeroCard({ cardNumber, balance, type });
    await newCard.save();

    // Return the new card data
    res.status(201).send({
      status: true,
      message: "Card created successfully",
      data: newCard,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.put("/recharge", async (req, res) => {
  const { cardNumber, amount } = req.body;

  // Check if all required fields are provided
  if (!cardNumber || !amount) {
    return res.status(400).send({
      status: false,
      message: "Please provide all fields",
    });
  }

  try {
    // Check if the card already exists
    const existingCard = await ZeroCard.findOne({ cardNumber });

    if (!existingCard) {
      return res.status(409).send({
        status: false,
        message: "Card doesen't exists.",
      });
    }

    // Updating Balance
    existingCard.balance += amount;
    await existingCard.save();

    // Return the new card data
    res.status(200).send({
      status: true,
      message: "Card recharged successfully",
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
