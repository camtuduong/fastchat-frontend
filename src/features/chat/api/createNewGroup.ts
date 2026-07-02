import { api } from "@/lib/api";

export const createNewGroup = async ({
  type,
  participants,
}: {
  type: string;
  participants: string[];
}) => {
  const res = await api.post("/conversations/new", {
    type,
    participants,
  });
  return res.data;
};
