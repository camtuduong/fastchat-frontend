import { useMutation } from "@tanstack/react-query";
import { pinMessageInConversation } from "../api/pinMessageInConversation";

export const usePinMessageInConversation = () => {
  return useMutation({
    mutationFn: async ({
      conversationId,
      messageId,
    }: {
      conversationId: string;
      messageId: string;
    }) => {
      return pinMessageInConversation(conversationId, messageId);
    },
  });
};
