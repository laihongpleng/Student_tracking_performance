import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Score from "../models/Score.js";
import Attendance from "../models/Attendance.js";
import Assessment from "../models/Assessment.js";
import TeacherAssignment from "../models/TeacherAssignment.js";

const getAcademicClasses = async (academicYear) => {
    const classes = await Class.find({
        academic_year: academicYear
    });

    const classIds = classes.map(
        item => item._id
    );

    return {
        classes,
        classIds
    };
};

export const getClassOverview = async(academicYear)=>{

    const classes=await Class.find({
        academic_year:academicYear,
        isActive:true
    });


    const grades={};


    for(const item of classes){

        const match = item.class_name.match(/\d+/);

        if(!match){
            continue;
        }

        const gradeNumber = match[0];

                if(!grades[gradeNumber]){

            grades[gradeNumber] = {

                name:`Grade ${gradeNumber}`,

                classes:[]

            };

        }


        const students=await Student.countDocuments({
            class_id:item._id
        });


        grades[gradeNumber].classes.push({

            name:item.class_name,

            students

        });

    }


    return Object.values(grades);

};

export const getDashboardSummary = async (academicYear) => {

    const {
        classes,
        classIds
    } = await getAcademicClasses(
        academicYear
    );


    const totalStudents = await Student.countDocuments({
        class_id: {
            $in: classIds
        }
    });


    const assignments = await TeacherAssignment.find({
        class_id: {
            $in: classIds
        },
        isActive: true
    });


    const teacherIds = [
        ...new Set(
            assignments.map(
                item => item.teacher_id.toString()
            )
        )
    ];


    const totalTeachers = teacherIds.length;

    const totalClasses = classes.length;


    const assessments = await Assessment.find({
        class_id: {
            $in: classIds
        }
    });


    const assessmentIds = assessments.map(
        item => item._id
    );


    const scores = await Score.find({
        assessment_id: {
            $in: assessmentIds
        }
    }).populate(
        "assessment_id",
        "max_score weight"
    );


    let totalContribution = 0;
    let totalWeight = 0;


    scores.forEach(item => {

        const assessment = item.assessment_id;

        if (assessment) {

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


            totalContribution += contribution;

            totalWeight += assessment.weight;
        }

    });


    const averageScore =
        totalWeight === 0
        ? 0
        : Number(
            (
                totalContribution /
                totalWeight *
                100
            ).toFixed(2)
        );


    const attendance = await Attendance.find({
        class_id: {
            $in: classIds
        }
    });


    let present = 0;


    attendance.forEach(item => {

        if (
            item.status === "Present" ||
            item.status === "Late" ||
            item.status === "Excused"
        ) {
            present++;
        }

    });


    const attendanceRate =
        attendance.length === 0
        ? 0
        : Number(
            (
                present /
                attendance.length *
                100
            ).toFixed(2)
        );
    const classOverview =
    await getClassOverview(
        academicYear
    );


    return {
        totalStudents,
        totalTeachers,
        totalClasses,
        averageScore,
        attendanceRate,
        classOverview
    };

};

export const getStudentRanking = async (
    academicYear,
    limit = 10
) => {

    const {
        classIds
    } = await getAcademicClasses(
        academicYear
    );


    const students = await Student.find({
        class_id: {
            $in: classIds
        }
    }).populate(
        "class_id",
        "class_name"
    );


    const ranking = [];


    for (const student of students) {

        const scores = await Score.find({
            student_id: student._id
        }).populate(
            "assessment_id",
            "max_score weight"
        );


        let totalScore = 0;


        scores.forEach(item => {

            const assessment = item.assessment_id;


            if (assessment) {

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


                totalScore += contribution;

            }

        });


        ranking.push({

            student_id:
                student._id,

            student_name:
                student.full_name,

            class:
                student.class_id?.class_name || "N/A",

            score:
                Number(
                    totalScore.toFixed(2)
                )

        });

    }


    ranking.sort(
        (a, b) =>
            b.score - a.score
    );


    return ranking
        .slice(0, limit)
        .map(
            (item, index) => ({

                rank:
                    index + 1,

                ...item

            })
        );

};

