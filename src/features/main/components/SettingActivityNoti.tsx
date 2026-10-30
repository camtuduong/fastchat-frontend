import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CheckCheck, SquareX } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

export const SettingActivityNoti = ({
  open,
  onOpenChange,
  buttonTrigger,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  buttonTrigger: ReactNode;
}) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>{buttonTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" align="end">
        <DropdownMenuItem onClick={() => {}}>
          <CheckCheck />
          <span>{t("activity.markAllAsRead")}</span>
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
