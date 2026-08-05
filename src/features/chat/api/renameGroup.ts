import { api } from "@/services/api";

export const renameGroup = async (
  conversationId: string,
  groupName: string,
) => {
  const res = await api.patch(`/conversations/${conversationId}/rename`, {
    groupName,
  });
  return res;
};
