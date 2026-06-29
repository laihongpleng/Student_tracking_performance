import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacher,
  editTeacher,
       } from "../controllers/teacher.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createTeacher);

router.get("/", protect, adminOnly, getAllTeachers);

router.get("/:id", protect, adminOnly, getTeacher);

router.put("/:id", protect, adminOnly, editTeacher);

export default router;