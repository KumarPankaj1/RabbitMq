import { rabbitMQ } from "./connection_task";

class Consumer {
  async consumeTask() {
    try {
      const queue = "task";
      const { ch1, conn }: any = await rabbitMQ.createConnection();
      ch1.prefetch(1);
      console.log(`waiting for messages in queue: ${queue}`);
      ch1.consume(queue, (msg: any) => {
        const secs = msg.content.toString().split('.').length - 1;
        if (msg !== null) {
          console.log("Recieved:", msg.content.toString());
          setTimeout(() => {
            console.log("Done resizing image");
            ch1.ack(msg);
          },secs*1000);
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
producer.consumeTask();
