import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { bubbleClass } from "@/features/chat/constant";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";
import { MessageContentWrapper } from "@/features/chat/layouts/MessageContentWrapper";
import { ReplyMessage } from "@/features/chat/components/Conversation/ReplyMessage";

type Props = {
  message: MessageUI;
  isMyMessage: boolean;
};

const Style = {
  bubble: "py-2 text-sm wrap-anywhere",
  myMessage: "bg-primary markdown-me pr-2 pl-3 text-white",
  otherMessage:
    "markdown-other bg-gray-100 dark:bg-accent pr-3 pl-2 text-gray-700 dark:text-gray-200",
  attachmentContainer: "mb-2 flex w-full flex-wrap gap-2 bg-transparent",
  attachmentVideo: "h-auto w-full rounded-md object-cover",

  replyMessageContainer:
    "m-0 flex flex-col rounded-tr-sm rounded-br-sm rounded-bl-xl rounded-tl-xl bg-gray-100 p-2 mb-2",
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
        <AvatarImage
          src={message.sender?.avatarUrl}
          alt={message.sender?.displayName || "avatar"}
        />
        <AvatarFallback>
          {message.sender?.displayName?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <MessageContentWrapper isMyMessage={isMyMessage} message={message}>
        <div
          className={cn(
            Style.bubble,
            bubbleClass(message.position, isMyMessage),
            isMyMessage ? Style.myMessage : Style.otherMessage,
            message?.attachments?.length > 0 ? Style.attachmentContainer : "",
          )}
        >
          {message?.replyTo && (
            <ReplyMessage
              avatarUrl={message?.replyTo?.sender?.avatarUrl}
              displayName={message?.replyTo?.sender?.displayName}
              content={message?.replyTo?.content}
              isMyMessage={isMyMessage}
            />
          )}
          {message?.attachments?.length > 0 ? (
            <div className={Style.attachmentContainer}>
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="w-full">
                  <video
                    autoPlay
                    loop
                    muted
                    src={attachment.url}
                    className={Style.attachmentVideo}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content.trim()}
            </ReactMarkdown>
          )}
        </div>
      </MessageContentWrapper>
    </div>
  );
};
