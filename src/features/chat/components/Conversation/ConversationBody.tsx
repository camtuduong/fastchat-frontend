import { Spinner } from "@/components/ui/spinner";
import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import { messagePositionToLabel, timeAgo } from "@/features/chat/constant";
import type { Message } from "@/features/chat/types/Message";
import { bubbleChat } from "@/features/chat/utils/bubbleChat";
import { cn } from "@/lib/utils";

type Props = {
  conversationMessages: Message;
  myUserId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isFetchingNextPage: boolean;
};

export const ConversationBody = ({
  conversationMessages,
  myUserId,
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
          const isMyMessage = myUserId === message.sender.userId;
          const messageTime = timeAgo(message.createdAt || "");

          return (
            <div
              key={message._id}
              className={`flex w-full gap-4 p-px ${isMyMessage ? "justify-end" : "justify-start"}`}
            >
              <div>
                {(message.position === messagePositionToLabel.single ||
                  message.position === messagePositionToLabel.last) && (
                  <div
                    className={cn(
                      "mt-4 flex gap-2",
                      isMyMessage ? "justify-end" : "justify-start",
                    )}
                  >
                    {!isMyMessage && (
                      <p className="mb-1 text-xs font-semibold text-gray-500">
                        {message.sender.displayName}
                      </p>
                    )}
                    <p className="mb-1 self-end text-xs text-gray-400">
                      {messageTime}
                    </p>
                  </div>
                )}
                <MessageBubble message={message} isMyMessage={isMyMessage} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
