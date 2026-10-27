import { api } from "@/services/api";

type Props = {
  toUserId: string;
  message: string;
};

export const sendFriendRequest = async ({ toUserId, message }: Props) => {
  const res = await api.post("/friends/add", { toUserId, message });
  return res.data;
};
