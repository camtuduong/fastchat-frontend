import * as React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { useAuthStore } from "@/stores/useAuthStore";
import { FriendSearch } from "@/features/friends/components/sidebar/FriendSearch";
import { SidebarFriendSidebar } from "@/features/friends/components/sidebar/FriendsSidebarMenu";

type Props = {
  props?: React.ComponentProps<typeof Sidebar>;
};

export function AppSidebarFriend({ ...props }: Props) {
  const { userId, displayName } = useAuthStore((state) => state);
  if (!userId || !displayName) return null;

  return (
    <Sidebar variant="inset" {...props}>
      <FriendSearch />
      <SidebarContent>
        <SidebarFriendSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
