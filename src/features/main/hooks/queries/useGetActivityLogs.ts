import { getActivityLogs } from "@/features/main/api/getActivitylogs";
import type { ActivityLog } from "@/features/main/types/activity";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityLogs = (notificationId: string) => {
  const { data, isLoading, error } = useQuery<ActivityLog[]>({
    queryKey: ["activity-logs", notificationId],
    queryFn: () => getActivityLogs(notificationId),
  });
  return { data, isLoading, error };
};
