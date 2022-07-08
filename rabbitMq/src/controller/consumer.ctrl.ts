import { Request, Response } from "express";
import { consumer } from "../Pub_Sub/receive_log";
import receiverDirect from "../routing/receive_logs_direct";
import receiverTopic from "../topics/receive_logs_topic";
import receiverHeader from "../headers/receive_log_header_any";

class Receiver {
  async fanoutReceive(req: Request, res: Response): Promise<void> {
    try {
      // console.log('############################################################');
      const message = await consumer.receiveMsg();
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      res.json({
        message: "message received succesfully",
        receivedMessage: message,
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }

  async directReceive(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      await receiverDirect.receiveMsg(payload);
      res.json({ message: "message received succesfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }

  async topicReceive(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      await receiverTopic.receiveMsg(payload);
      res.json({ message: "message received succesfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }

  async headerReceive(req: Request, res: Response): Promise<void> {
    try {
      const payload: any = req.body;
      await receiverHeader.receiveMsg(payload);
      res.json({ message: "message received succesfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }
}

export const receiver = new Receiver();
