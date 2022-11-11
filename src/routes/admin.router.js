import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import {adminAuth} from "../middlewares/index.js";

const router = Router();

//Mid de AUTENTICACION Y AUTORIZACION PARA ACCEDER A RUTAS DE ADMIN.
router.use(adminAuth);

router.get("/", adminController.getPanel);
router.get("/productos", adminController.getProducts);
router.get("/productos/new", adminController.getForm);

//Revisar
//Esta ruta seria para renderizar desde el back un chat donde solo acceden los admin pudiendo responder o enviar mensajes a los user.
router.get("/chat", adminController.getChat);


export default router;