import api from "./api";



export const getSubjects = async()=>{

    const res = await api.get("/subjects");

    return res.data;

};




export const createSubject = async(data)=>{

    const res = await api.post(
        "/subjects",
        data
    );

    return res.data;

};




export const updateSubject = async(id,data)=>{

    const res = await api.put(
        `/subjects/${id}`,
        data
    );

    return res.data;

};




export const deactivateSubject = async(id)=>{

    const res = await api.patch(
        `/subjects/${id}/deactivate`
    );

    return res.data;

};




export const activateSubject = async(id)=>{

    const res = await api.patch(
        `/subjects/${id}/activate`
    );

    return res.data;

};