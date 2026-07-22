import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  avatarUrl: string;
  displayName: string;
  content: string;
  className?: string;
  isMyMessage?: boolean;
};

export const ReplyMessage = ({
  avatarUrl,
  displayName,
  content,
  className,
  isMyMessage = true,
}: Props) => {
  const fallBackImage = displayName?.charAt(0)?.toUpperCase();
  return (
    <div
      className={cn(
        "mb-1 flex flex-col p-2",
        isMyMessage
          ? "text-primary rounded-tl-xl rounded-tr-sm rounded-br-sm rounded-bl-xl bg-gray-100"
          : "bg-primary rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-sm text-white",
        className,
      )}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <CornerDownRight className="h-4 w-4 shrink-0" />

        <span className="shrink-0">Replying to:</span>

        <Avatar size="sm" className="shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fallBackImage}</AvatarFallback>
        </Avatar>

        <span
          className={cn(
            isMyMessage ? "text-primary" : "text-white",
            "min-w-0 truncate font-medium",
          )}
          title={displayName}
        >
          {displayName}
        </span>
      </div>
      <div
        className={cn(
          isMyMessage ? "text-primary" : "text-white",
          "min-w-60 pl-2 text-sm",
        )}
      >
        {content}
      </div>
    </div>
  );
};
