import Assessment from "../models/Assessment.js";
import Score from "../models/Score.js";
import Teacher from "../models/Teacher.js";
import TeacherAssignment from "../models/TeacherAssignment.js";
import Student from "../models/Student.js";

export const createAssessment = async (
    userId,
    data
) => {

    const teacher = await Teacher.findOne({
        user_id: userId
    });


    if (!teacher) {
        throw new Error(
            "Teacher not found"
        );
    }


    const assignment =
        await TeacherAssignment.findById(
            data.teacher_assignment_id
        );


    if (!assignment) {
        throw new Error(
            "Teacher assignment not found"
        );
    }


    if (
        assignment.teacher_id.toString()
        !== teacher._id.toString()
    ) {
        throw new Error(
            "You are not assigned to this class"
        );
    }

    if (
        !data.title ||
        data.title.trim() === ""
    ) {
        throw new Error(
            "Assessment title is required"
        );
    }


    if (
        !data.max_score ||
        data.max_score <= 0
    ) {
        throw new Error(
            "Maximum score must be greater than 0"
        );
    }


    if (
        !data.weight ||
        data.weight <= 0
    ) {
        throw new Error(
            "Assessment weight must be greater than 0"
        );
    }


    if (data.weight > 100) {
        throw new Error(
            "Assessment weight cannot exceed 100%"
        );
    }


    const existingAssessments =
        await Assessment.find({

            class_id:
                assignment.class_id,

            subject_id:
                assignment.subject_id,

            semester:
                data.semester

        });


    const currentWeight =
        existingAssessments.reduce(
            (sum, item) =>
                sum + item.weight,
            0
        );


    if (
        currentWeight + data.weight > 100
    ) {
        throw new Error(
            `Total assessment weight cannot exceed 100%. Current: ${currentWeight}%`
        );
    }


    const assessment =
        await Assessment.create({

            title:
                data.title.trim(),

            type:
                data.type,

            max_score:
                data.max_score,

            weight:
                data.weight,

            class_id:
                assignment.class_id,

            subject_id:
                assignment.subject_id,

            teacher_assignment_id:
                assignment._id,

            teacher_id:
                teacher._id,

            semester:
                data.semester,

            assessment_date:
                data.assessment_date

        });


    return assessment;

};

export const enterScores = async (
    userId,
    assessmentId,
    scores
) => {

    const teacher =
        await Teacher.findOne({
            user_id: userId
        });


    if (!teacher) {
        throw new Error(
            "Teacher not found"
        );
    }

    const assessment =
        await Assessment.findById(
            assessmentId
        );


    if (!assessment) {
        throw new Error(
            "Assessment not found"
        );
    }

    if (
        assessment.teacher_id.toString()
        !== teacher._id.toString()
    ) {
        throw new Error(
            "You cannot enter this score"
        );
    }

    if (
        !scores ||
        scores.length === 0
    ) {
        throw new Error(
            "Score list is empty"
        );
    }

    const scoreRecords = [];


    for (const item of scores) {

        const student =
            await Student.findById(
                item.student_id
            );


        if (!student) {
            throw new Error(
                "Student not found"
            );
        }


        if (
            student.class_id.toString()
            !==
            assessment.class_id.toString()
        ) {
            throw new Error(
                `${student.full_name} does not belong to this class`
            );
        }


        if (
            item.score >
            assessment.max_score
        ) {
            throw new Error(
                `${student.full_name} score cannot exceed maximum score`
            );
        }


        scoreRecords.push({

            student_id:
                student._id,

            assessment_id:
                assessment._id,

            score:
                item.score,

            remark:
                item.remark || ""

        });

    }


    return await Score.insertMany(
        scoreRecords
    );

};

