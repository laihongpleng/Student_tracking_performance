import { useState } from "react";
import { AlertTriangle, Plus } from "lucide-react";

import TeacherTable from "./TeacherTable";
import TeacherFormModal from "./TeacherFormModal";
import ConfirmModal from "./ConfirmModal";
import CredentialModal from "./CredentialModal";
import useTeacher from "../../../hooks/useTeacher";

const TeacherManagement = () => {

    const [openModal,setOpenModal]=useState(false);

    const [selectedTeacher,setSelectedTeacher]=useState(null);

    const [confirm,setConfirm]=useState(null);

    const [credential,setCredential]=useState(null);

    const [serverError,setServerError]=useState("");

    const {
        teachers,
        loading,
        saveTeacher,
        changeStatus
    }=useTeacher();



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
                        Teacher Management
                    </h2>


                    <p
                        className="
                        text-xs
                        text-gray-500
                        "
                    >
                        Manage teacher information and accounts
                    </p>

                </div>



                <button

                    onClick={()=>{

                        setSelectedTeacher(null);

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

                    Add Teacher

                </button>


            </div>





            <TeacherTable

                teachers={teachers}


                onEdit={(item)=>{

                    setSelectedTeacher(item);

                    setServerError("");

                    setOpenModal(true);

                }}


                onDeactivate={(item)=>{

                    setConfirm(item);

                }}
                onActivate={async(item)=>{

                    await changeStatus(
                     item.user_id._id,
                        true
                    );

                }}
            />







            {
                openModal &&

                <TeacherFormModal

                    data={selectedTeacher}

                    loading={loading}

                    serverError={serverError}


                    onClose={()=>{

                        setOpenModal(false);

                        setServerError("");

                    }}


                    onSave={async(data)=>{

                        try{

                            setServerError("");


                            const result = await saveTeacher(
                                data,
                                selectedTeacher?._id
                            );


                            if(!selectedTeacher){

                                setCredential(result);

                            }


                            setOpenModal(false);

                            setSelectedTeacher(null);


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
                credential &&

                <CredentialModal

                    open={!!credential}

                    data={credential}

                    onClose={()=>setCredential(null)}

                />

            }









            {
                confirm &&

                <ConfirmModal

                    open={confirm}

                    title="Deactivate Teacher"

                    message={
                        `Are you sure you want to deactivate ${confirm.full_name}?`
                    }

                    confirmText="Deactivate"


                    Icon={AlertTriangle}


                    onClose={()=>setConfirm(null)}


                    onConfirm={async()=>{


                        await changeStatus(

                            confirm.user_id._id,

                            false

                        );


                        setConfirm(null);


                    }}

                />

            }



        </div>

    );

};


export default TeacherManagement;