import { rabbitMQ } from "./connection";

class Producer{

    async sendMsg(params:any){
        try {
            const exchangeName = 'header';
            // const args = process.argv.slice(2);
            // let message = args[0] || 'this is pankaj';
            let message = params.message;
            const {ch1,conn}:any = await rabbitMQ.createConnection();
            await ch1.publish(exchangeName,'',Buffer.from(message),{headers:{account: 'new' , method: 'google'}});
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


