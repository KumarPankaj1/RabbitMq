import { rabbitMQ } from "./connection";

class Consumer {
  async recieveMsg() {
    try {
      const queue = "tasks";
      const { ch1, conn }: any = await rabbitMQ.createConnection();
      ch1.consume(queue, (msg: any) => {
        if (msg !== null) {
          console.log("Recieved:", msg.content.toString());
          ch1.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
const producer = new Consumer();
producer.recieveMsg();
