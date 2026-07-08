import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";

import {
  CustomSidebar,
  CustomSidebarContent,
} from "@/components/ui/custom-sidebar";

import { RightSidebarHeader } from "@/features/chat/components/SidebarRight/RightSidebarHeader";

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
          title: "View pinned messages",
          url: "#",
        },
      ],
    },
    {
      title: "Customise chat",
      url: "#",
      items: [
        {
          title: "Change theme",
          url: "#",
        },
        {
          title: "Change emoji",
          url: "#",
        },
        {
          title: "Edit nicknames",
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
          title: "Media",
          url: "#",
        },
        {
          title: "Files",
          url: "#",
        },
        {
          title: "Links",
          url: "#",
        },
      ],
    },
    {
      title: "Private & support",
      url: "#",
      items: [
        {
          title: "Chat notifications",
          url: "#",
        },
        {
          title: "Report",
          url: "#",
        },
        {
          title: "Leave group",
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
      <RightSidebarHeader />
      {/* Content */}
      <CustomSidebarContent>
        <NavMain items={data.navMain} />
      </CustomSidebarContent>
    </CustomSidebar>
  );
}
