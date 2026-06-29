import express from "express";

import {
  createClass,
  getAllClasses,
  getClass,
  editClass,
  deactivateClassbyID,
  activateClassByID,
} from "../controllers/class.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";


const router = express.Router();

router.post("/", protect, adminOnly, createClass);

router.get("/", protect, adminOnly, getAllClasses);

router.get("/:id", protect, adminOnly, getClass);

router.put("/:id", protect, adminOnly, editClass);

router.patch("/:id/deactivate", protect, adminOnly, deactivateClassbyID);

router.patch("/:id/activate", protect, adminOnly, activateClassByID);

export default router;