export const getStudentDistribution = async (
    academicYear
) => {

    const classes = await Class.find({

        academic_year:
            academicYear

    });


    const result = [];


    for (const classData of classes) {

        const totalStudents =
            await Student.countDocuments({

                class_id:
                    classData._id

            });


        result.push({

            class_id:
                classData._id,

            class_name:
                classData.class_name,

            totalStudents

        });

    }


    return result;

};

export const getSubjectPerformance = async (
    academicYear
) => {

    const {
        classIds
    } = await getAcademicClasses(
        academicYear
    );


    const assessments = await Assessment.find({

        class_id: {
            $in: classIds
        }

    }).populate(
        "subject_id",
        "subject_name"
    );


    const assessmentIds =
        assessments.map(
            item => item._id
        );


    const scores = await Score.find({

        assessment_id: {
            $in: assessmentIds
        }

    }).populate(
        "assessment_id",
        "max_score subject_id"
    );


    const subjectMap = {};


    scores.forEach(item => {

        const assessment =
            item.assessment_id;


        const subject =
            assessments.find(
                a =>
                a._id.toString() ===
                assessment._id.toString()
            )?.subject_id;


        if (!subject) {
            return;
        }


        const percentage =
            (
                item.score /
                assessment.max_score
            ) * 100;


        if (!subjectMap[subject._id]) {

            subjectMap[subject._id] = {

                subject_id:
                    subject._id,

                subject_name:
                    subject.subject_name,

                total:
                    0,

                count:
                    0

            };

        }


        subjectMap[subject._id].total +=
            percentage;


        subjectMap[subject._id].count++;

    });


    return Object.values(
        subjectMap
    ).map(item => ({

        subject_id:
            item.subject_id,

        subject:
            item.subject_name,

        average:
            Number(
                (
                    item.total /
                    item.count
                ).toFixed(2)
            )

    }));

};

export const getAttendanceByClass = async (
    academicYear
) => {

    const {
        classes,
        classIds
    } = await getAcademicClasses(
        academicYear
    );


    const attendance = await Attendance.find({

        class_id: {
            $in: classIds
        }

    });


    const result = [];


    for (const classData of classes) {

        const classAttendance =
            attendance.filter(
                item =>
                item.class_id.toString() ===
                classData._id.toString()
            );


        let present = 0;


        classAttendance.forEach(item => {

            if (
                item.status === "Present" ||
                item.status === "Late" ||
                item.status === "Excused"
            ) {
                present++;
            }

        });


        result.push({

            class_id:
                classData._id,

            class_name:
                classData.class_name,

            attendanceRate:

                classAttendance.length === 0
                ? 0
                : Number(
                    (
                        present /
                        classAttendance.length *
                        100
                    ).toFixed(2)
                )

        });

    }


    return result;

};

export const getClassPerformance = async (
    academicYear
) => {

    const {
        classes,
        classIds
    } = await getAcademicClasses(
        academicYear
    );

    const students = await Student.find({

        class_id: {
            $in: classIds
        }

    });

    const assessments = await Assessment.find({

        class_id: {
            $in: classIds
        }

    }).select(
        "max_score weight class_id"
    );

    const assessmentIds =
        assessments.map(
            item => item._id
        );


    const scores = await Score.find({

        assessment_id: {
            $in: assessmentIds
        }

    }).populate(
        "assessment_id",
        "max_score weight class_id"
    );


    const attendance = await Attendance.find({

        class_id: {
            $in: classIds
        }

    });


    const result = [];


    for (const classData of classes) {

        const classStudents =
            students.filter(
                student =>
                student.class_id.toString() ===
                classData._id.toString()
            );


        const studentIds =
            classStudents.map(
                student =>
                student._id.toString()
            );


        const classScores =
            scores.filter(
                score =>
                studentIds.includes(
                    score.student_id.toString()
                )
            );


        let totalScore = 0;

        let totalWeight = 0;


        classScores.forEach(item => {

            const assessment =
                item.assessment_id;


            if (assessment) {

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


                totalScore += contribution;

                totalWeight += assessment.weight;

            }

        });

        const classAttendance =
            attendance.filter(
                item =>
                item.class_id.toString() ===
                classData._id.toString()
            );


        let present = 0;


        classAttendance.forEach(item => {

            if (
                item.status === "Present" ||
                item.status === "Late" ||
                item.status === "Excused"
            ) {
                present++;
            }

        });


        result.push({

            class_id:
                classData._id,

            class_name:
                classData.class_name,

            totalStudents:
                classStudents.length,


            averageScore:

                totalWeight === 0
                ? 0
                : Number(
                    (
                        totalScore /
                        totalWeight *
                        100
                    ).toFixed(2)
                ),


            attendanceRate:

                classAttendance.length === 0
                ? 0
                : Number(
                    (
                        present /
                        classAttendance.length *
                        100
                    ).toFixed(2)
                )

        });

    }

    return result;

};

