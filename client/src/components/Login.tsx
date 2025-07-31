import React from "react";
import { Link } from "react-router-dom";
import login from "@/assets/login.png";

const Login = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <header className="h-16 flex items-center font-black text-2xl ml-8 mt-10 ">
          Taskify
        </header>
       
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <div
            className="hidden md:flex md:w-1/2 items-center justify-center bg-no-repeat"
            style={{ backgroundImage: `url(${login})` }}
          ></div>

          <div className="w-full md:w-1/2 flex items-start justify-center py-10 px-6 md:p-16">
            <div className="w-full max-w-lg p-8 md:p-16 mt-2">
              <h2 className="flex   justify-center text-3xl font-bold mb-9">
                Login
              </h2>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-3 rounded outline-none w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-3 rounded outline-none w-full"
                />
                <div className="flex justify-between text-sm">
                  <span></span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button className="bg-black text-white p-3 rounded hover:bg-gray-800 transition">
                  Login
                </button>
              </form>
              <div className="flex items-center gap-2 my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="text-sm text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <button className="flex items-center justify-center border p-3 rounded w-full hover:bg-gray-100 transition cursor-pointer">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
              <p className="mt-6 text-sm text-center">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
