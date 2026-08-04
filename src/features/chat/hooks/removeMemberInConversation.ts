import { useMutation } from "@tanstack/react-query";
import { removeMemberInConversation } from "../api/removeMemberInConversation";

export const useRemoveMemberInConversation = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      memberId,
    }: {
      conversationId: string;
      memberId: string;
    }) => removeMemberInConversation(conversationId, memberId),
  });
};
