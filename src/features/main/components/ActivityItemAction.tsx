import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Check, EllipsisVertical, SquareX } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ActivityItemAction = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <button type="button" className={className}>
          <EllipsisVertical className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" align="end">
        <DropdownMenuItem onClick={() => {}}>
          <Check />
          <span>{t("activity.markAsRead")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="text-button-destructive"
        >
          <SquareX />
          <span>{t("activity.remove")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
