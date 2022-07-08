import {connect,set} from 'mongoose';

function connection(){
    return connect("mongodb://localhost:27017/RabbitMQ")

   .then(()=>{
    set("debug",true)
       console.log("mongodb connection is succesful")
    })
   .catch((err:Error)=>{
       console.log(err)
    });
}
   
export default connection;