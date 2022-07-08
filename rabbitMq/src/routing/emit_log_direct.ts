import { rabbitMQ } from "./connection";

class Producer{

    async sendMsg(params:any){
        try {
            const exchangeName = params.exchangeName;
            // const args = process.argv.slice(2);
            // let message = args[1] || 'this is pankaj';
            let message = params.message;
            // const logType = args[0];
            const logType = params.logType;
            // console.log(message,logType);
            
            const {ch1,conn}:any = await rabbitMQ.createConnection(params);
            await ch1.publish(exchangeName,logType,Buffer.from(message));
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


