import { api } from "@/services/api";

export const removeMemberInConversation = async (
  conversationId: string,
  memberId: string,
) => {
  const res = await api.delete(
    `/conversations/${conversationId}/members/${memberId}`,
  );
  return res.data;
};
