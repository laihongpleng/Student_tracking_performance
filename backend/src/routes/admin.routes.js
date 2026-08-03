import express from "express";

import {
    dashboardSummary,
    studentRanking,
    studentDistribution,
    subjectPerformance,
    attendanceByClass,
    classPerformance,
    monthlyClassResult,
    semesterResult,
    classMonthlyPerformanceTrend
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    allowRoles("admin"),
    dashboardSummary
);

router.get(
    "/ranking",
    protect,
    allowRoles("admin"),
    studentRanking
);

router.get(
    "/students-by-class",
    protect,
    allowRoles("admin"),
    studentDistribution
);

router.get(
    "/subject-performance",
    protect,
    allowRoles("admin"),
    subjectPerformance
);

router.get(
    "/attendance-by-class",
    protect,
    allowRoles("admin"),
    attendanceByClass
);

router.get(
    "/class-performance",
    protect,
    allowRoles("admin"),
    classPerformance
);

router.get(
    "/monthly-result",
    protect,
    allowRoles("admin"),
    monthlyClassResult
);

router.get(
    "/semester-result",
    protect,
    allowRoles("admin"),
    semesterResult
);

router.get(
    "/performance-trend",
    protect,
    allowRoles("admin"),
    classMonthlyPerformanceTrend
);

export default router;