import * as React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import type { Conversation } from "@/features/chat/types/conversation";

import { useAuthStore } from "@/stores/useAuthStore";
import { FriendSearch } from "@/features/friends/components/sidebar/FriendSearch";
import { SidebarFriendSidebar } from "@/features/friends/components/sidebar/FriendsSidebarMenu";

type Props = {
  props?: React.ComponentProps<typeof Sidebar>;
  conversationsData: Conversation[];
};

export function AppSidebarFriend({ conversationsData, ...props }: Props) {
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
