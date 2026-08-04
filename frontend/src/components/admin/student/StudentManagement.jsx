import { useState } from "react";
import { Plus } from "lucide-react";

import StudentTable from "./StudentTable";
import StudentFormModal from "./StudentFormModal";
import ConfirmModal from "../teacher/ConfirmModal";
import CredentialModal from "../teacher/CredentialModal";
import useStudent from "../../../hooks/useStudent";


const StudentManagement = () => {

    const [openModal,setOpenModal]=useState(false);

    const [selectedStudent,setSelectedStudent]=useState(null);

    const [confirm,setConfirm]=useState(null);

    const [credential,setCredential]=useState(null);

    const [serverError,setServerError]=useState("");



    const {
        students,
        loading,
        saveStudent,
        changeStatus
    }=useStudent();


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
                        Student Management
                    </h2>


                    <p
                        className="
                        text-xs
                        text-gray-500
                        "
                    >
                        Manage student information and accounts
                    </p>

                </div>



                <button

                    onClick={()=>{

                        setSelectedStudent(null);

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

                    Add Student

                </button>


            </div>

            <StudentTable

                students={students}


                onEdit={(item)=>{

                    setSelectedStudent(item);

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


                <StudentFormModal

                    data={selectedStudent}

                    loading={loading}

                    serverError={serverError}


                    onClose={()=>{

                        setOpenModal(false);

                        setServerError("");

                    }}



                    onSave={async(data)=>{

                        try{

                            setServerError("");


                            const result = await saveStudent(

                                data,

                                selectedStudent?._id

                            );



                            if(!selectedStudent){

                                setCredential(result);

                            }



                            setOpenModal(false);

                            setSelectedStudent(null);


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

                    title="Deactivate Student"


                    message={
                        `Are you sure you want to deactivate ${confirm.full_name}?`
                    }


                    confirmText="Deactivate"


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


export default StudentManagement;