import { Router } from "express"; 
import studentController from "../controllers/student.controller";
import { ChackToken } from "../middlewares/chackToken";
const router = Router() 
router.get('/',  ChackToken, studentController.GetAllStudent);
router.get('/:id', ChackToken, studentController.GetStudentById);
// student panel uchun post, put, delete method lari admin.router da chaqirilgan 

export default {router};