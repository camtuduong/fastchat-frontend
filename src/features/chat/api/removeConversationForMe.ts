import { api } from "@/services/api";

export const removeConversationForMe = async (conversationId: string) => {
  const res = await api.patch(`/conversations/${conversationId}/remove-for-me`);
  return res.data;
};
