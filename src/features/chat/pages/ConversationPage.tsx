import Button from "@/components/base/Button";
import { Spinner } from "@/components/ui/spinner";
import { SidebarHeader } from "@/features/chat/components/sidebar/SidebarHeader";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";
import { useGetAllMessages } from "@/features/chat/hooks/queries/useGetAllMessages";
import type { MessageItem } from "@/features/chat/types/message";
import { chatConversationRoute } from "@/routes";

export const ConversationPage = () => {
  const conversationId = chatConversationRoute.useParams().conversationId;

  if (!conversationId) {
    return null;
  }
  const { data: conversation, isLoading } = useGetAllMessages(conversationId);

  console.log("conversation", conversation);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }
  return (
    <>
      <SidebarHeader />
      <div className="relative flex flex-1 flex-col gap-4 rounded-b-xl p-4 pt-0">
        {conversation.messages?.map((message: MessageItem) => (
          <div key={message.id} className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
              {message.sender.username[0]}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium">
                {message.sender.username}
              </div>
              <div className="text-sm text-gray-700">{message.content}</div>
            </div>
          </div>
        ))}
        <div className="h-24" />

        <form className="absolute right-0 bottom-0 left-0 flex items-end gap-2 px-4 py-2">
          <div className="w-full flex-1">
            <CustomTextArea className="bg-white" />
          </div>
          <div className="flex h-10 shrink-0 gap-2">
            <Button>Send</Button>
            <Button>Send</Button>
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </>
  );
};
