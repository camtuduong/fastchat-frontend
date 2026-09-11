import { getThreadSurface } from "@/features/chat/api/getThreadSurface";
import type { ThreadSurface } from "@/features/chat/types/thread";
import { useQuery } from "@tanstack/react-query";

export const useGetThreadSurface = (threadId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["thread-surface", threadId],
    queryFn: () => getThreadSurface(threadId),
  });
  return {
    data: (data as ThreadSurface) ?? null,
    error,
    isLoading,
  };
};
