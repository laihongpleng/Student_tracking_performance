import express from "express";
import {
  getAllUsers,
  deactivateUser,
  activateUser
} from "../controllers/user.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.patch("/:id/deactivate", protect, adminOnly, deactivateUser);
router.patch("/:id/activate", protect, adminOnly, activateUser);

export default router;