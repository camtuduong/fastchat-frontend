import { useMutation } from "@tanstack/react-query";
import { deleteMessage } from "@/features/chat/api/deleteMessage";

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
  });
};
