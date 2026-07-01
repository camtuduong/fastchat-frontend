import { api } from "@/lib/api";

export type Props = {
  conversationId: string;
  content: string;
  attachments: string[];
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
