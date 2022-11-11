import { Router } from "express";
import passport from "../services/passport.service.js";
import loginController from "../controllers/login.controller.js";

//import WSresponse from "../libs/WSresponse.js";

const router = Router();

router.post("/", passport.authenticate("login", {failureRedirect: "/login/error"}), loginController.postLogin);

router.get("/error", (req, res)=> res.render("error.ejs", {error: "Invalid credentials"}));

export default router;