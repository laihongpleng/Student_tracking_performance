import { ChevronDown } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AdminHeader = () => {
    const { academicYear, setAcademicYear } = useAdmin();

    return (
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between">
            <div>
                <p className="text-xl font-semibold text-gray-800">Dashboard</p>
                <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <select
                        value={academicYear}
                        onChange={(e)=>setAcademicYear(e.target.value)}
                        className="appearance-none h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="2025-2026">2025 - 2026</option>
                        <option value="2026-2027">2026 - 2027</option>
                    </select>

                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                </div>

                <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-2 hover:bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800">Administrator</p>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;