import api from "./api";


export const getAttendanceOverview = async (classId) => {

    const today = new Date()
        .toISOString()
        .split("T")[0];


    const res = await api.get(
        `/attendance/class/${classId}/summary`,
        {
            params:{
                startDate: today,
                endDate: today
            }
        }
    );


    return res.data;

};

export const createAttendance = async(data)=>{

    const res = await api.post(
        "/attendance",
        data
    );

    return res.data;

};

export const getAttendanceByClassSubjectDate = async(
    classId,
    subjectId,
    date
)=>{


    const res = await api.get(

        `/attendance/class/${classId}/subject/${subjectId}/date/${date}`

    );


    return res.data;


};

export const updateAttendance = async(
    attendanceId,
    data
)=>{


    const res = await api.put(

        `/attendance/${attendanceId}`,

        data

    );


    return res.data;


};