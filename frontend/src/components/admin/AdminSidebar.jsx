import { useNavigate,useLocation } from "react-router-dom";
import { LayoutDashboard, School, Users, UserRoundCog, BookOpen, ClipboardList, BarChart3, CalendarCheck, FileText, LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import ConfirmModal from "./teacher/ConfirmModal";

const AdminSidebar=()=>{

const navigate=useNavigate();
const location=useLocation();
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    
const menus=[
{name:"Dashboard",path:"/admin/dashboard",icon:LayoutDashboard},
{name:"Class Management",path:"/admin/classes",icon:School},
{name:"Student Management",path:"/admin/students",icon:Users},
{name:"Teacher Management",path:"/admin/teachers",icon:UserRoundCog},
{name:"Subject Management",path:"/admin/subjects",icon:BookOpen},
{name:"Teacher Assignment",path:"/admin/assignment",icon:ClipboardList},
// {name:"Performance Analysis",path:"/admin/performance",icon:BarChart3},
// {name:"Attendance Overview",path:"/admin/attendance",icon:CalendarCheck},
// {name:"Academic Results",path:"/admin/results",icon:FileText},
// {name:"Academic Reports",path:"/admin/reports",icon:FileText}
];



return(
    <aside className="w-full h-full bg-blue-900 text-white flex flex-col p-5">

<div className="pb-5 mb-5 border-b border-white/20">
    <p className="text-lg font-semibold leading-6">
Student Performance<br/>Tracking System
</p>
</div>

<nav className="flex-1 space-y-1">

    {menus.map(item=>{

        const Icon=item.icon;
        const active=location.pathname.startsWith(item.path);

    return(
        <button
            key={item.name}
            onClick={()=>navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${active?"bg-white/20 text-white shadow":"text-blue-100 hover:bg-white/10"}`}
        >
            <Icon size={18}/>
            <span>{item.name}</span>
        </button>
);

})}

</nav>

<button
    onClick={() => setShowLogoutModal(true)}
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition"
>
    <LogOut size={18} />
    Logout
</button>
{showLogoutModal && (
    <ConfirmModal
    open={showLogoutModal}
    title="Log Out"
    message="Are you sure you want to log out of your account?"
    confirmText="Log Out"
    Icon={LogOut}
    danger={true}
    onClose={() => setShowLogoutModal(false)}
    onConfirm={() => {
        logout();
        setShowLogoutModal(false);
        navigate("/admin");
    }}
/>
)}
</aside>
    
);

};

export default AdminSidebar;