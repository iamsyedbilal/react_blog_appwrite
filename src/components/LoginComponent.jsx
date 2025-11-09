import { Components } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogin } from "../lib";
import { login } from "../features/authSlice/authSlice";
import {
  showLoading,
  hideLoading,
} from "../features/loadingSlice/loadingSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LoginComponent() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store) => store.loading);

  async function loginUser(data) {
    try {
      setError("");
      dispatch(showLoading("Signing in..."));
      const userData = await userLogin(data);
      dispatch(login(userData));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      dispatch(hideLoading());
      reset();
    }
  }

  return (
    <div className="flex items-center justify-center bg-white  dark:bg-gray-950 transition-colors duration-300 px-4">
      {isLoading && <Components.LoadingSpinner fullScreen />}
      <div
        className="mx-auto w-full max-w-md rounded-2xl p-8 border border-gray-200 dark:border-gray-800 
                   bg-white dark:bg-gray-900 shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] 
                   text-gray-900 dark:text-gray-100 transition-all duration-300"
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-24">
            <Components.Logo />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight mb-2">
          Sign in to your account
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Don&apos;t have account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 dark:text-purple-400 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(loginUser)}
          className="flex flex-col items-center justify-center gap-5"
        >
          <Components.InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address";
                },
              },
            })}
          />
          <div className="relative w-full">
            <Components.InputField
              label="Password"
              placeholder="**********"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-sm text-blue-600 dark:text-purple-400 select-none"
            >
              {showPassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </span>
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <Components.Button
            type="submit"
            className="w-full mt-2"
            variant="primary"
          >
            Sign In
          </Components.Button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
