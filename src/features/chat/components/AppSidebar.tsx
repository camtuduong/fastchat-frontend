import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavConversations } from "@/features/chat/components/sidebar/NavConversations";
import { useAuthStore } from "@/stores/useAuthStore";
import { Link } from "@tanstack/react-router";
import { TerminalIcon } from "lucide-react";
import type { Conversation } from "@/features/chat/types/conversation";
import { NavUser } from "@/components/sidebar/nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
type Props = {
  props?: React.ComponentProps<typeof Sidebar>;
  conversationsData: Conversation[];
};

export function AppSidebar({ conversationsData, ...props }: Props) {
  const { user, displayName } = useAuthStore((state) => state);

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/profile">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs">@{user}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* <NavFriends /> */}
        <NavConversations conversations={conversationsData} />
        {/* <NavMain items={data.navMain} /> */}
        {/* 
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
