import { CheckCircle, XCircle, Clock, FileCheck } from "lucide-react";


const AttendanceTable = ({
    students,
    attendance,
    changeStatus,
    changeRemark
}) => {


    const statusStyle = (status)=>{

        switch(status){

            case "Present":
                return {
                    color:"text-green-700",
                    bg:"bg-green-50",
                    border:"border-green-200",
                    icon:<CheckCircle size={14}/>
                };


            case "Absent":
                return {
                    color:"text-red-700",
                    bg:"bg-red-50",
                    border:"border-red-200",
                    icon:<XCircle size={14}/>
                };


            case "Late":
                return {
                    color:"text-orange-700",
                    bg:"bg-orange-50",
                    border:"border-orange-200",
                    icon:<Clock size={14}/>
                };


            case "Excused":
                return {
                    color:"text-blue-700",
                    bg:"bg-blue-50",
                    border:"border-blue-200",
                    icon:<FileCheck size={14}/>
                };


            default:
                return {};

        }

    };




    return (

        <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
        ">


            <table className="
                w-full
                text-sm
            ">


                <thead>


                    <tr className="
                        bg-gray-50
                        text-gray-500
                        border-none
                    ">


                        <th className="
                            px-5
                            py-4
                            text-left
                            font-medium
                        ">
                            Student
                        </th>


                        <th className="
                            px-5
                            py-4
                            text-left
                            font-medium
                        ">
                            Status
                        </th>


                        <th className="
                            px-5
                            py-4
                            text-left
                            font-medium
                        ">
                            Remark
                        </th>


                    </tr>


                </thead>




                <tbody>


                {
                    students.map(student=>{


                        const current =
                            attendance.find(
                                item =>
                                item.student_id === student._id
                            );


                        const style =
                            statusStyle(
                                current?.status
                            );



                        return (

                            <tr

                                key={student._id}

                                className="
                                    border-b
                                    border-gray-200
                                    hover:bg-gray-50
                                    transition
                                "

                            >



                                <td className="
                                    px-5
                                    py-4
                                    font-medium
                                    text-gray-700
                                ">

                                    {student.full_name}

                                </td>






                                <td className="
                                    px-5
                                    py-4
                                ">


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">


                                        <span className={`
                                            flex
                                            items-center
                                            gap-1
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-medium
                                            border

                                            ${style.bg}
                                            ${style.color}
                                            ${style.border}

                                        `}>

                                            {style.icon}

                                            {
                                                current?.status
                                            }

                                        </span>





                                        <select

                                            value={
                                                current?.status
                                            }

                                            onChange={
                                                e=>
                                                changeStatus(
                                                    student._id,
                                                    e.target.value
                                                )
                                            }


                                            className="
                                                border
                                                border-gray-200
                                                rounded-lg
                                                px-2
                                                py-1
                                                text-xs
                                                bg-white
                                            "

                                        >

                                            <option>
                                                Present
                                            </option>

                                            <option>
                                                Absent
                                            </option>

                                            <option>
                                                Late
                                            </option>

                                            <option>
                                                Excused
                                            </option>


                                        </select>


                                    </div>



                                </td>







                                <td className="
                                    px-5
                                    py-4
                                ">


                                    <input


                                        value={
                                            current?.remark || ""
                                        }


                                        onChange={
                                            e=>
                                            changeRemark(
                                                student._id,
                                                e.target.value
                                            )
                                        }


                                        placeholder="Add remark"


                                        className="
                                            w-full
                                            max-w-xs
                                            border
                                            border-gray-200
                                            rounded-lg
                                            px-3
                                            py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-100
                                        "


                                    />


                                </td>



                            </tr>

                        );


                    })
                }


                </tbody>


            </table>


        </div>

    );


};


export default AttendanceTable;