import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";

import {
  CustomSidebar,
  CustomSidebarContent,
} from "@/components/ui/custom-sidebar";

import { LeftSidebarHeader } from "@/features/chat/components/SidebarRight/LeftSidebarHeader";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Chat Info",
      url: "#",
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Customise chat",
      url: "#",
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Chat members",
      url: "#",
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Media, files and links",
      url: "#",

      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Private & support",
      url: "#",

      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppCustomSidebar({
  ...props
}: React.ComponentProps<typeof CustomSidebar>) {
  return (
    <CustomSidebar variant="floating" {...props}>
      {/* Header */}
      <LeftSidebarHeader />
      {/* Content */}
      <CustomSidebarContent>
        <NavMain items={data.navMain} />
      </CustomSidebarContent>
      {/*
      <CustomSidebarFooter>
        <NavUser user={data.user} />
      </CustomSidebarFooter> */}
    </CustomSidebar>
  );
}
