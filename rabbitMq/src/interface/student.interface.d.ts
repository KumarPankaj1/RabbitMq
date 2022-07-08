export as namespace IStudent;
import { Document, Types } from "mongoose";

export interface StudentInfo extends Document{
    _id: Types.ObjectId,
    name: string,
    rollNo: number,
    email: string
}

export interface HouseInfo {
    houseName: string,
    event:{
        eventName: string,
        prize: string,
        participation : boolean
    }
    studentInfo: {
    name: string,
    rollNo: number,
    email: string
    }
}

export interface SubjectInfo {
    subjectName: string
    studentInfo: {
    name: string,
    rollNo: number,
    email: string
    }
}

