import type { Attachment } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export type Props = {
  conversationId: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export const sendMessageGroup = async ({
  conversationId,
  content,
  attachments,
  replyTo,
}: Props) => {
  const res = await api.post("/messages/group", {
    conversationId,
    content,
    attachments,
    replyTo,
  });
  return res.data;
};
