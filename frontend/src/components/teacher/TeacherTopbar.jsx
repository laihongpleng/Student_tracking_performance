import {  UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";


const TeacherTopbar = () => {

    const { user } = useAuth();


    return (

        <header className="
            h-16
            bg-white
            border-b
            border-gray-200
            flex
            items-center
            justify-between
            px-6
        ">


            <div>

                <p className="text-xl font-semibold text-gray-800">Teacher Dashboard</p>

            </div>



            {/* Right Section */}

            <div className="
                flex
                items-center
                gap-5
            ">



                {/* User */}

                <div className="
                    flex
                    items-center
                    gap-3
                ">


                    <UserCircle
                        size={38}
                        className="text-blue-700"
                    />


                    <div>

                        <p className="
                            text-sm
                            font-medium
                            text-gray-800
                        ">
                            {user?.full_name || "Teacher"}
                        </p>


                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Teacher
                        </p>

                    </div>


                </div>


            </div>


        </header>

    );

};


export default TeacherTopbar;