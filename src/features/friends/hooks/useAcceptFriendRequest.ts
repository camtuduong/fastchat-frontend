import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../api/acceptFriendRequest";

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => acceptFriendRequest(requestId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggest-users"] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    },
    onError: (error) => {
      // Handle error here
      console.error("Failed to accept friend request:", error);
    },
  });
};
