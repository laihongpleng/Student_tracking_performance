import express from "express";

import {
  createAssignment,
  getAllAssignments,
  getAssignment,
  editAssignment,
  removeAssignment,
  activateAssignmentById,
} from "../controllers/teacherAssignment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createAssignment);

router.get("/", protect, adminOnly, getAllAssignments);

router.get("/:id", protect, adminOnly, getAssignment);

router.put("/:id", protect, adminOnly, editAssignment);

router.patch("/:id/deactivate", protect, adminOnly, removeAssignment);

router.patch("/:id/activate", protect, adminOnly, activateAssignmentById);

export default router;