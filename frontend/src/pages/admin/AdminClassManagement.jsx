import AdminLayout from "../../layouts/AdminLayout";
import ClassManagement from "../../components/admin/class/ClassManagement";


const AdminClassManagement = () => {


    return (

        <AdminLayout>

            <div className="space-y-6">

                <ClassManagement />

            </div>

        </AdminLayout>

    );

};


export default AdminClassManagement;