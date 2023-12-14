import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
import { ChackToken } from "../middlewares/chackToken";
const router = Router();
router.post("/login", teacherController.Login);
router.get("/", ChackToken, teacherController.GetTeacher);
router.put("/", ChackToken, teacherController.UpdateTeacher);
export default { router };
