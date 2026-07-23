import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/stores/useMessage";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { MessageWrapperActions } from "@/features/chat/components/MessageWrapper/MessageWrapperActions";
import { cn } from "@/lib/utils";
import { CornerUpLeft } from "lucide-react";
import type { ReactNode } from "react";
import type { MessageUI } from "@/features/chat/types/bubbleChat";
import { useDeleteMessage } from "@/features/chat/hooks/useDeleteMessage";
import { AlertDialog } from "@/features/chat/components/AlertDialog";

type Props = {
  isMyMessage?: boolean;
  children: ReactNode;
  message?: MessageUI;
};

const Style = {
  container: "group relative w-fit max-w-[70%] min-w-0",
  attachmentContainer: "group relative w-full max-w-[70%]",
  actionButtonContainer:
    "absolute bottom-0.5 flex opacity-0 group-hover:opacity-100 min-h-0 gap-1 rounded-md p-1",
  actionButton:
    "bg-accent/5 hover:bg-chart-1 text-muted-foreground rounded-full shadow-md border border-border p-1",
};

export const MessageContentWrapper = ({
  children,
  isMyMessage,
  message,
}: Props) => {
  const { setReplyMessage } = useMessageStore();
  const [openMoreAction, setOpenMoreAction] = useState(false);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { mutateAsync: deleteMessage } = useDeleteMessage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message?.content || "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpenAlertDialog(nextOpen);
  };

  const handleDeleteMessage = async () => {
    if (message?._id) {
      try {
        await deleteMessage(message._id);
        setOpenAlertDialog(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      className={cn(
        message?.attachments?.length
          ? Style.attachmentContainer
          : Style.container,
        "wrap-break-word whitespace-pre-wrap",
        "flex flex-col gap-10",
      )}
    >
      {children}

      <div
        className={cn(
          Style.actionButtonContainer,
          isMyMessage ? "right-full pr-2" : "left-full pl-2",
          openMoreAction ? "opacity-100" : "opacity-0",
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="icon"
              size="icon-sm"
              className={Style.actionButton}
              onClick={() => {
                if (message) {
                  setReplyMessage(message);
                }
              }}
            >
              <CornerUpLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Reply</p>
          </TooltipContent>
        </Tooltip>

        <MessageWrapperActions
          open={openMoreAction}
          onOpenChange={setOpenMoreAction}
          className={Style.actionButton}
          isMyMessage={isMyMessage}
          onCopy={handleCopy}
          setOpenAlertDialog={setOpenAlertDialog}
        />

        <AlertDialog
          open={openAlertDialog}
          onOpenChange={handleOpenChange}
          onConfirm={handleDeleteMessage}
          title="Remove message"
          description="Once you delete this message, it cannot be undone."
        />
      </div>
    </div>
  );
};
