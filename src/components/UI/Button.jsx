function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  onClick,
}) {
  const baseStyle = `px-5 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none cursor-pointer`;

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
