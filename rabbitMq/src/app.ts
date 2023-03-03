import express from "express";
import { rabbitMQ } from "./config/rabbitmq.conn"
import Router from "./routes/route";
const app = express();
app.use(express.json());

app.use("/", Router)
rabbitMQ.createConnection();

app.listen(5000, (): void => {
  console.log(`listen to server on port  5000`);
});