import { BookUser, UserPlus, UsersRound, UserX } from "lucide-react";

export const SidebarFriendMenu = [
  {
    url: "",
    labelKey: "friends.list.label",
    icon: <UsersRound />,
  },
  {
    url: "/requests",
    labelKey: "friends.requests.label",
    icon: <UserPlus />,
  },
  {
    url: "/blocked-users",
    labelKey: "friends.blocked.label",
    icon: <UserX />,
  },
  {
    url: "/list-groups",
    labelKey: "friends.groups.label",
    icon: <BookUser />,
  },
];

export const getLabelAndIconByPath = (path: string) => {
  if (path === "/friends") {
    return {
      labelKey: SidebarFriendMenu[0].labelKey,
      icon: SidebarFriendMenu[0].icon,
    };
  }

  const menuItem = SidebarFriendMenu.find(
    (item) => item.url !== "" && path.endsWith(item.url),
  );

  return menuItem
    ? { labelKey: menuItem.labelKey, icon: menuItem.icon }
    : { labelKey: "friends.label", icon: null };
};
