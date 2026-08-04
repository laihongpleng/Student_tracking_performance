import { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    updateStudent
} from "../services/studentService";

import {
    deactivateUser,
    activateUser
} from "../services/userService";


const useStudent = () => {

    const [students,setStudents] = useState([]);

    const [loading,setLoading] = useState(false);



    const fetchStudents = async()=>{

        try{

            setLoading(true);

            const data = await getStudents();

            setStudents(data);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchStudents();

    },[]);





    const saveStudent = async(data,id)=>{

        let result;


        try{

            setLoading(true);


            if(id){

                result = await updateStudent(
                    id,
                    data
                );

            }
            else{

                result = await createStudent(
                    data
                );

            }


            await fetchStudents();


            return result;


        }
        finally{

            setLoading(false);

        }

    };





    const changeStatus = async(id,status)=>{

        try{

            setLoading(true);


            if(status){

                await activateUser(id);

            }
            else{

                await deactivateUser(id);

            }


            await fetchStudents();


        }
        finally{

            setLoading(false);

        }

    };





    return {

        students,

        loading,

        saveStudent,

        changeStatus,

        fetchStudents

    };

};


export default useStudent;