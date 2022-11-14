import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";
import {auth} from "../middlewares/index.js";

const router = Router();

router.use(auth);

router.get("/:email", ordersController.getOrdersByEmail);
router.post("/", ordersController.newOrder);



export default router;