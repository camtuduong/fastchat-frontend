import type { Conversation } from "@/features/chat/types/conversation";
import { api } from "@/lib/api";

type GetAllConversationsResponse = {
  conversations: Conversation[];
};

export const getAllConversations = async (cursor: string) => {
  const res = await api.get<GetAllConversationsResponse>(
    `/conversations?cursor=${cursor}`,
  );
  return res.data;
};
