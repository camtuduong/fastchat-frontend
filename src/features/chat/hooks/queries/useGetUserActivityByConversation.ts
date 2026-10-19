import { useQuery } from "@tanstack/react-query";
import { getUsersActivityByConversation } from "@/features/chat/api/getUsersActivityByConversation";
import type { UserActivity } from "@/features/chat/types/user";

export const useGetUserActivityByConversation = (conversationId: string) => {
  const { data, error, isLoading } = useQuery<UserActivity[]>({
    queryKey: ["usersActivity", conversationId],
    queryFn: () => getUsersActivityByConversation(conversationId),
  });
  return { data: data ?? [], error, isLoading };
};
