import { api } from "@/lib/api";

export const getAllMessages = async (conversationId: string) => {
  const res = await api.get(`/conversations/${conversationId}/messages`);
  return res.data;
};
