import { Request, Response} from "express";
import HouseModel from "../model/houseInfo.model"

class HouseInfo{

    async houseInfoCreate(req: Request, res: Response): Promise<void>{
      try{
        const payload:IStudent.HouseInfo = req.body;
            await new HouseModel(payload).save();
            res.json({message:"student house information has been created successfully"});
      }catch(err:any){
      console.log(err);
      res.json({error:err.message});
      }
    }
}

export const house = new HouseInfo();