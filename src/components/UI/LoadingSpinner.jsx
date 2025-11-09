import { useSelector } from "react-redux";

function LoadingSpinner({ fullScreen = false }) {
  const { isLoading, message } = useSelector((store) => store.loading);

  if (!isLoading) return null;
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen
          ? "fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          : "min-h-[40vh]"
      }`}
    >
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="mt-4 text-gray-100 dark:text-gray-200 text-lg text-center">
        {message || "Loading..."}
      </span>
    </div>
  );
}

export default LoadingSpinner;
