import { api } from "@/lib/api";
import type { Conversation } from "@/features/chat/types/conversation";

type GetConversationByIdResponse = {
  conversation: Conversation;
};

export const getConversationById = async (conversationId: string) => {
  const res = await api.get<GetConversationByIdResponse>(
    `/conversations/${conversationId}`,
  );
  return res.data;
};
