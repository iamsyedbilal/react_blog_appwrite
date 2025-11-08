function Logo() {
  return (
    <div className="flex items-center text-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-8 h-8"
      >
        {/* Wave Pen Circle */}
        <defs>
          <linearGradient id="inkflowGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
            <stop offset="100%" stopColor="#8B5CF6" /> {/* purple-500 */}
          </linearGradient>
        </defs>
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="url(#inkflowGradient)"
          className="transition-colors duration-300"
        />
        {/* Pen Nib */}
        <path
          d="M32 14 L36 32 L32 36 L28 32 Z"
          fill="white"
          className="dark:fill-gray-900 transition-colors duration-300"
        />
        {/* Flow Wave */}
        <path
          d="M10 44 Q24 36 40 44 T62 44"
          stroke="white"
          strokeWidth="2"
          fill="none"
          className="dark:stroke-gray-900 transition-colors duration-300"
        />
      </svg>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 ">
        Blog
        <span className="text-indigo-600 dark:text-indigo-400">Sphere</span>
      </h2>
    </div>
  );
}

export default Logo;
