import { channel } from "../config/rabbitmq.conn"

class RabbitMQController {

    async sendMsg(msg: string, key: string) {
        try {
            channel.publish("Topic_logs", key, Buffer.from(msg));
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();


























