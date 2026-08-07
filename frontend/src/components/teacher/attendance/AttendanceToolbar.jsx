import {
    School,
    BookOpen,
    CalendarDays
} from "lucide-react";


const AttendanceToolbar = ({
    classes,
    selectedClass,
    setSelectedClass,
    subjects,
    selectedSubject,
    setSelectedSubject,
    setAssignmentId,
    attendanceDate,
    setAttendanceDate
}) => {


    return (

        <div
            className="
                bg-white
                rounded-2xl
                border-gray
                shadow-sm
                p-6
            "
        >


            <div className="
                grid
                md:grid-cols-3
                gap-5
            ">


                {/* Class */}

                <div>


                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >

                        <School
                            size={16}
                            className="text-blue-600"
                        />

                        Class

                    </label>



                    <select

                        value={selectedClass}

                        onChange={
                            e =>
                            setSelectedClass(
                                e.target.value
                            )
                        }

                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "

                    >


                        {
                            classes.map(item=>(

                                <option

                                    key={
                                        item.class_id
                                    }

                                    value={
                                        item.class_id
                                    }

                                >

                                    {item.class_name}

                                </option>

                            ))
                        }


                    </select>


                </div>






                {/* Subject */}

                <div>


                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >

                        <BookOpen
                            size={16}
                            className="text-blue-600"
                        />

                        Subject

                    </label>



                    <select


                        value={selectedSubject}


                        onChange={(e)=>{


                            const subject =
                                subjects.find(
                                    item =>
                                    item.subject_id ===
                                    e.target.value
                                );


                            setSelectedSubject(
                                e.target.value
                            );


                            setAssignmentId(
                                subject?.assignment_id || ""
                            );


                        }}


                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "


                    >


                        <option value="">
                            Select Subject
                        </option>



                        {
                            subjects.map(subject=>(

                                <option

                                    key={
                                        subject.subject_id
                                    }

                                    value={
                                        subject.subject_id
                                    }

                                >

                                    {subject.subject_name}

                                </option>

                            ))
                        }



                    </select>


                </div>







                {/* Date */}

                <div>


                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >

                        <CalendarDays
                            size={16}
                            className="text-blue-600"
                        />

                        Attendance Date

                    </label>



                    <input


                        type="date"


                        value={attendanceDate}


                        onChange={
                            e =>
                            setAttendanceDate(
                                e.target.value
                            )
                        }


                        className="
                            w-full
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "


                    />


                </div>



            </div>


        </div>


    );

};


export default AttendanceToolbar;