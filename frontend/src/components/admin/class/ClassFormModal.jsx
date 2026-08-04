import { useState } from "react";
import { X } from "lucide-react";


const ClassFormModal = ({
    data,
    loading,
    serverError,
    onClose,
    onSave
}) => {


    const [form,setForm] = useState({

        class_name:data?.class_name || "",

        academic_year:data?.academic_year || ""

    });



    const [errors,setErrors] = useState({});





    const handleChange = (e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });



        if(errors[e.target.name]){


            setErrors({

                ...errors,

                [e.target.name]:""

            });


        }


    };







    const validate = ()=>{


        const newErrors = {};



        if(!form.class_name.trim()){


            newErrors.class_name =
            "Please enter class name";


        }




        if(!form.academic_year.trim()){


            newErrors.academic_year =
            "Please enter academic year";


        }




        setErrors(newErrors);



        return Object.keys(newErrors).length === 0;


    };








    const handleSubmit = ()=>{


        if(!validate()){

            return;

        }



        onSave(form);


    };







    return (

        <div
            className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            "
        >


            <div
                className="
                bg-white
                w-[420px]
                rounded-2xl
                shadow-xl
                p-6
                "
            >



                <div
                    className="
                    flex
                    justify-between
                    items-center
                    mb-5
                    "
                >


                    <h2
                        className="
                        text-base
                        font-semibold
                        text-gray-800
                        "
                    >

                        {
                            data
                            ?
                            "Edit Class"
                            :
                            "Create Class"
                        }

                    </h2>



                    <button

                        onClick={onClose}

                        disabled={loading}

                        className="
                        text-gray-400
                        hover:text-gray-600
                        "

                    >

                        <X size={18}/>

                    </button>


                </div>







                {
                    serverError && (

                        <p
                            className="
                            text-sm
                            text-red-500
                            bg-red-50
                            border
                            border-red-200
                            rounded-lg
                            px-3
                            py-2
                            mb-4
                            "
                        >

                            {serverError}

                        </p>

                    )
                }







                <label className="text-sm text-gray-600">

                    Class Name

                </label>



                <input

                    name="class_name"

                    value={form.class_name}

                    onChange={handleChange}

                    placeholder="Example: 7A"

                    disabled={loading}

                    className={`
                    w-full
                    mt-1
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    outline-none
                    mb-1

                    ${
                        errors.class_name

                        ?

                        "border border-red-500 focus:ring-2 focus:ring-red-200"

                        :

                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"

                    }
                    `}

                />




                {
                    errors.class_name && (

                        <p className="
                        text-xs
                        text-red-500
                        mb-3
                        ">

                            {errors.class_name}

                        </p>

                    )
                }









                <label className="text-sm text-gray-600 mt-3 block">

                    Academic Year

                </label>




                <input

                    name="academic_year"

                    value={form.academic_year}

                    onChange={handleChange}

                    placeholder="Example: 2026-2027"

                    disabled={loading}

                    className={`
                    w-full
                    mt-1
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    outline-none
                    mb-1

                    ${
                        errors.academic_year

                        ?

                        "border border-red-500 focus:ring-2 focus:ring-red-200"

                        :

                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"

                    }
                    `}

                />






                {
                    errors.academic_year && (

                        <p className="
                        text-xs
                        text-red-500
                        mb-3
                        ">

                            {errors.academic_year}

                        </p>

                    )
                }









                <button

                    onClick={handleSubmit}

                    disabled={loading}

                    className="
                    mt-6
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-blue-400
                    text-white
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition
                    "

                >

                    {
                        loading

                        ?

                        "Saving..."

                        :

                        data

                        ?

                        "Update Class"

                        :

                        "Create Class"
                    }


                </button>




            </div>


        </div>

    );

};


export default ClassFormModal;