import { sendMessage } from "@/features/chat/api/sendMessage";
import type { Attachment } from "@/features/chat/types/Message";
import { useMutation } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (params: Props) => sendMessage(params),
  });
};
