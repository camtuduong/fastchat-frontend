import { sendMessageDirect } from "@/features/chat/api/sendMessageDirect";
import type { Attachment } from "@/features/chat/types/Message";
import { useMutation } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
};

export const useSendMessageDirect = () => {
  return useMutation({
    mutationFn: (params: Props) => sendMessageDirect(params),
  });
};
