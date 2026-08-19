import { Spinner } from "@/components/ui/spinner";
import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import {
  bubbleChat,
  conversationTypeToLabel,
  messagePositionToLabel,
  timeAgo,
  typeMessageIconAction,
} from "@/features/chat/constant";
import type { Message } from "@/features/chat/types/Message";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/utils/constant";
import type { Conversation } from "@/features/chat/types/conversation";

type Props = {
  conversationMessages: Message;
  myUserId: string | undefined | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isFetchingNextPage: boolean;
  conversationData: Conversation | undefined;
};

export const ConversationBody = ({
  conversationMessages,
  myUserId,
  containerRef,
  onScroll,
  isFetchingNextPage,
  conversationData,
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
        <div className="mb-4 flex w-full flex-col items-center justify-center text-xs text-gray-400">
          <video
            autoPlay
            muted
            playsInline
            className="h-70 w-70"
            src="/first.webm"
            onMouseEnter={(e) => {
              e.currentTarget.play();
            }}
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-sm">
              You started the conversation at{" "}
              {format(new Date(conversationData?.createdAt || ""), DATE_FORMAT)}
            </span>
            <span className="text-lg">
              Let's chat with your friend
              {conversationData?.type === conversationTypeToLabel.direct
                ? ""
                : "s"}
              !
            </span>
          </div>
        </div>

        {layout.reverse().map((message) => {
          const isMyMessage = myUserId === message.sender.userId;
          const messageTime = timeAgo(message.createdAt || "");

          if (message.system) {
            const IconType = typeMessageIconAction[message.system.action];
            return (
              <div
                key={message._id}
                className="flex w-full items-center justify-center gap-1 p-2 text-[13px]"
              >
                <div className="flex items-center gap-2 rounded-full bg-gray-300 p-1 text-gray-800">
                  {IconType ? <IconType className="h-4 w-4" /> : null}
                </div>
                <p dangerouslySetInnerHTML={{ __html: message.content }} />
              </div>
            );
          }
          return (
            <div key={message._id} className="flex w-full gap-4 p-px">
              <div className="flex w-full flex-col">
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
