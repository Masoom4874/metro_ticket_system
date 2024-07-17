import React, { useState } from "react";
import { travel } from "../api";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const TravelForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [direction, setDirection] = useState("TO_AIRPORT");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await travel({ cardNumber, direction });
      alert("Travel recorded successfully");
      setCardNumber("");
      setDirection("TO_AIRPORT");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Insufficient balance");
      } else {
        alert("Error in registering travel");
      }
    }
  };

  return (
    <Card>
      <Card.Header className="h3">Record Travel</Card.Header>
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
          <Form.Group controlId="formDirection">
            <Form.Label className="h6 mb-2">Direction</Form.Label>
            <Form.Control
              as="select"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="TO_AIRPORT">To Airport</option>
              <option value="TO_NEW_DELHI">To New Delhi</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3">
            Record Travel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TravelForm;
