import { Outlet } from "react-router-dom";
import { Components } from "./components";
import { getCurrentUser } from "./lib";
import { login, logout } from "./features/authSlice/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "./features/loadingSlice/loadingSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loading);

  useEffect(() => {
    async function checkAuth() {
      try {
        dispatch(showLoading("Checking authentication..."));
        const user = await getCurrentUser();
        if (user) dispatch(login(user));
        else dispatch(logout());
      } catch (error) {
        console.error("Error checking auth:", error);
        dispatch(logout());
      } finally {
        dispatch(hideLoading());
      }
    }
    checkAuth();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Components.LoadingSpinner fullScreen={true} />}
      <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
        <Components.Navbar />
        <div className="px-2">
          <Outlet />
        </div>
        <Components.Footer />
      </div>
    </>
  );
}

export default App;
