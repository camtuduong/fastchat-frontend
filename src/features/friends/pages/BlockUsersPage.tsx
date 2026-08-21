import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { Style } from "@/style";
import { useTranslation } from "react-i18next";
export const BlockUsersPage = () => {
  const { t } = useTranslation();
  const path = useGetPath();
  const { label, icon } = getLabelAndIconByPath(path);
  return (
    <>
      <SidebarTriggerHeader label={label} icon={icon} />
      <div className={Style.dashboardEmptyContainer}>
        <div className="text-2xl font-bold">{t("friends.noBlocked.title")}</div>
        <div className="text-muted-foreground">
          {t("friends.noBlocked.description")}
        </div>
      </div>
    </>
  );
};
