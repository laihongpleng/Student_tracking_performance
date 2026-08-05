import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


const PerformanceTrendChart = ({data}) => {


    const classes =
        data?.map(
            item=>item.class_name
        ) || [];



    const chartData = [];


    const months = [
        ...new Set(

            data?.flatMap(
                item =>
                item.monthlyPerformance.map(
                    m=>m.month
                )
            )

        )
    ];



    months.forEach(month=>{


        const item = {
            month
        };


        data.forEach(classData=>{


            const monthData =
                classData.monthlyPerformance.find(
                    m =>
                    m.month === month
                );


            item[classData.class_name] =
                monthData?.averageScore || 0;


        });


        chartData.push(item);


    });



    const colors=[

        "#2563eb",
        "#16a34a",
        "#9333ea",
        "#ea580c",
        "#dc2626",
        "#0891b2"

    ];



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


<div className="mb-5">


<h2
className="
text-base
font-semibold
text-gray-800
"
>

Performance Trend

</h2>


<p
className="
text-xs
text-gray-500
"
>

Average score comparison by class

</p>


</div>




<div
className="
w-full
h-40
"
>


<ResponsiveContainer
width="100%"
height="100%"
>


<LineChart
data={chartData}
margin={{
top:10,
right:20,
left:0,
bottom:0
}}
>


<CartesianGrid
strokeDasharray="3 3"
/>



<XAxis

dataKey="month"

fontSize={12}

/>



<YAxis

domain={[0,100]}

fontSize={12}

/>



<Tooltip

contentStyle={{

borderRadius:"12px",

border:"none"

}}

/>



<Legend
fontSize={12}
/>




{
classes.map(
(item,index)=>(

<Line

key={item}

type="monotone"

dataKey={item}

stroke={colors[index % colors.length]}

strokeWidth={3}

dot={{
r:4
}}

/>

)
)
}



</LineChart>


</ResponsiveContainer>


</div>



</div>

)

};


export default PerformanceTrendChart;