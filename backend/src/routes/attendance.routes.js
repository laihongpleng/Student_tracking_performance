import express from "express";

import {
    createAttendance,
    editAttendance,
    getClassAttendance,
    getStudentAttendance,
    getClassAttendanceSummary,
    getStudentAttendanceSummarycontroller,
    getClassAttendanceByDate,
    teacherAttendanceOverview
} from "../controllers/attendance.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowRoles("teacher"), createAttendance);

router.put("/:id", protect, allowRoles("teacher"), editAttendance);

router.get(
    "/class/:classId",
    protect,
    allowRoles("admin", "teacher"),
    getClassAttendance
);

router.get(
    "/class/:classId/summary",
    protect,
    allowRoles("admin", "teacher"),
    getClassAttendanceSummary
);

router.get(
    "/student/:studentId",
    protect,
    allowRoles("admin", "teacher"),
    getStudentAttendance
);

router.get(
    "/student/:studentId/summary",
    protect,
    allowRoles("admin", "teacher", "student"),
    getStudentAttendanceSummarycontroller
);

router.get(
    "/class/:classId/subject/:subjectId/date/:date",
    protect,
    allowRoles("admin","teacher"),
    getClassAttendanceByDate
);

router.get(
    "/teacher-overview/:classId",
    protect,
    allowRoles("teacher"),
    teacherAttendanceOverview
);

export default router;

