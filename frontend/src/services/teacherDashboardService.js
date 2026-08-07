import api from "./api";


export const getTeacherClasses = async (academicYear) => {

    const response = await api.get(
        `/teacher/dashboard?academicYear=${academicYear}`
    );

    return response.data;

};


export const getTeacherStatistics = async (
    classId,
    subjectId
) => {

    const response = await api.get(
        `/teacher/class/${classId}/subject/${subjectId}/statistics`
    );

    return response.data;

};

export const getAttendanceClass = async () => {
    const response = await api.get(
        "/teacher/attendance/class"
    );

    return response.data;
};