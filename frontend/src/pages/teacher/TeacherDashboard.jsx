import { useEffect, useState } from "react";
import { Users, BookOpen, School } from "lucide-react";

import {
    getTeacherClasses
} from "../../services/teacherDashboardService";
import {
    getAttendanceOverview
} from "../../services/attendanceService";
import AcademicYearSelector from "./components/AcademicYearSelector";
import ClassSelector from "./components/ClassSelector";
import AttendanceOverview from "./components/AttendanceOverview";


const TeacherDashboard = () => {


    const [academicYear, setAcademicYear] =
        useState("2026-2027");


    const [dashboard, setDashboard] =
        useState(null);


    const [selectedClass, setSelectedClass] =
        useState("");


    const [loading, setLoading] =
        useState(false);

    const [attendance,setAttendance]
=
useState(null);


    useEffect(()=>{


        const fetchClasses = async()=>{


            try{

                setLoading(true);


                const data =
                    await getTeacherClasses(
                        academicYear
                    );


                setDashboard(data);



                if(data.classes.length > 0){

                    setSelectedClass(
                        data.classes[0].class_id
                    );

                }


            }catch(error){

                console.log(error);

            }
            finally{

                setLoading(false);

            }


        };


        fetchClasses();


    },[academicYear]);

    useEffect(()=>{

    if(!selectedClass){
        return;
    }


    const fetchAttendance = async()=>{

        try{

            const data =
                await getAttendanceOverview(
                    selectedClass
                );


            setAttendance(data);


        }catch(error){

            console.log(
                error
            );

        }

    };


    fetchAttendance();


},[selectedClass]);



    const currentClass =
        dashboard?.classes.find(
            item =>
            item.class_id === selectedClass
        );





return (

<div className="space-y-2">



{/* Header */}

<div className="
flex
justify-between
items-center
mt-10
">


<div>
</div>



<div className="w-35">

<AcademicYearSelector

value={academicYear}

onChange={(year)=>{

setAcademicYear(year);
setSelectedClass("");

}}

/>


</div>


</div>







{
loading && (

<div className="
text-center
text-sm
text-gray-500
">
Loading...
</div>

)

}







{
!loading && dashboard && (
<>

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">





{/* Select Class */}

<div className="
bg-white
rounded-xl
border
border-gray-100
shadow-sm
p-5
">


<div className="
flex
items-center
gap-3
mb-4
">


<div className="
w-9
h-9
rounded-lg
bg-blue-100
flex
items-center
justify-center
text-blue-600
">

<School size={18}/>

</div>


<div>

<h3 className="
text-sm
font-semibold
text-gray-700
">
Class
</h3>


<p className="
text-xs
text-gray-400
">
Select teaching class
</p>

</div>


</div>



<ClassSelector

classes={
dashboard.classes
}

selected={
selectedClass
}

onChange={
setSelectedClass
}

/>


</div>








{/* Total Student */}

<div className="
bg-white
rounded-xl
border
border-gray-100
shadow-sm
p-5
">


<div className="
flex
items-center
gap-3
mb-4
">


<div className="
w-9
h-9
rounded-lg
bg-green-100
flex
items-center
justify-center
text-green-600
">

<Users size={18}/>

</div>


<div>

<h3 className="
text-sm
font-semibold
text-gray-700
">
Students
</h3>


<p className="
text-xs
text-gray-400
">
Total students
</p>

</div>


</div>





<h2 className="
text-2xl
font-bold
text-gray-800
">

{
currentClass?.totalStudents || 0
}

</h2>






</div>








{/* Subject */}

<div className="
bg-white
rounded-xl
border
border-gray-100
shadow-sm
p-5
">


<div className="
flex
items-center
gap-3
mb-4
">


<div className="
w-9
h-9
rounded-lg
bg-purple-100
flex
items-center
justify-center
text-purple-600
">

<BookOpen size={18}/>

</div>



<div>

<h3 className="
text-sm
font-semibold
text-gray-700
">
Subjects
</h3>


<p className="
text-xs
text-gray-400
">
Subjects you teach
</p>


</div>


</div>





<div className="
    grid
    grid-cols-3
    gap-3
">


{
currentClass?.subjects?.map((subject, index)=>(

<div
key={subject.subject_id}
className={`
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        border

        ${
            index % 3 === 0
            ? "bg-blue-50 border-blue-100 text-blue-700"
            : index % 3 === 1
            ? "bg-green-50 border-green-100 text-green-700"
            : "bg-purple-50 border-purple-100 text-purple-700"
        }
    `}
>


<span className="
text-sm
text-gray-700
">
{subject.subject_name}
</span>


</div>

))

}



{
!currentClass?.subjects?.length && (

<p className="
text-sm
text-gray-400
">
No subject assigned
</p>

)

}



</div>


</div>

</div>

<div className="mt-4">

<AttendanceOverview

classId={selectedClass}

data={attendance}
currentClass={currentClass}

/>

</div>


</>

)

}



</div>

);


};


export default TeacherDashboard;