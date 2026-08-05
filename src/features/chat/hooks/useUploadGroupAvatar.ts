import { useMutation } from "@tanstack/react-query";
import { uploadGroupAvatar } from "../api/uploadGroupAvatar";

export const useUploadGroupAvatar = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      formData,
    }: {
      conversationId: string;
      formData: FormData;
    }) => uploadGroupAvatar(conversationId, formData),

    onError: (error) => {
      console.error("Error uploading group avatar:", error);
    },
  });
};
