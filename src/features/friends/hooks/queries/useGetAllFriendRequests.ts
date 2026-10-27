import { useQuery } from "@tanstack/react-query";
import { getAllFriendRequests } from "@/features/friends/api/getAllFriendRequests";
import type { FriendRequestResponse } from "@/features/friends/types/request";

export const useGetAllFriendRequests = () => {
  const { data, isLoading, isError } = useQuery<FriendRequestResponse>({
    queryKey: ["friend-requests"],
    queryFn: () => getAllFriendRequests(),
  });
  return { data: data || { received: [], sent: [] }, isLoading, isError };
};
