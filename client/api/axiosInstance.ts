import axios from "axios"
const API_URL=import.meta.env.VITE_API_BASE_URL
console.log(API_URL,"API URL")
export const publicAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});
export const privateAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});