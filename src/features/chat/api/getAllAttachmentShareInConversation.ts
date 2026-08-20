import { api } from "@/services/api";

export const getAllAttachmentShareInConversation = async (
  conversationId: string | undefined,
) => {
  const res = await api.get(`/conversations/${conversationId}/attachments`);
  return res.data;
};
