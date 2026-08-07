import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudent,
  editStudent,
  getStudentsByClass
} from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/", protect, adminOnly, createStudent);
router.get("/", protect, adminOnly, getAllStudents);
router.get("/:id", protect, adminOnly, getStudent);
router.put("/:id", protect, adminOnly, editStudent);
router.get(
    "/class/:classId",
    protect,
    allowRoles("admin","teacher"),
    getStudentsByClass
);
export default router;