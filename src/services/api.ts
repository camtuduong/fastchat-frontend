import { refreshToken } from "@/features/auth/api/refreshToken";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//interceptor for private api
api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//interceptor kiểm tra accessToken hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const codeExpired = error.response?.data.code === "TOKEN_EXPIRED";

    if (!codeExpired || original._retry) {
      throw error;
    }
    original._retry = true;

    try {
      const data = await refreshToken();
      useAuthStore.setState({
        accessToken: data.accessToken,
      });
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch (err) {
      throw err;
    }
  },
);

export { api, publicApi };
