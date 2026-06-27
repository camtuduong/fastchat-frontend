import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import type { Message } from "@/features/chat/types/Message";

type Props = {
  conversation: Message;
};

export const ConversationBody = ({ conversation }: Props) => {
  const { data: me } = useGetMe();

  console.log("conversation", conversation);
  return (
    <div className="flex flex-1 flex-col overflow-auto rounded-b-xl p-8 pt-2">
      {conversation.messages.reverse()?.map((message) => {
        const isMyMessage = me?.user?._id === message.sender.userId;
        return (
          <div
            key={message._id}
            className={`flex gap-4 ${isMyMessage ? "justify-end" : "justify-start"} p-px`}
          >
            <MessageBubble message={message} isMyMessage={isMyMessage} />
          </div>
        );
      })}
    </div>
  );
};
