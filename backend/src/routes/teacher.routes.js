import express from "express";
import { createTeacher } from "../controllers/teacher.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createTeacher);

export default router;