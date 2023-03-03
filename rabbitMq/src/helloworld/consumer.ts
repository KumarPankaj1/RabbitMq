import { channel, channel1 } from "../config/rabbitmq.conn"


/**
 * @description multiple consumer for queue for different channels
 * @author Appinventiv Dev Team
 */

class Consumer {
    async startConsume() {
        channel.consume("hello", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(" Received: Consumer1 and queue hello", msg.content.toString());
                    // console.log(key, msg.content.toString());
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


        channel.consume("hello", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(" Received: Consumer2 and queue hello", msg.content.toString());
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


        channel1.consume("hii", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(" Received: Consumer3 channel1 and queue hii", msg.content.toString());
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })
    }
}

export const consumer = new Consumer();






















