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
import { usePinMessageInConversation } from "@/features/chat/hooks/usePinMessageInConversation";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { useTranslation } from "react-i18next";

type Props = {
  isMyMessage?: boolean;
  children: ReactNode;
  message?: MessageUI;
};

const Style = {
  container: "group relative w-fit max-w-[70%] min-w-0 ",
  attachmentContainer: "group relative w-fit max-w-[70%] min-w-0",
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
  const { t } = useTranslation();
  const { setReplyMessage } = useMessageStore();
  const [openMoreAction, setOpenMoreAction] = useState(false);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const setOpen = useCustomSidebarStore((state) => state.setOpen);
  const setStatus = useCustomSidebarStore((state) => state.setStatus);

  const { mutateAsync: deleteMessage, isPending } = useDeleteMessage();
  const { mutateAsync: pinMessage } = usePinMessageInConversation();

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

  const handlePinMessage = async () => {
    if (message?._id) {
      try {
        await pinMessage({
          conversationId: message.conversationId,
          messageId: message._id,
        });
        setOpenMoreAction(false);
        setStatus(SIDEBAR_CONTENT_STATUS.PINNED);
        setOpen(true);
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
            <p className="text-xs">{t("chat.reply")}</p>
          </TooltipContent>
        </Tooltip>

        <MessageWrapperActions
          open={openMoreAction}
          onOpenChange={setOpenMoreAction}
          className={Style.actionButton}
          isMyMessage={isMyMessage}
          onCopy={handleCopy}
          setOpenAlertDialog={setOpenAlertDialog}
          onPinMessage={handlePinMessage}
        />

        <AlertDialog
          open={openAlertDialog}
          onOpenChange={handleOpenChange}
          onConfirm={handleDeleteMessage}
          title={t("chat.removeMessage.title")}
          description={t("chat.removeMessage.description")}
          isPending={isPending}
        />
      </div>
    </div>
  );
};
