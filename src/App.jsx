import { Outlet } from "react-router-dom";
import { Components } from "./components";
import { getCurrentUser } from "./lib";
import { login, logout } from "./features/authSlice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (user) dispatch(login(user));
      else dispatch(logout());
    }
    checkAuth();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
      <Components.Navbar />
      <Outlet />
      <Components.Footer />
    </div>
  );
}

export default App;
