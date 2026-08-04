import { useState } from "react";
import { X } from "lucide-react";

const TeacherFormModal=({
    data,
    loading,
    serverError,
    onClose,
    onSave
})=>{

    const [form,setForm]=useState({
        full_name:data?.full_name||"",
        email:data?.user_id?.email||"",
        gender:data?.gender||"Male",
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
        else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(form.email)){
            newErrors.email="Please enter a valid email";
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
                        {data?"Edit Teacher":"Create Teacher"}
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
                    placeholder="Enter teacher name"
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
                    errors.full_name
                    ?
                    "border border-red-500 focus:ring-2 focus:ring-red-200"
                    :
                    "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }
                    `}
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
                    placeholder="teacher@gmail.com"
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
                    errors.email
                    ?
                    "border border-red-500 focus:ring-2 focus:ring-red-200"
                    :
                    "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }
                    `}
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
                        "Update Teacher"
                        :
                        "Create Teacher"
                    }
                </button>

            </div>
        </div>
    );

};

export default TeacherFormModal;