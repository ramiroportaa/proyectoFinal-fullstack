import { Router } from "express";
import tiendaController from "../controllers/orders.controller.js";

const router = Router();

router.post("/", tiendaController.newOrder);


export default router;