import { Spinner } from "@/components/ui/spinner";
import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import type { Message } from "@/features/chat/types/Message";
import { bubbleChat } from "@/features/chat/utils/bubbleChat";

type Props = {
  conversationMessages: Message;
  myUsername: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isFetchingNextPage: boolean;
};

export const ConversationBody = ({
  conversationMessages,
  myUsername,
  containerRef,
  onScroll,
  isFetchingNextPage,
}: Props) => {
  const layout = bubbleChat(conversationMessages.messages);

  return (
    <>
      {isFetchingNextPage && (
        <div className="flex w-full items-center justify-center py-2">
          <Spinner className="size-4" />
          <span className="ml-2">Loading more messages...</span>
        </div>
      )}
      <div
        ref={containerRef}
        className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-b-xl p-8 pt-4"
        onScroll={onScroll}
      >
        {layout.reverse().map((message) => {
          const isMyMessage = myUsername === message.sender.username;
          return (
            <div key={message._id} className={`flex w-full gap-4 p-px`}>
              <MessageBubble message={message} isMyMessage={isMyMessage} />
            </div>
          );
        })}
      </div>
    </>
  );
};
