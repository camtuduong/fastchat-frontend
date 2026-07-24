import { AvatarBadge } from "@/components/ui/avatar";
import type { LastMessage } from "@/features/chat/types/conversation";

type Props = {
  unreadCount: number;
  LastMessage?: LastMessage;
  isLastMessageFromMe?: boolean;
};

export const LastMessageItem = ({
  unreadCount,
  LastMessage,
  isLastMessageFromMe,
}: Props) => {
  return (
    <div className="text-muted-foreground relative truncate text-xs">
      {unreadCount > 0 ? (
        <>
          {`${unreadCount} new message${unreadCount > 1 ? "s" : ""}`}
          <AvatarBadge className="border-0.5 border-gray-1 absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 bg-blue-600 dark:border-black dark:bg-blue-900" />
        </>
      ) : (
        `${isLastMessageFromMe ? "You: " : ""}${LastMessage?.content ?? ""}`
      )}
    </div>
  );
};
