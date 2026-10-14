import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

type Props = {
  label?: string;
  icon?: ReactNode;
};
export const SidebarTriggerHeader = ({ label, icon }: Props) => {
  return (
    <header className="flex h-12 w-full shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          {icon && (
            <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>
          )}
          <span className="truncate">{label || ""}</span>
        </div>
      </div>
    </header>
  );
};
