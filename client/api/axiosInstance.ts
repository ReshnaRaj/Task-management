import axios from "axios"
const API_URL=import.meta.env.VITE_API_BASE_URL
 
export const publicAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});
export const privateAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 