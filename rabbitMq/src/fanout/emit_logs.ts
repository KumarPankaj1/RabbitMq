import { channel } from "../config/rabbitmq.conn"

class RabbitMQController {

    async sendMsg(msg: string) {
        try {
            channel.publish("Test", '',Buffer.from(msg));
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();




























