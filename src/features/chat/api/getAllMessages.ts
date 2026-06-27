import type { Message } from "@/features/chat/types/Message";
import { api } from "@/lib/api";

export type GetAllMessagesResponse = Message;

export const getAllMessages = async (conversationId: string) => {
  const res = await api.get<GetAllMessagesResponse>(
    `/conversations/${conversationId}/messages`,
  );
  return res.data;
};
