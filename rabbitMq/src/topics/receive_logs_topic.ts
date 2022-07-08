import { rabbitMQ } from "./connection";

class Consumer {
  async receiveMsg(params:any) {
    try {
      const key = "us-east.billing.*";
      // console.log(args);
      
      // if (args.length == 0) {
      //   console.log("Usage: receive_logs_direct.ts [info] [warning] [error]");
      //   process.exit(1);
      // }
      const exchangeName = "B";
      const { ch1, conn }: any = await rabbitMQ.createConnection(params);
      const q = await ch1.assertQueue("", {
        exclusive: true,
      });

      console.log(`waiting for messages in queue: ${q.queue}`);
      // args.forEach(function (severity:any) {
      //   //   console.log(severity);
      //   ch1.bindQueue(q.queue, exchangeName, severity);
      // });

       ch1.bindQueue(q.queue, exchangeName, key);

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
export default producer;
// producer.recieveMsg();
