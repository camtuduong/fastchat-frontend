import { getConversationById } from "@/features/chat/api/getConversationById";
import { useQuery } from "@tanstack/react-query";

export const useGetConversationById = (conversationId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversation-by-id", conversationId],
    queryFn: () => getConversationById(conversationId),
    enabled: !!conversationId,
  });
  return { data: data?.conversation, isLoading, error };
};
