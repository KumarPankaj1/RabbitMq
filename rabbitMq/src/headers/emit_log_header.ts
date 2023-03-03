import { channel } from "../config/rabbitmq.conn"

class RabbitMQController {

    async sendMsg(msg: string, object: any) {
        try {
            channel.publish("header_logs", '', Buffer.from(msg), {headers: object});
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();




























