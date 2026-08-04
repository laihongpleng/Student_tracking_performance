import { useEffect, useState } from "react";

import {
    getSubjects,
    createSubject,
    updateSubject,
    deactivateSubject,
    activateSubject
} from "../services/subjectService";


const useSubject = () => {

    const [subjects,setSubjects] = useState([]);

    const [loading,setLoading] = useState(false);



    const fetchSubjects = async()=>{

        try{

            setLoading(true);

            const data = await getSubjects();

            setSubjects(data);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchSubjects();

    },[]);





    const saveSubject = async(data,id)=>{

        try{

            setLoading(true);


            let result;


            if(id){

                result = await updateSubject(
                    id,
                    data
                );

            }
            else{

                result = await createSubject(
                    data
                );

            }


            await fetchSubjects();


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

                await activateSubject(id);

            }
            else{

                await deactivateSubject(id);

            }


            await fetchSubjects();


        }
        finally{

            setLoading(false);

        }

    };




    return {

        subjects,

        loading,

        saveSubject,

        changeStatus,

        fetchSubjects

    };

};


export default useSubject;