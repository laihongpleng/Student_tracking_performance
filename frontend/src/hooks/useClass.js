import { useEffect, useState } from "react";

import {
    getClasses,
    createClass,
    updateClass,
    deactivateClass,
    activateClass
} from "../services/classService";


const useClass = () => {

    const [classes,setClasses] = useState([]);

    const [loading,setLoading] = useState(false);



    const fetchClasses = async()=>{

        try{

            setLoading(true);

            const data = await getClasses();

            setClasses(data);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchClasses();

    },[]);




    const saveClass = async(data,id)=>{

        let result;


        try{

            setLoading(true);


            if(id){

                result = await updateClass(
                    id,
                    data
                );

            }
            else{

                result = await createClass(
                    data
                );

            }


            await fetchClasses();


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

                await activateClass(id);

            }
            else{

                await deactivateClass(id);

            }


            await fetchClasses();


        }
        finally{

            setLoading(false);

        }

    };






    return {

        classes,

        loading,

        saveClass,

        changeStatus,

        fetchClasses

    };

};


export default useClass;