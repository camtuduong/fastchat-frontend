import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserById } from "@/features/main/hooks/queries/useGetUserById";
import { bubbleClass } from "@/features/chat/constant";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";
import { MessageContentWrapper } from "@/features/chat/layouts/MessageContentWrapper";

type Props = {
  message: MessageUI;
  isMyMessage: boolean;
};
export const MessageBubble = ({ message, isMyMessage }: Props) => {
  const { data: userById } = useGetUserById(message.sender.userId || "");
  return (
    <div
      className={cn(
        "flex w-full items-end gap-4",
        isMyMessage ? "justify-end" : "justify-start",
      )}
    >
      <Avatar
        className={cn(
          "self-start",
          message.showAvatar && !isMyMessage ? "opacity-100" : "opacity-0",
        )}
      >
        <AvatarImage
          src={userById?.avatarUrl}
          alt={userById?.username || "avatar"}
        />
        <AvatarFallback>
          {message.sender.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <MessageContentWrapper isMyMessage={isMyMessage}>
        <div
          className={cn(
            "p-2",
            bubbleClass(message.position, isMyMessage),
            isMyMessage ? "bg-primary text-white" : "bg-gray-100 text-gray-700",
          )}
        >
          <div className="text-sm wrap-anywhere">{message.content}</div>
        </div>
      </MessageContentWrapper>
    </div>
  );
};
