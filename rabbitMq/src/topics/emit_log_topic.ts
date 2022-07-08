import { rabbitMQ } from "./connection";

class Producer{

    async sendMsg(params:any){
        try {
            const exchangeName = "B";
            const key = "us-east.billing.error";
            // const args = process.argv.slice(2);
            let message = params.message;
            // const key = args[0];
            // console.log(message,key);
            
            const {ch1,conn}:any = await rabbitMQ.createConnection(params);
            await ch1.publish(exchangeName,key,Buffer.from(message));
            // console.log(message);
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

export default producer;

// producer.sendMsg();


