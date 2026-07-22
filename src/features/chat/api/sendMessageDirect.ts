import type { Attachment } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export type Props = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export const sendMessageDirect = async ({
  conversationId,
  receiverId,
  content,
  attachments,
  replyTo,
}: Props) => {
  const res = await api.post("/messages/direct", {
    conversationId,
    receiverId,
    content,
    attachments,
    replyTo,
  });
  return res.data;
};
