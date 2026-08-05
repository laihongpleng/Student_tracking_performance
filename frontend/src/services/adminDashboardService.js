import api from "./api";

export const getAdminDashboard = async (academicYear) => {

    const res = await api.get(
        `/admin/dashboard?academicYear=${academicYear}`
    );

    return res.data;

};