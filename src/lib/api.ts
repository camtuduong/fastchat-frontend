import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_URL in frontend env");
}

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export { api, publicApi };
