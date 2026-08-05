import {
    Trophy,
    Medal,
    Award
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    getStudentRanking,
    getClassPerformance
} from "../../../services/adminDashboardService";


const PerformanceSummary = ({
    academicYear
}) => {


const [ranking,setRanking] = useState([]);

const [classPerformance,setClassPerformance] = useState([]);



useEffect(()=>{

    if(!academicYear)
        return;


    const loadData = async()=>{

        try{

            const rankingData =
            await getStudentRanking(
                academicYear
            );


            const classData =
            await getClassPerformance(
                academicYear
            );


            setRanking(
                rankingData.slice(0,3)
            );


            setClassPerformance(
                classData
            );


        }
        catch(err){

            console.log(
                err
            );

        }

    };


    loadData();


},[
    academicYear
]);




const rankIcon=(rank)=>{

    if(rank===1)
        return <Trophy size={16}/>;

    if(rank===2)
        return <Medal size={16}/>;

    if(rank===3)
        return <Award size={16}/>;


    return rank;

};



return (

<div
className="
grid
grid-cols-1
xl:grid-cols-3
gap-5
mt-5
"
>



{/* TOP 3 STUDENT */}


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


<div className="mb-4">

<h2
className="
text-base
font-semibold
text-gray-800
"
>
Student Ranking
</h2>


<p
className="
text-xs
text-gray-500
"
>
Top 3 performing students
</p>


</div>




<div>


{
ranking.map((student)=>(


<div
key={student.student_id}
className="
flex
items-center
justify-between
p-3
rounded-xl
hover:bg-gray-50
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className={`
w-8
h-8
rounded-full
flex
items-center
justify-center
text-xs
font-bold

${
student.rank===1
?
"bg-yellow-100 text-yellow-700"
:
student.rank===2
?
"bg-gray-100 text-gray-700"
:
"bg-orange-100 text-orange-700"
}

`}
>


{
rankIcon(
    student.rank
)
}


</div>



<div>


<p
className="
text-sm
font-semibold
text-gray-800
"
>
{student.student_name}
</p>


<p
className="
text-xs
text-gray-500
"
>
{student.class}
</p>


</div>


</div>



<span
className="
text-sm
font-bold
text-blue-600
"
>

{student.score}%

</span>



</div>


))

}



</div>



</div>





{/* CLASS PERFORMANCE */}


<div
className="
xl:col-span-2
bg-white
rounded-2xl
border
border-gray-100
shadow-sm
p-5
"
>



<div className="mb-4">


<h2
className="
text-base
font-semibold
text-gray-800
"
>
Class Performance
</h2>


<p
className="
text-xs
text-gray-500
"
>
Overview by class
</p>


</div>




<div
className="
overflow-x-auto
"
>


<table
className="
w-full
text-sm
"
>


<thead>

<tr
className="
bg-gray-50
text-xs
text-gray-500
"
>


<th
className="
p-3
text-left
"
>
Class
</th>


<th className="p-3">
Students
</th>


<th className="p-3">
Average
</th>


<th className="p-3">
Attendance
</th>



</tr>


</thead>




<tbody>


{

classPerformance.map(item=>(


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



<td
className="
text-center
"
>
{item.totalStudents}

</td>




<td
className="
text-center
font-semibold
"
>

{item.averageScore}%

</td>




<td
className="
text-center
text-green-600
font-medium
"
>

{item.attendanceRate}%

</td>




</tr>


))

}


</tbody>



</table>


</div>



</div>



</div>


);

};


export default PerformanceSummary;