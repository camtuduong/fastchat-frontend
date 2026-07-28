import { api } from "@/services/api";

export const pinMessage = async (messageId: string) => {
  const res = await api.patch(`/messages/${messageId}/pin`);
  return res.data;
};
