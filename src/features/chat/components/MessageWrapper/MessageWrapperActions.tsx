import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, Copy, Pin } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy: () => void;
  isMyMessage?: boolean;
  setOpenAlertDialog: (open: boolean) => void;
};
export const MessageWrapperActions = ({
  className,
  open,
  onOpenChange,
  isMyMessage,
  onCopy,
  setOpenAlertDialog,
}: Props) => {
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
          <p className="text-xs text-gray-500">More</p>
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
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pin />
          Pin
        </DropdownMenuItem>
        {isMyMessage && (
          <DropdownMenuItem onClick={() => setOpenAlertDialog(true)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
