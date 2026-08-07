import {
    CalendarCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AttendanceOverview = ({
    data,
    currentClass
}) => {


const navigate = useNavigate();
return (

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
mb-5
">


<div className="
w-9
h-9
rounded-lg
bg-orange-100
flex
items-center
justify-center
text-orange-600
">

<CalendarCheck size={18}/>

</div>


<div>

<h3 className="
text-sm
font-semibold
text-gray-700
">
Attendance Overview
</h3>


<p className="
text-xs
text-gray-400
">
Today attendance summary
</p>

</div>


</div>





<div className="
grid
grid-cols-2
md:grid-cols-4
gap-3
">





{/* Present */}

<div className="
bg-green-50
rounded-lg
p-3
">

<p className="
text-xs
text-gray-500
">
Present
</p>


<p className="
text-xl
font-bold
text-green-600
">

{
data?.present || 0
}

</p>


</div>







{/* Absent */}

<div className="
bg-red-50
rounded-lg
p-3
">

<p className="
text-xs
text-gray-500
">
Absent
</p>


<p className="
text-xl
font-bold
text-red-600
">

{
data?.absent || 0
}

</p>


</div>







{/* Late */}

<div className="
bg-yellow-50
rounded-lg
p-3
">

<p className="
text-xs
text-gray-500
">
Late
</p>


<p className="
text-xl
font-bold
text-yellow-600
">

{
data?.late || 0
}

</p>


</div>







{/* Excused */}

<div className="
bg-purple-50
rounded-lg
p-3
">

<p className="
text-xs
text-gray-500
">
Excused
</p>


<p className="
text-xl
font-bold
text-purple-600
">

{
data?.excused || 0
}

</p>


</div>





</div>





<button

onClick={()=>{

navigate(
"/teacher/attendance",
{
state:{
classId:
currentClass.class_id,

teacherAssignmentId:
currentClass.subjects[0].teacher_assignment_id

}
}
)

}}

className="
mt-5
w-full
bg-blue-600
text-white
rounded-lg
py-2
text-sm
hover:bg-blue-700
"

>

Manage Attendance

</button>



</div>

);

};


export default AttendanceOverview;