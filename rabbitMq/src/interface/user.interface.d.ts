export as namespace IUser;
import { Document, Types } from "mongoose";

export interface User {
    name:{
        title:string,
        first:string,
        last:string,
    }
    location:{
        street:string,
        city:string,
        state:string,
        postcode:number,
        coordinates:{
            latitude:string,
            longitude:string
        }
    }
    email:string,
    dob:{
        date:string,
        age:number
    },
    phone:string
    hobbies:Array<number>,
    address:[{
        street:string,
    }]
    
}

export interface UserDetail {
    height: number
    weight: number,
    bio: string,
    education?: {
        schoolName?: string,
        passoutYear?: number,
        educationLevel?: number
    },
}