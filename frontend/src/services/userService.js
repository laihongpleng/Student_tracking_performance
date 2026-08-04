import api from "./api";

export const deactivateUser = async (id) => {

    const res=await api.patch(`/users/${id}/deactivate`);
    return res.data;
};


export const activateUser=async(id)=>{

    const res=await api.patch(`/users/${id}/activate`);
    return res.data;
};