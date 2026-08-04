import AdminLayout from "../../layouts/AdminLayout";

import TeacherManagement from "../../components/admin/teacher/TeacherManagement";


const AdminTeacherManagement = () => {


    return (

        <AdminLayout>

            <div className="space-y-6">

                <TeacherManagement />

            </div>

        </AdminLayout>

    );

};


export default AdminTeacherManagement;