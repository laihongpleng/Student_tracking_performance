import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";



const ProtectedRoute = ({
    children,
    allowedRoles = []
}) => {


    const {
        user,
        loading
    } = useAuth();

    if(loading){

        return (

            <div className=" min-h-screen flex items-center justify-center ">

                Loading...

            </div>

        );

    }

    if(!user){

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }

    if(
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ){

        return (

            <Navigate
                to="/unauthorized"
                replace
            />

        );

    }

    return children;

};

export default ProtectedRoute;