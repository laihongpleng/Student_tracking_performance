const KpiCard=({title,value,color,icon})=>{

return(
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition duration-300">

    <div>
        <p className="text-gray-500 text-md font-medium">{title}</p>
        <p className="text-xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>

    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
    </div>

</div>
);

};

export default KpiCard;