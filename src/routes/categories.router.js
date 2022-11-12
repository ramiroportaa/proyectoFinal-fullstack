import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
import {adminAuth} from "../middlewares/index.js";

const router = Router();


router.get("/", categoriesController.getAll);

router.post("/", adminAuth, categoriesController.createCategory);

router.delete("/:name", adminAuth, categoriesController.deleteCategory);

export default router;