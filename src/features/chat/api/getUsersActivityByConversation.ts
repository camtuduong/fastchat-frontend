import type { UserActivityResponse } from "@/features/chat/types/user";
import { api } from "@/services/api";

export const getUsersActivityByConversation = async (
  conversationId: string,
) => {
  const res = await api.get<UserActivityResponse>(
    `/conversations/${conversationId}/users-activity`,
  );
  return res.data.usersActivity ?? [];
};
