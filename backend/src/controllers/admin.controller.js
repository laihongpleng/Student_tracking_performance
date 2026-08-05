import {
    getDashboardSummary,
    getStudentRanking,
    getStudentDistribution,
    getSubjectPerformance,
    getAttendanceByClass,
    getClassPerformance,
    getMonthlyClassResult,
    getSemesterClassResult,
    getClassMonthlyPerformanceTrend,
    getClassOverview
} from "../services/admin.service.js";

export const classOverview = async (req, res) => {

    try {

        const academicYear =
            req.query.academicYear;


        if(!academicYear){

            return res.status(400).json({

                message:
                "Academic year is required"

            });

        }


        const data =
            await getClassOverview(
                academicYear
            );


        res.json(data);


    }
    catch(err){

        res.status(500).json({

            message:
            err.message

        });

    }

};


export const dashboardSummary = async (req, res) => {
    try {
        const academicYear = req.query.academicYear;

        const data = await getDashboardSummary(
            academicYear
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const studentRanking = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const academicYear = req.query.academicYear;

        const ranking = await getStudentRanking(
            academicYear,
            limit
        );

        res.json(ranking);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const studentDistribution = async (req, res) => {
    try {
        const academicYear = req.query.academicYear;

        const data = await getStudentDistribution(
            academicYear
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const subjectPerformance = async (req, res) => {
    try {
        const academicYear = req.query.academicYear;

        const data = await getSubjectPerformance(
            academicYear
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const attendanceByClass = async (req, res) => {
    try {
        const academicYear = req.query.academicYear;

        const data = await getAttendanceByClass(
            academicYear
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


export const classPerformance = async (req, res) => {
    try {
        const academicYear = req.query.academicYear;

        const data = await getClassPerformance(
            academicYear
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const monthlyClassResult =
async(req,res)=>{

    try{


        const {
            academicYear,
            month
        } = req.query;


        if(
            !academicYear ||
            !month
        ){

            return res.status(400)
            .json({

                message:
                "Academic year and month are required"

            });

        }

        const data =
        await getMonthlyClassResult(
            academicYear,
            month
        );



        res.json(data);



    }
    catch(err){

        res.status(500)
        .json({

            message:
            err.message

        });

    }

};

export const semesterResult = async (req, res) => {

    try {

        const {
            academicYear,
            semester
        } = req.query;


        if (!academicYear) {

            return res.status(400).json({

                message:
                    "Academic year is required"

            });

        }


        if (!semester) {

            return res.status(400).json({

                message:
                    "Semester is required"

            });

        }


        const data =
            await getSemesterClassResult(
                academicYear,
                semester
            );


        res.json(data);


    } catch (err) {

        res.status(500).json({

            message:
                err.message

        });

    }

};

export const classMonthlyPerformanceTrend =
async(req,res)=>{

    try{

        const {
            academicYear,
            semester
        } = req.query;

        if(!academicYear){

            return res.status(400)
            .json({

                message:
                "Academic year is required"

            });

        }

        const data =
        await getClassMonthlyPerformanceTrend(
            academicYear,
            semester
        );

        res.json(data);

    }
    catch(err){

        res.status(500)
        .json({

            message:
            err.message

        });

    }

};