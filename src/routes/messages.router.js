import { Router } from "express";
import messagesController from "../controllers/messages.controller.js";
import {auth} from "../middlewares/index.js";

const router = Router();

router.use(auth);

router.get("/:email", messagesController.getMessagesByEmail);

router.post("/", messagesController.insertMessage);

router.delete("/:id", messagesController.deleteById);

export default router;