import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ConversationChatLayout } from "@/features/chat/components/Conversation/ConversationChatLayout";
import { ConversationHeader } from "@/features/chat/components/Conversation/ConversationHeader";
import { AppCustomSidebar } from "@/features/chat/components/SidebarRight/AppCustomSidebar";
import { BOTTOM_SCROLL_THRESHOLD, bubbleChat } from "@/features/chat/constant";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { useGetConversationById } from "@/features/chat/hooks/queries/useGetConversationById";
import { useSeenConversation } from "@/features/chat/hooks/useSeenConversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { useMessageStore } from "@/stores/useMessage";
import { useSocketStore } from "@/stores/useSocketStore";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const ConversationPage = () => {
  const navigate = useNavigate();
  const conversationId = useParams({
    strict: false,
    shouldThrow: false,
  })?.conversationId;
  const myUserId = useAuthStore((state) => state.userId);
  const [hasNewMessage, setHasNewMessage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessagesRef = useRef<{
    conversationId: string | null;
    length: number;
    firstId: string | null;
    lastId: string | null;
  } | null>(null);

  const onlineUsers = useSocketStore((state) => state.onlineUsers);
  const clearReplyMessage = useMessageStore((state) => state.clearReplyMessage);

  const conversationDataDetail = useConversationStore(
    (state) => state.conversationDataDetail,
  );
  const setConversationDataDetail = useConversationStore(
    (state) => state.setConversationDataDetail,
  );
  const clearConversationDataDetail = useConversationStore(
    (state) => state.clearConversationDataDetail,
  );

  const open = useCustomSidebarStore((state) => state.open);
  const clearStatus = useCustomSidebarStore((state) => state.clearStatus);
  const clearThreadId = useCustomSidebarStore((state) => state.clearThreadId);
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  const { data: conversationData, error: conversationError } =
    useGetConversationById(conversationId ?? "");
  const {
    data: conversationMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: messagesError,
  } = useGetAllMessages(conversationId ?? "");

  const { mutate: seenConversation, error: seenConversationError } =
    useSeenConversation();

  const members = conversationDataDetail?.participants
    .map((participant) => participant)
    .filter((participant) => participant.userId !== myUserId);

  const isOnline = members?.some((member) =>
    onlineUsers.includes(member.userId),
  );

  const messages = useMemo(() => {
    const chronologicalMessages = bubbleChat(
      conversationMessages?.messages ?? [],
    );

    return chronologicalMessages.reverse();
  }, [conversationMessages?.messages]);
  const virtualCount = messages.length + 1;

  const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: virtualCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 74,
    getItemKey: useCallback(
      (index: number) =>
        index === 0
          ? "conversation-start"
          : (messages[index - 1]?._id ?? index),
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
    if (!conversationId || isLoading) return;

    let settleFrameId: number | null = null;
    const frameId = requestAnimationFrame(() => {
      virtualizer.scrollToEnd();
      settleFrameId = requestAnimationFrame(() => {
        const scrollElement = containerRef.current;

        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }

        setHasNewMessage(0);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (settleFrameId !== null) {
        cancelAnimationFrame(settleFrameId);
      }
    };
  }, [conversationId, isLoading, virtualizer]);

  const scrollToLatest = () => {
    virtualizer.scrollToEnd();
    console.log("Scrolling to latest message");
    setHasNewMessage(0);
  };
  useEffect(() => {
    if (!conversationData) return;

    setConversationDataDetail(conversationData);
  }, [conversationData]);

  useEffect(() => {
    if (conversationError || messagesError || seenConversationError) {
      navigate({ to: "/chat" });
    }
  }, [conversationError, messagesError, seenConversationError]);

  useEffect(() => {
    clearReplyMessage();
    clearConversationDataDetail();
    clearStatus();
    clearThreadId();
    setOpen(false);
    if (conversationId) {
      seenConversation(conversationId);
    }
    previousMessagesRef.current = null;
    setHasNewMessage(0);
  }, [conversationId]);

  useEffect(() => {
    const nextSnapshot = {
      conversationId: conversationId ?? null,
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
  }, [conversationId, messages, isFetchingNextPage, virtualizer]);

  return (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel
        defaultSize="60%"
        minSize="20%"
        className="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
      >
        <ConversationHeader
          type={conversationDataDetail?.type}
          members={members}
          isOnline={isOnline}
          groupAvatarUrl={conversationDataDetail?.group.groupAvatarUrl}
          groupName={conversationDataDetail?.group.name}
        />

        <ConversationChatLayout
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
          conversationId={conversationId}
          setHasNewMessage={setHasNewMessage}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />

      {open && (
        <ResizablePanel defaultSize="40%" minSize="20%">
          <AppCustomSidebar setOpen={setOpen} />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
};
