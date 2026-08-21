import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { useTranslation } from "react-i18next";

type Props = {
  name?: string;
};
export const RightSidebarHeader = ({ name }: Props) => {
  const { t } = useTranslation();
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex gap-2 px-4">
        <div className="flex items-center gap-2">
          <div className="font-bold">{t("sidebar.info")}</div>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="text-muted-foreground text-[13px] italic">{name}</div>
        </div>
      </div>
      {/* Action buttons */}
      <div
        className="hover:bg-accent/5 mr-2 cursor-pointer rounded-md bg-transparent p-1"
        onClick={() => setOpen(false)}
      >
        <X className="h-4 w-4" />
      </div>
    </header>
  );
};
