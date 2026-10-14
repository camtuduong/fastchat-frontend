import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FriendSearch = () => {
  const { t } = useTranslation();
  return (
    <SidebarHeader className="flex flex-col gap-2 px-2 pt-3 pb-0">
      <div className="text-xl font-semibold">
        {t("friends.sidebarTitle")}
      </div>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          autoComplete="one-time-code"
          className="bg-search-bg! border-search-border text-foreground placeholder:text-muted-foreground focus:border-search-focus-border pl-9 placeholder:text-xs"
          id="friends-search-input"
          placeholder={t("common.search")}
          type="search"
        />
      </div>
    </SidebarHeader>
  );
};
