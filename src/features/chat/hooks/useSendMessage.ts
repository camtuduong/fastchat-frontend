import { sendMessage } from "@/features/chat/api/sendMessage";
import type { MessageProps } from "@/features/chat/types/Message";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (params: MessageProps) => sendMessage(params),
  });
};
