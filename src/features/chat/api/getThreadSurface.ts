import type { Thread } from "@/features/chat/types/thread";
import { api } from "@/services/api";

export const getThreadSurface = async (threadId: string) => {
  const res = await api.get<Thread>(
    `/conversations/${threadId}/thread-surface`,
  );
  return res.data.threadSurface;
};
