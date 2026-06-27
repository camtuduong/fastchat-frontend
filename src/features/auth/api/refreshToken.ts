import { publicApi } from "@/lib/api";

export const refreshToken = async () => {
  const response = await publicApi.post("/auth/refresh-token");
  return response.data;
};
