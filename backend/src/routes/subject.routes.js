import express from "express";

import {
  createSubject,
  getAllSubjects,
  getSubject,
  editSubject,
  deactivate,
  activate,
} from "../controllers/subject.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createSubject);

router.get("/", protect, adminOnly, getAllSubjects);

router.get("/:id", protect, adminOnly, getSubject);

router.put("/:id", protect, adminOnly, editSubject);

router.patch("/:id/deactivate", protect, adminOnly, deactivate);

router.patch("/:id/activate", protect, adminOnly, activate);

export default router;