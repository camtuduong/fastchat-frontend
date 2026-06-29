import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import type { Message } from "@/features/chat/types/Message";
import { bubbleChat } from "@/features/chat/utils/bubbleChat";

type Props = {
  conversationMessages: Message;
  myUsername: string;
};

export const ConversationBody = ({
  conversationMessages,
  myUsername,
}: Props) => {
  console.log("Conversation messages:", conversationMessages);
  const layout = bubbleChat(conversationMessages.messages);

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto rounded-b-xl p-8 pt-4">
      {layout.reverse().map((message) => {
        const isMyMessage = myUsername === message.sender.username;
        return (
          <div key={message._id} className={`flex w-full gap-4 p-px`}>
            <MessageBubble message={message} isMyMessage={isMyMessage} />
          </div>
        );
      })}
    </div>
  );
};
