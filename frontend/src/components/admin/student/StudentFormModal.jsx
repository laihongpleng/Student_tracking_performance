import { useState } from "react";
import { X } from "lucide-react";
import useClass from "../../../hooks/useClass";

const StudentFormModal = ({
    data,
    loading,
    serverError,
    onClose,
    onSave
}) => {

    const {
    classes
    } = useClass();
    
    const [form,setForm]=useState({

        full_name:data?.full_name||"",

        email:data?.user_id?.email||"",

        gender:data?.gender||"Male",

        date_of_birth:data?.date_of_birth
        ?
        data.date_of_birth.substring(0,10)
        :
        "",

        class_id:data?.class_id?._id||""

    });


    const [errors,setErrors]=useState({});



    const handleChange=(e)=>{

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



    const validate=()=>{

        const newErrors={};


        if(!form.full_name.trim()){

            newErrors.full_name="Please enter full name";

        }



        if(!form.email.trim()){

            newErrors.email="Please enter email";

        }
        else if(
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(form.email)
        ){

            newErrors.email="Please enter a valid email";

        }



        if(!form.date_of_birth){

            newErrors.date_of_birth="Please enter date of birth";

        }



        if(!form.class_id){

            newErrors.class_id="Please select class";

        }



        setErrors(newErrors);


        return Object.keys(newErrors).length===0;

    };



    const handleSubmit=()=>{

        if(!validate()){

            return;

        }


        onSave(form);

    };



    return(

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6">


                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-base font-semibold text-gray-800">

                        {
                            data
                            ?
                            "Edit Student"
                            :
                            "Create Student"
                        }

                    </h2>


                    <button

                        onClick={onClose}

                        disabled={loading}

                        className="text-gray-400 hover:text-gray-600"

                    >

                        <X size={18}/>

                    </button>


                </div>



                {
                    serverError && (

                        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">

                            {serverError}

                        </p>

                    )
                }




                <label className="text-sm text-gray-600">

                    Full Name

                </label>


                <input

                    name="full_name"

                    value={form.full_name}

                    onChange={handleChange}

                    placeholder="Enter student name"

                    disabled={loading}

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.full_name
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

                />


                {
                    errors.full_name && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.full_name}

                        </p>

                    )
                }




                <label className="text-sm text-gray-600">

                    Email

                </label>


                <input

                    name="email"

                    value={form.email}

                    onChange={handleChange}

                    placeholder="student@gmail.com"

                    disabled={loading}

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.email
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

                />


                {
                    errors.email && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.email}

                        </p>

                    )
                }





                <label className="text-sm text-gray-600">

                    Gender

                </label>


                <select

                    name="gender"

                    value={form.gender}

                    onChange={handleChange}

                    disabled={loading}

                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"

                >

                    <option value="Male">
                        Male
                    </option>

                    <option value="Female">
                        Female
                    </option>

                </select>






                <label className="text-sm text-gray-600 mt-3 block">

                    Date of Birth

                </label>


                <input

                    type="date"

                    name="date_of_birth"

                    value={form.date_of_birth}

                    onChange={handleChange}

                    disabled={loading}

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.date_of_birth
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

                />


                {
                    errors.date_of_birth && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.date_of_birth}

                        </p>

                    )
                }






                <label className="text-sm text-gray-600">

                    Class

                </label>


                <select

                    name="class_id"

                    value={form.class_id}

                    onChange={handleChange}

                    disabled={loading}

                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"

                >

                    <option value="">

                        Select Class

                    </option>


                    {
                        classes.map(item=>(

                            <option

                                key={item._id}

                                value={item._id}

                            >

                                {item.class_name}

                            </option>

                        ))
                    }


                </select>


                {
                    errors.class_id && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.class_id}

                        </p>

                    )
                }





                <button

                    onClick={handleSubmit}

                    disabled={loading}

                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg text-sm font-medium transition"

                >

                    {
                        loading
                        ?
                        "Saving..."
                        :
                        data
                        ?
                        "Update Student"
                        :
                        "Create Student"
                    }

                </button>


            </div>

        </div>

    );

};


export default StudentFormModal;