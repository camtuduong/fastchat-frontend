import { SidebarChildLayout } from "@/features/chat/layouts/SidebarChildLayout";
import { useTranslation } from "react-i18next";

export const NavFriends = () => {
  const { t } = useTranslation();
  return <SidebarChildLayout label={t("friends.label")}>hi</SidebarChildLayout>;
};
