import { Request, Response } from "express";
import { rabbitMQController } from "../direct/emit_logs_direct";

class DirectController {

    async direct(req: Request, res: Response) {
        try {
            await rabbitMQController.sendMsg(req.body.msg, req.body.logType);
            res.json({ message: "message sent successfully by direct exchange-type" });
        } catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }
}

export const DirectQController = new DirectController();