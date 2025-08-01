import { publicAxios } from "./axiosInstance";
export const signupUser = async (formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await publicAxios.post("/auth/register", formData);

    return res;
  } catch (error) {
    throw error || { message: "Signup failed" };
  }
};
export const googleLogin=async (decodedData: {
  email: string;
  name: string
   sub: string;
  picture: string;
})=>{
  try {
     const res = await publicAxios.post("/auth/google-login", {
      email: decodedData.email,
      name: decodedData.name,
      // googleId: decodedData.sub, // sub = unique google user id
      // picture: decodedData.picture,
    });
    return res
  } catch (error) {
    
  }
}
