import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { MessageItem } from "@/features/chat/types/Message";

type Props = {
  message: MessageItem;
  isMyMessage: boolean;
};
export const MessageBubble = ({ message, isMyMessage }: Props) => {
  return (
    <>
      {!isMyMessage && (
        <Avatar>
          <AvatarFallback>
            {message.sender.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-1 rounded-2xl bg-gray-100 p-4">
        <div className="text-sm font-medium">{message.sender.username}</div>
        <div className="text-sm text-gray-700">{message.content}</div>
      </div>
    </>
  );
};
