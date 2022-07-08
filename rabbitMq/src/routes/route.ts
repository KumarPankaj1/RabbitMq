import express from "express";
import {publisher} from "../controller/producer.ctrl";
import {receiver} from "../controller/consumer.ctrl";
import {student} from "../controller/student.ctrl";
import {house} from "../controller/house.ctrl"
import {subject} from "../controller/subject.ctrl"
const router = express.Router();

router.route('/send/msg/fanout').post(publisher.fanoutEmit);
router.route('/send/msg/direct').post(publisher.directEmit);
router.route('/send/msg/topic').post(publisher.topicEmit);
router.route('/send/msg/header').post(publisher.headerEmit);
router.route('/create/student/info').post(student.studentInfoCreate);
router.route('/create/house/info').post(house.houseInfoCreate);
router.route('/create/subject/info').post(subject.subjectInfoCreate);
router.route('/edit/student/info').patch(student.studentInfoEdit);

router.route('/receive/msg/fanout').get(receiver.fanoutReceive);
router.route('/receive/msg/direct').get(receiver.directReceive);
router.route('/receive/msg/topic').get(receiver.topicReceive);
router.route('/receive/msg/header').get(receiver.headerReceive);

export default router;