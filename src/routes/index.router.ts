import { Router } from "express";
import adminrouter from "./admin.router";
// import attendanceRouter from "./attendance.router";
import groupRouter from "./group.router";
import routingRouter from "./routing.router";
import paymentRouter from "./payment.router";
import studentRouter from "./student.router";
import teacherRouter from "./teacher.router";

const router = Router();
router.use("/admin", adminrouter.router);
// router.use('/attendance', attendanceRouter.router)
router.use('/group', groupRouter.router)
router.use("/payment", paymentRouter.router);
router.use("/students", studentRouter.router);
router.use("/teachers", teacherRouter.router);
router.use("/routing", routingRouter.router);

export default router;
