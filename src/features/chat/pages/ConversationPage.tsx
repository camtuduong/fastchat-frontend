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
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMessageStore } from "@/stores/useMessage";
import { useConversationStore } from "@/stores/useConversationStore";
import { useSeenConversation } from "@/features/chat/hooks/useSeenConversation";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { useSocketStore } from "@/stores/useSocketStore";

export const ConversationPage = () => {
  const navigate = useNavigate();
  const conversationId = useParams({
    strict: false,
    shouldThrow: false,
  })?.conversationId;
  const myUserId = useAuthStore((state) => state.userId);
  const containerRef = useRef<HTMLDivElement>(null);

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

  if (!conversationId || !myUserId) {
    return null;
  }

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

  useEffect(() => {
    if (conversationId) {
      seenConversation(conversationId);
    }
  }, [conversationId, seenConversation]);

  const members = conversationData?.participants
    .map((participant) => participant)
    .filter((participant) => participant.userId !== myUserId);

  const isOnline = members?.some((member) =>
    onlineUsers.includes(member.userId),
  );

  const onScroll = async () => {
    const container = containerRef.current!;
    if (!container) return;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      const oldHeight = container.scrollHeight;

      await fetchNextPage();

      const newHeight = container.scrollHeight;
      container.scrollTop += newHeight - oldHeight;
    }
  };

  useEffect(() => {
    if (!conversationData) return;

    setConversationDataDetail(conversationData);
  }, [conversationData, setConversationDataDetail]);

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
  }, [conversationId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [conversationId]);

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
            />
            <ConversationBody
              conversationMessages={conversationMessages}
              myUserId={myUserId}
              containerRef={containerRef}
              onScroll={onScroll}
              isFetchingNextPage={isFetchingNextPage}
              conversationData={conversationData}
            />
          </>
        )}

        {/* Spacer for footer */}
        <ConversationInputChat
          conversationId={conversationId}
          conversationType={conversationData?.type}
        />
      </CustomSidebarInset>
    </CustomSidebarProvider>
  );
};
