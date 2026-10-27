import { api } from "@/services/api";

export const acceptFriendRequest = async (requestId: string) => {
  const response = await api.post(`friends/${requestId}/accept`);
  return response.data;
};
