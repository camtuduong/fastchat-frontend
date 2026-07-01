import { sendMessageGroup } from "@/features/chat/api/sendMessageGroup";
import { useMutation } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  content: string;
  attachments: string[];
};

export const useSendMessageGroup = () => {
  return useMutation({
    mutationFn: (params: Props) => sendMessageGroup(params),
  });
};
