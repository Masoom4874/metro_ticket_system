import React, { useEffect, useState } from "react";
import { getCollectionSummary } from "../api";
import { Container, Row, Col, Card } from "react-bootstrap";

const CollectionSummary = () => {
  const [summary, setSummary] = useState({ totalAmount: 0, totalDiscount: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getCollectionSummary();
        setSummary(data);
      } catch (error) {
        alert("Error fetching collection summary");
        console.error("Error fetching collection summary", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card>
            <Card.Header className="h3">Collection Summary</Card.Header>
            <Card.Body>
              <Card.Text>
                Total Amount Collected: {summary.totalAmount}
              </Card.Text>
              <Card.Text>
                Total Discount Given: {summary.totalDiscount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CollectionSummary;
