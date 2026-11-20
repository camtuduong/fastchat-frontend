import { api } from "@/services/api";
import type { ActivityLog } from "@/features/main/types/activity";

export const getActivityLogs = async (notificationId: string) => {
  const res = await api.get<ActivityLog[]>(`activities/${notificationId}`);
  return res.data;
};
