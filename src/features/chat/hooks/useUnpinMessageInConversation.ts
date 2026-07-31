import { unpinMessageInConversation } from "@/features/chat/api/unpinMessageInConversation";
import { useMutation } from "@tanstack/react-query";

export const useUnpinMessageInConversation = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      messageId,
    }: {
      conversationId: string;
      messageId: string;
    }) => unpinMessageInConversation(conversationId, messageId),
  });
};
