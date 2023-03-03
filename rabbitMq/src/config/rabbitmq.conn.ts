
import { connect, ConfirmChannel } from "amqplib";

import {consumer} from "../helloworld/consumer"; // uncomment the respective consumer which you want to use
// import {consumer} from "../work_queues/consumer_task";
// import { consumer } from "../fanout/receive_logs";
// import { consumer } from "../direct/receive_logs_direct";
// import {consumer} from "../topics/receive_logs_topic";
// import {consumer} from "../headers/receive_logs_header"


export let channel: ConfirmChannel;
export let channel1: ConfirmChannel;

class RabbitMQ {

    async createConnection() {
        try {
            const connection = await connect('amqp://localhost')
            channel = await connection.createConfirmChannel(); 
            channel.prefetch(1); // send messages to consumers in round-robin fashion but if any consumer is available by completing its task then it will send that consumer (not in round-robin)
            channel1 = await connection.createConfirmChannel();

            await this.publishExchanges(channel);
            await this.consumeQueues(channel);
            console.log("rabbit MQ connection done")
            connection.on('error', async (err: any) => {
                console.log('Error in RabbitMQ connection:++++++++++++++++++++++ ' + err.message);
                console.log(err.stack);
                return await this.createConnection();
            });

            connection.on('close', async (err) => {
                console.log('RabbitMQ Connection close:++++++++++++++++++++++' + err);
                return await this.createConnection();
            });

            channel.on('error', (err: any) => {
                console.log('Error in RabbitMQ channel:++++++++++++++++++++++ ' + err.message);
                console.log(err.stack);
            });

            channel.on('close', async (err: any) => {
                console.log('channel closed in connection:++++++++++++++++++++++', err);
                console.log(err.stack);
            });

            // await channel.assertQueue("hello", { durable: false  });
            // await channel.assertQueue("hii", { durable: false  }); // default true
            console.log((`Waiting for messages in queue: hello`));
            consumer.startConsume(); 
        } catch (error) {
            console.error(`we have an error connecting rabbitMq ==> ${error}`);
            return error
        }
    }

    // async publishExchanges(channel: ConfirmChannel) {
    //     try {
    //         channel.assertExchange('Test', 'fanout', {
    //             durable: false
    //         });
    //     }
    //     catch (error) {
    //         console.error(`we have an error while publishing exchange the queue ==> ${error}`);
    //     }
    // }

    async publishExchanges(channel: ConfirmChannel) {
        try {
            channel.assertExchange("Direct_logs", 'direct', {
                durable: false
            });
        }
        catch (error) {
            console.error(`we have an error while publishing exchange the queue ==> ${error}`);
        }
    }


    // async publishExchanges(channel: ConfirmChannel) {
    //     try {
    //         channel.assertExchange("Topic_logs", 'topic', {
    //             durable: false
    //         });
    //     }
    //     catch (error) {
    //         console.error(`we have an error while publishing exchange the queue ==> ${error}`);
    //     }
    // }


    // async publishExchanges(channel: ConfirmChannel) {
    //     try {
    //         channel.assertExchange("header_logs", 'headers', {
    //             durable: false
    //         });
    //     }
    //     catch (error) {
    //         console.error(`we have an error while publishing exchange the queue ==> ${error}`);
    //     }
    // }

    // async consumeQueues(channel: ConfirmChannel){
    //     try {
    //         const q0: any = await channel.assertQueue('Test', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q0.queue}`);
    //         channel.bindQueue(q0.queue, 'Test', '');
    //         consumer.startConsume();
    //     }
    //     catch (error) {
    //         console.error(`we have an error while consuming the queue ==> ${error}`);
    //     }
    // }

    async consumeQueues(channel: ConfirmChannel){
        try {
            const q0 = await channel.assertQueue('Test1', {
                exclusive: false
            }); // new queue with same name at the time of connection
            console.log("q0LOG----------->>>>>>>>", q0)
            console.log(`Waiting for messages in queue: ${q0.queue}`);
            channel.bindQueue(q0.queue, "Direct_logs", 'error');


            const q1: any = await channel.assertQueue('Test2', {
                exclusive: false
            });
            console.log(`Waiting for messages in queue: ${q1.queue}`);
            channel.bindQueue(q1.queue, "Direct_logs", 'warning');

            const q2: any = await channel.assertQueue('Test3', {
                exclusive: false
            });
            console.log(`Waiting for messages in queue: ${q2.queue}`);
            channel.bindQueue(q2.queue, "Direct_logs", 'info');

            const q3: any = await channel.assertQueue('Test4', {
                exclusive: false
            });
            console.log(`Waiting for messages in queue: ${q3.queue}`);
            channel.bindQueue(q3.queue, "Direct_logs", 'info');
            channel.bindQueue(q3.queue, "Direct_logs", 'error');
            channel.bindQueue(q3.queue, "Direct_logs", 'warning');

            consumer.startConsume();
        }
        catch (error) {
            console.error(`we have an error while consuming the queue ==> ${error}`);
        }
    }



