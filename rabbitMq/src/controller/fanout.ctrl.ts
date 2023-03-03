import { Request, Response } from "express";
import { rabbitMQController } from "../fanout/emit_logs";

class FanoutController {

    async fanout(req: Request, res: Response) {
        try {
            await rabbitMQController.sendMsg(req.body.msg);
            res.json({ message: "message sent successfully by fanout exchange type" });
        } catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }
}

export const FanoutQController = new FanoutController();