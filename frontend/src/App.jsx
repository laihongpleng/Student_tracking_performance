import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={<AdminLogin />} />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <TeacherDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}

export default App;