import type { Attachment } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export type Props = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
};

export const sendMessageDirect = async ({
  conversationId,
  receiverId,
  content,
  attachments,
}: Props) => {
  const res = await api.post("/messages/direct", {
    conversationId,
    receiverId,
    content,
    attachments,
  });
  return res.data;
};
