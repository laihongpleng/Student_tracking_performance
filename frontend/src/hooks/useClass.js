import { useEffect, useState } from "react";

import {
    getClasses
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



    return {

        classes,

        loading,

        fetchClasses

    };

};


export default useClass;