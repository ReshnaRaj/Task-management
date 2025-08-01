import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import login from "@/assets/login.png";
import { LockKeyhole } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { googleLogin } from "../../api/auth";

const Login = () => {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  interface GooglePayload {
    email: string;
    name: string;
    picture: string;
    sub: string;
  }

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const decoded: GooglePayload = jwtDecode(token);
      const res=await googleLogin(decoded)
      
    if(res?.status==200){
      navigate("/home")
    }

    } catch (error) {}
  };
  const errorMessage = () => {
    toast.error("Google Login failed")
  };
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

          <div className="w-full md:w-1/2 flex items-start justify-center py-10 px-6 md:p-16  ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              className="w-full max-w-lg md:-mt-20"
            >
              <div className="w-full max-w-lg p-8 md:p-16 mt-2">
                <h2 className="flex   justify-center text-3xl font-bold mb-9">
                  Login
                </h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="border p-3 rounded outline-none w-full"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="border p-3 rounded outline-none w-full"
                    />
                    <span
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? (
                        <LockKeyholeOpen className="w-5 h-5" />
                      ) : (
                        <LockKeyhole className="w-5 h-5" />
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Having trouble signing in?</span>
                    <a href="#" className="text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <button className="bg-black text-white p-3 rounded hover:bg-black transition cursor-pointer">
                    Login
                  </button>
                </form>
                <div className="flex items-center gap-2 my-6">
                  <hr className="flex-1 border-gray-300" />
                  <span className="text-sm text-gray-500">OR</span>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <div className="flex items-center justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={errorMessage}
                  />
                </div>

                <p className="mt-6 text-sm text-center">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"
                  >
                    {" "}
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
