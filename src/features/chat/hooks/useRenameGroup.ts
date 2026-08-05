import { renameGroup } from "@/features/chat/api/renameGroup";
import { useMutation } from "@tanstack/react-query";

export const useRenameGroup = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      groupName,
    }: {
      conversationId: string;
      groupName: string;
    }) => renameGroup(conversationId, groupName),
  });
};
