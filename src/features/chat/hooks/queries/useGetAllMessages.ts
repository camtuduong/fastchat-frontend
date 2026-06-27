import {
  getAllMessages,
  type GetAllMessagesResponse,
} from "@/features/chat/api/getAllMessages";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMessages = (conversationId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getAllMessages(conversationId),
    enabled: !!conversationId,
  });
  return { data: data || ({} as GetAllMessagesResponse), error, isLoading };
};
