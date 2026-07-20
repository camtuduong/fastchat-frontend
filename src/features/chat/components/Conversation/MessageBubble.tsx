import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            "py-2 text-sm wrap-anywhere",
            bubbleClass(message.position, isMyMessage),
            isMyMessage
              ? "bg-primary markdown-me pr-2 pl-3 text-white"
              : "markdown-other bg-gray-100 pr-3 pl-2 text-gray-700",
            message?.attachments?.length > 0
              ? "bg-transparent hover:bg-gray-200"
              : "",
          )}
        >
          {message?.attachments?.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="w-32">
                  <video
                    autoPlay
                    loop
                    muted
                    src={attachment.url}
                    className="h-auto w-full rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </MessageContentWrapper>
    </div>
  );
};
