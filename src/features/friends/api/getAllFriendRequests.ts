import type { FriendRequestResponse } from "@/features/friends/types/request";
import { api } from "@/services/api";

export const getAllFriendRequests = async () => {
  const res = await api.get<FriendRequestResponse>(`/friends/requests`);
  return res.data;
};
