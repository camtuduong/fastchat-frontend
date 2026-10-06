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
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import type { ReactVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";
import { useConversationStore } from "@/stores/useConversationStore";
import { useMemo } from "react";
import { Info } from "lucide-react";
import type { ActionType } from "@/features/chat/types/Message";

const systemMessageIconStyle: Record<ActionType, string> = {
  create_group: "bg-dialog-row-selected text-dialog-primary",
  rename_group: "bg-dialog-row-selected text-dialog-primary",
  change_group_avatar: "bg-dialog-row-selected text-dialog-primary",
  add_member: "bg-status-online/15 text-status-online",
  share_conversation: "bg-status-online/15 text-status-online",
  remove_member: "bg-dialog-danger-hover text-dialog-danger",
  leave_group: "bg-dialog-danger-hover text-dialog-danger",
  pin_message: "bg-status-pending/15 text-status-pending",
  unpin_message: "bg-status-pending/15 text-status-pending",
};

type Props = {
  isLoading?: boolean;
  messages: MessageUI[];
  virtualizer: ReactVirtualizer<HTMLDivElement, HTMLDivElement>;
  myUserId: string | undefined | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  isFetchingNextPage: boolean;
  isGetDataDetail: boolean;
  bodyClassName?: string;
};

export const ConversationBody = ({
  isLoading,
  messages,
  virtualizer,
  myUserId,
  containerRef,
  onScroll,
  isFetchingNextPage,
  isGetDataDetail,
  bodyClassName,
}: Props) => {
  const { t } = useTranslation();
  const virtualItems = virtualizer.getVirtualItems();

  const conversationDataDetail = useConversationStore(
    (state) => state.conversationDataDetail,
  );

  const conversationCreatedAt = conversationDataDetail?.createdAt
    ? format(new Date(conversationDataDetail.createdAt), DATE_FORMAT)
    : "";

  const hasConversationStart =
    isGetDataDetail &&
    conversationDataDetail?.type !== conversationTypeToLabel.thread;

  const listParticipantIds = useMemo(
    () =>
      conversationDataDetail?.participants.map(
        (participant) => participant.userId,
      ) || [],
    [conversationDataDetail],
  );

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-2">
        <Spinner className="size-4" />
      </div>
    );
  }

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
        className={cn(
          "min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-b-xl px-14 py-4",
          bodyClassName,
        )}
        onScroll={onScroll}
      >
        <div ref={virtualizer.containerRef} className="relative w-full">
          {virtualItems.map((virtualItem) => {
            if (virtualItem.index === 0 && hasConversationStart) {
              return (
                <div
                  key={`initial-message-${virtualItem.key}`}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  className="absolute top-0 left-0 flex w-full flex-col items-center justify-center pb-4 text-xs"
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
                    <span className="text-xs font-bold text-gray-500">
                      You started the conversation on {conversationCreatedAt}
                    </span>
                    <span className="text-[16px] font-bold">
                      {t("chat.first_message", {
                        count: listParticipantIds.length,
                      })}
                    </span>
                  </div>
                </div>
              );
            }

            const messageIndex = hasConversationStart
              ? virtualItem.index - 1
              : virtualItem.index;
            const message = messages[messageIndex];

            if (!message) return null;

            const isMyMessage = myUserId === message.sender.userId;
            const messageTime = timeAgo(message.createdAt || "");

            if (message.system) {
              const IconType = typeMessageIconAction[message.system.action];
              const SystemIcon = IconType || Info;
              return (
                <div
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  className="absolute top-0 left-0 flex w-full items-center justify-center px-2 py-3 text-[13px]"
                >
                  <div className="border-border bg-card text-dialog-content flex max-w-[min(100%-1rem,42rem)] items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full",
                        systemMessageIconStyle[message.system.action],
                      )}
                    >
                      <SystemIcon className="size-3.5" />
                    </span>
                    <p
                      className="min-w-0 text-center leading-5"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
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
                        "mt-4 mb-1 ml-14 flex gap-2",
                        isMyMessage ? "justify-end" : "justify-start",
                      )}
                    >
                      {!isMyMessage && (
                        <p className="text-[12px] font-semibold text-gray-500">
                          {message.sender.displayName}
                        </p>
                      )}
                      <p className="text-[12px] text-gray-400">{messageTime}</p>
                    </div>
                  )}
                  <MessageBubble
                    message={message}
                    isMyMessage={isMyMessage}
                    participantIds={listParticipantIds}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
