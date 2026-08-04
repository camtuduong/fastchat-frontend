import { api } from "@/services/api";

export const addNewMembersToConversation = async (
  conversationId: string,
  memberIds: string[],
) => {
  const res = await api.post(`/conversations/${conversationId}/add`, {
    memberIds,
  });
  return res.data;
};
