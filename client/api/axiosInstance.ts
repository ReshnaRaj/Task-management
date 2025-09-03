import { store } from "@/redux/store";
import axios from "axios"
import { setCredentials, logout } from "@/redux/slice/authSlice";
const API_URL=import.meta.env.VITE_API_BASE_URL!
 
export const publicAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  
});
export const privateAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
 withCredentials: true,
});
privateAxios.interceptors.request.use(
  (config) => {
    const state = store.getState(); 
   
    const token = state.auth.token;
    // const role=state?.auth?.user?.role
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
 
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Request new access token
        const res = await axios.post(`${API_URL}/auth/generate-new-token`, {
          refreshToken,
        }, { withCredentials: true });

        const newAccessToken = res.data.accessToken;
        // persist token in redux
        const state = store.getState();
        store.dispatch(setCredentials({ user: state.auth.user, token: newAccessToken }));

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

 