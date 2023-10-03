const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const mongoDbString = process.env.ATLAS_URI;
const PORT = process.env.PORT;
const routes = require("./routes/routes");

async function runMongoose() {
  await mongoose.connect(mongoDbString);
}

runMongoose();

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
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
