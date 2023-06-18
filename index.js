const express = require("express");
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");
const db = require("./connection");

// Add Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Main Route
app.use("/", router);

// Running Port
app.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
