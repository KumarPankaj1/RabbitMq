import {  channel } from "../config/rabbitmq.conn"

class RabbitMQController {

    async sendMsg(msg: string) {
        try {
            channel.sendToQueue("hello", Buffer.from(msg));
            // channel1.sendToQueue("hii", Buffer.from(msg));
            return;
        } catch (error) {
            console.error(`we have an error in send msg==> ${error}`);
            return error;
        }
    }
}

export const rabbitMQController = new RabbitMQController();




































