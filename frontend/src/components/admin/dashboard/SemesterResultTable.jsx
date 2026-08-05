import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import useSemesterResult from "../../../hooks/useSemesterResult";


const SemesterResultTable = () => {


    const { academicYear } = useAdmin();


    const [semester,setSemester] = useState(
        "Semester 1"
    );


    const {
        semesterResult,
        loading
    } = useSemesterResult(
        academicYear,
        semester
    );



    if(loading){

        return (

            <div
            className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-5
            "
            >

                Loading semester result...

            </div>

        );

    }



    return (

        <div
        className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        p-5
        "
        >


            <div
            className="
            flex
            justify-between
            items-center
            mb-5
            "
            >


                <div>

                    <p
                    className="
                    text-base
                    font-semibold
                    text-gray-800
                    "
                    >

                        Semester Result Summary

                    </p>


                    <p
                    className="
                    text-xs
                    text-gray-500
                    "
                    >

                        Class performance for the selected semester

                    </p>

                </div>




                <div className="relative">


                    <select

                    value={semester}

                    onChange={(e)=>
                        setSemester(
                            e.target.value
                        )
                    }

                    className="
                    appearance-none
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-2
                    pr-10
                    text-sm
                    text-gray-700
                    outline-none
                    focus:ring-2
                    focus:ring-blue-200
                    "

                    >

                        <option value="Semester 1">
                            Semester 1
                        </option>


                        <option value="Semester 2">
                            Semester 2
                        </option>


                    </select>



                    <ChevronDown

                    size={16}

                    className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                    "

                    />


                </div>


            </div>





            <div
            className="
            overflow-x-auto
            max-h-80
            overflow-y-auto
            "
            >


                <table
                className="
                w-full
                text-sm
                "
                >


                    <thead
                    className="
                    sticky
                    top-0
                    bg-white
                    z-10
                    "
                    >


                        <tr
                        className="
                        bg-gray-50
                        text-gray-500
                        text-xs
                        "
                        >


                            <th
                            className="
                            p-3
                            text-left
                            rounded-l-lg
                            "
                            >

                                Class

                            </th>


                            <th className="p-3">

                                Average Score

                            </th>


                            <th className="p-3">

                                Highest Score

                            </th>


                            <th className="p-3">

                                Lowest Score

                            </th>


                            <th
                            className="
                            p-3
                            rounded-r-lg
                            "
                            >

                                Pass Rate

                            </th>


                        </tr>


                    </thead>




                    <tbody>


                    {

                    semesterResult.map((item)=>(


                        <tr

                        key={item.class_id}

                        className="
                        border-b
                        border-gray-100
                        hover:bg-blue-50/50
                        transition
                        "

                        >


                            <td
                            className="
                            p-3
                            font-semibold
                            text-blue-600
                            "
                            >

                                {item.class_name}

                            </td>



                            <td
                            className="
                            text-center
                            font-medium
                            "
                            >

                                {item.averageScore}

                            </td>




                            <td
                            className="
                            text-center
                            "
                            >

                                {item.highestScore}

                            </td>




                            <td
                            className="
                            text-center
                            "
                            >

                                {item.lowestScore}

                            </td>




                            <td
                            className="
                            text-center
                            "
                            >


                                <span

                                className="
                                inline-flex
                                items-center
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-green-700
                                "

                                >

                                    {item.passRate}%

                                </span>


                            </td>



                        </tr>


                    ))

                    }





                    {
                        semesterResult.length === 0 &&

                        <tr>

                            <td
                            colSpan="5"
                            className="
                            text-center
                            py-6
                            text-gray-400
                            "
                            >

                                No result data for this semester

                            </td>


                        </tr>

                    }



                    </tbody>


                </table>


            </div>





            <button

            className="
            mt-5
            text-sm
            font-medium
            text-blue-600
            hover:text-blue-700
            transition
            "

            >

                View all semester results →

            </button>



        </div>

    );

};


export default SemesterResultTable;