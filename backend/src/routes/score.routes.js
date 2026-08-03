import express from "express";

import {
    createAssessmentController,
    saveScores,
    editScore,
    getAssessmentScores,
    getStudentScoreList,
    getStudentScoreResultController,
    getAssessmentStudentList,
} from "../controllers/score.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";


const router = express.Router();


router.post(
    "/assessment",
    protect,
    allowRoles("teacher"),
    createAssessmentController
);


router.post(
    "/assessment/:assessmentId",
    protect,
    allowRoles("teacher"),
    saveScores
);


router.put(
    "/:id",
    protect,
    allowRoles("teacher"),
    editScore
);


router.get(
    "/assessment/:assessmentId",
    protect,
    allowRoles("admin", "teacher"),
    getAssessmentScores
);


router.get(
    "/student/:studentId",
    protect,
    allowRoles(
        "admin",
        "teacher",
        "student"
    ),
    getStudentScoreList
);


router.get(
    "/student/:studentId/result",
    protect,
    allowRoles(
        "admin",
        "teacher",
        "student"
    ),
    getStudentScoreResultController
);


router.get(
    "/assessment/:assessmentId/students",
    protect,
    allowRoles("teacher"),
    getAssessmentStudentList
);


export default router;