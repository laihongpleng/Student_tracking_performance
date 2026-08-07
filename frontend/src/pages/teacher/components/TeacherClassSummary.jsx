import { Users } from "lucide-react";


const TeacherClassSummary = ({
    classData
}) => {


    if(!classData)
        return null;



    return (

        <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
        ">


            <h2 className="
                text-xl
                font-semibold
            ">
                Class {classData.class_name}
            </h2>


            <div className="
                mt-5
                flex
                items-center
                gap-4
            ">

                <div className="
                    bg-blue-100
                    p-3
                    rounded-lg
                    text-blue-700
                ">
                    <Users/>
                </div>


                <div>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        Total Students
                    </p>


                    <p className="
                        text-2xl
                        font-bold
                    ">
                        {classData.totalStudents}
                    </p>

                </div>


            </div>


        </div>

    );

};


export default TeacherClassSummary;