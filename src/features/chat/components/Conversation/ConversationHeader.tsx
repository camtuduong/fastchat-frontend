import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  type: Conversation["type"];
  members: Conversation["participants"];
  isOnline: boolean;
  groupAvatarUrl?: string;
  groupName?: string;
};

export const ConversationHeader = ({
  type,
  members,
  isOnline,
  groupAvatarUrl,
  groupName,
}: Props) => {
  const { t } = useTranslation();
  const open = useCustomSidebarStore((state) => state.open);
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  const renderHeaderConversation = () => {
    switch (type) {
      case conversationTypeToLabel.direct:
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={members?.[0]?.avatarUrl || undefined}
                alt="@shadcn"
              />
              <AvatarFallback>
                {members
                  ?.map((member) => member.displayName?.[0]?.toUpperCase())
                  .join(", ")}
              </AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-status-online" : "bg-status-offline"}`}
              />
            </Avatar>
            <span className="truncate">
              {members?.map((member) => member.displayName).join(", ")}
            </span>
          </div>
        );
      case conversationTypeToLabel.group:
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={groupAvatarUrl || undefined} alt="@group" />
              <AvatarFallback>GR</AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-status-online" : "bg-status-offline"}`}
              />
            </Avatar>
            <span className="truncate">
              {groupName ||
                members?.map((member) => member.displayName).join(", ") ||
                t("chat.noName")}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleOpenSidebar = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
        </div>
        {renderHeaderConversation()}
      </div>
      {/* Action buttons */}
      <button
        className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 px-4 text-sm"
        onClick={handleOpenSidebar}
      >
        <Info className="h-4 w-4" />
      </button>
    </header>
  );
};
