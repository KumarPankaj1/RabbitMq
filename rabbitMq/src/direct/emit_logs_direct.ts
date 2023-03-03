import { channel } from "../config/rabbitmq.conn"

class RabbitMQController {

    async sendMsg(msg: string, logType: string) {
        try {
            channel.publish("Direct_logs", logType, Buffer.from(msg));
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();











