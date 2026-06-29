import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { bubbleClass } from "@/features/chat/constant";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";

type Props = {
  message: MessageUI;
  isMyMessage: boolean;
};
export const MessageBubble = ({ message, isMyMessage }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full items-end gap-4 p-px",
        isMyMessage ? "justify-end" : "justify-start",
      )}
    >
      <Avatar
        className={cn(
          "self-start",
          message.showAvatar && !isMyMessage ? "opacity-100" : "opacity-0",
        )}
      >
        <AvatarFallback>
          {message.sender.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[70%] min-w-0 p-4",
          "wrap-break-word whitespace-pre-wrap",
          "flex flex-col gap-1",
          bubbleClass(message.position, isMyMessage),
          isMyMessage ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700",
        )}
      >
        <div className="wrap-anywhere">{message.content}</div>
      </div>
    </div>
  );
};
