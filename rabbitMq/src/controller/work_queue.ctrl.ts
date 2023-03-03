import { Request, Response } from "express";
import { rabbitMQController } from "../work_queues/send_task";

class WorkQueueController {

    async workQueue(req: Request, res: Response) {
        try {
            await rabbitMQController.sendMsg(req.body.msg);
            res.json({ message: "message sent successfully" });
        } catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }
}

export const WorkQueueQController = new WorkQueueController();