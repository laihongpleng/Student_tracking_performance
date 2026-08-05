import { createContext, useContext, useState } from "react";


const AdminContext = createContext();



export const AdminProvider = ({children}) => {


    const [academicYear,setAcademicYear] = useState(
        "2026-2027"
    );



    return (

        <AdminContext.Provider

            value={{

                academicYear,

                setAcademicYear

            }}

        >

            {children}

        </AdminContext.Provider>

    );

};



export const useAdmin = () => {

    return useContext(AdminContext);

};