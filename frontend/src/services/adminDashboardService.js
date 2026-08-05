import api from "./api";

export const getAdminDashboard = async (academicYear) => {

    const res = await api.get(
        `/admin/dashboard?academicYear=${academicYear}`
    );

    return res.data;

};


export const getMonthlyResult = async (
    academicYear,
    month
) => {

    const response = await api.get(
        "/admin/monthly-result",
        {
            params:{
                academicYear,
                month
            }
        }
    );


    return response.data;

};



export default {
    getMonthlyResult
};