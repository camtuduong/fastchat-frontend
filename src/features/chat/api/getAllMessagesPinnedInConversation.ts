import { api } from "@/services/api";

export const getMessagesPinnedInConversation = async (
  conversationId: string,
  cursor: string | null,
) => {
  const res = await api.get(
    `/conversations/${conversationId}/messages/pinned`,
    {
      params: cursor ? { cursor } : undefined,
    },
  );
  return res.data;
};
