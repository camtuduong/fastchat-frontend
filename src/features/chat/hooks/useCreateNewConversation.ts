import { createNewGroup } from "@/features/chat/api/createNewGroup";
import { useMutation } from "@tanstack/react-query";

type Props = {
  type: string;
  participants: string[];
};
export const useCreateNewConversation = () => {
  return useMutation({
    mutationFn: async ({ type, participants }: Props) =>
      createNewGroup({ type, participants }),
  });
};
