import { rabbitMQ } from "./connection";

class Consumer {
  async receiveMsg(params:any) {
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
        "x-match": "any",
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
const consumer = new Consumer();
export default consumer;

// producer.recieveMsg();
