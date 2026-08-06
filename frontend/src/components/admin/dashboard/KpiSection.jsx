import KpiCard from "./KpiCard";
import { Users,GraduationCap,School,ClipboardCheck } from "lucide-react";

const KpiSection=({data})=>{

const cards=[
{title:"Total Students",value:data?.totalStudents||0,color:"bg-blue-100 text-blue-600",icon:<Users size={28}/>},
{title:"Total Teachers",value:data?.totalTeachers||0,color:"bg-green-100 text-green-600",icon:<GraduationCap size={28}/>},
{title:"Total Classes",value:data?.totalClasses||0,color:"bg-purple-100 text-purple-600",icon:<School size={28}/>},
{title:"Attendance Rate",value:`${data?.attendanceRate||0}%`,color:"bg-orange-100 text-orange-600",icon:<ClipboardCheck size={28}/>}
];

return(
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
{
cards.map(item=>(
<KpiCard key={item.title}{...item}/>
))
}
</div>
);

};

export default KpiSection;