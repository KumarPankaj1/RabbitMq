import { Request, Response } from "express";
import { producer } from "../Pub_Sub/emit_log";
import emitter from "../routing/emit_log_direct";
import topicEmitter from "../topics/emit_log_topic";
import headerEmitter from "../headers/emit_log_header";

class Publisher {
  async fanoutEmit(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      // console.log(payload);
      await producer.sendMsg(payload);
      res.json({ message: "message send successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }

  async directEmit(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      await emitter.sendMsg(payload);
      res.json({ message: "message send successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }

  async topicEmit(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      await topicEmitter.sendMsg(payload);
      res.json({ message: "message send successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }


  async headerEmit(req: Request, res: Response): Promise<void> {
   try {
     const payload: any = req.body;
     await headerEmitter.sendMsg(payload);
     res.json({ message: "message send successfully" });
   } catch (error) {
     console.log(error);
     res.json({ error: error });
   }
 }


}

export const publisher = new Publisher();
