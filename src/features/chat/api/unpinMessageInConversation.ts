import { api } from "@/services/api";

export const unpinMessageInConversation = async (
  conversationId: string,
  messageId: string,
) => {
  const response = await api.patch(
    `/conversations/${conversationId}/messages/unpin`,
    {
      messageId,
    },
  );
  return response.data;
};
