import { Spinner } from "@/components/ui/spinner";
import { ConversationBody } from "@/features/chat/components/Conversation/ConversationBody";
import { ConversationInputChat } from "@/features/chat/components/Conversation/ConversationInputChat";
import { ConversationHeader } from "@/features/chat/components/Conversation/ConversationHeader";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { useGetConversationById } from "@/features/chat/hooks/queries/useGetConversationById";
import { chatConversationRoute } from "@/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  CustomSidebarProvider,
  CustomSidebarInset,
} from "@/components/ui/custom-sidebar";
import { AppCustomSidebar } from "@/features/chat/components/SidebarRight/AppCustomSidebar";
import { useEffect, useRef } from "react";

export const ConversationPage = () => {
  const conversationId = chatConversationRoute.useParams().conversationId;
  const myUsername = useAuthStore((state) => state.user);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: conversationData } = useGetConversationById(
    conversationId ?? "",
  );
  const {
    data: conversationMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllMessages(conversationId ?? "");

  if (!conversationId || !myUsername) {
    return null;
  }

  const members = conversationData?.participants
    .map((participant) => participant)
    .filter((participant) => participant.username !== myUsername);

  const onScroll = async () => {
    const container = containerRef.current!;
    const oldHeight = container.scrollHeight;

    if (!container) return;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      const newHeight = container.scrollHeight;
      await fetchNextPage();
      container.scrollTop += newHeight - oldHeight;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [conversationMessages.messages.length]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <CustomSidebarProvider>
      <AppCustomSidebar />
      <CustomSidebarInset className="min-h-0 flex-1 overflow-hidden">
        <ConversationHeader members={members} />
        <ConversationBody
          conversationMessages={conversationMessages}
          myUsername={myUsername}
          containerRef={containerRef}
          onScroll={onScroll}
          isFetchingNextPage={isFetchingNextPage}
        />

        {/* Spacer for footer */}
        <div className="h-16" />
        <ConversationInputChat
          conversationId={conversationId}
          conversationType={conversationData?.type}
        />
      </CustomSidebarInset>
    </CustomSidebarProvider>
  );
};
