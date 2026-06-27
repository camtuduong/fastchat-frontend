import { sendMessageDirect } from "@/features/chat/api/sendMessageDirect";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  conversationId: string;
  receiverId?: string;
  content: string;
  attachments: string[];
};

export const useSendMessageDirect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Props) => sendMessageDirect(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", params.conversationId],
      });
    },
  });
};
