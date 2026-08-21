import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, Copy, Pin } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy: () => void;
  isMyMessage?: boolean;
  setOpenAlertDialog: (open: boolean) => void;
  onPinMessage: () => void;
};
export const MessageWrapperActions = ({
  className,
  open,
  onOpenChange,
  isMyMessage,
  onCopy,
  setOpenAlertDialog,
  onPinMessage,
}: Props) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" size="icon-sm" className={className}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{t("common.more")}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DropdownMenuItem onClick={onCopy}>
          <Copy />
          {t("common.copy")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPinMessage}>
          <Pin />
          {t("common.pin")}
        </DropdownMenuItem>
        {isMyMessage && (
          <>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => {}}>
              <Pencil />
              Edit
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => setOpenAlertDialog(true)}>
              <Trash2 />
              {t("common.delete")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
