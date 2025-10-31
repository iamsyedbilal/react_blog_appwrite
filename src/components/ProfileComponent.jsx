import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

function ProfileComponent() {
  const userProfile = useSelector((store) => store.auth.userData);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600 dark:text-gray-300">
        <p className="text-lg font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300 px-4 py-10">
      <div
        className="w-full max-w-md rounded-2xl p-8 border border-gray-200 dark:border-gray-800 
                   bg-white dark:bg-gray-900 shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] 
                   text-gray-900 dark:text-gray-100 transition-all duration-300"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-gray-500 dark:text-gray-400 text-7xl mb-3" />
          <h2 className="text-2xl font-bold">
            {userProfile.name || "Unnamed User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {userProfile.email}
          </p>
        </div>

        <div className="h-[1px] bg-gray-200 dark:bg-gray-700 mb-6" />

        {/* Account Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              User ID:
            </span>
            <span className="text-gray-600 dark:text-gray-400 break-all">
              {userProfile.$id}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {userProfile.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Joined On:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(userProfile.$createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
