import { getAllAttachmentShareInConversation } from "@/features/chat/api/getAllAttachmentShareInConversation";
import type { Attachment } from "@/features/chat/types/conversation";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttachmentInConversation = (
  conversationId: string | undefined,
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attachments", conversationId],
    queryFn: () => getAllAttachmentShareInConversation(conversationId),
    enabled: !!conversationId,
  });
  return { data: data?.attachments as Attachment[], isLoading, isError };
};