    // async consumeQueues(channel: ConfirmChannel){
    //     try {
    //         const q0: any = await channel.assertQueue('topicQueue1', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q0.queue}`);
    //         channel.bindQueue(q0.queue, "Topic_logs", 'us-east.billing.*');


    //         const q1: any = await channel.assertQueue('topicQueue2', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q1.queue}`);
    //         channel.bindQueue(q1.queue, "Topic_logs", '#.error');

    //         const q2: any = await channel.assertQueue('topicQueue3', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q2.queue}`);
    //         channel.bindQueue(q2.queue, "Topic_logs", '*.feedback.error');

    //         // const q3: any = await channel.assertQueue('topicQueue4', {
    //         //     exclusive: false
    //         // });
    //         // console.log(`Waiting for messages in queue: ${q3.queue}`);
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'info');
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'error');
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'warning');

    //         consumer.startConsume();
    //     }
    //     catch (error) {
    //         console.error(`we have an error while consuming the queue ==> ${error}`);
    //     }
    // }

    // async consumeQueues(channel: ConfirmChannel){
    //     try {
    //         const q0: any = await channel.assertQueue('headerQueue1', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q0.queue}`);
    //         channel.bindQueue(q0.queue, "header_logs", '', {account:'new', method: 'facebook', 'x-match':'any'});


    //         const q1: any = await channel.assertQueue('headerQueue2', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q1.queue}`);
    //         channel.bindQueue(q1.queue, "header_logs", '', {account:'old', method: 'facebook', 'x-match':'any'});

    //         const q2: any = await channel.assertQueue('headerQueue3', {
    //             exclusive: false
    //         });
    //         console.log(`Waiting for messages in queue: ${q2.queue}`);
    //         channel.bindQueue(q2.queue, "header_logs", '', {account:'new', method: 'facebook', 'x-match':'all'});

    //         // const q3: any = await channel.assertQueue('topicQueue4', {
    //         //     exclusive: false
    //         // });
    //         // console.log(`Waiting for messages in queue: ${q3.queue}`);
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'info');
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'error');
    //         // channel.bindQueue(q3.queue, "Topic_logs", 'warning');

    //         consumer.startConsume();
    //     }
    //     catch (error) {
    //         console.error(`we have an error while consuming the queue ==> ${error}`);
    //     }
    // }



}
export const rabbitMQ = new RabbitMQ();





















// import { connect, ConfirmChannel } from "amqplib";

// export let queueName = "task";
// export let channel: ConfirmChannel;
// // export let channel1: ConfirmChannel;

// export async function createConnection() {
//     try {
//         const connection = await connect("amqp://localhost");
//         channel = await connection.createConfirmChannel();
//         // channel1 = await connection.createConfirmChannel();
//         channel.on("error", function (err: any) {
//             console.log("Error occurred while creating RabbitMQ connection: ", err);
//         });
//         await channel.assertQueue(queueName, { durable: true });
//         // await channel1.assertQueue(queueName1, { durable: true });
//         console.log("Queue created successfully")
//     }
//     catch (err) {
//         console.log("Error", err);
//     }
// }
// // createConnection();





// import { connect, ConfirmChannel } from "amqplib";

// export let queueName = "task";
// export let channel: ConfirmChannel;
// export let channel1: ConfirmChannel;

// export async function createConnection() {
//     try {
//         const connection = await connect("amqp://localhost");
//         channel = await connection.createConfirmChannel();
//         channel1 = await connection.createConfirmChannel();
//         channel.on("error", function (err: any) {
//             console.log("Error occurred while creating RabbitMQ connection: ", err);
//         });
//         await channel.assertQueue(queueName, { durable: true });
//         // await channel1.assertQueue(queueName1, { durable: true });
//         console.log("Queue created successfully")
//     }
//     catch (err) {
//         console.log("Error", err);
//     }
// }

// createConnection();

     // setTimeout(() => {
    //     connection.close();
    //     process.exit(0);
    // }, 500)
    // return {channel};

// const sendMsg = async () => {
//     const connection = await amqplib.connect("https://chimpanzee.rmq.cloudamqp.com/");
//     const channel = await connection.createChannel();
//     await channel.assertQueue(queueName, { durable: false });
//     channel.sendToQueue(queueName, Buffer.from(msg));
//     console.log("sent ", msg);
//     setTimeout(() => {
//         connection.close();
//         process.exit(0);
//     }, 500)
// }

// sendMsg();