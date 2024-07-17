import axios from "axios";

const api = axios.create({
  baseURL: "http://13.60.46.80:5000/api",
});

export const addZeroCard = (data) => api.post("/zerocard/add", data);
export const recharge = (data) => api.put("/zerocard/recharge", data);
export const travel = (data) => api.post("/transactions/travel", data);
export const getCollectionSummary = () =>
  api.get("/transactions/summary/collection");
export const getPassengerSummary = () =>
  api.get("/transactions/summary/passengers");
export const getTicketSummary = () => api.get("/transactions/summary/tickets");
