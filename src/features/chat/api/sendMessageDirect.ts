import { api } from "@/lib/api";

export type Props = {
  conversationId: string;
  receiverId?: string;
  content: string;
  attachments: string[];
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
