import { rabbitMQ } from "./connection";

class Producer{

    async sendMsg(){
        try {
            const queue = 'tasks';
            let message = 'this is pankaj';
            const {ch1,conn}:any = await rabbitMQ.createConnection();
            await ch1.sendToQueue(queue,Buffer.from(message));
            console.log(message);
            setTimeout(() => {
                conn.close();
            },1000)
        } catch (error) {
            console.log(error);
            return error;
        } 
    }
}

const producer = new Producer();

producer.sendMsg();


