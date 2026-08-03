import {
    getTeacherClasses,
    getStudentsWithScores,
    getMonthlyResult,
    getSemesterResult,
    getSubjectRanking,
    getStudentProgress,
    getTeacherStatistics
} from "../services/teacherclassesdashboard.service.js";


export const teacherClasses = async (
    req,
    res
) => {

    try {

        const academicYear =
            req.query.academicYear;

        if(!academicYear){

            return res.status(400)
            .json({
                message:
                "Academic year required"
            });

        }

        const data =
            await getTeacherClasses(
                req.user._id,
                academicYear
            );

        res.json(data);

    } catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const studentsWithScores = async(
    req,
    res
)=>{

    try{

        const data =
            await getStudentsWithScores(
                req.user._id,
                req.params.classId,
                req.params.subjectId
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const monthlyResult = async(
    req,
    res
)=>{

    try{

        const {
            month
        } = req.query;


        if(!month){

            return res.status(400)
            .json({
                message:
                "Month is required"
            });

        }

        const data =
            await getMonthlyResult(
                req.user._id,
                req.params.classId,
                req.params.subjectId,
                month
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const semesterResult = async(
    req,
    res
)=>{

    try{

        const {
            semester
        } = req.query;


        if(!semester){

            return res.status(400)
            .json({
                message:
                "Semester is required"
            });

        }

        const data =
            await getSemesterResult(
                req.params.classId,
                req.params.subjectId,
                semester
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const subjectRanking = async(
    req,
    res
)=>{

    try{

        const data =
            await getSubjectRanking(
                req.params.classId,
                req.params.subjectId
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const studentProgress = async(
    req,
    res
)=>{

    try{

        const {
            subjectId
        } = req.query;


        if(!subjectId){

            return res.status(400)
            .json({
                message:
                "Subject ID required"
            });

        }

        const data =
            await getStudentProgress(
                req.params.studentId,
                subjectId
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};


export const teacherStatistics = async(
    req,
    res
)=>{

    try{

        const data =
            await getTeacherStatistics(
                req.params.classId,
                req.params.subjectId
            );

        res.json(data);

    }catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

};