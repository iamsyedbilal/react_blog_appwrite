import { Components } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../lib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice/authSlice";

function SignupComponent() {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function registerUser(data) {
    setError("");
    try {
      const userData = await createAccount(data);
      dispatch(login(userData));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      reset();
    }
  }

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300 px-4">
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
          Create an Account
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold text-blue-600 dark:text-purple-400 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col items-center justify-center gap-5"
        >
          <Components.InputField
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
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
          <Components.InputField
            label="Password"
            placeholder="**********"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <Components.Button
            type="submit"
            className="w-full mt-2"
            variant="primary"
          >
            Create Account
          </Components.Button>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;
