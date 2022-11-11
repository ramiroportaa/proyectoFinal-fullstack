import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import {auth, ownerCartAuth} from "../middlewares/index.js";

const router = Router();

router.use(auth);

router.get("/current", cartsController.getCurrentCartId);
router.get("/:id/productos", ownerCartAuth, cartsController.getProducts);

router.post("/", cartsController.createCart);
router.post("/:id/productos", ownerCartAuth, cartsController.addProduct);

router.delete("/:id", ownerCartAuth, cartsController.deleteById);
router.delete("/:id/productos/:id_prod", ownerCartAuth, cartsController.deleteProductById);

export default router;