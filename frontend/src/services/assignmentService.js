import api from "./api";



export const getAssignments = async()=>{

    const res = await api.get("/assignments");

    return res.data;

};



export const createAssignment = async(data)=>{

    const res = await api.post(
        "/assignments",
        data
    );

    return res.data;

};




export const updateAssignment = async(id,data)=>{

    const res = await api.put(
        `/assignments/${id}`,
        data
    );

    return res.data;

};




export const deactivateAssignment = async(id)=>{

    const res = await api.patch(
        `/assignments/${id}/deactivate`
    );

    return res.data;

};




export const activateAssignment = async(id)=>{

    const res = await api.patch(
        `/assignments/${id}/activate`
    );

    return res.data;

};