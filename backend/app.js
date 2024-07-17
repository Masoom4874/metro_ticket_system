const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const zeroCardRoutes = require("./routes/zenocard");
const transactionRoutes = require("./routes/transations");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://13.60.46.80:5001",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/zerocard", zeroCardRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
