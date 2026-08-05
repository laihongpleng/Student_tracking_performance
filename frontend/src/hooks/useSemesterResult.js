import { useEffect, useState } from "react";
import adminService from "../services/adminDashboardService";


const useSemesterResult = (
    academicYear,
    semester
)=>{


    const [
        semesterResult,
        setSemesterResult
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);



    useEffect(()=>{


        if(!academicYear || !semester){
            return;
        }


        const fetchData = async()=>{

            try{

                setLoading(true);


                const data =
                    await adminService.getSemesterResult(
                        academicYear,
                        semester
                    );


                setSemesterResult(data);


            }
            catch(error){

                console.error(error);

            }
            finally{

                setLoading(false);

            }

        };


        fetchData();


    },[
        academicYear,
        semester
    ]);



    return {
        semesterResult,
        loading
    };

};


export default useSemesterResult;