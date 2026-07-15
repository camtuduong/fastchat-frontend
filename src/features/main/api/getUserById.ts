import { api } from "@/services/api";

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
