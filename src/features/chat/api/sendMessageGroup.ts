import type { Attachment } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export type Props = {
  conversationId: string;
  content?: string;
  attachments?: Attachment[];
};

export const sendMessageGroup = async ({
  conversationId,
  content,
  attachments,
}: Props) => {
  const res = await api.post("/messages/group", {
    conversationId,
    content,
    attachments,
  });
  return res.data;
};
