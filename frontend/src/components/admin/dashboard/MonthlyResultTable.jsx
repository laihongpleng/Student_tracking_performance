import { useState } from "react";
import useMonthlyResult from "../../../hooks/useMonthlyResult";
import { useAdmin } from "../../../context/AdminContext";


const MonthlyResultTable = () => {

    const { academicYear } = useAdmin();

    const [month, setMonth] = useState(8);


    const {
        monthlyResult,
        loading
    } = useMonthlyResult(
        academicYear,
        month
    );



    if(loading){

        return (

            <div className="bg-white rounded-2xl p-5 shadow-sm">

                Loading monthly result...

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
                    font-semibold
                    text-md
                    text-gray-800
                    "
                    >
                        Monthly Result Summary
                    </p>


                    <p
                    className="
                    text-xs
                    text-gray-500
                    "
                    >
                        Student performance by class
                    </p>


                </div>



                <select

                value={month}

                onChange={(e)=>
                    setMonth(
                        Number(e.target.value)
                    )
                }

                className="
                border
                border-gray-200
                rounded-lg
                px-3
                py-2
                text-sm
                text-gray-600
                focus:outline-none
                "

                >

                    <option value={1}>
                        January
                    </option>

                    <option value={2}>
                        February
                    </option>

                    <option value={3}>
                        March
                    </option>

                    <option value={4}>
                        April
                    </option>

                    <option value={5}>
                        May
                    </option>

                    <option value={6}>
                        June
                    </option>

                    <option value={7}>
                        July
                    </option>

                    <option value={8}>
                        August
                    </option>

                    <option value={9}>
                        September
                    </option>

                    <option value={10}>
                        October
                    </option>

                    <option value={11}>
                        November
                    </option>

                    <option value={12}>
                        December
                    </option>


                </select>


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


                    <thead className="sticky top-0 bg-white z-10">


                        <tr
                        className="
                        bg-gray-50
                        text-gray-500
                        text-xs
                        "
                        >


                            <th className="p-3 text-left">
                                Class
                            </th>


                            <th className="p-3">
                                Average
                            </th>


                            <th className="p-3">
                                Highest
                            </th>


                            <th className="p-3">
                                Lowest
                            </th>


                            <th className="p-3">
                                Pass Rate
                            </th>


                        </tr>


                    </thead>



                    <tbody>


                    {
                        monthlyResult.map(item=>(


                            <tr
                            key={item.class_id}
                            className="
                            border-b
                            border-gray-100
                            hover:bg-blue-50/50
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



                                <td className="text-center">
                                    {item.averageScore}
                                </td>



                                <td className="text-center">
                                    {
                                        item.highestStudent
                                        ?.average || 0
                                    }
                                </td>



                                <td className="text-center">
                                    {
                                        item.lowestStudent
                                        ?.average || 0
                                    }
                                </td>



                                <td className="text-center">

                                    <span
                                    className="
                                    inline-flex
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    text-xs
                                    font-semibold
                                    "
                                    >

                                        {item.passRate}%

                                    </span>


                                </td>



                            </tr>


                        ))
                    }



                    {
                        monthlyResult.length===0 &&

                        <tr>

                            <td
                            colSpan="5"
                            className="
                            text-center
                            py-6
                            text-gray-400
                            "
                            >

                                No result data for this month

                            </td>

                        </tr>

                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

};


export default MonthlyResultTable;