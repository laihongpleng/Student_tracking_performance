const Button = ({
    children,
    type = "button",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`text-sm rounded-lg bg-blue-500 px-2 py-2 text-white font-semibold transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;