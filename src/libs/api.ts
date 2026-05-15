import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? API_BASE_URL : VITE_API_URL,
  withCredentials: true,
});

export default api;
