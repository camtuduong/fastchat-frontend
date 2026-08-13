import type { UploadAttachmentResponse } from "@/features/chat/types/uploadAttachment";
import { api } from "@/services/api";

export const uploadAttachments = async (
  conversationId: string,
  formData: FormData,
) => {
  const res = await api.post<UploadAttachmentResponse>(
    `/conversations/${conversationId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};
