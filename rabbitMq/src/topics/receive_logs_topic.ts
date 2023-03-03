import { channel } from "../config/rabbitmq.conn"

/**
 * @description consumers receive messages from the bounded queue by routing key
 * @author Appinventiv Dev Team
 */

class Consumer {
    async startConsume() {
        let sec1 = 10, sec2 = 20;
        channel.consume("topicQueue1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} Received From topicQueue1 and by consumer1`);
                    setTimeout(() => {
                        console.log("Done task by consumer1 ");
                        channel.ack(msg); //  manual acknowledgment when task done
                    }, 1000 * sec1)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: false }) // auto ack and set it false if you are doing manual acknowledgement


        channel.consume("topicQueue1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} Received From topic Queue1 and by Consumer2`);
                    setTimeout(() => {
                        console.log("Done task by consumer1 ");
                        channel.ack(msg);
                    }, 1000 * sec1)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: false })


        channel.consume("topicQueue2", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()}, Received From topicQueue2 and by consumer1`);
                    setTimeout(() => {
                        console.log("Done task by consumer2 ");
                        channel.ack(msg);
                    }, 1000 * sec2)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: false })


        channel.consume("topicQueue3", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} Received From topicQueue3 and by consumer1`);
                    setTimeout(() => {
                        console.log("Done task by consumer2 ");
                        channel.ack(msg);
                    }, 1000 * sec2)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: false })


        // channel.consume("topicQueue4", async function (msg: any) {
        //     try {
        //         if (msg && msg.content) {
        //             console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} Received From topicQueue4 and by consumer1`);
        //             // setTimeout(() => {
        //             //     console.log("Done task by consumer2 ");
        //             //     channel.ack(msg);
        //             // }, 1000 * sec2)
        //         }
        //         return
        //     }
        //     catch (error) {
        //         console.log("error", error)
        //         return error
        //     }
        // }, { noAck: true })
    }
}

export const consumer = new Consumer();
