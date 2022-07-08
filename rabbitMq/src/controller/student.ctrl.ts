import { Request, Response } from "express";
import StudentModel from "../model/studentInfo.model";
import { producer } from "../Pub_Sub/emit_log";

class StudentInfo {
  async studentInfoCreate(req: Request, res: Response): Promise<void> {
    try {
      const payload: IStudent.StudentInfo = req.body;
      const studentExist: IStudent.StudentInfo | null =
        await StudentModel.findOne({ email: payload.email });
      if (!studentExist) {
        await new StudentModel(payload).save();
        res.json({
          message: "student information has been created successfully",
        });
      } else {
        res.json({ message: "student already exist" });
      }
    } catch (err: any) {
      console.log(err);
      res.json({ error: err.message });
    }
  }

  async studentInfoEdit(req: Request, res: Response): Promise<any> {
    try {
      const payload: IStudent.StudentInfo = req.body;
      const filter = {
        _id: payload.id,
      };
      const studentExist: IStudent.StudentInfo | null =
        await StudentModel.findOne(filter);
    //   console.log(!studentExist);
      if (!studentExist) {
        return res.json({ message: "student doesn't exist" });
      }
    //   if (studentExist?.name == payload.name) {
    //     return res.json({ message: "old and new name are same" });
    //   }
      let update: any = {};
      if (payload.name) {
        update.name = payload.name;
      }
      if(payload.rollNo){
          update.rollNo = payload.rollNo
      }
      if(payload.email){
          update.email = payload.email
      }
      const student: IStudent.StudentInfo | null =
        await StudentModel.findOneAndUpdate(filter, update, {
          new: true,
        });
        const studentInfo = update;
        const updateObj:any = {
          studentOldInfo:studentExist,
          update:{
              studentInfo
        }
    };
        const message:any =  await producer.sendMsg(updateObj);
        if (message) {
          return res.json({
            message:
              "student name updation and message send to queue has been done successfully",
            messageSend: message,
          });
        } else {
          return res.json({ message: "something wrong in sending message" });
        }
    } catch (err: any) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
}

export const student = new StudentInfo();
