import { config } from "dotenv";
config();

import express, { json } from "express";
import { connect, connection } from "mongoose";
import cors from "cors";
const mongoDbString = process.env.ATLAS_URI;
const PORT = process.env.PORT;
import routes from "./routes/routes";

connect(mongoDbString);
const database = connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

const app = express();

app.use(cors());

app.use(json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
