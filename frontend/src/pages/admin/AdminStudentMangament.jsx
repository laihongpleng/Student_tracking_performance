import AdminLayout from "../../layouts/AdminLayout";
import StudentManagement from "../../components/admin/student/StudentManagement";


const AdminStudentManagement = () => {


    return (

        <AdminLayout>

            <div className="
                space-y-6
            ">

                <StudentManagement />

            </div>

        </AdminLayout>

    );

};


export default AdminStudentManagement;