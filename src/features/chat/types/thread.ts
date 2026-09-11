interface ThreadSurface {
  threadId: string;
  lastSender: {
    _id: string;
    displayName: string;
    avatarUrl: string;
  } | null;
  lastMessageAt: string;
  countMessageInThread: number;
  unreadCount: number;
}

interface Thread {
  threadSurface: ThreadSurface;
}

export type { ThreadSurface, Thread };
