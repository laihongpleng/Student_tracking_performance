import {
    markAttendance,
    updateAttendance,
    getAttendanceByClass,
    getAttendanceByStudent,
    getAttendanceSummaryByClass,
    getStudentAttendanceSummary,
    getAttendanceByClassAndDate,
} from "../services/attendance.service.js";

export const createAttendance = async (req, res) => {
    try {
        const attendance = await markAttendance(req.user._id, req.body);

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

export const editAttendance = async (req, res) => {
    try {
        const attendance = await updateAttendance(
            req.user._id,
            req.params.id,
            req.body
        );

        res.json({
            message: "Attendance updated successfully",
            attendance,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

export const getClassAttendance = async (req, res) => {
    try {
        const attendance = await getAttendanceByClass(req.user._id, req.params.classId);

        res.json(attendance);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getStudentAttendance = async (req, res) => {
    try {
        const attendance = await getAttendanceByStudent(req.user._id, req.params.studentId);

        res.json(attendance);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getClassAttendanceSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const summary = await getAttendanceSummaryByClass(
            req.params.classId,
            startDate,
            endDate
        );

        res.json(summary);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getStudentAttendanceSummarycontroller = async (req, res) => {
    try {

        const summary = await getStudentAttendanceSummary(
            req.params.studentId
        );

        res.json(summary);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

export const getClassAttendanceByDate = async( req, res )=>{

    try{

        const attendance =
        await getAttendanceByClassAndDate(
            req.params.classId,
            req.params.date
        );


        res.json(attendance);


    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};