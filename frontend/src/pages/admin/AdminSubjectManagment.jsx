import AdminLayout from "../../layouts/AdminLayout";
import SubjectManagement from "../../components/admin/subject/SubjectManagement";


const AdminSubjectManagement = () => {


    return (

        <AdminLayout>

            <div className="space-y-6">

                <SubjectManagement/>

            </div>

        </AdminLayout>

    );

};


export default AdminSubjectManagement;