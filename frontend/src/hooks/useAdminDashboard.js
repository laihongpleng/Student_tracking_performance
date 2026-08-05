import { useEffect, useState } from "react";

import {
    getAdminDashboard
} from "../services/adminDashboardService";

const useAdminDashboard = (academicYear) => {

    const [dashboard,setDashboard] = useState(null);

    const [loading,setLoading] = useState(false);



    const fetchDashboard = async()=>{

        try{

            setLoading(true);

            const data = await getAdminDashboard(
                academicYear
            );

            setDashboard(data);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        if(academicYear){

            fetchDashboard();

        }

    },[academicYear]);



    return{

        dashboard,

        loading,

        fetchDashboard

    };

};

export default useAdminDashboard;