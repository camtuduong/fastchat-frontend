import { joinConversationByToken } from "@/features/chat/api/JoinConversationByToken";
import { useQuery } from "@tanstack/react-query";

export const useJoinConversationByToken = (token: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["joinConversationByToken", token],
    queryFn: () => joinConversationByToken(token),
    enabled: !!token,
  });
  return { data, isLoading };
};
