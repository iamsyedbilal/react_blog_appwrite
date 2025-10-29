import { forwardRef, useId } from "react";

const InputField = forwardRef(function InputField(
  { label, type = "text", name, placeholder, ...rest },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        name={name}
        id={id}
        {...rest}
        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 
                 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 
                 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300"
      />
    </div>
  );
});

export default InputField;
