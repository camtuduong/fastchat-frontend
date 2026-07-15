import { api } from "@/services/api";

export const seenConversation = async (conversationId: string) => {
  const res = await api.patch(`/conversations/${conversationId}/seen`);
  return res.data;
};
