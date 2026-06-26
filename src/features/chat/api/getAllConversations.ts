import { api } from "@/lib/api";

export const getAllConversations = async (cursor: string) => {
  const res = await api.get(`/conversations?cursor=${cursor}`);
  return res.data;
};
