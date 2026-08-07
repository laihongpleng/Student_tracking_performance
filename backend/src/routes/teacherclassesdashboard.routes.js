import express from "express";

import {
    teacherClasses,
    studentsWithScores,
    monthlyResult,
    semesterResult,
    subjectRanking,
    studentProgress,
    teacherStatistics,
    teacherAttendanceClass,
} from "../controllers/teacherclassesdashboard.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";

import {
    allowRoles
} from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    allowRoles("teacher"),
    teacherClasses
);

router.get(
    "/class/:classId/subject/:subjectId/students",
    protect,
    allowRoles("teacher"),
    studentsWithScores
);

router.get(
    "/class/:classId/subject/:subjectId/monthly-result",
    protect,
    allowRoles("teacher"),
    monthlyResult
);

router.get(
    "/class/:classId/subject/:subjectId/semester-result",
    protect,
    allowRoles("teacher"),
    semesterResult
);

router.get(
    "/class/:classId/subject/:subjectId/ranking",
    protect,
    allowRoles("teacher"),
    subjectRanking
);

router.get(
    "/student/:studentId/progress",
    protect,
    allowRoles("teacher"),
    studentProgress
);

router.get(
    "/class/:classId/subject/:subjectId/statistics",
    protect,
    allowRoles("teacher"),
    teacherStatistics
);

router.get(
    "/attendance/class",
    protect,
    allowRoles("teacher"),
    teacherAttendanceClass
);


export default router;