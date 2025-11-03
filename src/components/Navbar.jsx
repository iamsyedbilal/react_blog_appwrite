import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice/themeSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Components } from "./index";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useSelector((store) => store.theme);
  const authStatus = useSelector((store) => store.auth.status);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <nav
      className="flex items-center justify-between px-6 py-4
        bg-white dark:bg-[#0a0a0a] 
        shadow-lg relative z-50 dark:shadow-[0_4px_10px_rgba(255,255,255,0.15)] transition-colors duration-300"
    >
      <div className="z-50">
        <Link to={"/"} onClick={() => setIsOpen(false)}>
          <Logo />
        </Link>
      </div>
      <ul
        className={`flex flex-col items-center fixed top-0 right-0 w-full h-full justify-center gap-5 font-bold text-gray-700 bg-white cursor-pointer transition-transform duration-300 md:flex-row md:static dark:bg-black dark:text-white ${
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <li>
          <Link to={"/"} onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/all-posts" onClick={() => setIsOpen(false)}>
            All Posts
          </Link>
        </li>
        <li>
          <Link to="/create-post" onClick={() => setIsOpen(false)}>
            Create
          </Link>
        </li>
        {!authStatus ? (
          <>
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Signup
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/user-profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Components.LogoutBtn onLogout={() => setIsOpen(false)} />
            </li>
          </>
        )}
      </ul>
      <div className=" z-50 flex items-center gap-2 ">
        <button
          className="text-3xl text-gray-700  transition-colors cursor-pointer dark:bg-black dark:text-white"
          onClick={() => {
            dispatch(toggleTheme());
            setIsOpen(false);
          }}
        >
          {mode === "light" ? (
            <MdDarkMode className="text-black" />
          ) : (
            <CiLight className="text-amber-400" />
          )}
        </button>
        {isOpen ? (
          <button
            className="cursor-pointer text-gray-700 md:hidden dark:bg-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoMdClose />
          </button>
        ) : (
          <button
            className="cursor-pointer text-gray-700 md:hidden dark:bg-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
