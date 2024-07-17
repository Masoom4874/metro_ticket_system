import React, { useEffect, useState } from "react";
import { getPassengerSummary } from "../api";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const PassengerSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getPassengerSummary();
        setSummary(data);
      } catch (error) {
        alert("Error fetching passenger summary");
        error("Error fetching passenger summary", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card>
            <Card.Header className="h3">Passenger Summary</Card.Header>
            <Card.Body>
              <ul>
                {summary.map((item) => (
                  <li key={item._id}>
                    {item._id} <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PassengerSummary;
