import { Spinner } from "@/components/ui/spinner";
import { ConversationBody } from "@/features/chat/components/Conversation/ConversationBody";
import { ConversationInputChat } from "@/features/chat/components/Conversation/ConversationInputChat";
import { ConversationHeader } from "@/features/chat/components/Conversation/ConversationHeader";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { useGetConversationById } from "@/features/chat/hooks/queries/useGetConversationById";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  CustomSidebarProvider,
  CustomSidebarInset,
} from "@/components/ui/custom-sidebar";
import { AppCustomSidebar } from "@/features/chat/components/SidebarRight/AppCustomSidebar";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMessageStore } from "@/stores/useMessage";
import { useConversationStore } from "@/stores/useConversationStore";
import { useSeenConversation } from "@/features/chat/hooks/useSeenConversation";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { BOTTOM_SCROLL_THRESHOLD, bubbleChat } from "@/features/chat/constant";
import { ArrowDownToDot } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

export const ConversationPage = () => {
  const navigate = useNavigate();
  const conversationId = useParams({
    strict: false,
    shouldThrow: false,
  })?.conversationId;
  const myUserId = useAuthStore((state) => state.userId);
  const [hasNewMessage, setHasNewMessage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const initialScrollConversationRef = useRef<string | null>(null);
  const previousMessagesRef = useRef<{
    conversationId: string | null;
    length: number;
    firstId: string | null;
    lastId: string | null;
  } | null>(null);

  const onlineUsers = useSocketStore((state) => state.onlineUsers);
  const clearReplyMessage = useMessageStore((state) => state.clearReplyMessage);
  const setConversationDataDetail = useConversationStore(
    (state) => state.setConversationDataDetail,
  );
  const clearConversationDataDetail = useConversationStore(
    (state) => state.clearConversationDataDetail,
  );
  const clearStatus = useCustomSidebarStore((state) => state.clearStatus);
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

  const members = conversationData?.participants
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
    if (initialScrollConversationRef.current === conversationId) return;

    virtualizer.scrollToEnd();
    setHasNewMessage(0);

    initialScrollConversationRef.current = conversationId;
  }, [conversationId, isLoading, virtualizer]);

  const scrollToLatest = () => {
    virtualizer.scrollToEnd();
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
    <CustomSidebarProvider>
      <AppCustomSidebar />
      <CustomSidebarInset className="min-h-0 flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : (
          <>
            <ConversationHeader
              type={conversationData?.type}
              members={members}
              isOnline={isOnline}
              groupAvatarUrl={conversationData?.group.groupAvatarUrl}
              groupName={conversationData?.group.name}
            />
            <ConversationBody
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
              conversationData={conversationData}
            />
          </>
        )}
        {hasNewMessage > 0 && (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="cursor-pointer"
              onClick={scrollToLatest}
            >
              <ArrowDownToDot className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        )}

        {/* Spacer for footer */}
        <ConversationInputChat
          conversationId={conversationId}
          virtualizer={virtualizer}
          setHasNewMessage={setHasNewMessage}
        />
      </CustomSidebarInset>
    </CustomSidebarProvider>
  );
};
