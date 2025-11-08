function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  onClick,
}) {
  const baseStyle = `
    inline-flex items-center justify-center font-medium rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    primary: `
      bg-indigo-600 text-white 
      hover:bg-indigo-700 
      dark:bg-indigo-500 dark:hover:bg-indigo-600
      focus:ring-indigo-500 
    `,
    secondary: `
      bg-gray-200 text-gray-900 hover:bg-gray-300 
      dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700
      focus:ring-gray-400
    `,
    outline: `
      border border-indigo-600 text-indigo-600 hover:bg-indigo-50 
      dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-950
      focus:ring-indigo-500
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 
      dark:bg-red-700 dark:hover:bg-red-800
      focus:ring-red-500
    `,
    ghost: `
      bg-transparent text-gray-700 hover:bg-gray-100 
      dark:text-gray-300 dark:hover:bg-gray-800
      focus:ring-gray-400
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
