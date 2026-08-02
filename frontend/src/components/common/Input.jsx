const Input = ({
    label,
    type = "text",
    placeholder,
    error,
    register,
    name,
}) => {
    return (
        <div className="mb-2">
            <label className="block mb-1 text-sm font-medium text-gray-600">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...(register && register(name))}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 text-sm ${error ? "border-red-500" : "border-gray-300"}`}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;