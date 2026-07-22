import { api } from "@/services/api";

export const deleteMessage = async (messageId: string) => {
  const res = await api.delete(`/messages/${messageId}`);
  return res.data;
};
