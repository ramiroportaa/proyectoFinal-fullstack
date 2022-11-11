import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import {adminAuth} from "../middlewares/index.js";

const router = Router();


router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.get("/categoria/:category", productsController.getByCategory);

router.post("/", adminAuth, productsController.add);

router.put("/:id", adminAuth, productsController.updateById);

router.delete("/:id", adminAuth, productsController.deleteById);

export default router;