export const getMonthlyClassResult = async (
    academicYear,
    month
) => {

    const classes =
        await Class.find({
            academic_year: academicYear
        });

    const result = [];

    for(const classData of classes){

        const students =
            await Student.find({
                class_id:
                    classData._id
            });

        const assessments =
            await Assessment.find({

                class_id:
                    classData._id,

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

        const assessmentIds =
            assessments.map(
                item=>item._id
            );

        const scores =
            await Score.find({

                assessment_id:{
                    $in:
                    assessmentIds
                }

            })
            .populate({

                path:"assessment_id",

                populate:{
                    path:"subject_id",
                    select:
                    "subject_name"
                }

            });

        const studentResults=[];

        for(const student of students){

            const studentScores =
                scores.filter(
                    item =>
                    item.student_id.toString()
                    ===
                    student._id.toString()
                );

            const subjects={};

            studentScores.forEach(item=>{


                const subject =
                    item.assessment_id
                    ?.subject_id;

                if(!subject){
                    return;
                }

                const subjectId =
                    subject._id.toString();

                if(!subjects[subjectId]){

                    subjects[subjectId]={

                        subject_name:
                        subject.subject_name,

                        total:0,

                        count:0

                    };

                }

                const percentage =
                (
                    item.score /
                    item.assessment_id.max_score
                )
                *
                100;

                subjects[subjectId].total
                += percentage;

                subjects[subjectId].count++;

            });

            let totalSubjectScore=0;

            let subjectCount=0;

            Object.values(subjects)
            .forEach(subject=>{


                const subjectAverage =
                subject.total /
                subject.count;

                totalSubjectScore
                += subjectAverage;

                subjectCount++;

            });

            const studentAverage =
            subjectCount === 0
            ?
            0
            :
            Number(
                (
                    totalSubjectScore /
                    subjectCount
                )
                .toFixed(2)
            );

            studentResults.push({

                student_id:
                student._id,

                student_name:
                student.full_name,

                average:
                studentAverage

            });

        }

        const totalStudents =
            studentResults.length;


        const classAverage =
        totalStudents === 0
        ?
        0
        :
        Number(

            (
                studentResults.reduce(
                    (sum,item)=>
                    sum + item.average,
                    0
                )
                /
                totalStudents
            )
            .toFixed(2)

        );


        let highest =
        null;


        let lowest =
        null;

        studentResults.forEach(student=>{


            if(
                !highest ||
                student.average >
                highest.average
            ){

                highest=student;

            }


            if(
                !lowest ||
                student.average <
                lowest.average
            ){

                lowest=student;

            }

        });

        const passStudents =
        studentResults.filter(
            student =>
            student.average >= 50
        ).length;

        const passRate =
        totalStudents===0
        ?
        0
        :
        Number(

            (
                passStudents /
                totalStudents *
                100
            )
            .toFixed(2)

        );

        result.push({

            class_id:
            classData._id,

            class_name:
            classData.class_name,

            totalStudents,

            averageScore:
            classAverage,


            highestStudent:
            highest,


            lowestStudent:
            lowest,


            passRate,

            students:
            studentResults

        });


    }

    return result;

};

export const getSemesterClassResult = async (
    academicYear,
    semester
) => {

    const classes = await Class.find({
        academic_year: academicYear
    });


    const result = [];


    for (const classData of classes) {

        const students = await Student.find({
            class_id: classData._id
        });


        const studentResults = [];


        for (const student of students) {

            const scores = await Score.find({
                student_id: student._id
            })
            .populate({
                path: "assessment_id",
                match: {
                    semester,
                    class_id: classData._id
                },
                select:
                    "max_score subject_id semester"
            });


            const validScores =
                scores.filter(
                    item =>
                        item.assessment_id
                );


            if (validScores.length === 0) {
                continue;
            }


            const subjects = {};


            validScores.forEach(item => {

                const assessment =
                    item.assessment_id;


                const percentage =
                    (
                        item.score /
                        assessment.max_score
                    ) * 100;


                const subjectId =
                    assessment.subject_id.toString();


                if (!subjects[subjectId]) {

                    subjects[subjectId] = {

                        total: 0,

                        count: 0

                    };

                }


                subjects[subjectId].total +=
                    percentage;


                subjects[subjectId].count++;

            });


            let totalSubjectScore = 0;

            let totalSubjectCount = 0;


            Object.values(subjects)
            .forEach(subject => {

                const subjectAverage =
                    subject.total /
                    subject.count;


                totalSubjectScore +=
                    subjectAverage;


                totalSubjectCount++;

            });


            const finalScore =
                totalSubjectCount === 0
                ? 0
                : Number(
                    (
                        totalSubjectScore /
                        totalSubjectCount
                    ).toFixed(2)
                );


            studentResults.push({

                student_id:
                    student._id,

                student_name:
                    student.full_name,

                score:
                    finalScore

            });

        }


        if (studentResults.length === 0) {

            result.push({

                class_id:
                    classData._id,

                class_name:
                    classData.class_name,

                semester,

                averageScore: 0,

                highestScore: 0,

                lowestScore: 0,

                passRate: 0

            });


            continue;
        }


        studentResults.sort(
            (a, b) =>
                b.score - a.score
        );


        const scores =
            studentResults.map(
                item =>
                    item.score
            );


        const averageScore =
            Number(
                (
                    scores.reduce(
                        (a, b) =>
                            a + b,
                        0
                    )
                    /
                    scores.length
                ).toFixed(2)
            );


        const highestScore =
            Math.max(...scores);


        const lowestScore =
            Math.min(...scores);


        const passStudents =
            studentResults.filter(
                item =>
                    item.score >= 50
            );


        const passRate =
            Number(
                (
                    passStudents.length /
                    studentResults.length *
                    100
                ).toFixed(2)
            );


        result.push({

            class_id:
                classData._id,

            class_name:
                classData.class_name,

            semester,

            totalStudents:
                studentResults.length,

            averageScore,

            highestScore,

            lowestScore,

            passRate

        });

    }


    return result;

};

export const getClassMonthlyPerformanceTrend = async (
    academicYear,
    semester
) => {

    const classes = await Class.find({
        academic_year: academicYear
    });


    const result = [];


    for (const classData of classes) {

        const assessmentFilter = {
            class_id: classData._id
        };


        if (semester) {

            assessmentFilter.semester =
                semester;

        }


        const assessments =
            await Assessment.find(
                assessmentFilter
            );


        const monthlyData = {};


        for (const assessment of assessments) {

            if (!assessment.assessment_date) {
                continue;
            }


            const date =
                new Date(
                    assessment.assessment_date
                );


            const month =
                date.toLocaleString(
                    "default",
                    {
                        month: "long"
                    }
                );


            const scores =
                await Score.find({

                    assessment_id:
                        assessment._id

                });


            if (scores.length === 0) {
                continue;
            }


            let totalPercentage = 0;


            scores.forEach(score => {

                const percentage =
                    (
                        score.score /
                        assessment.max_score
                    ) * 100;


                totalPercentage +=
                    percentage;

            });


            const assessmentAverage =
                totalPercentage /
                scores.length;


            if (!monthlyData[month]) {

                monthlyData[month] = {

                    total: 0,

                    count: 0

                };

            }


            monthlyData[month].total +=
                assessmentAverage;


            monthlyData[month].count++;

        }


        const monthlyPerformance =
            Object.keys(monthlyData)
            .map(month => ({

                month,

                averageScore:
                    Number(
                        (
                            monthlyData[month].total /
                            monthlyData[month].count
                        ).toFixed(2)
                    )

            }));


        result.push({

            class_id:
                classData._id,

            class_name:
                classData.class_name,

            monthlyPerformance

        });

    }


    return result;

};

