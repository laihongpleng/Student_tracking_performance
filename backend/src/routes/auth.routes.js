import express from "express";
import { adminLogin, userLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/admin/login", adminLogin);

router.post("/login", userLogin);

export default router;