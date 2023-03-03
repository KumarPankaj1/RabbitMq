import { Request, Response } from "express";
import { rabbitMQController } from "../headers/emit_log_header";

class HeaderController {

    async header(req: Request, res: Response) {
        try {
            await rabbitMQController.sendMsg(req.body.msg, req.body.header);
            res.json({ message: "message sent successfully by header exchange-type" });
        } catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }
}

export const HeaderQController = new HeaderController();