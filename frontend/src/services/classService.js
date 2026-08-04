import api from "./api";

export const getClasses = async()=>{
    const res = await api.get("/classes");
    return res.data;
};

export const createClass = async(data)=>{
    const res = await api.post("/classes",data);
    return res.data;
};


export const updateClass = async(id,data)=>{
    const res = await api.put(`/classes/${id}`,data);
    return res.data;
};


export const deactivateClass = async(id)=>{

    const res = await api.patch(`/classes/${id}/deactivate`);
    return res.data;
};


export const activateClass = async(id)=>{

    const res = await api.patch( `/classes/${id}/activate`);
    return res.data;
};