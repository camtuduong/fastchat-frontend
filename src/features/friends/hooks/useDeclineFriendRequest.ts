import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineFriendRequest } from "../api/declineFriendRequest";

export const useDeclineFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) =>
      await declineFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggest-users"] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    },
    onError: (error) => {
      console.error("Failed to decline friend request:", error);
    },
  });
};
