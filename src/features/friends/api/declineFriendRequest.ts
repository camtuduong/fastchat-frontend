import { api } from "@/services/api";

export const declineFriendRequest = async (requestId: string) => {
  const res = await api.post(`/friends/${requestId}/decline`);
  return res.data;
};
