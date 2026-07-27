import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { bubbleReplyClass } from "@/features/chat/constant";
import type { BubblePosition } from "@/features/chat/types/bubbleChat";

type Props = {
  avatarUrl: string;
  displayName: string;
  content: string;
  className?: string;
  isMyMessage?: boolean;
  description?: ReactNode;
  messagePosition?: BubblePosition;
};

export const ReplyMessage = ({
  avatarUrl,
  displayName,
  content,
  className,
  isMyMessage = true,
  description,
  messagePosition,
}: Props) => {
  const fallBackImage = displayName?.charAt(0)?.toUpperCase();
  return (
    <div
      className={cn(
        "mb-1 flex flex-col p-2",
        bubbleReplyClass(messagePosition!, isMyMessage),
        isMyMessage
          ? "bg-chart-5"
          : "dark:bg-background bg-white dark:text-white",

        className,
      )}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <CornerDownRight className="h-4 w-4 shrink-0" />

        {description}

        <Avatar size="sm" className="shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fallBackImage}</AvatarFallback>
        </Avatar>

        <span
          className={cn("min-w-0 truncate font-medium")}
          title={displayName}
        >
          {displayName}
        </span>
      </div>
      <div className={cn("min-w-0 pl-2 text-sm")}>{content}</div>
    </div>
  );
};
