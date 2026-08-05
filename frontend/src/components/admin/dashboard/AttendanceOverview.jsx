import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

import {
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";


const AttendanceOverview = ({data}) => {


    const attendance = [

        {
            name:"Present",
            value:data?.present || 0,
            color:"#22c55e",
            icon:<CheckCircle size={16}/>
        },

        {
            name:"Absent",
            value:data?.absent || 0,
            color:"#ef4444",
            icon:<XCircle size={16}/>
        },

        {
            name:"Late",
            value:data?.late || 0,
            color:"#eab308",
            icon:<Clock size={16}/>
        }

    ];


    const total =
        attendance.reduce(
            (sum,item)=>sum + item.value,
            0
        );


    const presentRate =
        total === 0
        ? 0
        :
        (
            (
                data?.present || 0
            )
            /
            total
            *
            100
        ).toFixed(1);



return (

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">


<div className="mb-5">

<p className="font-semibold text-md text-gray-800">
Attendance Overview
</p>


<p className="text-sm text-gray-500">
This month attendance summary
</p>

</div>



<div className="flex items-center justify-center gap-8">


<div className="relative w-48 h-48">


<ResponsiveContainer>

<PieChart>


<Pie

data={attendance}

dataKey="value"

innerRadius={60}

outerRadius={85}

paddingAngle={4}

stroke="none"

>


{
attendance.map(item=>(

<Cell
key={item.name}
fill={item.color}
/>

))
}


</Pie>


</PieChart>


</ResponsiveContainer>



<div className="absolute inset-0 flex flex-col items-center justify-center">


<p className="text-2xl font-bold text-gray-800">

{presentRate}%

</p>


<p className="text-xs text-gray-500">

Overall

</p>


</div>


</div>





<div className="space-y-3">


{
attendance.map(item=>(

<div
key={item.name}
className="flex items-center justify-between gap-5"
>


<div className="flex items-center gap-2">


<div
className="w-8 h-8 rounded-lg flex items-center justify-center"
style={{
backgroundColor:`${item.color}20`,
color:item.color
}}
>

{item.icon}

</div>


<p className="text-sm text-gray-600">

{item.name}

</p>


</div>


<span className="text-sm font-semibold text-gray-800">

{item.value}

</span>


</div>

))

}


</div>


</div>


<div className="mt-5 pt-4 border-t border-gray-100 text-center">

<p className="text-xs font-medium text-gray-500">

This month

</p>

</div>


</div>

)

};


export default AttendanceOverview;