import type { Notification } from "@/features/main/types/activity";
import { api } from "@/services/api";

export const getNotification = async () => {
  const res = await api.get<Notification>("notifications");
  return res.data;
};
