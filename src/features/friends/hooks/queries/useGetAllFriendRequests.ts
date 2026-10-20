import { useQuery } from "@tanstack/react-query";
import { getAllFriendRequests } from "@/features/friends/api/getAllFriendRequests";
import type { FriendRequest } from "@/features/friends/types/request";

export const useGetAllFriendRequests = () => {
  const { data, isLoading, isError } = useQuery<FriendRequest[]>({
    queryKey: ["friendRequests"],
    queryFn: getAllFriendRequests,
  });
  return { data: data || [], isLoading, isError };
};
