import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import type { Message } from "@/features/chat/types/Message";

type Props = {
  conversation: Message;
};

export const ConversationBody = ({ conversation }: Props) => {
  const { data: me } = useGetMe();

  return (
    <div className="flex flex-1 flex-col overflow-auto rounded-b-xl p-8 pt-2">
      {conversation.messages?.map((message) => {
        const isMyMessage = me?.user?._id === message.sender.userId;
        return (
          <div
            key={message.id}
            className={`flex gap-4 ${isMyMessage ? "justify-end" : "justify-start"} rounded-lg p-px`}
          >
            {!isMyMessage && (
              <Avatar>
                <AvatarFallback>
                  {message.sender.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-1 rounded-2xl bg-gray-100 p-4">
              <div className="text-sm font-medium">
                {message.sender.username}
              </div>
              <div className="text-sm text-gray-700">{message.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
