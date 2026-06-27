import { Spinner } from "@/components/ui/spinner";
import { ConversationBody } from "@/features/chat/components/Conversation/ConversationBody";
import { ConversationFooter } from "@/features/chat/components/Conversation/ConversationFooter";
import { ConversationHeader } from "@/features/chat/components/Conversation/ConversationHeader";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { useGetConversationById } from "@/features/chat/hooks/queries/useGetConversationById";
import { chatConversationRoute } from "@/routes";
import { useAuthStore } from "@/stores/useAuthStore";

export const ConversationPage = () => {
  const conversationId = chatConversationRoute.useParams().conversationId;
  const myUsername = useAuthStore.getState().user;
  if (!conversationId || !myUsername) {
    return null;
  }

  const { data: conversationData } = useGetConversationById(conversationId);
  const { data: conversationMessages, isLoading } =
    useGetAllMessages(conversationId);

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
    <>
      <ConversationHeader members={members} />
      <ConversationBody
        conversationMessages={conversationMessages}
        myUsername={myUsername}
      />

      {/* Spacer for footer */}
      <div className="h-16" />
      <ConversationFooter conversationId={conversationId} />
    </>
  );
};
