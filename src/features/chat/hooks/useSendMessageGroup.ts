import { sendMessageGroup } from "@/features/chat/api/sendMessageGroup";
import type { Attachment } from "@/features/chat/types/Message";
import { useMutation } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export const useSendMessageGroup = () => {
  return useMutation({
    mutationFn: (params: Props) => sendMessageGroup(params),
  });
};
