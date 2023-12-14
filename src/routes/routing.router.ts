import { Router } from "express";
import routingController from "../controllers/routing.controller";
import { ChackToken } from "../middlewares/chackToken";
const router = Router();

router.post("/", ChackToken, routingController.AddRouting);
router.get("/", ChackToken, routingController.GetRouting);
router.get("/:id", ChackToken, routingController.GetRoutingById);
router.put("/:id", routingController.UpdateRouting);
router.delete("/:id", routingController.DeleteRouting);

export default { router };
