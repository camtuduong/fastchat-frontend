import { publicApi } from "@/services/api";

export const refreshToken = async () => {
  const response = await publicApi.post("/auth/refresh-token");
  return response.data;
};
