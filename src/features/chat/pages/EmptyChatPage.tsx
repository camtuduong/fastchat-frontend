import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

export const EmptyChatPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
        <div className="flex gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
        </div>
        {/* Action buttons */}
      </header>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">
          {t("chat.noConversation.title")}
        </div>
        <div className="text-muted-foreground">
          {t("chat.noConversation.description")}
        </div>
      </div>
    </div>
  );
};
