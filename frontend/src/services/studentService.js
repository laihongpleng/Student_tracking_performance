import api from "./api";


export const getStudents = async()=>{

    const res = await api.get("/students");
    return res.data;
};


export const createStudent = async(data)=>{

    const res = await api.post("/students",data);
    return res.data;
};



export const updateStudent = async(id,data)=>{

    const res = await api.put(`/students/${id}`,data);
    return res.data;

};

export const getStudentsByClass = async(classId)=>{

    const res = await api.get(
        `/students/class/${classId}`
    );

    return res.data;

};