import { api } from "@/services/api";

import type { Friend } from "../type";

interface FriendResponse {
  friends: Friend[];
}

export const getAllFriends = async (params: string) => {
  const response = await api.get<FriendResponse>(
    `/friends/search?username=${params}`,
  );

  return response.data;
};
