import React from "react";
import CollectionSummary from "../components/CollectionSummary";
import PassengerSummary from "../components/PassengerSummary";
import { Container, Row, Col } from "react-bootstrap";
import TicketSummary from "../components/TicketSummary";

const SummaryPage = () => {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1 className="mb-3">Summary Panel</h1>
          <Row className="justify-content-start gap-2">
            <Col md={4}>
              <CollectionSummary />
            </Col>
            <Col md={4}>
              <PassengerSummary />
            </Col>
          </Row>
        </Col>
      </Row>
      <Col>
        <h1 className="mb-3">Tickets Summary</h1>
        <TicketSummary />
      </Col>
    </Container>
  );
};

export default SummaryPage;
