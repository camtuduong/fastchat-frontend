import { api } from "@/lib/api";

export const getAllFriends = async (params: string) => {
  const response = await api.get(`/friends/search?username=${params}`);

  return response.data;
};
