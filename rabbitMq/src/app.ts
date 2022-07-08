import express from "express";
import dotenv from "dotenv";
// dotenv;
// require('dotenv').config();
dotenv.config({ path: "./env"});
import Router from "./routes/route";
import connection from "./config/mongodb";
import {rabbitMQ} from "./config/rabbitmq";
const app = express();
app.use(express.json());

const port = process.env.PORT;
connection();
rabbitMQ.createConnection();

// console.log(process.env.PORT);

app.use("/",Router)

app.listen(5000, (): void => {
    console.log(`listen to server on port  5000`);
  });