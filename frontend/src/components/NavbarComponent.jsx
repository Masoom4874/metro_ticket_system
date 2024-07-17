import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="justify-content-center"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Metro Train Payment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex bg-red">
            <Nav.Link as={Link} to="/" active={pathname === "/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/summary" active={pathname === "/summary"}>
              Summary
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
