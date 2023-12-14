import { Router } from "express";
import { ChackToken } from "../middlewares/chackToken";
import adminController from "../controllers/admin.controller";
import teacherController from "../controllers/teacher.controller";
import studentController from "../controllers/student.controller";
import groupController from "../controllers/group.controller";
const router = Router();

router.post("/register", adminController.RegisterAdmin);
router.post("/login", adminController.SigninAdmin);
router.get("/", ChackToken, adminController.GetAdmin);
router.put("/", ChackToken, adminController.UpdateAdmin);
// for teacher panel
router.post("/teacher", ChackToken, teacherController.AddTeacher);
router.get("/teacher", ChackToken, teacherController.GetAllTeacher);
router.get("/teacher/:id", ChackToken, teacherController.GetTeacherById);
router.put("/teacher/:id", ChackToken, teacherController.UpdateTeacherAdmin);
router.delete("/teacher/:id", ChackToken, teacherController.DeleteTeacher);
// for student panel
router.post("/students", ChackToken, studentController.AddStudent);
router.get("/students", ChackToken, studentController.GetAllStudent);
router.get("/students/:id", ChackToken, studentController.GetStudentById);
router.put("/students/:id", ChackToken, studentController.UpdateStudent);
router.delete("/students/:id", ChackToken, studentController.DeleteStdent);
// for group added
router.post("/group", ChackToken, groupController.AddGroup);
router.get("/group", ChackToken, groupController.GetAllGroup);
router.get("/group/:id", ChackToken, groupController.GetGroupById);
router.put("/group", ChackToken, groupController.UpdadeGroup);
router.delete("/group", ChackToken, groupController.DeleteGroup);

export default { router };
