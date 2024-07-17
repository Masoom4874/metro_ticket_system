// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import NavbarComponent from "./components/NavbarComponent";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-3 d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
