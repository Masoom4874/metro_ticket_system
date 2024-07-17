const express = require("express");
const router = express.Router();
const ZeroCard = require("../models/ZenoCard.js");
const transaction = require("../models/transaction.js");

//Getting Charges
const getCharges = (type, direction, lastDirection, lastUpdatedAt) => {
  const charges = { KID: 30, ADULT: 100, SENIOR: 20 };
  let amount = charges[type];
  let discount = 0;

  // Check if the last transaction was today
  const isSameDay =
    lastUpdatedAt &&
    new Date().toDateString() === new Date(lastUpdatedAt).toDateString();

  if (
    isSameDay &&
    lastDirection === "TO_AIRPORT" &&
    direction === "TO_NEW_DELHI"
  ) {
    discount = amount * 0.5;
    amount -= discount;
  }

  return { amount, discount };
};

// NEW TRANSACTION
router.post("/travel", async (req, res) => {
  const { cardNumber, direction } = req.body;
  try {
    const card = await ZeroCard.findOne({ cardNumber });
    const lastTran = await transaction
      .findOne({ cardNumber })
      .sort({ updatedAt: -1 })
      .exec();

    if (!card) return res.status(404).send({ error: "Card not found" });

    const lastDirection = lastTran ? lastTran.direction : null;
    const lastUpdatedAt = lastTran ? lastTran.updatedAt : null;

    const { amount, discount } = getCharges(
      card.type,
      direction,
      lastDirection,
      lastUpdatedAt
    );

    if (card.balance < amount) {
      return res.status(400).send({ message: "Insufficient balance" });
    }

    card.balance -= amount;
    await card.save();

    const transactionData = await transaction.create({
      cardNumber,
      amount,
      discount,
      direction,
    });

    res.status(201).send(transactionData);
  } catch (error) {
    res.status(400).send(error);
    console.error("Error in travel api", error);
  }
});

// Collection summary
router.get("/summary/collection", async (req, res) => {
  try {
    const transactions = await transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDiscount: { $sum: "$discount" },
        },
      },
    ]);
    res.send(transactions[0]);
  } catch (error) {
    res.status(400).send(error);
    coneole.error("Error in Transactions", error);
  }
});

// Passenger summary
router.get("/summary/passengers", async (req, res) => {
  try {
    const transactions = await transaction.aggregate([
      {
        $lookup: {
          from: "zerocards",
          localField: "cardNumber",
          foreignField: "cardNumber",
          as: "cardInfo",
        },
      },
      { $unwind: "$cardInfo" },
      {
        $group: {
          _id: "$cardInfo.type",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1, _id: 1 } },
    ]);
    res.send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
});

// getting ticket summary
router.get("/summary/tickets", async (req, res) => {
  try {
    const transactions = await transaction.find({});
    res.send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
