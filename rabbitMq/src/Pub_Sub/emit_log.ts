import { rabbitMQ } from "../config/rabbitmq";

class Producer{

    async sendMsg(params:any){
        try {
            
            let message = params;
            const {ch1,conn,q}:any = await rabbitMQ.createConnection();
            await ch1.publish("rabbit",'',Buffer.from(JSON.stringify(message)));
            console.log(message);
            setTimeout(() => {
                conn.close();
            },1000)
            if(message){
                return message
            }
        } catch (error: any) {
            console.log("error in sendMsg " + error.message);
            return error;
        } 
    }
}

export const producer = new Producer();



