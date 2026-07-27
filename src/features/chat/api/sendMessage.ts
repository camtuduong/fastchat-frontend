import type { Attachment } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export type Props = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export const sendMessage = async ({
  conversationId,
  receiverId,
  content,
  attachments,
  replyTo,
}: Props) => {
  const res = await api.post("/messages", {
    conversationId,
    receiverId,
    content,
    attachments,
    replyTo,
  });
  return res.data;
};
