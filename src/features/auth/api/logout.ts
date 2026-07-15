import { api } from "@/services/api";

export const logout = async () => {
  const response = await api.post("/auth/signout");
  return response.data;
};
