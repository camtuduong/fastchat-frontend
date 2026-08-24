import { api } from "@/services/api";

export const shareConversation = async (conversationId: string) => {
  const res = await api.post(`/conversations/${conversationId}/shares`);
  return res.data;
};
