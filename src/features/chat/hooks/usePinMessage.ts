import { useMutation } from "@tanstack/react-query";
import { pinMessage } from "../api/pinMessage";

export const usePinMessage = () => {
  return useMutation({
    mutationFn: async (messageId: string) => {
      return pinMessage(messageId);
    },
  });
};
