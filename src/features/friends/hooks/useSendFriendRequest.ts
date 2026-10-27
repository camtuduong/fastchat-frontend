import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../api/sendFriendRequest";

type Props = {
  toUserId: string;
  message: string;
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ toUserId, message }: Props) =>
      await sendFriendRequest({ toUserId, message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggest-users"] });
    },
    onError: (error) => {
      console.error("Failed to send friend request:", error);
    },
  });
};
