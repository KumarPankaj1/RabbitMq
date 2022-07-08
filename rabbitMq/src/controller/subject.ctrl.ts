import { Request, Response} from "express";
import SubjectModel from "../model/subjectInfo.model"

class SubjectInfo{

    async subjectInfoCreate(req: Request, res: Response): Promise<void>{
      try{
        const payload:IStudent.HouseInfo = req.body;
            await new SubjectModel(payload).save();
            res.json({message:"student subject information has been created successfully"});
      }catch(err:any){
      console.log(err);
      res.json({error:err.message});
      }
    }
}

export const subject = new SubjectInfo();