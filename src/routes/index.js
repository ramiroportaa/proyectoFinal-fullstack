import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import adminRouter from "./admin.router.js";
import ordersRouter from "./orders.router.js";
import messagesRouter from "./messages.router.js";
import loginRouter from "./login.router.js";
import logoutRouter from "./logout.router.js";
import configRouter from "./config.router.js";
import { Router } from "express";
import { generalError, notFound } from "../middlewares/index.js";

const router = Router();

//Rutas renderizadas desde el back.
router.use("/admin", adminRouter);
router.use("/config", configRouter);

//Rutas APIRestFul
router.use("/api/productos", productsRouter);
router.use("/api/carrito", cartsRouter);
router.use("/api/user", usersRouter);
router.use("/api/order", ordersRouter);
router.use("/api/chat", messagesRouter);

//Revisar
//Cambiar a /api/... y en el front cambiar tambien la direccion.
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

//Mid rutas no implementadas.
router.use(notFound);

//Mid de manejo de errores generales.
router.use(generalError);

export default router;
