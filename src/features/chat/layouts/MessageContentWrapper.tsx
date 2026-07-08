import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CornerUpLeft, EllipsisVertical } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  isMyMessage?: boolean;
  children: ReactNode;
};

const Style = {
  container: "group relative w-fit max-w-[70%] min-w-0",
  actionButtonContainer:
    "absolute bottom-0.5 flex opacity-0 group-hover:opacity-100 min-h-0 gap-1 rounded-md p-1",
  actionButton:
    "bg-accent text-muted-foreground rounded-full shadow-md border border-border p-1",
};

export const MessageContentWrapper = ({ children, isMyMessage }: Props) => {
  return (
    <div
      className={cn(
        Style.container,
        "wrap-break-word whitespace-pre-wrap",
        "flex flex-col gap-10",
      )}
    >
      {children}

      <div
        className={cn(
          Style.actionButtonContainer,
          isMyMessage ? "right-full pr-2" : "left-full pl-2",
        )}
      >
        <Button variant="icon" size="icon-sm" className={Style.actionButton}>
          <CornerUpLeft />
        </Button>
        <Button variant="icon" size="icon-sm" className={Style.actionButton}>
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
};
