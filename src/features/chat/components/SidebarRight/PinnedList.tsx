import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  addPositionForPinnedMessages,
  pinnedClass,
} from "@/features/chat/constant";
import type { PinnedMessage } from "@/features/chat/types/conversation";
import { cn } from "@/lib/utils";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { ChevronsLeft, X } from "lucide-react";

type Props = {
  pinnedMessages: PinnedMessage[];
  onUnpinMessage: (messageId: string) => void;
};
export const PinnedList = ({ pinnedMessages, onUnpinMessage }: Props) => {
  const setStatus = useCustomSidebarStore((state) => state.setStatus);

  const listPinnedMessages = addPositionForPinnedMessages(pinnedMessages);

  return (
    <div className="flex flex-col gap-2 px-2 py-4">
      {/* header */}
      <div
        className="mb-5 flex cursor-pointer items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-800"
        onClick={() => setStatus(SIDEBAR_CONTENT_STATUS.DEFAULT)}
      >
        <ChevronsLeft />
        <span>Pinned Messages</span>
      </div>
      {listPinnedMessages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No pinned messages.
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {listPinnedMessages.map((message) => (
            <div
              key={message.messageId}
              className={cn(
                "bg-accent/5 hover:bg-accent/10 group/pinned-item relative flex cursor-pointer gap-2 rounded p-2",
                pinnedClass(message.position),
              )}
            >
              <Avatar>
                <AvatarImage
                  src={message?.avatarUrl ?? ""}
                  alt={message?.displayName ?? "User Avatar"}
                />
                <AvatarFallback>
                  {message?.displayName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">
                  {message?.displayName}
                </div>
                <div className="text-[12px] text-gray-600">
                  {message?.content}
                </div>
              </div>

              <button
                type="button"
                className="bg-accent-foreground hover:bg-destructive absolute top-1 right-2 cursor-pointer rounded-full p-1 text-white opacity-0 transition-colors duration-100 group-hover/pinned-item:opacity-100"
                onClick={() => onUnpinMessage(message.messageId)}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
