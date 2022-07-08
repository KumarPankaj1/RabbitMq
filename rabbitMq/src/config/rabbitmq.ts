const amqplib = require('amqplib');

class RabbitMQ{

    async createConnection(){
        try {
            const conn = await amqplib.connect('amqp://localhost');
            console.log("RabbitMQ connection created");
            const ch1 = await conn.createChannel();
            ch1.on("error", function (err: any) {
                console.log("Error occurred while creating RabbitMQ connection: ", err);
              });
            await ch1.assertExchange("rabbit","fanout",{durable: true});
            const q = await ch1.assertQueue("pankaj", {
                exclusive: false,
              });
            return {ch1,conn,q};
        } catch (error) {
            console.log(error);
            return error;
        } 
    }
}

export const rabbitMQ = new RabbitMQ;



