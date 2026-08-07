import { CalendarCheck } from "lucide-react";


const AttendanceHeader = () => {


    return (

        <div className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            px-5
            py-4
            flex
            justify-between
            items-center
            shadow-sm
        ">


            <div className="
                flex
                items-center
                gap-3
            ">


                <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                ">

                    <CalendarCheck
                        size={20}
                        className="text-blue-600"
                    />

                </div>



                <div>


                    <p className="
                        text-lg
                        font-semibold
                        text-gray-800
                    ">
                        Attendance Management
                    </p>


                    <p className="
                        text-xs
                        text-gray-400
                        mt-1
                    ">
                        Manage and track student attendance
                    </p>


                </div>


            </div>


        </div>

    );


};


export default AttendanceHeader;