import { useEffect, useState } from "react";
import adminService from "../services/adminDashboardService";

const useMonthlyResult = (academicYear, month) => {

    const [monthlyResult, setMonthlyResult] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if(!academicYear || !month){
            return;
        }


        const fetchData = async()=>{

            try{

                setLoading(true);


                const data =
                    await adminService.getMonthlyResult(
                        academicYear,
                        month
                    );


                setMonthlyResult(data);


            }
            catch(error){

                console.error(error);

            }
            finally{

                setLoading(false);

            }

        };


        fetchData();


    },[academicYear,month]);


    return {
        monthlyResult,
        loading
    };

};


export default useMonthlyResult;