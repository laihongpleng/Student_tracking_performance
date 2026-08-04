
import { useState } from "react";
import { Plus } from "lucide-react";

import ClassTable from "./ClassTable";
import ClassFormModal from "./ClassFormModal";
import ConfirmModal from "../teacher/ConfirmModal";

import useClass from "../../../hooks/useClass";
import toast from "react-hot-toast";

const ClassManagement = () => {


    const [openModal,setOpenModal] = useState(false);

    const [selectedClass,setSelectedClass] = useState(null);

    const [confirm,setConfirm] = useState(null);

    const [serverError,setServerError] = useState("");



    const {
        classes,
        loading,
        saveClass,
        changeStatus
    } = useClass();





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
                        Class Management
                    </h2>


                    <p
                        className="
                        text-xs
                        text-gray-500
                        "
                    >
                        Manage classes and academic year
                    </p>

                </div>





                <button

                    onClick={()=>{

                        setSelectedClass(null);

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

                    Add Class

                </button>


            </div>







            <ClassTable

                classes={classes}


                onEdit={(item)=>{


                    setSelectedClass(item);

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


                }}


            />








            {
                openModal &&


                <ClassFormModal


                    data={selectedClass}


                    loading={loading}


                    serverError={serverError}



                    onClose={()=>{


                        setOpenModal(false);

                        setServerError("");


                    }}




                    onSave={async(data)=>{


                        try{


                            setServerError("");



                            await saveClass(

                                data,

                                selectedClass?._id

                            );


                            toast.success(
                                selectedClass
                                    ?
                                    "Class Update successfully"
                                    :
                                    "Class Created successfully"
                            );
                            setOpenModal(false);

                            setSelectedClass(null);



                        }
                        catch(error){


                            toast.error(
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


                    open={!!confirm}


                    title="Deactivate Class"


                    message={
                        `Are you sure you want to deactivate ${confirm.class_name}?`
                    }


                    confirmText="Deactivate"



                    onClose={()=>setConfirm(null)}




                    onConfirm={async()=>{


                        await changeStatus(

                            confirm._id,

                            false

                        );



                        setConfirm(null);



                    }}


                />


            }




        </div>

    );

};


export default ClassManagement;