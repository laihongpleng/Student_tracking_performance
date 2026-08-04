import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import SubjectTable from "./SubjectTable";
import SubjectFormModal from "./SubjectFormModal";
import ConfirmModal from "../teacher/ConfirmModal";

import useSubject from "../../../hooks/useSubject";


const SubjectManagement = () => {


    const [openModal,setOpenModal] = useState(false);

    const [selectedSubject,setSelectedSubject] = useState(null);

    const [confirm,setConfirm] = useState(null);

    const [serverError,setServerError] = useState("");



    const {
        subjects,
        loading,
        saveSubject,
        changeStatus
    } = useSubject();




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

                    <h2 className="text-base font-semibold text-gray-800">
                        Subject Management
                    </h2>


                    <p className="text-xs text-gray-500">
                        Manage subjects information
                    </p>

                </div>



                <button

                    onClick={()=>{

                        setSelectedSubject(null);

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

                    Add Subject

                </button>


            </div>





            <SubjectTable

                subjects={subjects}


                onEdit={(item)=>{

                    setSelectedSubject(item);

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
                        "Subject activated successfully"
                    );

                }}

            />







            {
                openModal &&


                <SubjectFormModal

                    data={selectedSubject}

                    loading={loading}

                    serverError={serverError}


                    onClose={()=>{

                        setOpenModal(false);

                        setServerError("");

                    }}



                    onSave={async(data)=>{

                        try{

                            setServerError("");


                            await saveSubject(
                                data,
                                selectedSubject?._id
                            );



                            toast.success(

                                selectedSubject

                                ?

                                "Subject updated successfully"

                                :

                                "Subject created successfully"

                            );



                            setOpenModal(false);

                            setSelectedSubject(null);


                        }
                        catch(error){

                            const message =
                            error.response?.data?.message ||
                            "Something went wrong";


                            setServerError(message);

                            toast.error(message);

                        }

                    }}

                />

            }







            {
                confirm &&


                <ConfirmModal

                    open={confirm}


                    title="Deactivate Subject"


                    message={
                        `Are you sure you want to deactivate ${confirm.subject_name}?`
                    }


                    confirmText="Deactivate"


                    onClose={()=>setConfirm(null)}


                    onConfirm={async()=>{


                        await changeStatus(

                            confirm._id,

                            false

                        );


                        toast.success(
                            "Subject deactivated successfully"
                        );


                        setConfirm(null);


                    }}

                />

            }



        </div>

    );

};


export default SubjectManagement;