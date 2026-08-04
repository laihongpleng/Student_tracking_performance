import { useEffect, useState } from "react";

import {
    getTeachers,
    createTeacher,
    updateTeacher
} from "../services/teacherService";

import {
    deactivateUser,
    activateUser
} from "../services/userService";


const useTeacher = () => {

    const [teachers,setTeachers] = useState([]);

    const [loading,setLoading] = useState(false);



    const fetchTeachers = async()=>{

        try{

            setLoading(true);

            const data = await getTeachers();

            setTeachers(data);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchTeachers();

    },[]);





    const saveTeacher = async(data,id)=>{

        let result;


        try{

            setLoading(true);


            if(id){

                result = await updateTeacher(
                    id,
                    data
                );

            }
            else{

                result = await createTeacher(
                    data
                );

            }


            await fetchTeachers();


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


            await fetchTeachers();


        }
        finally{

            setLoading(false);

        }

    };





    return {

        teachers,

        loading,

        saveTeacher,

        changeStatus,

        fetchTeachers

    };

};


export default useTeacher;