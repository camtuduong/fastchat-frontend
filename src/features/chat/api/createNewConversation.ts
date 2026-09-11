import { api } from "@/services/api";

export const createNewGroup = async ({
  participants,
  parentMessageId,
}: {
  participants: string[];
  parentMessageId?: string;
}) => {
  const res = await api.post("/conversations/new", {
    participants,
    parentMessageId,
  });
  return res.data;
};
