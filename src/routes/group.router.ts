import { Router } from "express";
import groupController from "../controllers/group.controller";
import { ChackToken } from "../middlewares/chackToken";
const router = Router();
router.get("/", ChackToken, groupController.GetAllGroup);
router.get("/:id", ChackToken, groupController.GetGroupById);
// Group panel uchun post, put, delete method lari admin.router da chaqirilgan
export default { router };
