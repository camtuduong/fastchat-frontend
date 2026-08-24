import { shareConversation } from "@/features/chat/api/shareConversation";
import { useMutation } from "@tanstack/react-query";

export const useShareConversation = () => {
  return useMutation({
    mutationFn: async (conversationId: string) =>
      shareConversation(conversationId),
  });
};
