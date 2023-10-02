require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoDbString = process.env.ATLAS_URI;
const PORT = 3000;
const routes = require("./routes/routes");

mongoose.connect(mongoDbString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
  console.log("test");
});

database.once("connected", () => {
  console.log("Database connected");
});

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
