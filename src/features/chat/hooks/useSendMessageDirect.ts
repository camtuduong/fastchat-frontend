import { sendMessageDirect } from "@/features/chat/api/sendMessageDirect";
import { useMutation } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  receiverId?: string;
  content: string;
  attachments: string[];
};

export const useSendMessageDirect = () => {
  return useMutation({
    mutationFn: (params: Props) => sendMessageDirect(params),
  });
};
