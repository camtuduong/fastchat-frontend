import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import {
  addPositionForPinnedMessages,
  pinnedClass,
} from "@/features/chat/constant";
import type { PinnedMessage } from "@/features/chat/types/conversation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  pinnedMessages: PinnedMessage[];
  onUnpinMessage: (messageId: string) => void;
};
export const PinnedList = ({ pinnedMessages, onUnpinMessage }: Props) => {
  const { t } = useTranslation();
  const listPinnedMessages = addPositionForPinnedMessages(pinnedMessages);

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
      {listPinnedMessages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          {t("common.noPinned")}
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
