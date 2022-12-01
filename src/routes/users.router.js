import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import {auth, authUpdateUser, multerFileValidator} from "../middlewares/index.js";
import {multerUpload} from "../utils/multerUpload.js";

const router = Router();

router.get("/current", usersController.getCurrentUser);
router.get("/:id", usersController.getById);
router.post("/", multerUpload.single("avatar"), multerFileValidator, usersController.registerUser);
router.put("/:id", auth, authUpdateUser, usersController.updateById);

export default router;