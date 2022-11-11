import { Router } from "express";
import config from "../config/config.js";

const router = Router();

router.get("/", (req, res)=> res.render("config.ejs", config));

export default router;