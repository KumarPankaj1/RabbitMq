import { channel } from "../config/rabbitmq.conn"



class Consumer {
    async startConsume() {
        // let sec1 = 10, sec2 = 20;
        channel.consume("headerQueue1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${JSON.stringify(msg.properties.headers)}, Message : ${msg.content.toString()} Received From header Queue1 and by consumer1`);
                    // setTimeout(() => {
                    //     console.log("Done task by consumer1 ");
                    //     channel.ack(msg);
                    // }, 1000 * sec1)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


        channel.consume("headerQueue1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${JSON.stringify(msg.properties.headers)}, Message : ${msg.content.toString()} Received From header Queue1 and by Consumer2`);
                    // setTimeout(() => {
                    //     console.log("Done task by consumer1 ");
                    //     channel.ack(msg);
                    // }, 1000 * sec1)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


        channel.consume("headerQueue2", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${JSON.stringify(msg.properties.headers)}, Message : ${msg.content.toString()}, Received From header Queue2 and by consumer1`);
                    // setTimeout(() => {
                    //     console.log("Done task by consumer2 ");
                    //     channel.ack(msg);
                    // }, 1000 * sec2)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


        channel.consume("headerQueue3", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${JSON.stringify(msg.properties.headers)}, Message : ${msg.content.toString()} Received From header Queue3 and by consumer1`);
                //     setTimeout(() => {
                //         console.log("Done task by consumer2 ");
                //         channel.ack(msg);
                //     }, 1000 * sec2)
                }
                return
            }
            catch (error) {
                console.log("error", error)
                return error
            }
        }, { noAck: true })


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
