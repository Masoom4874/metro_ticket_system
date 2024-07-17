import React from "react";
import ZeroCardForm from "../components/ZeroCardForm";
import TravelForm from "../components/TravelForm";
import { Container, Row, Col } from "react-bootstrap";
import RechargeCard from "../components/RechargeZero";

const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mb-3">Metro Train Payment System</h1>
          <Row className="gap-3">
            <Col sm={12} md={6}>
              <ZeroCardForm />
            </Col>
            <Col sm={12} md={5}>
              <TravelForm />
            </Col>
          </Row>
        </Col>
      </Row>
      <Col className="mt-3" md={6}>
        <RechargeCard />
      </Col>
    </Container>
  );
};

export default HomePage;
