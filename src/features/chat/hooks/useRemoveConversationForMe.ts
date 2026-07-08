import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeConversationForMe } from "@/features/chat/api/removeConversationForMe";

export const useRemoveConversationForMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      removeConversationForMe(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
