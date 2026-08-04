import AdminLayout from "../../layouts/AdminLayout";
import TeacherAssignmentManagement from "../../components/admin/assignment/TeacherAssignmentManagement";


const AdminTeacherAssignmentManagement = () => {


    return (

        <AdminLayout>

            <div className="space-y-6">

                <TeacherAssignmentManagement/>

            </div>

        </AdminLayout>

    );

};


export default AdminTeacherAssignmentManagement;