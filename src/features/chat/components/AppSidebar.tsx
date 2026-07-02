import * as React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavConversations } from "@/features/chat/components/sidebar/NavConversations";
import type { Conversation } from "@/features/chat/types/conversation";

import { useAuthStore } from "@/stores/useAuthStore";
import { SidebarHeaderAndSearch } from "@/features/chat/components/sidebar/SidebarHeaderAndSearch";

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
