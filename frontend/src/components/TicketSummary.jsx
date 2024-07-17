import React, { useEffect, useState } from "react";
import { getTicketSummary } from "../api";
import { Container, Table, Pagination } from "react-bootstrap";

const TicketSummary = () => {
  const [summary, setSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page, adjust as needed

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getTicketSummary();
        setSummary(data);
      } catch (error) {
        alert("Error fetching ticket summary");
      }
    };

    fetchSummary();
  }, []);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = summary.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Card No.</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Direction</th>
            <th>Time & Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, index) => {
              const { cardNumber, amount, discount, direction, updatedAt } =
                data;
              const formattedDate = new Date(updatedAt).toLocaleDateString();
              const formattedTime = new Date(updatedAt).toLocaleTimeString();

              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}.</td>
                  <td>{cardNumber}</td>
                  <td>{amount}</td>
                  <td>{discount}</td>
                  <td>
                    {direction === "TO_AIRPORT" ? "AIRPORT" : "NEW DELHI"}
                  </td>
                  <td>
                    {formattedDate}
                    <br />
                    {formattedTime}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={7}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
        />
        {Array.from(
          { length: Math.ceil(summary.length / itemsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() =>
            setCurrentPage(
              currentPage < Math.ceil(summary.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={currentPage === Math.ceil(summary.length / itemsPerPage)}
        />
      </Pagination>
    </Container>
  );
};

export default TicketSummary;
