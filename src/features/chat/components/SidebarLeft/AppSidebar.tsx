import * as React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import type { Conversation } from "@/features/chat/types/conversation";

import { useAuthStore } from "@/stores/useAuthStore";
import { SidebarHeaderAndSearch } from "@/features/chat/components/SidebarLeft/SidebarHeaderAndSearch";
import { NavConversations } from "@/features/chat/components/SidebarLeft/NavConversations";

type Props = {
  props?: React.ComponentProps<typeof Sidebar>;
  conversationsData: Conversation[];
};

export function AppSidebar({ conversationsData, ...props }: Props) {
  const { user, displayName } = useAuthStore((state) => state);
  if (!user || !displayName) return null;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeaderAndSearch />
      <SidebarContent>
        <NavConversations conversations={conversationsData} />
      </SidebarContent>
    </Sidebar>
  );
}
