import { rabbitMQ } from "../config/rabbitmq";
import HouseModel from "../model/houseInfo.model";
import SubjectModel from "../model/subjectInfo.model";

class Consumer {
  async receiveMsg() {
    try {
      var message: any;
      const { ch1, conn, q }: any = await rabbitMQ.createConnection();
      console.log(`waiting for messages in queue: ${q.queue}`);
      await ch1.bindQueue(q.queue, "rabbit", "");
      await ch1.consume(q.queue, async (msg: any) => {
        try {
          if (msg !== null) {
            console.log("Recieved:", msg.content.toString());
            const params = JSON.parse(msg.content.toString());
            message = params;
            const studentOldInfo = params.studentOldInfo;
            const update = params.update;
            const studentInfo = update.studentInfo;
            const updateObj: any = {};
            if (studentInfo.name) {
              updateObj["studentInfo.name"] = studentInfo.name;
            }
            if (studentInfo.rollNo) {
              updateObj["studentInfo.rollNo"] = studentInfo.rollNo;
            }
            if (studentInfo.email) {
              updateObj["studentInfo.email"] = studentInfo.email;
            }
            await Promise.all([
               HouseModel.findOneAndUpdate(
                { "studentInfo.name": studentOldInfo.name },
                updateObj,
                { new: true }
              ),
              SubjectModel.findOneAndUpdate(
                { "studentInfo.name": studentOldInfo.name },
                updateObj,
                { new: true }
              ),
            ]);
            // console.log(message);
            await ch1.ack(msg);
            // conn.close();
            return message;
          } else {
            console.log("Consumer cancelled by server");
          }
        } catch (error: any) {
          console.log(error.message);
          return error;
        }
      });
      return message;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
export const consumer = new Consumer();
