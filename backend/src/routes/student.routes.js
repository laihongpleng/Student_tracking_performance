import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudent,
  editStudent,
} from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createStudent);
router.get("/", protect, adminOnly, getAllStudents);
router.get("/:id", protect, adminOnly, getStudent);
router.put("/:id", protect, adminOnly, editStudent);

export default router;