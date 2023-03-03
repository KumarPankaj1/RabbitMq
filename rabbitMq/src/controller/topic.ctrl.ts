import { Request, Response } from "express";
import { rabbitMQController } from "../topics/emit_log_topic";

class TopicController {

    async topic(req: Request, res: Response) {
        try {
            await rabbitMQController.sendMsg(req.body.msg, req.body.key);
            res.json({ message: "message sent successfully by topic exchange-type" });
        } catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }
}

export const TopicQController = new TopicController();