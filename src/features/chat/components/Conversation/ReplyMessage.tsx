import { CornerDownRight } from "lucide-react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bubbleReplyClass } from "@/features/chat/constant";
import type { BubblePosition } from "@/features/chat/types/bubbleChat";
import { cn } from "@/lib/utils";

type Props = {
  avatarUrl: string;
  displayName: string;
  content: string;
  className?: string;
  isMyMessage?: boolean;
  description?: ReactNode;
  messagePosition?: BubblePosition;
  hasAttachment?: boolean;
  variant?: "bubble" | "composer";
};

export const ReplyMessage = ({
  avatarUrl,
  displayName,
  content,
  className,
  isMyMessage = true,
  description,
  messagePosition,
  hasAttachment,
  variant = "bubble",
}: Props) => {
  const fallBackImage = displayName?.charAt(0)?.toUpperCase();
  const isComposer = variant === "composer";
  const replyBackgroundClass = isComposer
    ? "bg-reply-preview border-reply-preview-border"
    : isMyMessage
      ? "bg-reply-me border-reply-me-border"
      : "bg-reply-other border-reply-other-border";
  const replyMetaClass = isComposer
    ? "text-reply-preview-label"
    : isMyMessage
      ? "text-reply-me-name"
      : "text-reply-other-name";
  const replyContentClass = isComposer
    ? "text-reply-preview-content"
    : isMyMessage
      ? "text-reply-me-content"
      : "text-reply-other-content";

  return (
    <div
      className={cn(
        "mx-2 my-1 flex flex-col p-2",
        bubbleReplyClass(messagePosition, isMyMessage),
        "border-l-[3px]",
        replyBackgroundClass,
        className,
        hasAttachment && "p-3",
      )}
    >
      <div className={cn("flex items-center gap-2 text-sm", replyMetaClass)}>
        <CornerDownRight className="h-4 w-4 shrink-0" />

        {description}

        <Avatar className="h-5 w-5 shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fallBackImage}</AvatarFallback>
        </Avatar>

        <span
          className="min-w-0 truncate text-[13px] font-semibold"
          title={displayName}
        >
          {displayName}
        </span>
      </div>
      <div className={cn("mt-1 min-w-0 text-[12px]", replyContentClass)}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content.trim()}
        </ReactMarkdown>
      </div>
    </div>
  );
};
