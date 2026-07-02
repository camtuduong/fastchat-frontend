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

export const ConversationPage = () => {
  const conversationId = chatConversationRoute.useParams().conversationId;
  const myUsername = useAuthStore((state) => state.user);

  const { data: conversationData } = useGetConversationById(
    conversationId ?? "",
  );
  const { data: conversationMessages, isLoading } = useGetAllMessages(
    conversationId ?? "",
  );

  if (!conversationId || !myUsername) {
    return null;
  }

  const members = conversationData?.participants
    .map((participant) => participant)
    .filter((participant) => participant.username !== myUsername);

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
        />

        {/* Spacer for footer */}
        <div className="h-20" />
        <ConversationInputChat
          conversationId={conversationId}
          conversationType={conversationData?.type}
        />
      </CustomSidebarInset>
    </CustomSidebarProvider>
  );
};
