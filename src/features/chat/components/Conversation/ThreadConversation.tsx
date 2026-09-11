import { seenConversation } from "@/features/chat/api/seenConversation";
import { ConversationChatLayout } from "@/features/chat/components/Conversation/ConversationChatLayout";
import { BOTTOM_SCROLL_THRESHOLD, bubbleChat } from "@/features/chat/constant";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const ThreadConversation = () => {
  const threadId = useCustomSidebarStore((state) => state.threadId);
  const myUserId = useAuthStore((state) => state.userId);

  const [hasNewMessage, setHasNewMessage] = useState(0);
  const initialScrollConversationRef = useRef<string | null>(null);
  const previousMessagesRef = useRef<{
    conversationId: string | null;
    length: number;
    firstId: string | null;
    lastId: string | null;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: conversationMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllMessages(threadId ?? "");

  const messages = useMemo(() => {
    const chronologicalMessages = bubbleChat(
      conversationMessages?.messages ?? [],
    );

    return chronologicalMessages.reverse();
  }, [conversationMessages?.messages]);

  const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: messages.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 74,
    getItemKey: useCallback(
      (index: number) => messages[index]?._id ?? index,
      [messages],
    ),
    anchorTo: "end",
    followOnAppend: true,
    scrollEndThreshold: BOTTOM_SCROLL_THRESHOLD,
    overscan: 6,
    // @ts-ignore -- directDomUpdates may be absent from type definition
    directDomUpdates: true,
  });

  const loadOlder = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useLayoutEffect(() => {
    if (!threadId || isLoading) return;
    if (initialScrollConversationRef.current === threadId) return;

    virtualizer.scrollToEnd();
    setHasNewMessage(0);

    initialScrollConversationRef.current = threadId;
  }, [threadId, isLoading, virtualizer]);

  const scrollToLatest = () => {
    virtualizer.scrollToEnd();
    setHasNewMessage(0);
  };

  useEffect(() => {
    if (threadId) {
      seenConversation(threadId);
    }
    previousMessagesRef.current = null;
    setHasNewMessage(0);
  }, [threadId]);

  useEffect(() => {
    const nextSnapshot = {
      conversationId: threadId ?? null,
      length: messages.length,
      firstId: messages[0]?._id ?? null,
      lastId: messages[messages.length - 1]?._id ?? null,
    };
    const previousSnapshot = previousMessagesRef.current;

    if (
      !previousSnapshot ||
      previousSnapshot.conversationId !== nextSnapshot.conversationId
    ) {
      previousMessagesRef.current = nextSnapshot;
      setHasNewMessage(0);
      return;
    }

    const didAppendNewMessage =
      nextSnapshot.length > previousSnapshot.length &&
      nextSnapshot.firstId === previousSnapshot.firstId &&
      nextSnapshot.lastId !== previousSnapshot.lastId;

    if (didAppendNewMessage && !isFetchingNextPage) {
      const isAtBottom = virtualizer.isAtEnd(BOTTOM_SCROLL_THRESHOLD);

      if (isAtBottom) {
        setHasNewMessage(0);
      } else {
        setHasNewMessage((prev) => prev + 1);
      }
    }

    previousMessagesRef.current = nextSnapshot;
  }, [threadId, messages, isFetchingNextPage, virtualizer]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <ConversationChatLayout
        bodyClassName="p-4 pt-0"
        isLoading={isLoading}
        messages={messages}
        virtualizer={virtualizer}
        myUserId={myUserId}
        containerRef={containerRef}
        onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>) => {
          if (virtualizer.isAtEnd(BOTTOM_SCROLL_THRESHOLD)) {
            setHasNewMessage(0);
            return;
          }

          if (event.currentTarget.scrollTop < 120) {
            loadOlder();
          }
        }}
        isFetchingNextPage={isFetchingNextPage}
        hasNewMessage={hasNewMessage}
        scrollToLatest={scrollToLatest}
        conversationId={threadId ?? undefined}
        setHasNewMessage={setHasNewMessage}
        isGetDataDetail={false}
      />
    </div>
  );
};
