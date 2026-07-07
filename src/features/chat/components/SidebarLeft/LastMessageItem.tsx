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
    <div className="text-muted-foreground text-xs">
      {unreadCount > 0
        ? `(${unreadCount} new message${unreadCount > 1 ? "s" : ""})`
        : `${isLastMessageFromMe ? "You: " : ""}${LastMessage?.content ?? ""}`}
    </div>
  );
};
