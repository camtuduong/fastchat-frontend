import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { Style } from "@/style";
import { useTranslation } from "react-i18next";

export const ListGroupsPage = () => {
  const { t } = useTranslation();
  const path = useGetPath();
  const { label, icon } = getLabelAndIconByPath(path);
  return (
    <>
      <SidebarTriggerHeader label={label} icon={icon} />
      <div className={Style.dashboardEmptyContainer}>
        <div className="text-2xl font-bold">{t("friends.noGroups.title")}</div>
        <div className="text-muted-foreground">
          {t("friends.noGroups.description")}
        </div>
      </div>
    </>
  );
};
