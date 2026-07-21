import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useGetUserById } from "@/features/main/hooks/queries/useGetUserById";
import {
  bubbleClass,
  messagePositionToLabel,
  timeAgo,
} from "@/features/chat/constant";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";
import { MessageContentWrapper } from "@/features/chat/layouts/MessageContentWrapper";
import { useMemo } from "react";

type Props = {
  message: MessageUI;
  isMyMessage: boolean;
};
export const MessageBubble = ({ message, isMyMessage }: Props) => {
  const { data: userById } = useGetUserById(message.sender.userId || "");

  const timeTrans = useMemo(() => {
    return timeAgo(message.createdAt || "");
  }, [message.createdAt]);

  const messageTime = timeTrans.endsWith("trước")
    ? timeTrans.slice(0, -6).trimEnd()
    : timeTrans;

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
      <MessageContentWrapper isMyMessage={isMyMessage} message={message}>
        <div>
          {(message.position === messagePositionToLabel.single ||
            message.position === messagePositionToLabel.last) && (
            <div className="flex items-center justify-between gap-2">
              {!isMyMessage && (
                <p className="mb-1 text-xs font-semibold text-gray-500">
                  {message.sender.username}
                  <span></span>
                </p>
              )}

              <p className="mb-1 text-xs text-gray-400">{messageTime}</p>
            </div>
          )}

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
        </div>
      </MessageContentWrapper>
    </div>
  );
};
