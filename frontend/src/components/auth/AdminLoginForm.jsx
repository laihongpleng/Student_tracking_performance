import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, BookOpen, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";
import { adminLoginSchema } from "../../utils/validators";
import { loginAdmin } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const AdminLoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(adminLoginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const response = await loginAdmin(data);

            login(response.token, response.user);

            toast.success("Admin login successful");

            navigate("/admin/dashboard");
        } catch (error) {
            setLoginError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto text-center">
            <div className="flex justify-center mb-2">
                <BookOpen size={38} className="text-blue-600" />
            </div>

            <p className="text-lg font-semibold text-slate-800">
                Student Performance Tracking System
            </p>

            <p className="text-sm text-gray-500 mb-5">
                Sign in to the Admin Dashboard
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-left mt-5">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        register={register}
                        error={errors.email?.message}
                    />
                </div>

                <div className="relative text-left">
                    <Input
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        register={register}
                        error={errors.password?.message}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {loginError && (
                    <p className="text-red-500 text-xs mt-1 text-left flex items-center gap-1">
                        <TriangleAlert size={14} />
                        {loginError}
                    </p>
                )}

                <div className="flex justify-center mt-6">
                    <Button type="submit" loading={loading}>
                        Sign in
                    </Button>
                </div>
            </form>

            <div className="flex items-center gap-2 my-5">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-xs text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="text-xs text-gray-500">
                Are you Teacher or Student?
                <button
                    onClick={() => navigate("/")}
                    className="ml-2 text-blue-600 hover:underline text-xs"
                >
                    Sign In here
                </button>
            </div>
        </div>
    );
};

export default AdminLoginForm;