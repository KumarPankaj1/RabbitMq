import { rabbitMQ } from "./connection_task";

class Producer{

    async sendMsg(){
        try {
            const queue = 'task';
            let message = process.argv.slice(2).join(' ') || 'this is pankaj'
            const {ch1,conn}:any = await rabbitMQ.createConnection();
            await ch1.sendToQueue(queue,Buffer.from(message),{persistent: true});
            console.log(message);
            setTimeout(() => {
                conn.close();
            },1000)
        } catch (error) {
            console.log(error);
            return error
        } 
    }
}

const producer = new Producer();

producer.sendMsg();


