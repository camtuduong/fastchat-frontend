import { useMutation } from "@tanstack/react-query";
import { addNewMembersToConversation } from "../api/addNewMembers";

export const useAddNewMembers = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      memberIds,
    }: {
      conversationId: string;
      memberIds: string[];
    }) => addNewMembersToConversation(conversationId, memberIds),
  });
};
