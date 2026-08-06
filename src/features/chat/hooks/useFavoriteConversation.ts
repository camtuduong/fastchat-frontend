import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteInConversation } from "../api/favoriteConversation";

export const useFavoriteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conversationId: string) =>
      favoriteInConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversation-by-id"] });
    },
  });
};
