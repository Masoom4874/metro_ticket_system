import React, { useState } from "react";
import { addZeroCard } from "../api";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const ZeroCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("KID");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addZeroCard({ cardNumber, balance: Number(balance), type });
      alert("ZeroCard added successfully");
      setCardNumber("");
      setBalance("");
      setType("KID");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Card already exists with this number");
      } else {
        alert("Error adding ZeroCard");
      }
    }
  };

  return (
    <Card>
      <Card.Header className="h3">Add ZeroCard</Card.Header>
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
          <Form.Group controlId="formBalance" className="mb-2">
            <Form.Label className="h6 mb-2">Balance</Form.Label>
            <Form.Control
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label className="h6 mb-2">Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="KID">Kid</option>
              <option value="ADULT">Adult</option>
              <option value="SENIOR">Senior</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="text-light mt-3">
            Add ZeroCard
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ZeroCardForm;
