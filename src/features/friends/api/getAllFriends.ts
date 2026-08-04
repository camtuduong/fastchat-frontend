import type { Participant } from "@/features/chat/types/conversation";
import { api } from "@/services/api";

interface FriendResponse {
  friends: Participant[];
}

export const getAllFriends = async (params: string) => {
  const response = await api.get<FriendResponse>(
    `/friends/search?username=${params}`,
  );

  return response.data;
};
