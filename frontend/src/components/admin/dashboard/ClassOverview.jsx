import { useState } from "react";
import { School,GraduationCap,ChevronDown } from "lucide-react";

const ClassOverview=({data})=>{

    const [openGrade,setOpenGrade]=useState("Grade 7");

    const grades = data || [];
    return(

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5">

                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <School size={18}/>
                </div>

                <div>
                    <p className="font-semibold text-md text-gray-800">
                        Class Overview
                    </p>

                    <p className="text-sm text-gray-500">
                        Manage classes and students
                    </p>
                </div>

            </div>


            <div className="space-y-1 max-h-[420px] overflow-y-auto pr-2">

                {
                    grades.map(grade=>(

                        <div
                            key={grade.name}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >

                            <button
                                onClick={()=>setOpenGrade(openGrade===grade.name?null:grade.name)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-indigo-50 transition"
                            >

                                <span className="font-semibold text-sm text-gray-700">
                                    {grade.name}
                                </span>

                                <ChevronDown
                                    size={17}
                                    className={`${openGrade===grade.name?"rotate-180 text-indigo-600":"text-gray-400"} transition`}
                                />

                            </button>


                            {
                                openGrade===grade.name &&

                                <div className="grid grid-cols-3 gap-3 p-4">

                                    {
                                        grade.classes.map(item=>(

                                            <div
                                                key={item.name}
                                                className="border border-gray-100 rounded-xl p-3 hover:shadow-md transition"
                                            >

                                                <div className="flex items-center justify-between mb-2">

                                                    <h3 className="font-semibold text-sm text-indigo-600">
                                                        {item.name}
                                                    </h3>

                                                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <GraduationCap size={15}/>
                                                    </div>

                                                </div>


                                                <p className="text-xs text-gray-500">
                                                    Students
                                                </p>


                                                <p className="text-lg font-bold text-gray-800">
                                                    {item.students}
                                                </p>

                                            </div>

                                        ))
                                    }

                                </div>
                            }

                        </div>

                    ))
                }

            </div>

        </div>

    );

};

export default ClassOverview;