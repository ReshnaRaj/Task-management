import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import login from "@/assets/login.png";
import { Formik, ErrorMessage } from "formik";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { useState } from "react";
import { signupUser } from "../../api/auth";
import { validationSchema } from "@/utils/validation";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await signupUser(values);

      if (res?.status === 200) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.error || "Signup failed");
    }
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
                  Sign Up
                </h2>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        value={values.name}
                        className="border p-3 rounded outline-none w-full"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Enter Email"
                        onChange={handleChange}
                        className="border p-3 rounded outline-none w-full"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          value={values.password}
                          className="border p-3 rounded outline-none w-full"
                        />
                        <span
                          onClick={togglePassword}
                          className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {!showPassword ? (
                            <LockKeyhole className="w-5 h-5" />
                          ) : (
                            <LockKeyholeOpen className="w-5 h-5" />
                          )}
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <div className="relative">
                        <input
                          type={confirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          placeholder="Enter Password again"
                          className="border p-3 rounded outline-none w-full"
                        />
                        <span
                          onClick={toggleConfirmPassword}
                          className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {!confirmPassword ? (
                            <LockKeyhole className="w-5 h-5" />
                          ) : (
                            <LockKeyholeOpen className="w-5 h-5" />
                          )}
                        </span>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <button
                        type="submit"
                        className="bg-black text-white p-3 rounded hover:bg-black transition cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </form>
                  )}
                </Formik>
                <div className="flex items-center gap-2 my-6">
                  <hr className="flex-1 border-gray-300" />
                  <span className="text-sm text-gray-500">OR</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                <p className="mt-6 text-sm text-center">
                  Already have a account?{" "}
                  <Link
                    to="/"
                    className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"
                  >
                    {" "}
                    Login
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

export default Signup;
