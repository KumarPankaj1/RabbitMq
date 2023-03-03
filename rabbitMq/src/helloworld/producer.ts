import { channel, channel1 } from "../config/rabbitmq.conn"

/**
 * @description publisher send messages at different queue on different channels
 * @author Appinventiv Dev Team
 */

class RabbitMQController {

    async sendMsg(msg: string) {
        try {
            channel.sendToQueue("hello", Buffer.from(msg));
            channel1.sendToQueue("hii", Buffer.from(msg));
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();























