import express from "express";
import { createStudent } from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createStudent);

export default router;