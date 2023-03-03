import express from "express";
import { HelloWorldQController } from "../controller/helloworld.ctrl";
import { WorkQueueQController } from "../controller/work_queue.ctrl";
import { FanoutQController } from "../controller/fanout.ctrl";
import { DirectQController } from "../controller/direct.ctrl";
import { TopicQController } from "../controller/topic.ctrl";
import { HeaderQController } from "../controller/header.ctrl";
const router = express.Router();

router.route('/send/msg/helloworld').post(HelloWorldQController.helloWorld);
router.route('/send/msg/workqueue').post(WorkQueueQController.workQueue);
router.route('/send/msg/fanout').post(FanoutQController.fanout);
router.route('/send/msg/direct').post(DirectQController.direct);
router.route('/send/msg/topic').post(TopicQController.topic);
router.route('/send/msg/header').post(HeaderQController.header);
export default router;