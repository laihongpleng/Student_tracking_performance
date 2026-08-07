const AcademicYearSelector = ({
    value,
    onChange
}) => {


    const years = [
        "2026-2027",
        
    ];


    return (

        <div>

            


            <select
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                className="
                    mt-2
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    bg-white
                "
            >

                <option value="">
                    Select Year
                </option>


                {
                    years.map(year=>(

                        <option
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>

                    ))
                }


            </select>


        </div>

    );

};


export default AcademicYearSelector;