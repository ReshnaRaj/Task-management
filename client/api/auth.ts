import { publicAxios } from "./axiosInstance";
export const signupUser = async (formData:{ name: string; email: string; password: string;  confirmPassword: string;}) => {
  try {
    const res = await publicAxios.post("/auth/register", formData);
    
    return res;
  } catch (error) {
    throw error|| { message: "Signup failed" };
  }
};