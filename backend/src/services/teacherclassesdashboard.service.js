import Teacher from "../models/Teacher.js";
import TeacherAssignment from "../models/TeacherAssignment.js";
import Student from "../models/Student.js";
import Score from "../models/Score.js";
import Assessment from "../models/Assessment.js";

export const getTeacherClasses = async (
    userId,
    academicYear
) => {

    const teacher =
        await Teacher.findOne({
            user_id:userId
        });

    if(!teacher){
        throw new Error(
            "Teacher not found"
        );
    }

    const assignments =
        await TeacherAssignment.find({
            teacher_id:teacher._id,
            isActive:true
        })
        .populate(
            "class_id",
            "class_name academic_year"
        )
        .populate(
            "subject_id",
            "subject_name"
        );

    const classMap = {};

    for(const item of assignments){

        if(
            item.class_id.academic_year
            !== academicYear
        ){
            continue;
        }

        const classId =
            item.class_id._id.toString();

        if(!classMap[classId]){

            const totalStudents =
                await Student.countDocuments({
                    class_id:item.class_id._id
                });

            classMap[classId] = {
                class_id:item.class_id._id,
                class_name:item.class_id.class_name,
                totalStudents,
                subjects:[]
            };

        }

        classMap[classId]
        .subjects
        .push({
            subject_id:item.subject_id._id,
            subject_name:item.subject_id.subject_name
        });

    }

    return {
        teacher:{
            id:teacher._id,
            name:teacher.full_name
        },
        classes:
            Object.values(classMap)
    };

};


export const getStudentsWithScores = async(
    userId,
    classId,
    subjectId
)=>{

    const teacher =
        await Teacher.findOne({
            user_id:userId
        });

    if(!teacher){
        throw new Error(
            "Teacher not found"
        );
    }

    const assignment =
        await TeacherAssignment.findOne({
            teacher_id:teacher._id,
            class_id:classId,
            subject_id:subjectId,
            isActive:true
        });

    if(!assignment){
        throw new Error(
            "You are not assigned to this subject"
        );
    }

    const students =
        await Student.find({
            class_id:classId
        })
        .select("full_name")
        .sort({
            full_name:1
        });

    const assessments =
        await Assessment.find({
            class_id:classId,
            subject_id:subjectId
        })
        .sort({
            assessment_date:1
        });

    const result = [];

    for(const student of students){

        const scores =
            await Score.find({
                student_id:student._id,
                assessment_id:{
                    $in:
                    assessments.map(
                        a=>a._id
                    )
                }
            });

        result.push({
            student_id:student._id,
            student_name:student.full_name,
            scores:
                assessments.map(a=>{

                    const score =
                        scores.find(
                            s =>
                            s.assessment_id.toString()
                            ===
                            a._id.toString()
                        );

                    return {
                        assessment_id:a._id,
                        title:a.title,
                        score:
                            score
                            ?
                            score.score
                            :
                            null,
                        max_score:a.max_score,
                        weight:a.weight
                    };

                })
        });

    }

    return {
        assessments,
        students:result
    };

};


export const getMonthlyResult = async(
    userId,
    classId,
    subjectId,
    month
)=>{

    const assessments =
        await Assessment.find({
            class_id:classId,
            subject_id:subjectId,
            $expr:{
                $eq:[
                    {
                        $month:
                        "$assessment_date"
                    },
                    Number(month)
                ]
            }
        });

    const students =
        await Student.find({
            class_id:classId
        });

    const result=[];

    for(const student of students){

        const scores =
            await Score.find({
                student_id:student._id,
                assessment_id:{
                    $in:
                    assessments.map(
                        a=>a._id
                    )
                }
            });

        let total=0;

        assessments.forEach(a=>{

            const score =
                scores.find(
                    s =>
                    s.assessment_id.toString()
                    ===
                    a._id.toString()
                );

            if(score){

                total +=
                (
                    score.score /
                    a.max_score
                )
                *
                100;

            }

        });

        const average =
            assessments.length===0
            ?
            0
            :
            Number(
                (
                    total /
                    assessments.length
                )
                .toFixed(2)
            );

        result.push({
            student:student.full_name,
            average
        });

    }

    return calculateRanking(result);

};


export const getSemesterResult = async(
    classId,
    subjectId,
    semester
)=>{

    const assessments =
        await Assessment.find({
            class_id:classId,
            subject_id:subjectId,
            semester
        });

    return calculateStudentAverage(
        classId,
        assessments
    );

};


export const getSubjectRanking = async(
    classId,
    subjectId
)=>{

    const assessments =
        await Assessment.find({
            class_id:classId,
            subject_id:subjectId
        });

    const result =
        await calculateStudentAverage(
            classId,
            assessments
        );

    return calculateRanking(result);

};


export const getStudentProgress = async(
    studentId,
    subjectId
)=>{

    const assessments =
        await Assessment.find({
            subject_id:subjectId
        })
        .sort({
            assessment_date:1
        });

    const result=[];

    for(const a of assessments){

        const score =
            await Score.findOne({
                student_id:studentId,
                assessment_id:a._id
            });

        result.push({
            month:
                a.assessment_date.getMonth()+1,
            assessment:a.title,
            score:
                score
                ?
                (
                    score.score /
                    a.max_score *
                    100
                ).toFixed(2)
                :
                0
        });

    }

    return result;

};


export const getTeacherStatistics = async(
    classId,
    subjectId
)=>{

    const students =
        await Student.countDocuments({
            class_id:classId
        });

    const assessments =
        await Assessment.countDocuments({
            class_id:classId,
            subject_id:subjectId
        });

    return {
        totalStudents:students,
        totalAssessments:assessments
    };

};


const calculateStudentAverage =
async(
    classId,
    assessments
)=>{

    const students =
        await Student.find({
            class_id:classId
        });

    const result=[];

    for(const student of students){

        let total=0;

        for(const a of assessments){

            const score =
                await Score.findOne({
                    student_id:student._id,
                    assessment_id:a._id
                });

            if(score){

                total +=
                (
                    score.score /
                    a.max_score
                )
                *
                100;

            }

        }

        result.push({
            student:student.full_name,
            average:
                assessments.length
                ?
                Number(
                    (
                        total /
                        assessments.length
                    )
                    .toFixed(2)
                )
                :
                0
        });

    }

    return result;

};


const calculateRanking =
(data)=>{

    return data
    .sort(
        (a,b)=>
        b.average-a.average
    )
    .map(
        (item,index)=>({
            rank:index+1,
            ...item
        })
    );

};