import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  bubbleClass,
  typeMessageAttachmentTypeToLabel,
} from "@/features/chat/constant";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";
import { MessageContentWrapper } from "@/features/chat/layouts/MessageContentWrapper";
import { ReplyMessage } from "@/features/chat/components/Conversation/ReplyMessage";
import type { Attachment, AttachmentType } from "@/features/chat/types/Message";
import { RenderImgs } from "@/features/chat/components/Conversation/MessageTypeRender/RenderImgs";
import { RenderSticker } from "@/features/chat/components/Conversation/MessageTypeRender/RenderSticker";

type Props = {
  message: MessageUI;
  isMyMessage: boolean;
};

const Style = {
  container: "flex w-full items-end gap-4 p-px",
  bubble: "py-2 text-sm wrap-anywhere",
  myMessage: "bg-primary-bubble-chat markdown-me text-white p-0.5",
  otherMessage:
    "markdown-other bg-bubble-other p-0.5 text-bubble-other-foreground",
  attachmentContainer: (type: AttachmentType) =>
    cn(
      "flex w-fit flex-wrap gap-2 bg-transparent p-2 text-bubble-other-foreground",
      type === typeMessageAttachmentTypeToLabel.sticker &&
        "hover:bg-attachment-bg/5",
    ),
  attachmentSticker: "h-auto w-32 rounded-md object-cover",
  replyMessageContainer:
    "m-0 flex flex-col rounded-tr-sm rounded-br-sm rounded-bl-xl rounded-tl-xl bg-gray-100 p-2 mb-2",
};

export const MessageBubble = ({ message, isMyMessage }: Props) => {
  const renderAttachmentByType = (attachments: Attachment[]) => {
    const attachmentType = attachments[0].type;
    switch (attachmentType) {
      case typeMessageAttachmentTypeToLabel.image:
        return <RenderImgs attachments={attachments} />;
      case typeMessageAttachmentTypeToLabel.sticker:
        return (
          <RenderSticker
            url={attachments[0].url}
            style={Style.attachmentSticker}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        Style.container,
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
            message?.attachments?.length > 0 && !message?.replyTo
              ? cn(Style.attachmentContainer(message.attachments[0].type))
              : "",
          )}
        >
          {message?.replyTo && (
            <ReplyMessage
              avatarUrl={message?.replyTo?.sender?.avatarUrl}
              displayName={message?.replyTo?.sender?.displayName}
              content={message?.replyTo?.content}
              isMyMessage={isMyMessage}
              messagePosition={message?.position}
            />
          )}
          {message?.attachments?.length > 0 ? (
            <div className={message?.replyTo ? "mt-2" : ""}>
              {renderAttachmentByType(message.attachments)}
              {/* 1 message chỉ có 1 cái type attachment nên dù có list attachment thì chỉ cần check cái attachment đầu tiên */}
            </div>
          ) : (
            <div className="px-2 py-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content.trim()}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </MessageContentWrapper>
    </div>
  );
};
