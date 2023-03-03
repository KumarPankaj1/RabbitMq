import { channel } from "../config/rabbitmq.conn"



class Consumer {
    async startConsume() {
        // let sec1 = 10, sec2 = 20;
        channel.consume("Test1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} RecivedByTest1 and consumer1`);
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
        }, { noAck: false })


        channel.consume("Test1", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} RecivedByTest1 and Consumer2`);
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
        }, { noAck: false })


        channel.consume("Test2", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()}, RecivedByTest2`);
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
        }, { noAck: false })


        channel.consume("Test3", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} RecivedByTest3`);
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
        }, { noAck: false })


        channel.consume("Test4", async function (msg: any) {
            try {
                if (msg && msg.content) {
                    console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()} RecivedByTest4`);
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







