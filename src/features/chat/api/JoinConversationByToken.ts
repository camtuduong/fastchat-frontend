import { api } from "@/services/api";

export const joinConversationByToken = async (token: string) => {
  const res = await api.get(`/conversations/share?token=${token}`);
  return res.data;
};
