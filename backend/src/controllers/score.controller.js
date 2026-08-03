import {
    createAssessment,
    enterScores,
    updateScore,
    getScoresByAssessment,
    getStudentScores,
    getStudentScoreResult,
    getStudentsForAssessment
} from "../services/score.service.js";


export const createAssessmentController = async (req, res) => {
    try {
        const assessment = await createAssessment(
            req.user._id,
            req.body
        );

        res.status(201).json({
            message: "Assessment created successfully",
            assessment
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


export const saveScores = async (req, res) => {
    try {
        const scores = await enterScores(
            req.user._id,
            req.params.assessmentId,
            req.body.scores
        );

        res.status(201).json({
            message: "Scores saved successfully",
            scores
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


export const editScore = async (req, res) => {
    try {
        const score = await updateScore(
            req.user._id,
            req.params.id,
            req.body
        );

        res.json({
            message: "Score updated successfully",
            score
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


export const getAssessmentScores = async (req, res) => {
    try {
        const scores = await getScoresByAssessment(
            req.params.assessmentId
        );

        res.json(scores);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const getStudentScoreList = async (req, res) => {
    try {
        const scores = await getStudentScores(
            req.params.studentId
        );

        res.json(scores);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const getStudentScoreResultController = async (req, res) => {
    try {
        const result = await getStudentScoreResult(
            req.params.studentId
        );

        res.json(result);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const getAssessmentStudentList = async (req, res) => {
    try {
        const students = await getStudentsForAssessment(
            req.params.assessmentId
        );

        res.json(students);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};