import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import AssignmentTable from "./AssignmentTable";
import AssignmentFormModal from "./AssignmentFormModal";
import ConfirmModal from "../teacher/ConfirmModal";
import useAssignment from "../../../hooks/useAssignment";

const TeacherAssignmentManagement = () => {

    const [openModal,setOpenModal]=useState(false);

    const [selectedAssignment,setSelectedAssignment]=useState(null);

    const [confirm,setConfirm]=useState(null);

    const [serverError,setServerError]=useState("");


    const {
        assignments,
        loading,
        saveAssignment,
        changeStatus
    }=useAssignment();


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

            <div
                className="
                flex
                justify-between
                items-center
                mb-5
                "
            >

                <div>

                    <h2
                        className="
                        text-base
                        font-semibold
                        text-gray-800
                        "
                    >
                        Teacher Assignment
                    </h2>

                    <p
                        className="
                        text-xs
                        text-gray-500
                        "
                    >
                        Assign teachers to classes and subjects
                    </p>

                </div>


                <button

                    onClick={()=>{

                        setSelectedAssignment(null);

                        setServerError("");

                        setOpenModal(true);

                    }}

                    className="
                    flex
                    items-center
                    gap-2
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    hover:bg-blue-700
                    "

                >

                    <Plus size={16}/>

                    Add Assignment

                </button>

            </div>



            <AssignmentTable

                assignments={assignments}


                onEdit={(item)=>{

                    setSelectedAssignment(item);

                    setServerError("");

                    setOpenModal(true);

                }}


                onDeactivate={(item)=>{

                    setConfirm(item);

                }}


                onActivate={async(item)=>{

                    await changeStatus(

                        item._id,

                        true

                    );

                    toast.success(
                        "Assignment activated successfully."
                    );

                }}

            />



            {
                openModal &&

                <AssignmentFormModal

                    data={selectedAssignment}

                    loading={loading}

                    serverError={serverError}


                    onClose={()=>{

                        setOpenModal(false);

                        setSelectedAssignment(null);

                        setServerError("");

                    }}


                    onSave={async(data)=>{

                        try{

                            setServerError("");

                            await saveAssignment(

                                data,

                                selectedAssignment?._id

                            );


                            toast.success(

                                selectedAssignment
                                ?
                                "Assignment updated successfully."
                                :
                                "Assignment created successfully."

                            );


                            setOpenModal(false);

                            setSelectedAssignment(null);

                        }
                        catch(error){

                            setServerError(

                                error.response?.data?.message ||

                                "Something went wrong"

                            );

                        }

                    }}

                />

            }



            {
                confirm &&

                <ConfirmModal

                    open={confirm}

                    title="Deactivate Assignment"

                    message={
                        `Are you sure you want to deactivate this assignment?`
                    }

                    confirmText="Deactivate"


                    onClose={()=>setConfirm(null)}


                    onConfirm={async()=>{

                        await changeStatus(

                            confirm._id,

                            false

                        );

                        toast.success(
                            "Assignment deactivated successfully."
                        );

                        setConfirm(null);

                    }}

                />

            }

        </div>

    );

};

export default TeacherAssignmentManagement;