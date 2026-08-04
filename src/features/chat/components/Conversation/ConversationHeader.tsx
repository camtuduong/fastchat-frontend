import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { CustomSidebarTrigger } from "@/components/ui/custom-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";

type Props = {
  type: Conversation["type"] | undefined;
  members: Conversation["participants"] | undefined;
  isOnline: boolean | undefined;
  groupAvatarUrl?: string | undefined;
};

export const ConversationHeader = ({
  type,
  members,
  isOnline,
  groupAvatarUrl,
}: Props) => {
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
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
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
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <span className="truncate">
              {members?.map((member) => member.displayName).join(", ")}
            </span>
          </div>
        );
      default:
        return null;
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
      <div className="flex gap-2 px-4">
        <CustomSidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
};
