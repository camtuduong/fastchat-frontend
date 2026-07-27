import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";

import {
  CustomSidebar,
  CustomSidebarContent,
} from "@/components/ui/custom-sidebar";

import { RightSidebarHeader } from "@/features/chat/components/SidebarRight/RightSidebarHeader";
import { useConversationStore } from "@/stores/useConversationStore";
import { useSidebarContentStatus } from "@/stores/useSidebarContentStatus";

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
  const conversationDataDetail = useConversationStore(
    (state) => state.conversationDataDetail,
  );
  const status = useSidebarContentStatus((state) => state.status);

  // console.log("conversationDataDetail", conversationDataDetail);
  // console.log("status", status);

  const renderSidebarContent = () => {
    switch (status) {
      default:
        return (
          <div className="flex flex-col gap-2 p-4">
            <RightSidebarHeader
              conversationDataDetail={conversationDataDetail}
            />
            <CustomSidebarContent>
              <NavMain items={data.navMain} />
            </CustomSidebarContent>
          </div>
        );
    }
  };

  return (
    <CustomSidebar variant="floating" {...props}>
      {renderSidebarContent()}
    </CustomSidebar>
  );
}
