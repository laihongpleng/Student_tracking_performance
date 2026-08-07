import { Outlet } from "react-router-dom";

import TeacherSidebar from "../components/teacher/TeacherSidebar";
import TeacherTopbar from "../components/teacher/TeacherTopbar";


const TeacherLayout = () => {

    return (

        <div className="min-h-screen bg-gray-100">


            {/* Sidebar */}

            <aside className="fixed top-0 left-0 w-64 h-screen z-40">

                <TeacherSidebar />

            </aside>



            {/* Main Content */}

            <div className="ml-64">


                {/* Topbar */}
                
                <header className="fixed top-0 left-64 right-0 h-16 z-30">
                    <TeacherTopbar />
                </header>

                {/* Page Content */}

                <main className="
                    flex-1
                    overflow-y-auto
                    p-6
                ">

                    <Outlet />

                </main>


            </div>


        </div>

    );

};


export default TeacherLayout;