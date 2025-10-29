import { Outlet } from "react-router-dom";
import { Components } from "./components";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
      <Components.Navbar />
      <Outlet />
      <Components.Footer />
    </div>
  );
}

export default App;
