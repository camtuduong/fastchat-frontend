import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarChildLayout } from "@/features/chat/layouts/SidebarChildLayout";
import { SidebarFriendMenu } from "@/features/friends/constant";
import { cn } from "@/lib/utils";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const SidebarFriendSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarChildLayout label={t("friends.sectionTitle")} className="gap-y-0.5">
      {SidebarFriendMenu.map((item) => {
        const itemPath = `/friends${item.url}`;
        const isActive =
          item.url === "" ? pathname === "/friends" : pathname === itemPath;

        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              className={cn(
                "h-9 cursor-pointer text-[14px]",
                isActive && "bg-nav-active text-foreground",
              )}
              onClick={() => navigate({ to: itemPath })}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarChildLayout>
  );
};
