import { useEffect, useState } from "react";

import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deactivateAssignment,
    activateAssignment
} from "../services/assignmentService";


const useAssignment = () => {


    const [assignments,setAssignments] = useState([]);

    const [loading,setLoading] = useState(false);



    const fetchAssignments = async()=>{

        try{

            setLoading(true);

            const data = await getAssignments();

            setAssignments(data);

        }
        finally{

            setLoading(false);

        }

    };




    useEffect(()=>{

        fetchAssignments();

    },[]);





    const saveAssignment = async(data,id)=>{

        let result;


        try{

            setLoading(true);


            if(id){

                result = await updateAssignment(
                    id,
                    data
                );

            }
            else{

                result = await createAssignment(
                    data
                );

            }


            await fetchAssignments();


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

                await activateAssignment(id);

            }
            else{

                await deactivateAssignment(id);

            }


            await fetchAssignments();


        }
        finally{

            setLoading(false);

        }

    };






    return {

        assignments,

        loading,

        saveAssignment,

        changeStatus,

        fetchAssignments

    };


};


export default useAssignment;