export const updateScore = async (
    userId,
    scoreId,
    data
) => {

    const teacher =
        await Teacher.findOne({
            user_id: userId
        });


    if (!teacher) {
        throw new Error(
            "Teacher not found"
        );
    }

    const score =
        await Score.findById(
            scoreId
        )
        .populate(
            "assessment_id"
        );


    if (!score) {
        throw new Error(
            "Score not found"
        );
    }


    if (
        score.assessment_id.teacher_id.toString()
        !== teacher._id.toString()
    ) {
        throw new Error(
            "You cannot edit this score"
        );
    }

    if (data.score !== undefined) {

        if (
            data.score >
            score.assessment_id.max_score
        ) {
            throw new Error(
                "Score exceeds maximum score"
            );
        }


        score.score =
            data.score;

    }

    if (data.remark !== undefined) {

        score.remark =
            data.remark;

    }


    await score.save();


    return score;

};

export const getScoresByAssessment = async (
    assessmentId
) => {

    return await Score.find({

        assessment_id:
            assessmentId

    })
    .populate(
        "student_id",
        "full_name"
    )
    .populate(
        "assessment_id",
        "title max_score weight"
    )
    .sort({
        createdAt: 1
    });

};

export const getStudentScores = async (
    studentId
) => {

    const scores =
        await Score.find({
            student_id: studentId
        })
        .populate({
            path: "assessment_id",
            select:
                "title type max_score weight semester subject_id class_id"
        })
        .populate({
            path: "assessment_id",
            populate: {
                path: "subject_id",
                select: "subject_name"
            }
        })
        .sort({
            createdAt: -1
        });


    const result =
        scores.map((item) => {

            const assessment =
                item.assessment_id;


            const percentage =
                (
                    item.score /
                    assessment.max_score
                ) * 100;


            const contribution =
                (
                    percentage *
                    assessment.weight
                ) / 100;


            return {

                assessment: {

                    title:
                        assessment.title,

                    type:
                        assessment.type,

                    semester:
                        assessment.semester

                },


                subject:
                    assessment.subject_id
                    ?.subject_name,


                score:
                    item.score,


                max_score:
                    assessment.max_score,


                weight:
                    assessment.weight,


                percentage:
                    Number(
                        percentage.toFixed(2)
                    ),


                contribution:
                    Number(
                        contribution.toFixed(2)
                    )
            };

        });

    return result;

};

export const getStudentScoreResult = async (
    studentId
) => {

    const student =
        await Student.findById(
            studentId
        );


    if (!student) {
        throw new Error(
            "Student not found."
        );
    }

    const scores =
        await Score.find({
            student_id: studentId
        })
        .populate(
            "assessment_id",
            "title max_score weight"
        );


    if (scores.length === 0) {

        return {

            student:
                student.full_name,

            totalScore:
                0,

            grade:
                "N/A",

            details: []

        };

    }


    let totalScore = 0;


    const details =
        scores.map((item) => {

            const assessment =
                item.assessment_id;


            const weightedScore =
                (
                    item.score /
                    assessment.max_score
                )
                *
                assessment.weight;


            totalScore += weightedScore;


            return {

                assessment:
                    assessment.title,


                score:
                    item.score,


                maxScore:
                    assessment.max_score,


                percentage:
                    (
                        item.score /
                        assessment.max_score *
                        100
                    ).toFixed(2),


                weightedScore:
                    Number(
                        weightedScore.toFixed(2)
                    )
            };

        });


    let grade;


    if (totalScore >= 90) {
        grade = "A";
    }
    else if (totalScore >= 80) {
        grade = "B";
    }
    else if (totalScore >= 70) {
        grade = "C";
    }
    else if (totalScore >= 60) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    return {

        student:
            student.full_name,


        totalScore:
            Number(
                totalScore.toFixed(2)
            ),


        grade,


        details

    };

};

export const getStudentsForAssessment = async (
    assessmentId
) => {

    const assessment =
        await Assessment.findById(
            assessmentId
        );


    if (!assessment) {
        throw new Error(
            "Assessment not found"
        );
    }

    const students =
        await Student.find({

            class_id:
                assessment.class_id

        })
        .select(
            "full_name"
        );


    return students.map(
        student => ({

            student_id:
                student._id,

            full_name:
                student.full_name,

            score:
                null

        })
    );

};