import { seenConversation } from "@/features/chat/api/seenConversation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSeenConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conversationId: string) => {
      return seenConversation(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};
