import type { MessageProps } from "@/features/chat/types/Message";
import { api } from "@/services/api";

export const sendMessage = async ({
  conversationId,
  receiverId,
  content,
  attachments,
  replyTo,
  contentJson,
}: MessageProps) => {
  const res = await api.post("/messages", {
    conversationId,
    receiverId,
    content,
    attachments,
    replyTo,
    contentJson,
  });
  return res.data;
};
