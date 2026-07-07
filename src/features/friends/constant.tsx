import { BookUser, UserPlus, UsersRound, UserX } from "lucide-react";

export const SidebarFriendMenu = [
  {
    url: "",
    label: "List Friends",
    icon: <UsersRound />,
  },
  {
    url: "/requests",
    label: "Friend Requests",
    icon: <UserPlus />,
  },
  {
    url: "/blocked-users",
    label: "Blocked Users",
    icon: <UserX />,
  },
  {
    url: "/list-groups",
    label: "List Groups",
    icon: <BookUser />,
  },
];

export const getLabelAndIconByPath = (path: string) => {
  if (path === "/friends") {
    return {
      label: SidebarFriendMenu[0].label,
      icon: SidebarFriendMenu[0].icon,
    };
  }

  const menuItem = SidebarFriendMenu.find(
    (item) => item.url !== "" && path.endsWith(item.url),
  );

  return menuItem
    ? { label: menuItem.label, icon: menuItem.icon }
    : { label: "", icon: null };
};
