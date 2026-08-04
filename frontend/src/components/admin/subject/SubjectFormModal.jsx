import { useState } from "react";
import { X } from "lucide-react";


const SubjectFormModal = ({
    data,
    loading,
    serverError,
    onClose,
    onSave
}) => {


    const [form,setForm] = useState({

        subject_name:
        data?.subject_name || ""

    });



    const [error,setError] = useState("");




    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });



        if(error){

            setError("");

        }


    };






    const validate=()=>{


        if(!form.subject_name.trim()){

            setError(
                "Please enter subject name"
            );

            return false;

        }


        return true;

    };






    const handleSubmit=()=>{


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
                w-[400px]
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


                    <h2 className="
                    text-base
                    font-semibold
                    text-gray-800
                    ">

                        {
                            data
                            ?
                            "Edit Subject"
                            :
                            "Create Subject"
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






                <label className="
                text-sm
                text-gray-600
                ">

                    Subject Name

                </label>




                <input

                    name="subject_name"

                    value={form.subject_name}

                    onChange={handleChange}

                    placeholder="Enter subject name"

                    disabled={loading}


                    className={`
                    w-full
                    mt-1
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    outline-none

                    ${
                        error
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }
                    `}

                />



                {
                    error && (

                        <p className="
                        text-xs
                        text-red-500
                        mt-1
                        "
                        >

                            {error}

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
                    "

                >

                    {
                        loading
                        ?
                        "Saving..."
                        :
                        data
                        ?
                        "Update Subject"
                        :
                        "Create Subject"
                    }


                </button>




            </div>


        </div>

    );

};


export default SubjectFormModal;