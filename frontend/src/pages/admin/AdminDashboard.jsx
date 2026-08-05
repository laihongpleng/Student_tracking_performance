import AdminLayout from "../../layouts/AdminLayout";
import KpiSection from "../../components/admin/dashboard/KpiSection";
import ClassOverview from "../../components/admin/dashboard/ClassOverview";
import AttendanceOverview from "../../components/admin/dashboard/AttendanceOverview";
import MonthlyResultTable from "../../components/admin/dashboard/MonthlyResultTable";
import SemesterResultTable from "../../components/admin/dashboard/SemesterResultTable";
import PerformanceAnalysis from "../../components/admin/dashboard/PerformanceAnalysis";
import PerformanceTrendChart from "../../components/admin/dashboard/PerformanceTrendChart";
import PerformanceSummary from "../../components/admin/dashboard/PerformanceSummary";
import { useAdmin } from "../../context/AdminContext";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import useMonthlyResult from "../../hooks/useMonthlyResult";
import useSemesterResult from "../../hooks/useSemesterResult";

const AdminDashboard = () => {
    const { academicYear } = useAdmin();
        const {
        monthlyResult
    } = useMonthlyResult(
        academicYear,
        8
        );
        const {
        semesterResult
    } = useSemesterResult(
        academicYear,
        "Semester 1"
    );
    const { dashboard, loading } = useAdminDashboard(academicYear);

    return (
        <AdminLayout>

            {
                loading ?

                    (
                        <div className="flex items-center justify-center h-96 text-sm text-gray-500">
                            Loading dashboard...
                        </div>
                    )

                    :

                    (
                        <div className="space-y-6">
                            <KpiSection data={dashboard} />

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <ClassOverview data={dashboard?.classOverview || []} />
                                <AttendanceOverview data={dashboard?.attendanceOverview}/>
                            </div>

                            <PerformanceTrendChart data={dashboard?.performanceTrend || []}/>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <MonthlyResultTable data={monthlyResult}/>
                                <SemesterResultTable data={semesterResult} />
                            </div>

                            {/* <PerformanceSummary /> */}
                            <PerformanceAnalysis />
                        </div>
            
                    )
            }
        </AdminLayout>
    );
};

export default AdminDashboard;