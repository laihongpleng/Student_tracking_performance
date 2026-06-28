import express from "express";
import {
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;