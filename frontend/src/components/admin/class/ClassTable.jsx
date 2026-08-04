import { Pencil, ToggleLeft, ToggleRight } from "lucide-react";


const ClassTable = ({
    classes,
    onEdit,
    onDeactivate,
    onActivate
}) => {


    return (

        <div className="overflow-x-auto">


            <table className="w-full text-sm">


                <thead>

                    <tr className="bg-gray-50 text-gray-500">


                        <th className="p-3 text-left">
                            Class
                        </th>


                        <th className="p-3">
                            Academic Year
                        </th>


                        <th className="p-3">
                            Status
                        </th>


                        <th className="p-3">
                            Action
                        </th>


                    </tr>

                </thead>





                <tbody>


                    {
                        classes.map(item=>(


                            <tr

                                key={item._id}

                                className="
                                border-b
                                border-gray-100
                                hover:bg-blue-50/50
                                "

                            >



                                <td className="
                                    p-3
                                    font-semibold
                                ">

                                    {item.class_name}

                                </td>





                                <td className="text-center">

                                    {item.academic_year}

                                </td>







                                <td className="text-center">


                                    <span

                                        className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-medium

                                        ${
                                            item.isActive

                                            ?

                                            "bg-green-100 text-green-700"

                                            :

                                            "bg-red-100 text-red-700"

                                        }
                                        `}

                                    >

                                        {
                                            item.isActive

                                            ?

                                            "Active"

                                            :

                                            "Inactive"
                                        }

                                    </span>


                                </td>








                                <td className="text-center">



                                    <button

                                        onClick={()=>onEdit(item)}

                                        className="
                                        text-blue-600
                                        mr-3
                                        "

                                    >

                                        <Pencil size={16}/>

                                    </button>







                                    {
                                        item.isActive

                                        ?


                                        <button

                                            onClick={()=>onDeactivate(item)}

                                            className="
                                            text-red-600
                                            "

                                        >

                                            <ToggleRight size={18}/>

                                        </button>



                                        :



                                        <button

                                            onClick={()=>onActivate(item)}

                                            className="
                                            text-green-600
                                            "

                                        >

                                            <ToggleLeft size={18}/>

                                        </button>


                                    }



                                </td>



                            </tr>


                        ))
                    }



                </tbody>



            </table>



        </div>

    );

};


export default ClassTable;