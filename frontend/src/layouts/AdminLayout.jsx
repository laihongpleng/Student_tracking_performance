import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = ({ children }) => {

    return (

        <div className="min-h-screen bg-gray-100">

            <aside className="fixed top-0 left-0 w-64 h-screen z-40">
                <AdminSidebar />
            </aside>


            <div className="ml-64">

                <header className="fixed top-0 left-64 right-0 h-16 z-30">
                    <AdminHeader />
                </header>


                <main className="pt-20 p-6">
                    {children}
                </main>

            </div>

        </div>

    );

};

export default AdminLayout;