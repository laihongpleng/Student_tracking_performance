import { 
    useNavigate, 
    useLocation 
} from "react-router-dom";

import {
    LayoutDashboard,
    School,
    CalendarCheck,
    ClipboardList,
    FileText,
    UserRound,
    LogOut
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import ConfirmModal from "../admin/teacher/ConfirmModal";


const TeacherSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { logout } = useAuth();

    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const menus = [

        {
            name:"Dashboard",
            path:"/teacher/dashboard",
            icon:LayoutDashboard
        },

        {
            name:"My Classes",
            path:"/teacher/classes",
            icon:School
        },

        {
            name:"Attendance",
            path:"/teacher/attendance",
            icon:CalendarCheck
        },

        {
            name:"Assessments",
            path:"/teacher/assessments",
            icon:ClipboardList
        },

        {
            name:"Scores",
            path:"/teacher/scores",
            icon:FileText
        },

        {
            name:"Profile",
            path:"/teacher/profile",
            icon:UserRound
        }

    ];


    return (

        <aside className="
            w-full
            h-full
            bg-blue-900
            text-white
            flex
            flex-col
            p-5
        ">


            {/* Logo */}
            <div className="
                pb-5
                mb-5
                border-b
                border-white/20
            ">
                <p className="
                    text-lg
                    font-semibold
                    leading-6
                ">
                    Student Performance
                    <br/>
                    Tracking System
                </p>


            </div>



            {/* Menu */}

            <nav className="
                flex-1
                space-y-1
            ">

                {
                    menus.map(item=>{

                        const Icon = item.icon;

                        const active =
                            location.pathname.startsWith(
                                item.path
                            );


                        return (

                            <button
                                key={item.name}
                                onClick={() =>
                                    navigate(item.path)
                                }

                                className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition

                                    ${
                                        active
                                        ?
                                        "bg-white/20 text-white shadow"
                                        :
                                        "text-blue-100 hover:bg-white/10"
                                    }
                                `}
                            >

                                <Icon size={18}/>

                                <span>
                                    {item.name}
                                </span>


                            </button>

                        );

                    })
                }


            </nav>



            {/* Logout */}

            <button

                onClick={() =>
                    setShowLogoutModal(true)
                }

                className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-lg
                    text-sm
                    hover:bg-white/10
                    transition
                "

            >

                <LogOut size={18}/>

                Logout

            </button>



            <ConfirmModal

                open={showLogoutModal}

                title="Log Out"

                message="
                Are you sure you want to log out of your teacher account?
                "

                confirmText="Log Out"

                danger={true}

                onClose={() =>
                    setShowLogoutModal(false)
                }

                onConfirm={()=>{
                    logout();

                    setShowLogoutModal(false);

                    navigate("/",{
                        replace:true
                    });
                }}

            />


        </aside>

    );

};


export default TeacherSidebar;