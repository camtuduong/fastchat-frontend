import { Spinner } from "@/components/ui/spinner";
import { ConversationBody } from "@/features/chat/components/Conversation/ConversationBody";
import { ConversationFooter } from "@/features/chat/components/Conversation/ConversationFooter";
import { ConversationHeader } from "@/features/chat/components/Conversation/ConversationHeader";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import { chatConversationRoute } from "@/routes";

export const ConversationPage = () => {
  const conversationId = chatConversationRoute.useParams().conversationId;

  if (!conversationId) {
    return null;
  }
  const { data: conversation, isLoading } = useGetAllMessages(conversationId);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }
  return (
    <>
      <ConversationHeader />
      <ConversationBody conversation={conversation} />

      {/* Spacer for footer */}
      <div className="h-16" />
      <ConversationFooter conversationId={conversationId} />
    </>
  );
};
