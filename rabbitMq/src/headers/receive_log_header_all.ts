import { rabbitMQ } from "./connection";

class Consumer {
  async recieveMsg() {
    try {
      const exchangeName = "header";
      const { ch1, conn }: any = await rabbitMQ.createConnection();
      const q = await ch1.assertQueue("", {
        exclusive: true,
      });
      console.log(`waiting for messages in queue: ${q.queue}`);
      ch1.bindQueue(q.queue, exchangeName, "", {
        account: "new",
        method: "google",
        "x-match": "all",
      });
      ch1.consume(q.queue, (msg: any) => {
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
