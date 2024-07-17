import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { recharge } from "../api";

const RechargeZero = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recharge({ cardNumber, amount: Number(amount) });
      alert("Card Recharge Successfully!");
      setCardNumber("");
      setAmount("");
    } catch (error) {
      alert("Error in recharging card");
      console.error("Error in recharging card", error);
    }
  };

  return (
    <Card>
      <Card.Header className="h3">Recharge Card</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCardNumber" className="mb-2">
            <Form.Label className="h6 mb-2">Card Number</Form.Label>
            <Form.Control
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="forAmount" className="mb-2">
            <Form.Label className="h6 mb-2">Balance</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3">
            Recharge Card
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RechargeZero;
