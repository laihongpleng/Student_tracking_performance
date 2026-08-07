// export default AttendanceManagement;
import { useEffect, useState } from "react";

import {
    getTeacherClasses
} from "../../services/teacherDashboardService";

import api from "../../services/api";
import {
    getAttendanceByClassSubjectDate
} from "../../services/attendanceService";
import AttendanceHeader from "../../components/teacher/attendance/AttendanceHeader";
import AttendanceToolbar from "../../components/teacher/attendance/AttendanceToolbar";
import AttendanceTable from "../../components/teacher/attendance/AttendanceTable";


const AttendanceManagement = () => {


    const [academicYear] =
        useState("2026-2027");


    const [classes,setClasses] =
        useState([]);


    const [selectedClass,setSelectedClass] =
        useState("");


    const [selectedSubject,setSelectedSubject] =
        useState("");


    const [assignmentId,setAssignmentId] =
        useState("");


    const [students,setStudents] =
        useState([]);


    const [attendanceDate,setAttendanceDate] =
        useState(
            new Date()
            .toISOString()
            .split("T")[0]
        );


    const [attendance,setAttendance] =
        useState([]);


    const [loading,setLoading] =
        useState(false);




    // Load teacher classes

    useEffect(()=>{


        const fetchClasses = async()=>{

            try{


                const data =
                    await getTeacherClasses(
                        academicYear
                    );


                setClasses(
                    data.classes
                );


                if(data.classes.length){

                    setSelectedClass(
                        data.classes[0].class_id
                    );

                }


            }catch(error){

                console.log(error);

            }

        };


        fetchClasses();


    },[]);



    useEffect(()=>{


    if(
        !selectedClass ||
        !selectedSubject ||
        !attendanceDate ||
        students.length === 0
    ){
        return;
    }



    const loadExistingAttendance = async()=>{


        try{


            const data =
                await getAttendanceByClassSubjectDate(
                    selectedClass,
                    selectedSubject,
                    attendanceDate
                );



            if(data.length){


                setAttendance(

                    students.map(student=>{


                        const record =
                            data.find(
                                item =>
                                item.student_id._id
                                ===
                                student._id
                            );



                        return {

                            student_id:
                            student._id,


                            status:
                            record?.status ||
                            "Present",


                            remark:
                            record?.remark ||
                            "",


                            attendance_id:
                            record?._id

                        };


                    })

                );


            }


        }catch(error){

            console.log(error);

        }


    };



    loadExistingAttendance();



},[
    selectedClass,
    selectedSubject,
    attendanceDate,
    students
]);

    // Load students

    useEffect(()=>{


        if(!selectedClass)
            return;



        const fetchStudents = async()=>{


            try{


                const res =
                    await api.get(
                        `/students/class/${selectedClass}`
                    );


                const list =
                    res.data;


                setStudents(list);



                setAttendance(

                    list.map(student=>({

                        student_id:
                            student._id,

                        status:
                            "Present",

                        remark:""

                    }))

                );


            }catch(error){

                console.log(error);

            }


        };


        fetchStudents();


    },[selectedClass]);







    const changeStatus = (
        studentId,
        status
    )=>{


        setAttendance(prev=>

            prev.map(item=>

                item.student_id === studentId

                ?
                {
                    ...item,
                    status
                }

                :

                item

            )

        );

    };







    const changeRemark = (
        studentId,
        remark
    )=>{


        setAttendance(prev=>

            prev.map(item=>

                item.student_id === studentId

                ?
                {
                    ...item,
                    remark
                }

                :

                item

            )

        );

    };







    const submitAttendance = async()=>{

    if(!assignmentId){

        alert("Please select subject");
        return;

    }


    try{

        setLoading(true);



        const hasExisting =
            attendance.some(
                item => item.attendance_id
            );



        if(hasExisting){


            // Update existing attendance

            for(const item of attendance){


                if(item.attendance_id){


                    await api.put(

                        `/attendance/${item.attendance_id}`,

                        {
                            status:item.status,
                            remark:item.remark
                        }

                    );


                }

            }



        }else{


            // Create new attendance

            await api.post(

                "/attendance",

                {

                    teacher_assignment_id:
                    assignmentId,


                    attendance_date:
                    attendanceDate,


                    attendance

                }

            );


        }



        alert(
            "Attendance saved successfully"
        );


    }catch(error){


        console.log(error);


        alert(
            error.response?.data?.message ||
            "Failed to save attendance"
        );


    }
    finally{

        setLoading(false);

    }


};








    const currentClass =
        classes.find(
            item =>
            item.class_id === selectedClass
        );



    const subjects =
        currentClass?.subjects || [];






    return (

        <div className="space-y-5 mt-8">



            <AttendanceHeader />




            <AttendanceToolbar

                classes={classes}

                selectedClass={selectedClass}

                setSelectedClass={setSelectedClass}


                subjects={subjects}

                selectedSubject={selectedSubject}

                setSelectedSubject={setSelectedSubject}


                setAssignmentId={setAssignmentId}


                attendanceDate={attendanceDate}

                setAttendanceDate={setAttendanceDate}

            />





            <AttendanceTable

                students={students}

                attendance={attendance}

                changeStatus={changeStatus}

                changeRemark={changeRemark}

            />





            <button

                onClick={submitAttendance}

                disabled={loading}

                className="
                    bg-blue-600
                    text-white
                    px-5
                    py-3
                    rounded-lg
                    hover:bg-blue-700
                    disabled:opacity-50
                "

            >

                {
                    loading
                    ?
                    "Saving..."
                    :
                    "Save Attendance"
                }


            </button>



        </div>

    );


};


export default AttendanceManagement;