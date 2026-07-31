import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";

import {
  CustomSidebar,
  CustomSidebarContent,
} from "@/components/ui/custom-sidebar";

import { RightSidebarHeader } from "@/features/chat/components/SidebarRight/RightSidebarHeader";
import { useConversationStore } from "@/stores/useConversationStore";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { PinnedList } from "@/features/chat/components/SidebarRight/PinnedList";
import { useUnpinMessageInConversation } from "@/features/chat/hooks/useUnpinMessageInConversation";

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

  const status = useCustomSidebarStore((state) => state.status);
  const { mutateAsync: unpinMessage } = useUnpinMessageInConversation();

  if (!conversationDataDetail) {
    return null;
  }

  const handleUnpinMessage = async (messageId: string) => {
    try {
      await unpinMessage({
        conversationId: conversationDataDetail._id,
        messageId,
      });
    } catch (error) {
      console.error("Error unpinning message:", error);
    }
  };

  const renderSidebarContent = () => {
    switch (status) {
      case SIDEBAR_CONTENT_STATUS.DEFAULT:
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
      case SIDEBAR_CONTENT_STATUS.PINNED:
        return (
          <PinnedList
            pinnedMessages={conversationDataDetail.pinnedMessages || []}
            onUnpinMessage={handleUnpinMessage}
          />
        );
      case SIDEBAR_CONTENT_STATUS.MEMBERS:
        return (
          <div className="flex flex-col gap-2 p-4">
            <CustomSidebarContent>
              Members content goes here.
            </CustomSidebarContent>
          </div>
        );
      case SIDEBAR_CONTENT_STATUS.SHARED:
        return (
          <div className="flex flex-col gap-2 p-4">
            <CustomSidebarContent>
              Shared content goes here.
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
