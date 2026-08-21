import { Spinner } from "@/components/ui/spinner";
import { MessageBubble } from "@/features/chat/components/Conversation/MessageBubble";
import {
  conversationTypeToLabel,
  messagePositionToLabel,
  timeAgo,
  typeMessageIconAction,
} from "@/features/chat/constant";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/utils/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import type { ReactVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";

type Props = {
  messages: MessageUI[];
  virtualizer: ReactVirtualizer<HTMLDivElement, HTMLDivElement>;
  myUserId: string | undefined | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  isFetchingNextPage: boolean;
  conversationData: Conversation | undefined;
};

export const ConversationBody = ({
  messages,
  virtualizer,
  myUserId,
  containerRef,
  onScroll,
  isFetchingNextPage,
  conversationData,
}: Props) => {
  const { t } = useTranslation();
  const virtualItems = virtualizer.getVirtualItems();
  const conversationCreatedAt = conversationData?.createdAt
    ? format(new Date(conversationData.createdAt), DATE_FORMAT)
    : "";

  return (
    <>
      {isFetchingNextPage && (
        <div className="flex w-full items-center justify-center py-2">
          <Spinner className="size-4" />
          <span className="ml-2">{t("chat.loadingMore")}</span>
        </div>
      )}
      <div
        ref={containerRef}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-b-xl p-8 pt-4"
        onScroll={onScroll}
      >
        <div ref={virtualizer.containerRef} className="relative w-full">
          {virtualItems.map((virtualItem) => {
            if (virtualItem.index === 0) {
              return (
                <div
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  className="absolute top-0 left-0 flex w-full flex-col items-center justify-center pb-4 text-xs text-gray-400"
                >
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
                      You started the conversation at {conversationCreatedAt}
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
              );
            }

            const message = messages[virtualItem.index - 1];

            if (!message) return null;

            const isMyMessage = myUserId === message.sender.userId;
            const messageTime = timeAgo(message.createdAt || "");

            if (message.system) {
              const IconType = typeMessageIconAction[message.system.action];
              return (
                <div
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  className="absolute top-0 left-0 flex w-full items-center justify-center gap-1 p-2 text-[13px]"
                >
                  <div className="flex items-center gap-2 rounded-full bg-gray-300 p-1 text-gray-800">
                    {IconType ? <IconType className="h-4 w-4" /> : null}
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              );
            }

            return (
              <div
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                className="absolute top-0 left-0 flex w-full gap-4 p-px"
              >
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
      </div>
    </>
  );
};
