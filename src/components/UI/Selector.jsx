import { forwardRef, useId } from "react";

const Selector = forwardRef(function Selector(
  { options = [], label, className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 
                 text-gray-900 border dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 
                 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300 w-full ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Selector;
