import { useState } from "react";
import { X } from "lucide-react";

import useTeacher from "../../../hooks/useTeacher";
import useSubject from "../../../hooks/useSubject";
import useClass from "../../../hooks/useClass";

const AssignmentFormModal = ({
    data,
    loading,
    serverError,
    onClose,
    onSave
}) => {

    const { teachers } = useTeacher();

    const { subjects } = useSubject();

    const { classes } = useClass();


    const [form,setForm]=useState({

        teacher_id:data?.teacher_id?._id || "",

        subject_id:data?.subject_id?._id || "",

        class_id:data?.class_id?._id || ""

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


        if(!form.teacher_id){

            newErrors.teacher_id="Please select a teacher";

        }


        if(!form.subject_id){

            newErrors.subject_id="Please select a subject";

        }


        if(!form.class_id){

            newErrors.class_id="Please select a class";

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
                            "Edit Assignment"
                            :
                            "Create Assignment"
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

                    Teacher

                </label>


                <select

                    name="teacher_id"

                    value={form.teacher_id}

                    onChange={handleChange}

                    disabled={loading}

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.teacher_id
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

                >

                    <option value="">

                        Select Teacher

                    </option>


                    {
                        teachers.map(item=>(

                            <option

                                key={item._id}

                                value={item._id}

                            >

                                {item.full_name}

                            </option>

                        ))
                    }

                </select>


                {
                    errors.teacher_id && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.teacher_id}

                        </p>

                    )
                }


                <label className="text-sm text-gray-600">

                    Subject

                </label>


                <select

                    name="subject_id"

                    value={form.subject_id}

                    onChange={handleChange}

                    disabled={loading}

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.subject_id
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

                >

                    <option value="">

                        Select Subject

                    </option>


                    {
                        subjects.map(item => (
                                                    <option

                            key={item._id}

                            value={item._id}

                        >

                            {item.subject_name}

                        </option>

                    ))
                }

                </select>


                {
                    errors.subject_id && (

                        <p className="text-xs text-red-500 mb-3">

                            {errors.subject_id}

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

                    className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none mb-1 ${
                        errors.class_id
                        ?
                        "border border-red-500 focus:ring-2 focus:ring-red-200"
                        :
                        "border border-gray-200 focus:ring-2 focus:ring-blue-200"
                    }`}

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
                        "Update Assignment"
                        :
                        "Create Assignment"
                    }

                </button>

            </div>

        </div>

    );

};

export default AssignmentFormModal;