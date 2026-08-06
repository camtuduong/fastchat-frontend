import { api } from "@/services/api";

export const favoriteInConversation = async (conversationId: string) => {
  const res = await api.post(`/conversations/${conversationId}/favorite`);
  return res.data;
};
