import { api } from "@/services/api";

export const pinMessageInConversation = async (
  conversationId: string,
  messageId: string,
) => {
  const res = await api.post(`/conversations/${conversationId}/messages/pin`, {
    messageId,
  });
  return res.data;
};
