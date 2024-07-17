import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
