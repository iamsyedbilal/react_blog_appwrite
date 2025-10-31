import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice/authSlice";
import { logoutUser } from "../lib";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout({ onLogout }) {
    try {
      await logoutUser();
      dispatch(logout());
      if (onLogout) onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 cursor-pointer rounded-full font-semibold
             bg-gray-900 text-white shadow-md
             hover:shadow-lg hover:scale-105 active:scale-95
             transition-all duration-300 ease-in-out
             dark:bg-white dark:text-gray-900
             dark:hover:bg-gray-200 dark:hover:shadow-gray-700"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
