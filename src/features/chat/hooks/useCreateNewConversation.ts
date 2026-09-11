import { createNewGroup } from "@/features/chat/api/createNewConversation";
import { useMutation } from "@tanstack/react-query";

type Props = {
  participants: string[];
  parentMessageId?: string;
};
export const useCreateNewConversation = () => {
  return useMutation({
    mutationFn: async ({ participants, parentMessageId }: Props) =>
      createNewGroup({ participants, parentMessageId }),
  });
};
