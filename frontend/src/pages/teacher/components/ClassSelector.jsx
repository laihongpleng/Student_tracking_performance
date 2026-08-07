const ClassSelector = ({
    classes,
    selected,
    onChange
}) => {


    return (

        <div>

            <label className="
                text-sm
                font-medium
                text-gray-700
            ">
               
            </label>


            <select
                value={selected}
                onChange={(e)=>onChange(e.target.value)}
                className="
                    mt-2
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                "
            >

                <option value="">
                    Select Class
                </option>


                {
                    classes.map(item=>(

                        <option
                            key={item.class_id}
                            value={item.class_id}
                        >
                            {item.class_name}
                        </option>

                    ))
                }


            </select>


        </div>

    );

};


export default ClassSelector;