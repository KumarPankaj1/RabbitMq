import { channel } from "../config/rabbitmq.conn"



class Consumer {
    async startConsume() {
        let sec1 = 10, sec2 = 20;
        channel.consume("Test", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(" Received: Consumer1", msg.content.toString());
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


        channel.consume("Test", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(" Received: Consumer2", msg.content.toString());
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


        // channel1.consume("hii", async function (msg: any) {
        //     try {
        //         if (msg && msg.content) {
        //             console.log(" Received: Consumer3 channel1", msg.content.toString());
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


