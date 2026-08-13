import { useMutation } from "@tanstack/react-query";
import type { UploadAttachmentResponse } from "../types/uploadAttachment";
import { uploadAttachments } from "../api/uploadAttachments";

export const useUploadAttachments = () => {
  return useMutation({
    mutationFn: async ({
      conversationId,
      formData,
    }: {
      conversationId: string;
      formData: FormData;
    }): Promise<UploadAttachmentResponse> =>
      uploadAttachments(conversationId, formData),
  });
};
